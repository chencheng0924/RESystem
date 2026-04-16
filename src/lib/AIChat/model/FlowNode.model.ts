

export class FlowElement {
    elementName?: string
    contentType?: string
    content?: string
    constructor(init?) {
        Object.assign(this, init);
    }

    getID() {
        return "";
    }
    isObj(obj) {
        if (obj == null)
            return false;

        if (obj['role'] == undefined)
            return false;

        return true;

    }
    getContent() {

        if (this.content == undefined || this.content == null || this.content == "")
            return "";

        let obj = "";
        let c = `${this.content}\n`
        if (this.elementName == "Message")
            c = `${this.content}`

        try {
            obj = JSON.parse(this.content);
        } catch (e) {
            return c;
        }

        if (this.isObj(obj) == false) {
            return c;
        }

        // 是物件
        let parts = obj['parts'];
        if (parts == undefined || parts == null || parts.length == 0)
            return "";

        return "";
        //let content = parts.map(x => x['text']).join('');
        //return content;
    }

    static getElement(obj) {
        if (obj == null)
            return null;

        if (obj["fromNodeId"] != undefined && obj["fromNodeId"] != null) {
            return new FloeTransition(obj);
        } else {
            return new FloeNode(obj);
        }
    }
}


export class FloeNode extends FlowElement {
    nodeId?: string
    nodeName?: string
    nodeType?: string
    option?: string

    constructor(init?) {
        super(init);
        Object.assign(this, init);
    }
    // nodeType
    /*
    Start
    Logic
    Agent
    Library

    進入一個節點是 先 Info > Input > Output > Info
    */
    getID() {
        return this.nodeId;
    }


}

export class FloeTransition extends FlowElement {
    fromNodeId?: string
    toNodeId?: string

    constructor(init?) {
        super(init);
        Object.assign(this, init);
    }

    getID() {
        return `${this.fromNodeId}_${this.toNodeId}`;
    }

}
