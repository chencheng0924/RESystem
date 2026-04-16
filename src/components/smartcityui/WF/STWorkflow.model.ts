import { STPosition } from '@/components/smartcityui/STCommon.model';
import { MarkerType, XYPosition } from "@vue-flow/core";
import { STAction } from "../STCommon.model";
import exp from "constants";
export class STworkflowProps {
  nodes?: Array<STNode> = [];
  edges?: Array<STEdge> = [];
  actions?: Array<STWorkflowAction> = [];
  edit?: boolean = true;
  viewport?: STViewport = new STViewport();

  constructor(init?: Partial<STworkflowProps>) {
    Object.assign(this, init);
  }

  setNodes(nodes: Array<STNode>) {
    this.nodes = nodes;
    return this;
  }
  setEdges(edges: Array<STEdge>) {
    this.edges = edges;
    return this;
  }
  setActions(actions: Array<STWorkflowAction>) {
    this.actions = actions;
    return this;
  }
  setViewport(x: number = 0, y: number = 0, zoom: number = 1) {
    this.viewport = new STViewport({ x: x, y: y, zoom: zoom });
    return this;
  }
  setEdit(edit: boolean) {
    this.edit = edit;
    return this;
  }
}

export enum STNodeType {
  INPUT = "input",
  OUTPUT = "output",
}

export class STNodePosition {
  x?: number;
  y?: number;
  constructor(init?) {
    Object.assign(this, init);
  }
}
export class STNodeData {
  label?: string;
  nodeType?: string;
  connectionCount?: number
  connected?: boolean;
  method?: any;
  constructor(init?) {
    Object.assign(this, init);
  }
}
export class STNode {
  id: string;
  type: string = 'normal'; // vueflow類型
  data?: STNodeData;
  position: XYPosition;
  toolbarVisible?: boolean = false;

  constructor(init?) {
    Object.assign(this, init);
  }
}
// 線型類型
export enum STEdgeType {
  DEFAULT = "default", //曲線
  STEP = "step", //直角折線
  SMOOTHSTEP = "smoothstep", //直角折線+導圓角
  STRAIGHT = "straight", //直線
  CUSTOM = "custom",
}
export enum ProcessStatus {
  ERROR = 'error',
  SKIPPED = 'skipped',
  CANCELLED = 'cancelled',
  FINISHED = 'finished',
  RUNNING = 'running',
}
export class STEdge {
  id?: string;
  type?: STEdgeType = STEdgeType.CUSTOM;
  source?: string;
  target?: string;
  animated?: boolean = false; // 線動畫
  data?: Object;
  markerEnd?: MarkerType = MarkerType.ArrowClosed;
  style?: any;
  labelBgStyle?: any;
  // style: { stroke: 'orange' },
  // labelBgStyle: { fill: 'orange' },

  constructor(init?) {
    Object.assign(this, init);
  }
}

export class STWorkflowEvent {
  constructor(init?: Partial<STWorkflowEvent>) {
    Object.assign(this, init);
  }

  eventToolbarAction?: Function;
  eventNodeToolbarAction?: Function;
  eventEdgeToolbarAction?: Function;

  eventRunChat?: Function
}

export class STWorkflowAction extends STAction {
  constructor(init?) {
    super(init);
  }
}

export class STViewport {
  x?: number = 0;
  y?: number = 0;
  zoom?: number = 1;
  constructor(init?) {
    Object.assign(this, init);
  }
}

export enum STWorkflowActionEnum {
  WFSave, //保存
  WFReset, //重新定位
  WFToggleDark, //切換 dark or light
}
export enum STNodeTypeEnum {
  START = 1,
  END,
  AGENT,
  SUMMARY,
  CHATGROUP,
  FLOW,
  LOGIC,
  DECISION,
  MERGEALL,
  PLAY,
  PROXY,
  AILibrary,
}
