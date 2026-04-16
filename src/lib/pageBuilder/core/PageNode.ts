export class PageNode {
  Id?: string;
  Code?: string;
  NodeName?: string;
  NodeDefId?: string;
  NodeType?: PageNodetye;
  PositionX?: number;
  PositionY?: number;

  constructor(init?) {
    Object.assign(this, init);
  }
}

export enum PageNodetye {
  START = "1",
  END = "2",
  APPROVAL = "3",
  LOGIC = "4",
  NOTIFY = "5",
  MERGE = "6",
  STATUS = "7",
}
