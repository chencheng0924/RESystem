export class ParameterData {
    constructor(init?) {
        Object.assign(this, init);
    }
    public Pkid?: string;
    public Type?: string;
    public Scenario?: string;
    public OrgType?: string;
    public OrgScenario?: string;

    public IsTheSame(): boolean {
        if (`${this.Type}_${this.Scenario}` == `${this.OrgType}_${this.OrgScenario}`)
            return true;
        else
            return false;
    }
}