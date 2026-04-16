import { PageAction } from "./PageAction"
import { PageTag } from "./PageTag"

export class PageTimelineItem {
    Id?: string
    Icon?: string
    Title?: string
    Content?: string
    Time?: string
    Tag?: PageTag
    Action?: PageAction

    constructor(init?: Partial<PageTimelineItem>) {
        Object.assign(this, init)
    }
    setTag(tag?: PageTag) {
        this.Tag = tag;
        return this;
    }
    setAction(action?: PageAction) {
        this.Action = action;
        return this;
    }
}