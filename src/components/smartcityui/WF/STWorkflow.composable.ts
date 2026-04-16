import { ref, Ref, toRef, toValue, watch, nextTick, onMounted } from "vue";
import dagre from '@dagrejs/dagre'
import {
  STEdge,
  STNode,
  ProcessStatus,
  STNodeTypeEnum,
  STWorkflowAction,
  STWorkflowActionEnum,
  STworkflowProps,
} from "./STWorkflow.model";
import { Edge, Node } from "@vue-flow/core";
import { STMenubarAction } from "../STMenubar.model";
import { useVueFlow, Position } from '@vue-flow/core'
import { useDebounce } from "@/utils/useDebounce";
class NodeTypeItem {
  STNodeType?: STNodeTypeEnum;
  SCCMNodeType?: string;
  Name?: string;
  Icon?: string;
  Id?: string;
  Url?: string
  constructor(init?) {
    Object.assign(this, init);
  }

  toMenubarAction() {
    return new STMenubarAction({
      Id: this.Id,
      Text: this.Name,
      Icon: this.Icon,
      Type: this.STNodeType,
      url: this.Url
    });
  }

  toFlowNodeObject() {
    const id = `vueflow__node${Date.now().toString()}`;
    let obj = {
      id: id,
      position: { x: 10, y: 10 },
      data: { label: this.Name, nodeType: this.SCCMNodeType }, //1 start
      type: "normal",
    };

    return obj;
  }
}
export class WorkflowController {

  public nodes?: Ref<Array<Node>>
  public edges?: Ref<Array<Edge>>
  public wfInstance?: Ref;
  public toolbars?: Ref<Array<STMenubarAction>>;
  public edit?: boolean = true;
  public nodeToolbars?: Ref<Array<STWorkflowAction>>;
  public isRunning: Ref<boolean> = ref(false);
  public nodeTypeMapping?: Ref<Array<STMenubarAction>> = ref([
    new NodeTypeItem({
      STNodeType: STNodeTypeEnum.START,
      SCCMNodeType: "1",
      Name: "開始",
      Icon: "pi pi-flag",
      Id: "nodeStart",
    }),
    new NodeTypeItem({
      STNodeType: STNodeTypeEnum.END,
      SCCMNodeType: "2",
      Name: "結束",
      Icon: "pi pi-flag-fill",
      Id: "nodeEnd",
    }),
    new NodeTypeItem({
      STNodeType: STNodeTypeEnum.LOGIC,
      SCCMNodeType: "7",
      Name: "邏輯",
      Icon: "pi pi-table",
      Id: "nodeNotify",
    }),
    new NodeTypeItem({
      STNodeType: STNodeTypeEnum.DECISION,
      SCCMNodeType: "8",
      Name: "判斷",
      Icon: "pi pi-table",
      Id: "nodeNotify",
    }),
    new NodeTypeItem({
      STNodeType: STNodeTypeEnum.MERGEALL,
      SCCMNodeType: "9",
      Name: "合併",
      Icon: "pi pi-table",
      Id: "nodeNotify",
    }),
    new NodeTypeItem({
      STNodeType: STNodeTypeEnum.AGENT,
      SCCMNodeType: "3",
      Name: "標準代理",
      Icon: "pi pi pi-id-card",
      Id: "nodeApproval",
      Url: 'aiagent'.getIcon('svg')
    }),
    new NodeTypeItem({
      STNodeType: STNodeTypeEnum.SUMMARY,
      SCCMNodeType: "4",
      Name: "摘要代理",
      Icon: "pi pi pi-arrow-right-arrow-left",
      Id: "nodeStatus",
      Url: 'aisummary'.getIcon('svg')
    }),
    new NodeTypeItem({
      STNodeType: STNodeTypeEnum.CHATGROUP,
      SCCMNodeType: "5",
      Name: "會議代理",
      Icon: "pi pi pi-flag",
      Id: "nodeLogic",
      Url: 'aigroup'.getIcon('svg')
    }),
    new NodeTypeItem({
      STNodeType: STNodeTypeEnum.FLOW,
      SCCMNodeType: "6",
      Name: "流程代理",
      Icon: "pi pi-send",
      Id: "nodeMerge",
      Url: 'aiflow'.getIcon('svg')
    }),
    new NodeTypeItem({
      STNodeType: STNodeTypeEnum.PROXY,
      SCCMNodeType: "11",
      Name: "橋接代理",
      Icon: "pi pi-table",
      Id: "nodeProxy",
      Url: 'aiproxy'.getIcon('svg')
    }),

    new NodeTypeItem({
      STNodeType: STNodeTypeEnum.AILibrary,
      SCCMNodeType: "12",
      Name: "知識庫",
      Icon: "pi pi-table",
      Id: "AILibrary",
      Url: "ailibrary".getIcon('svg')
    }),
  ].map((x) => x.toMenubarAction()));
  public draggedData: Ref<any> = ref()
  public isDragOver: Ref<boolean> = ref(false)
  public isDragging: Ref<boolean> = ref(false)
  public drawerVisible: Ref<boolean> = ref(false)
  private lastCancelledConnectionPosition: any = null;
  private connectionCreated: boolean = false
  private spliceConnection: any = null
  public selectItemId: Ref<string> = ref('')
  emit: any;
  useVueflow: any;
  targetConnection = null
  //layout
  graph: any
  layout: any
  //process
  workflowProcess: any

