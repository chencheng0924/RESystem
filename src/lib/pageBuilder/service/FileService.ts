
import { EnvUtils } from '@/utils/envUtils';
import { BaseService } from './BaseService';


let baseUrl = EnvUtils.getRStoragePath()
export class FileService extends BaseService {

    constructor() {
        super();
    }

    // public async getFileAll(fileName?: string) {
    //     let para: FileResourceApiRstorageBasicFileResourceGetRequest = {};
    //     if (fileName != null)
    //         Object.assign(para, { fileName: fileName })


    //     return this.api.fileResourceApi.rstorageBasicFileResourceGet(para).then((res) => {

    //         let ds = res.data.data;
    //         console.log(ds);
    //         return ds;
    //     }).catch((error) => {
    //         return null;
    //     });
    // }

    public async downloadByResourceId(resourceId: string, fileName?: string) {
        if (resourceId == "")
            return;

        let url = `${baseUrl}/Extended/FileResource/Limited/${resourceId}`

        console.log(url);
        const link = document.createElement('a')
        link.href = url;
        link.download = `${fileName}`;
        link.click()
        URL.revokeObjectURL(link.href)

    }
    public async openByResourceId(resourceId: string, fileName?: string) {
        if (resourceId == "")
            return;

        let url = `${baseUrl}/Extended/FileResource/Limited/${resourceId}`

        console.log(url);
        const link = document.createElement('a');


        link.href = url;
        link.download = `${fileName}`;

        //URL.revokeObjectURL(link.href)
        window.open(link.href)
    }
    public getImage(resourceId: string) {
        if (resourceId == "")
            return "";

        let url = `${baseUrl}/Extended/FileResource/Limited/${resourceId}`
        return url;
    }


}