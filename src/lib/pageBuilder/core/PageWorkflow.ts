import { ListItem } from "../common/ListItem";

export class PageWorkflow {
    constructor(init?) {
        Object.assign(this, init);
    }

    public CheckWorkflowTemplate?: boolean = false;
    public Message?: string = "";
    public WorkFlowTemplates?: Array<ListItem> = [];
}