  constructor(props: STworkflowProps, emit) {
    this.nodes = ref([]);
    this.edges = ref([]);
    this.wfInstance = ref(null);
    this.toolbars = ref([]);
    this.nodeToolbars = ref([]);
    this.edit = props.edit;
    this.emit = emit;

    this.useVueflow = useVueFlow();
    this.init(props);

    let aa = this.nodeTypeMapping.value;


    let str = 'aiproxy'.getIcon('svg')
  }

  resetNodeData(data) {

    let node = this.nodeTypeMapping.value.find(x => x.Type.toString() == data.nodeType);
    if (node)
      data.url = node.url ?? '';

    return data;
  }

  init(props: STworkflowProps) {
    const { onNodesInitialized, nodes, edges, onEdgesChange, onNodesChange, onNodeDragStart, onNodeDragStop, onNodeDoubleClick, findEdge, onConnect, onConnectStart, onConnectEnd, addEdges, setViewport } = this.useVueflow

    // we create a new graph instance, in case some nodes/edges were removed, otherwise dagre would act as if they were still there
    this.nodes.value = props.nodes as Array<Node>;
    this.edges.value = props.edges as Array<Edge>;
    if (this.edit == false) {
      this.edges.value.forEach((x) => {
        x.data["edit"] = false;
      });
    }

    // 結點功能
    const nodeToolbar: Array<STWorkflowAction> = [
      new STWorkflowAction({
        Id: "delete_node",
        Text: "刪除",
        Icon: "pi pi-trash",
      }),
      new STWorkflowAction({
        Id: "edit_node",
        Text: "編輯",
        Icon: "pi pi-file-edit",
      }),
    ];

    let self = this;
    this.nodeToolbars.value = nodeToolbar;

    onNodeDoubleClick(({ node }) => {
      this.emit('eventNodeToolbarAction', node, { Id: "edit_node" });
    })

    /**
     * Connections
     */
    onConnect((connection) => {
      console.log('connection:create', connection)
      addEdges({ ...connection, type: 'custom', id: this.randomString(17) })
      this.connectionCreated = true
      this.layoutGraph()
    })
    onConnectStart((connection) => {
      console.log('connection:start', connection)
      this.targetConnection = connection
      this.connectionCreated = false
      nodes.value.find(n => n.id == connection.nodeId).data.connecting = true

    })
    onConnectEnd((event) => {
      console.log('connection:end', event)
      nodes.value.find(n => n.id == this.targetConnection.nodeId).data.connecting = false
      if (!this.connectionCreated) {
        this.drawerVisible.value = true
        this.getProjectedPosition(event)
      } else {
        // reset clean
        this.targetConnection = null
        this.connectionCreated = false
      }

      onChangeSave()
    })


    /**
     * on change
    */
    let canSave = false
    onNodeDragStart(({ event, node, nodes }) => {
      if (event.target.closest("[data-type=NodeToolbarButton]")) {
        canSave = false
        return
      }
      else canSave = true
    })
    onNodeDragStop(({ event, node, nodes }) => {
      if (canSave) onChangeSave()
    })
    onEdgesChange((changes) => {
      this.layoutGraph()
    })

    /** debounce */
    const { callDebounced } = useDebounce();
    const onChangeSave = () => {
      void callDebounced(onChangeEnd, { debounceTime: 200 });
    };
    const onChangeEnd = async () => {
      this.onSave()
    };

    /**
     * layout init
    */
    onNodesInitialized(() => {
      this.layoutGraph()
      setViewport({ x: props.viewport.x, y: props.viewport.y, zoom: props.viewport.zoom })
    })


    // layout
    const { graph, layout } = WorkflowLayout()
    this.graph = graph
    this.layout = layout

    // process
    const process = WorkflowRunProcess({ graph: this.graph })
    this.workflowProcess = process
    this.isRunning = process.isRunning

    watch(() => this.drawerVisible.value, (val) => {
      if (!val) {
        this.lastCancelledConnectionPosition = null
        this.targetConnection = null
        this.connectionCreated = false
        this.spliceConnection = null
      }
    })


  }

