import { SampleEntity } from "@/model/Sample.model";
import { BaseService } from "./BaseService";
import { PageFormItem } from "@/lib/pageBuilder/core/PageFormItem";
import { PageTreeItem } from "@/lib/pageBuilder/core/PageTreeItem";


export class SampleService extends BaseService {
    constructor() {
        super();
    }

    getSCMSupplierMasterDatas() {
        const myPromise: Promise<any> = new Promise((resolve, reject) => {

            let datas: Array<SampleEntity> = [
                new SampleEntity({ ID: "01", Name: "財團法人愛盲基金會", SupplierCode: "A00001", Principal: "王小明", Numbers: "123456789", Address: "台北市三民路1段" }),
                new SampleEntity({ ID: "02", Name: "財團法人伊甸社會福利中心", SupplierCode: "A00002", Principal: "王大明", Numbers: "125364332332", Address: "台北市三民路1段" }),
                new SampleEntity({ ID: "03", Name: "黃絲帶愛網關懷協會", SupplierCode: "A00003", Principal: "王三", Numbers: "866663635212", Address: "台北市三民路段" }),
                new SampleEntity({ ID: "04", Name: "喜憨兒社會福利基金會", SupplierCode: "A00004", Principal: "王四", Numbers: "634554587", Address: "台北市三民路4段" }),
                new SampleEntity({ ID: "05", Name: "財團法人心路社會福利中心", SupplierCode: "A00005", Principal: "張三", Numbers: "212312423534", Address: "台北市三民路5段" }),
                new SampleEntity({ ID: "06", Name: "社團法人台灣之心愛護動物協會", SupplierCode: "A00006", Principal: "李嗣", Numbers: "4665873414", Address: "台北市三民路6段" }),


            ]
            resolve(datas);
        });

        return myPromise.then((res) => {
            return res
        })
            .catch((res) => {
                return null
            });
    }


    createSCMSupplierMaster(items: Array<PageFormItem>) {
        const myPromise: Promise<any> = new Promise((resolve, reject) => {
            let add = new SampleEntity({ ID: "99", Name: "新增-財團法人愛盲基金會", SupplierCode: "A00099", Principal: "張大千", Numbers: "45345", Address: "AA台北市三民路1段" });
            resolve(add);

        })
        return myPromise.then((res) => {
            return res
        })
            .catch((res) => {
                return null
            });
    }

    deleteSCMSupplierMaster(pkids: Array<string>) {
        const myPromise: Promise<any> = new Promise((resolve, reject) => {

            resolve({});

        })
        return myPromise.then((res) => {
            return res
        })
            .catch((res) => {
                return null
            });
    }
    EditSCMSupplierMaster(items: Array<PageFormItem>) {
        const myPromise: Promise<any> = new Promise((resolve, reject) => {

            resolve({});

        })
        return myPromise.then((res) => {
            return res
        })
            .catch((res) => {
                return null
            });
    }


    getFolders() {
        let datas: Array<PageTreeItem> = [
            new PageTreeItem(
                {
                    Pkid: "1",
                    Label: "登記證明文件",
                    Children: [
                        {
                            Pkid: "1.1",
                            Label: "營利事業",
                            Children: [
                                {
                                    Pkid: "1.1.1",
                                    Label: "稅籍登記",
                                },
                                {
                                    Pkid: "1.1.2",
                                    Label: "商業/公司登記證",
                                }, {
                                    Pkid: "1.1.3",
                                    Label: "工廠登記證",
                                },
                                {
                                    Pkid: "1.1.4",
                                    Label: "其他",
                                }
                            ]

                        }
                    ]

                }

            )
        ];


        return datas;

    }


    getSCMSupplierApprovalData() {
        const myPromise: Promise<any> = new Promise((resolve, reject) => {

            let datas: Array<any> = [
                {
                    Name: "財團法人愛盲基金會",
                    approvalFile: "V",
                    Number: "V",
                    LiabilityInsurance: "V",
                    Report: "-",
                    PermissionNotice: "V",
                    System: "V",
                    Result: "A"
                },
                {
                    Name: "社團法人台灣之心愛護動物協會",
                    approvalFile: "V",
                    Number: "V",
                    LiabilityInsurance: "-",
                    Report: "-",
                    PermissionNotice: "V",
                    System: "-",
                    Result: "A"
                },
                {
                    Name: "喜憨兒社會福利基金會",
                    approvalFile: "V",
                    Number: "V",
                    LiabilityInsurance: "V",
                    Report: "v",
                    PermissionNotice: "V",
                    System: "V",
                    Result: "B"
                }

            ]
            resolve(datas);
        });

        return myPromise.then((res) => {
            return res
        })
            .catch((res) => {
                return null
            });
    }


}