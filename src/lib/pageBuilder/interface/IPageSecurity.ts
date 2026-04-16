import { PageMapClass, PageMapItem } from "../Page.mapclass";

export interface IPageSecurity {
    getSecurity();
}


export class IPageSecurityFactory {
    static getAllSceurity() {
        let securitDatas: Array<IPageSecurity> = []
        let mappDatas = new PageMapClass();
        let mappObject = mappDatas.getMappingData();
        for (let key in mappObject) {
            let obj: PageMapItem = mappObject[key] as PageMapItem;
            if (obj.securityObject == null)
                continue;

            const ServiceClass = obj.securityObject;
            if (ServiceClass) {
                const securityInstance = new ServiceClass() as IPageSecurity;
                securitDatas.push(securityInstance);
            }

        }

        let datas = securitDatas.map((x) => { return { items: x.getSecurity() } }).flatMap(x => x.items);

        return datas;
    }
}