  public onNodemoveIn(nodeId) {
    this.selectItemId.value = nodeId
  }
  public eventActionClick(item?) {
    if (item) this.onSave(item)
    else {
      this.drawerVisible.value = true
    }
  }
  private onSave(item?) {
    const { toObject } = this.useVueflow
    let wfObject = toObject();
    console.log(wfObject)
    this.emit('eventToolbarAction', item, wfObject);
  }
  public eventWorkflowProcess(type) {
    const { nodes } = this.useVueflow
    if (type == 'run') this.workflowProcess.run(nodes.value)
    else if (type == 'stop') this.workflowProcess.stop()
    else if (type == 'reset') this.workflowProcess.reset(nodes.value)
  }
  public eventNodeToolbarAction(props, action: STWorkflowAction) {
    const { findNode, removeNodes } = this.useVueflow
    let currentNode = findNode(props.id);
    if (action.Id == "delete_node") {
      removeNodes([props.id])
      this.onSave()
      return null;
    }
    else this.emit('eventNodeToolbarAction', currentNode, action);
  }
  public onAddConnection(connection, event, id) {
    console.log('connection:Add', connection, event)
    this.spliceConnection = { ...connection, id }
    this.getProjectedPosition(event)
    this.drawerVisible.value = true

  }
  public onEditConnection(connection, id) {
    const { findEdge } = this.useVueflow
    const target = findEdge(id)
    this.emit('eventEdgeToolbarAction', target);
  }
  public onDeleteConnection(connection, id) {
    const { removeEdges, findEdge } = this.useVueflow
    const target = findEdge(id)
    removeEdges(target)
  }
  public onTidyup() {
    this.layoutGraph(true)
    const { fitView } = this.useVueflow
    nextTick(() => {
      fitView()
    })
  }
  private async layoutGraph(tidyup?) {
    const { nodes, edges } = this.useVueflow
    await this.workflowProcess.stop()
    this.workflowProcess.reset(nodes.value)
    this.nodes.value = this.layout(nodes.value, edges.value, tidyup)
  }

  /**
   * 
   * drag event
   */
  public onDragStart(event, item) {
    console.log(event, item)
    if (event.dataTransfer) {
      event.dataTransfer.setData('application/vueflow', JSON.stringify(item))
      event.dataTransfer.effectAllowed = 'move'
    }

    this.draggedData.value = item
    this.isDragging.value = true

    document.addEventListener('drop', () => this.onDragEnd())
  }
  public onDragOver(event) {
    event.preventDefault()
    if (this.draggedData.value) {
      this.isDragOver.value = true

      if (event.dataTransfer) {
        event.dataTransfer.dropEffect = 'move'
      }
    }
  }
  public onDragLeave() {
    this.isDragOver.value = false
  }
  public onDragEnd() {
    this.isDragging.value = false
    this.isDragOver.value = false
    this.draggedData.value = null
    document.removeEventListener('drop', () => this.onDragEnd())
    return this
  }
  public onDrop(event) {
    const nodeData = event.dataTransfer.getData('application/vueflow')
    this.getProjectedPosition(event)
    this.createNode(JSON.parse(nodeData))
  }

