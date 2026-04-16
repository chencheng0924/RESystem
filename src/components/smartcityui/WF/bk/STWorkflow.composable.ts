import { ref, Ref } from "vue";
import {
  STEdge,
  STNode,
  STNodeTypeEnum,
  STWorkflowAction,
  STWorkflowActionEnum,
  STworkflowProps,
} from "../STWorkflow.model";
import { Edge, Node } from "@vue-flow/core";
import { STMenubarAction } from "../../STMenubar.model";

class NodeTypeItem {
  STNodeType?: STNodeTypeEnum;
  SCCMNodeType?: string;
  Name?: string;
  Icon?: string;
  Id?: string;
  constructor(init?) {
    Object.assign(this, init);
  }

  toMenubarAction() {
    return new STMenubarAction({
      Id: this.Id,
      Text: this.Name,
      Icon: this.Icon,
      Type: this.STNodeType,
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
  public nodes?: Ref<Array<Node>>;
  public edges?: Ref<Array<Edge>>;
  public wfInstance?: Ref;
  public toolbars?: Ref<Array<STMenubarAction>>;
  public edit?: boolean = true;
  public nodeToolbars?: Ref<Array<STWorkflowAction>>;
  private nodeTypeMapping?: Array<NodeTypeItem> = [
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
      STNodeType: STNodeTypeEnum.AGENT,
      SCCMNodeType: "3",
      Name: "標準代理",
      Icon: "pi pi pi-id-card",
      Id: "nodeApproval",
    }),
    new NodeTypeItem({
      STNodeType: STNodeTypeEnum.SUMMARY,
      SCCMNodeType: "4",
      Name: "摘要代理",
      Icon: "pi pi pi-arrow-right-arrow-left",
      Id: "nodeStatus",
    }),
    new NodeTypeItem({
      STNodeType: STNodeTypeEnum.CHATGROUP,
      SCCMNodeType: "5",
      Name: "會議代理",
      Icon: "pi pi pi-flag",
      Id: "nodeLogic",
    }),
    new NodeTypeItem({
      STNodeType: STNodeTypeEnum.FLOW,
      SCCMNodeType: "6",
      Name: "流程代理",
      Icon: "pi pi-send",
      Id: "nodeMerge",
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
  ];

  constructor(props: STworkflowProps) {
    this.nodes = ref([]);
    this.edges = ref([]);
    this.wfInstance = ref(null);
    this.toolbars = ref([]);
    this.nodeToolbars = ref([]);
    this.edit = props.edit;

    this.init(props);
  }
  init(props: STworkflowProps) {
    this.nodes.value = props.nodes as Array<Node>;

    this.edges.value = props.edges as Array<Edge>;
    if (this.edit == false) {
      this.edges.value.forEach((x) => {
        x.data["edit"] = false;
      });
    }

    let menuActions: Array<STMenubarAction> = props.actions.map(
      (x) => new STMenubarAction(x)
    );
    let nodeToolbars = this.getNodeActionToolbar();
    if (nodeToolbars.length > 0 && this.edit)
      menuActions = menuActions.concat(nodeToolbars);

    this.toolbars.value = menuActions;

    // 結點功能
    const nodeToolbar: Array<STWorkflowAction> = [
      new STWorkflowAction({
        Id: "delete_node",
        Text: "刪除",
        Icon: "pi pi-times",
      }),
      new STWorkflowAction({
        Id: "edit_node",
        Text: "編輯",
        Icon: "pi pi-file-edit",
      }),
    ];
    this.nodeToolbars.value = nodeToolbar;
  }

  getNodeActionToolbar() {
    // workflow node toolbar
    const nodeToolbars: Array<STMenubarAction> = this.nodeTypeMapping.map((x) =>
      x.toMenubarAction()
    );
    return nodeToolbars;
  }

  // 觸發 toolbar 按鈕事件
  setToolbarActionItem(item: STWorkflowAction) {
    if (item.Type == STWorkflowActionEnum.WFReset) {
      this.wfInstance.value.fitView();
      return false;
    }
    if (item.Type >= 0) {
      this.setNodeTypeAction(item);
      return false;
    }

    return true;
  }
  // 增加按鈕至圖框中
  setNodeTypeAction(item: STWorkflowAction) {
    let nodeDef = this.nodeTypeMapping.find((x) => x.STNodeType == item.Type);
    if (nodeDef == null) return;

    this.nodes.value.push(nodeDef.toFlowNodeObject());
  }

  // 觸發節點 按鈕事件
  setNodeToolbarAction(props, action) {
    if (action.Id == "delete_node") {
      this.nodes.value = this.nodes.value.filter(
        (node) => node.id !== props.id
      );
      return null;
    }
    let currentNode = this.nodes.value.find((node) => node.id == props.id);

    return currentNode;
  }

  // 觸發路線 按鈕事件
  setEdgeToolbarAction(id) {

    let currentEdge = this.edges.value.find((node) => node.id == id);

    return currentEdge;
  }

  updateNodePostion(node) {
    if (this.nodes.value.length == 0) return;
    let tempNode = this.nodes.value.find((x) => x.id == node.id);
    if (tempNode == null) return;

    tempNode.position = node.position;
  }
}
