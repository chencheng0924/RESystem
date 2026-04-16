import { IComponent } from '@/composables/interface/IComponent'
import { IObjectGeneric } from '../interface/IObjectGeneric';
import { BlockCardType } from '../enum/BlockCardType';

export class BlockCard implements IComponent {
    constructor(init?) {
        Object.assign(this, init);
    }
    public Id?: string;
    public Type?: BlockCardType = BlockCardType.NONE;
    public Value?: any;


    Component?: any;
    Props?: IObjectGeneric;
    Attrs?: IObjectGeneric;
    Events?: any;

    setComponent(comp) {
        this.Component = comp;
        return this;
    }
    setProps(props) {
        this.Props = props;
        return this;
    }
    setAttrs(attrs) {
        this.Attrs = attrs;
        return this;
    }
    setEvents(events) {
        this.Events = events;
        return this;
    }
}






// <component :id="sec.Id" :is="{ ...sec.Component }" :type="sec.SectionType"
// v-bind="{ ...sec.Props, ...sec.Attrs }" :model-value="sec.Props?.value"
// v-on="{ ...sec.Events }" />