  /**
   * 
   * 新增node節點
   */
  private randomString = (length) => {
    var text = "";
    var possible = "0123456789";
    for (var i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  }
  public createNode(item) {
    const { addNodes, nodes, addEdges, findEdge, removeEdges } = this.useVueflow
    if (nodes.value.length > 0 && nodes.value.find(x => x.data.nodeType == STNodeTypeEnum.START) && item.Type == STNodeTypeEnum.START) {
      alert("只能有一個開始節點")
      return false;
    }
    const id = this.randomString(13)
    const newNode = new STNode({
      id,
      position: this.lastCancelledConnectionPosition ?? { x: 0, y: 0 },
      data: { label: item.Text, connectionCount: 0, nodeType: String(item.Type) },
    });
    addNodes([newNode])

    if (this.targetConnection && !this.connectionCreated) {
      const param = {
        source: this.targetConnection.nodeId,
        sourceHandle: null,
        target: id,
        targetHandle: null,
        type: 'custom',
        id: this.randomString(17)
      }
      const targetItem = nodes.value.find(n => n.id == this.targetConnection.nodeId)
      targetItem.data.connected = true
      targetItem.data.connectionCount = targetItem.data.connectionCount += 1
      addEdges(param)

      // reset clean
      this.targetConnection = null
      this.connectionCreated = false
    } else if (this.spliceConnection) {
      console.log('this.spliceConnection', this.spliceConnection)
      const param = {
        source: this.spliceConnection.source,
        sourceHandle: null,
        target: id,
        targetHandle: null,
        type: 'custom',
        id: this.randomString(17)
      }
      const param2 = {
        source: id,
        sourceHandle: null,
        target: this.spliceConnection.target,
        targetHandle: null,
        type: 'custom',
        id: this.randomString(17)
      }
      addEdges(param)
      addEdges(param2)
      const targetItem = nodes.value.find(n => n.id == id)
      targetItem.data.connected = true
      targetItem.data.connectionCount = targetItem.data.connectionCount += 1
      const target = findEdge(this.spliceConnection.id)
      removeEdges(target)
      // reset clean
      this.spliceConnection = null
    }
    this.onSave()
    this.lastCancelledConnectionPosition = null
    this.drawerVisible.value = false
  };

  /**
   * 
   * 重新計算位置
   */
  private getProjectedPosition(event) {
    const { viewportRef, project } = this.useVueflow
    const bounds = viewportRef.value?.getBoundingClientRect() ?? { left: 0, top: 0 };
    const offsetX = event?.clientX ?? 0;
    const offsetY = event?.clientY ?? 0;
    const pos = project({
      x: offsetX - bounds.left,
      y: offsetY - bounds.top,
    });
    this.lastCancelledConnectionPosition = pos
    return pos
  }


  public eventRunChat() {
    const { toObject } = this.useVueflow
    let wfObject = toObject();
    this.emit('eventRunChat', wfObject);
  }
}
function WorkflowLayout() {
  const { findNode, findEdge } = useVueFlow()
  const graph = ref(new dagre.graphlib.Graph())
  function layout(nodes, edges, TidyUp) {

    // we create a new graph instance, in case some nodes/edges were removed, otherwise dagre would act as if they were still there
    const dagreGraph = new dagre.graphlib.Graph()

    graph.value = dagreGraph
    dagreGraph.setDefaultEdgeLabel(() => ({}))
    dagreGraph.setGraph({ rankdir: 'LR' })

    nodes.map((node) => findNode(node.id)).forEach(({ id: id, position: { x, y }, dimensions: { width, height } }) => {
      dagreGraph.setNode(id, { width, height, x, y });
    });

    edges.map((node) => findEdge(node.id)).forEach((edge) => dagreGraph.setEdge(edge.source, edge.target));

    // layout the graph
    if (TidyUp) dagre.layout(dagreGraph)

    // set nodes with updated positions
    return nodes.map((node) => {
      const nodeWithPosition = dagreGraph.node(node.id)
      return {
        ...node,
        targetPosition: Position.Left,
        sourcePosition: Position.Right,
        position: { x: nodeWithPosition.x, y: nodeWithPosition.y },
      }
    })
  }

  return { graph, layout }
}

function WorkflowRunProcess({ graph: dagreGraph }) {

  const { findNode, updateNodeData, getConnectedEdges } = useVueFlow()

  const graph = toRef(() => toValue(dagreGraph))
  const isRunning = ref(false)

  /** Map of running tasks with the node ID as the key and the timeout as the value. */
  const runningTasks = new Map()

  /** Set of node ids of nodes that have been executed  */
  const executedNodes = new Set()

  /** Set of node ids yet to be executed */
  const upcomingTasks = new Set()

  /**
   * Run the process on a node.
   * It will mark the node as running, simulate an async process, and then mark the node as finished or errored.
   *
   * @param nodeId The ID of the node to run.
   * @param isStart Whether this is a starting node.
   */
  async function runNode(nodeId, isStart = false) {

    if (executedNodes.has(nodeId)) {
      return
    }

    // save the upcoming task in case it gets cancelled before we even start it
    upcomingTasks.add(nodeId)


    // get all incoming edges to this node
    const incomers = getConnectedEdges(nodeId).filter((connection) => connection.target === nodeId)

    // wait for edge animations to finish before starting the process
    await Promise.all(incomers.map((incomer) => until(() => !incomer.data?.isAnimating)))

    // remove the upcoming task since we are about to start it
    upcomingTasks.clear()

    if (!isRunning.value) {
      // The process was stopped
      return
    }

    // mark the node as executed, so it doesn't run again
    executedNodes.add(nodeId)

    updateNodeStatus(nodeId, ProcessStatus.RUNNING)

    // simulate an async process with a random timeout between 1-2 seconds
    const delay = Math.floor(Math.random() * 2000) + 1000

    return new Promise((resolve) => {
      const timeout = setTimeout(
        async () => {

          /**
           * 隨機產錯 
           */
          const willThrowError = Math.random() < 0.15
          if (!isStart && willThrowError) {
            updateNodeStatus(nodeId, ProcessStatus.ERROR)
            await skipDescendants(nodeId)
            runningTasks.delete(nodeId)
            resolve(true)
            return
          }
          /**
           * 隨機產錯 END
           */

          // const target = findNode(nodeId)
          // const willThrowError = JSON.parse(target.data.method())
          // // we avoid throwing an error on the starting node
          // if (!isStart && willThrowError) {
          //   updateNodeStatus(nodeId, ProcessStatus.ERROR)
          //   runningTasks.delete(nodeId)
          //   resolve(true)
          //   return
          // }

          updateNodeStatus(nodeId, ProcessStatus.FINISHED)

          runningTasks.delete(nodeId)

          // get all children of this node
          const children = graph.value.successors(nodeId) || []

          if (children.length > 0) {

            // run the process on the children in parallel
            await Promise.all(children.map((child) => runNode(child)))
          }

          resolve(true)
        },
        // if this is a starting node, we don't want to wait
        isStart ? 0 : delay,
      )

      // save the timeout so we can cancel it if needed
      runningTasks.set(nodeId, timeout)
    })
  }

  /**
   * Run a sequence of nodes.
   * It will start with the nodes that have no predecessors and then run the process on each node in sequence.
   * If a node has multiple descendants, it will run them in parallel.
   * If an error occurs, it will stop the process and mark all descendants as skipped.
   * If the process is stopped, it will mark all running nodes as cancelled.
   *
   * @param nodes The nodes to run.
   */
  async function run(nodes) {
    // if the process is already running, we don't want to start it again
    if (isRunning.value) {
      return
    }

    // reset all nodes to their initial state
    reset(nodes)

    isRunning.value = true

    // get all starting nodes (nodes with no predecessors)
    console.log(nodes)
    // const startingNodes = nodes.filter((node) => graph.value.predecessors(node.id)?.length === 0)
    const startingNodes = nodes.filter((node) => node.data.nodeType == STNodeTypeEnum.START)
    // run the process on all starting nodes in parallel
    await Promise.all(startingNodes.map((node) => runNode(node.id, false)))
    clear()
  }

  /**
   * Reset all nodes to their initial state.
   *
   * @param nodes The nodes to reset.
   */
  async function reset(nodes) {
    if (isRunning.value) await stop()
    clear()
    for (const node of nodes) {
      updateNodeStatus(node.id, null)
    }
  }

  /**
   * Skip all descendants of a node.
   *
   * @param nodeId The ID of the node to skip descendants for.
   */
  async function skipDescendants(nodeId) {
    const children = graph.value.successors(nodeId) || []

    for (const child of children) {
      updateNodeStatus(child, ProcessStatus.SKIPPED)
      await skipDescendants(child)
    }
  }

  /**
   * Stop the process.
   *
   * It will mark all running nodes as cancelled and skip all upcoming tasks.
   */
  async function stop() {
    isRunning.value = false

    for (const nodeId of upcomingTasks) {
      clearTimeout(runningTasks.get(nodeId))
      runningTasks.delete(nodeId)
      updateNodeStatus(nodeId, ProcessStatus.CANCELLED)
      await skipDescendants(nodeId)
    }

    for (const [nodeId, task] of runningTasks) {
      clearTimeout(task)
      runningTasks.delete(nodeId)
      updateNodeStatus(nodeId, ProcessStatus.CANCELLED)
      await skipDescendants(nodeId)
    }

    executedNodes.clear()
    upcomingTasks.clear()
  }

  /**
   * Clear all running tasks and executed nodes.
   */
  function clear() {
    isRunning.value = false
    executedNodes.clear()
    runningTasks.clear()
  }

  /**
   * Update the status of a node.
   *
   * @param nodeId The ID of the node to update.
   * @param status The new status of the node.
   */
  function updateNodeStatus(nodeId, status) {
    updateNodeData(nodeId, { status })
  }

  return { run, stop, reset, isRunning }
}

async function until(condition) {
  return new Promise((resolve) => {
    const interval = setInterval(() => {
      if (condition()) {
        clearInterval(interval)
        resolve(true)
      }
    }, 100)
  })
}