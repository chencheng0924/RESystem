
import { PageView } from './core/PageView';



export class PageMapItem {
    controllerObject?: any
    securityObject?: any
    constructor(init?) {
        Object.assign(this, init);
    }
}


export class PageMapClass {
    constructor() {

    }
    getMappingData() {
        const mapping = {

        }

        return mapping;
    }
    getPageView(serviceName: string) {
        let mapping = this.getMappingData();

        const ServiceClass = mapping[serviceName]?.controllerObject;
        if (ServiceClass) {
            const serviceInstance = new ServiceClass() as PageView;
            return serviceInstance;
        } else {
            return null;
        }
    }

}