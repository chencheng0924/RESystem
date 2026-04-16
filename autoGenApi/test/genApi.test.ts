import { describe, it, expect, jest, beforeAll, test } from "@jest/globals";


beforeAll(() => {
    process.env.VITE_ENV = "apiTest";
});
test("應該要抓到 apiTest", () => {
    expect(process.env.VITE_ENV).toBe("apiTest");
});




import { ApiFactory } from "./apiFactory"; // 注意：這裡不是抓global的
import { readFile } from "fs/promises";
import path from "path";
class TestApiService {
    public api = new ApiFactory()
    private async handleApiResponse(promiseFunc: Promise<any>) {
        try {
            const res = await promiseFunc
            console.log('RESPONSE', res.data)
            return 'YES'
        } catch (error) {
            console.log('ERROR', error)
            return 'NO'
        }
    }
    private async createFile(filePath: string, fileName: string, fileType: string) {
        const fullPath = path.resolve(__dirname, filePath);
        const buffer = await readFile(fullPath); 
        return new File([buffer], fileName+'.'+fileType, { type: `image/${fileType}` });
    }
    mth_get = () => {
        /* 情境： 基礎getById =>  /rtraffic/Basic/BusRouteImage/{id} */
        return this.handleApiResponse(
            this.api.rtraffic.BusRouteImage.Basic.getByid({
                id: '30640195379712000',
                langCode: 'en',
            })
        )
    }
    mth_post = () => {
        return this.handleApiResponse(
            this.api.bstopsuper.Account.post({
                XApiVersion:'2',
                VMAccount: {
                    account: "123@123.com" ,
                    name: '123',
                    roleId: '8',
                    operatorRoleId: ["10250"]
                }
            })
        )
    }
    mth_patch_id = () => {
        return this.handleApiResponse(
            this.api.bstopsuper.Account.patchByid({
                id: '30714514363707392',
                VMUpdateAccount: {
                    name:'py88',
                    operatorRoleId: ["10270"],
                    roleId: '8',
                }
            })
        );
    }
    data_generate_1 = () => {
        /* 情境： 生成時的refs多層級架構  */
        return this.handleApiResponse(
            this.api.bsuper.Activity.Entity.get({
                PageIndex: 2
            })
        )
    }
    para_odata = () => {
        return this.handleApiResponse(
            this.api.rtraffic.BusRoute.OData.getBusRouteDetail({
                select: "busRouteNameEn",
                orderby: "busRouteNameEn desc",
                top: 10,
                skip: 0, 
                count: false
            })
        )
    }
    version_change = () => {
        return this.handleApiResponse(
            this.api.rtraffic.BusStop.Basic.get({
                XApiVersion: '1',
                BusRouteDirectionIds: ['29678095334871044'],
                PageIndex: 1,
                PageRows: 500,
                OrderBy: ['serialNoDecimal asc']
            })
        )
    }
   
    data_formdata_post = () => {
        return this.handleApiResponse(
            this.api.bstopsuper.Basic.BusStopMaintenanceCase.postBusStopMaintenanceCase({
                VMBusStopMaintenanceCase: {
                    busRouteEntity:{"key":"6"},
                    busRouteDirectionEntity:{"key":"29678095282573314"},
                    busStopEntity:{"key":"100006112902"},
                    busStopMaintenanceCaseTypeEntity:{"key":"0","value":"新設站牌"}
                }
            })
        );
    }
    data_upload_post = async () => {
        const testFile = await this.createFile('../test/test.png', 'test', 'png');
        return this.handleApiResponse(
            this.api.rstorage.FileResource.Extended.postLimited({
                "file": testFile
            })
        );
    }
    data_Array_Post = () => {
        return this.handleApiResponse(
            this.api.rbusmanagement.EBMBusStation.Custom.postByidCreateBusBasics({
                'VMKeyValue':[{
                    key: '31143324165560320',
                }],
                'id': '31099107648659456'
            })
        );
    } 
}
describe('API Tests', () => {
    const testInstance = new TestApiService();
    const logMessage = async (apiMethod: () => Promise<string>) =>{
        const result = await apiMethod();
        console.log(result); 
    }

    const testCases = [
        {name: 'mth_get', method: testInstance.mth_get},
        {name: 'mth_post', method: testInstance.mth_post},
        {name: 'mth_patch_id', method: testInstance.mth_patch_id},
        {name: 'version_change', method: testInstance.version_change},
        {name: 'data_generate_1', method: testInstance.data_generate_1},
        {name: 'data_formdata_post', method: testInstance.data_formdata_post},
        {name: 'data_upload_post', method: testInstance.data_upload_post},
        {name: 'data_Array_Post', method: testInstance.data_Array_Post},
        {name: 'para_odata', method: testInstance.para_odata}
    ]

    testCases.forEach(testCase => {
        it(`should log the correct message for ${testCase.name}`, async () => {
            const consoleSpy = jest.spyOn(console, 'log')
            const message = "YES"
            await logMessage(testCase.method)
            expect(consoleSpy).toHaveBeenCalledWith(message)
            consoleSpy.mockRestore()
        })
    })
})