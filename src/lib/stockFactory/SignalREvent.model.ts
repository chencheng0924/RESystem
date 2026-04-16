import moment from "moment";

export class SignalREvent {
    Data?: Array<any> = [];
    EventType?: string
    EventTime?: string
    SessionId?: string
    constructor(init?) {
        Object.assign(this, init);
    }



    getElement(roomId) {
        if (this.EventType == null || this.EventType == "")
            return null;

        if (this.EventType.indexOf("FlowAgent") == -1) {
            return new SignalRElementLog().setData(this, roomId).setID(this.SessionId);
        }
        else { // FLowNode 相關
            let logEvent = new SignalRElementLog();
            let envs = this.Data.map(x => new SignalRElement(x).getNode())
            if (envs == null || envs.length == 0)
                return new SignalRElementLog().setData(this, roomId).setID(this.SessionId);

            let id = envs.firstOrDefault()?.getID();
            logEvent.setData({ Data: envs }, roomId).setID(id);
            return logEvent;
        }
    }
}

export class SignalRElementLog {
    data?: Array<any> = [];
    time?: string
    type?: string
    roomId?: string
    id?: string
    constructor(init?) {
        Object.assign(this, init);
    }
    setData(data, roomId) {

        this.data = data?.Data;
        this.time = moment(data?.EventTime).format('YYYY-MM-DD HH:mm:ss');
        this.type = data?.EventType;
        this.roomId = roomId
        return this;
    }
    setID(id) {
        this.id = id;
        return this;
    }
    getID() {
        return this.id;
    }
    steFlowEvent() {

    }
    static isObj(obj) {
        if (obj == null)
            return false;

        if (obj['role'] == undefined)
            return false;

        return true;

    }

    static getContent(content) {
        if (content == undefined || content == null || content == "")
            return content;

        let obj = "";
        let c = `${content}`
        try {
            obj = JSON.parse(content);
        } catch (e) {
            return c;
        }

        if (this.isObj(obj) == false) {
            return content;
        }

        // 是物件
        let parts = obj['parts'];
        if (parts == undefined || parts == null || parts.length == 0)
            return content;

        return "";
        //let content = parts.map(x => x['text']).join('');
        //return content;
    }

}


export class SignalRElement {
    ElementName?: string
    ContentType?: string
    Content?: string
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

    getNode() {
        if (this.ElementName == "")
            return null;
        if (this.ElementName == "Transition") {
            return new SignalRFloeTransition(this);
        }
        else {
            return new SignalRFloeNode(this);
        }
    }
}


export class SignalRFloeNode extends SignalRElement {
    NodeId?: string
    NodeName?: string
    NodeType?: string
    Option?: string

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
        return this.NodeId;
    }


}
export class SignalRFloeTransition extends SignalRElement {
    FromNodeId?: string
    ToNodeId?: string

    constructor(init?) {
        super(init);
        Object.assign(this, init);
    }

    getID() {
        return `${this.FromNodeId}_${this.ToNodeId}`;
    }

}
