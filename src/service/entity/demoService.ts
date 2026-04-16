import { BaseEntityServie } from "@/lib/pageBuilder/service/BaseEntity.Service";
import { IPLSingleSearchService } from "@/lib/pageBuilder/interface/IPLSingleSearchService";
import { PageFormItem } from "@/lib/pageBuilder/core/PageFormItem";
export class demoService extends BaseEntityServie implements IPLSingleSearchService {
  getEntityDatas(conditions?: Array<PageFormItem>) {
  } 
  searchEntityDatas(conditions?: Array<PageFormItem>) {
  }
  createEntityDatas(items?: Array<PageFormItem>) {
  }
  deleteEntityDatas(pkids?: Array<string>) {
  }
  updateEntityDatas(items?: Array<PageFormItem>) {
  }
  getPKIDName() {
  }
}