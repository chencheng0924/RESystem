import { Ref, ref } from 'vue';
import { DemoService } from '@/service/demoService';

type WorkOrderForm = {
  woId: string;
  woRtId: string;
  woStaffLine: string;
  woStaffPhone: string;
  woStaffName: string;
  woStatusTypeId: string;
  woScheduledAt: string;
  woRepairContent: string;
  woImages: string;
};

export class DemoRepairController {
  private demoService = new DemoService();

  public dataList: Ref<any[]> = ref<any[]>([]);

  public isWorkOrderDialogVisible: Ref<boolean> = ref(false);
  public workOrderDialogHeader: Ref<string> = ref('新增派工');
  public workOrderDialogFooter: Ref<string> = ref('新增');

  public workOrderDialogFormList: Ref<{ label: string; field: keyof WorkOrderForm; type: string }[]> = ref<
    { label: string; field: keyof WorkOrderForm; type: string }[]
  >([]);

  public workOrderDialogForm: Ref<WorkOrderForm> = ref(this.emptyForm());

  constructor() {
    this.init();
  }

  private emptyForm(): WorkOrderForm {
    return {
      woId: '',
      woRtId: '',
      woStaffLine: '',
      woStaffPhone: '',
      woStaffName: '',
      woStatusTypeId: '1',
      woScheduledAt: '',
      woRepairContent: '',
      woImages: '',
    };
  }

  private addFormFields() {
    return [
      { label: '案件 ID', field: 'woRtId' as const, type: 'input' },
      { label: '師傅 LINE', field: 'woStaffLine' as const, type: 'input' },
      { label: '師傅姓名', field: 'woStaffName' as const, type: 'input' },
      { label: '師傅電話', field: 'woStaffPhone' as const, type: 'input' },
      { label: '狀態類型 ID', field: 'woStatusTypeId' as const, type: 'input' },
      { label: '預約時間', field: 'woScheduledAt' as const, type: 'date' },
      { label: '派工內容', field: 'woRepairContent' as const, type: 'input' },
      { label: '圖片', field: 'woImages' as const, type: 'input' },
    ];
  }

  private editFormFields() {
    return [
      { label: '狀態類型 ID', field: 'woStatusTypeId' as const, type: 'input' },
      { label: '師傅電話', field: 'woStaffPhone' as const, type: 'input' },
      { label: '師傅姓名', field: 'woStaffName' as const, type: 'input' },
      { label: '預約時間', field: 'woScheduledAt' as const, type: 'date' },
      { label: '派工內容', field: 'woRepairContent' as const, type: 'input' },
      { label: '圖片', field: 'woImages' as const, type: 'input' },
    ];
  }

  public async init() {
    this.dataList.value = await this.demoService.getWorkOrders();
  }

  public addWorkOrder() {
    this.workOrderDialogHeader.value = '新增派工';
    this.workOrderDialogFooter.value = '新增';
    this.workOrderDialogFormList.value = this.addFormFields();
    this.workOrderDialogForm.value = this.emptyForm();
    this.isWorkOrderDialogVisible.value = true;
  }

  public async submitWorkOrder() {
    const f = this.workOrderDialogForm.value;
    if (this.workOrderDialogFooter.value === '新增') {
      const data = await this.demoService.addWorkOrder({
        woRtId: Number(f.woRtId) || 0,
        woStaffLine: f.woStaffLine,
        woStaffPhone: f.woStaffPhone,
        woStaffName: f.woStaffName,
        woStatusTypeId: Number(f.woStatusTypeId) || 0,
        woScheduledAt: f.woScheduledAt,
        woRepairContent: f.woRepairContent,
        woImages: f.woImages,
      });
      if (data) {
        this.isWorkOrderDialogVisible.value = false;
        this.dataList.value = await this.demoService.getWorkOrders();
      }
    } else if (this.workOrderDialogFooter.value === '編輯') {
      const data = await this.demoService.updateWorkOrder(f.woId, {
        woStatusTypeId: Number(f.woStatusTypeId) || 0,
        woStaffPhone: f.woStaffPhone,
        woStaffName: f.woStaffName,
        woRepairContent: f.woRepairContent,
        woImages: f.woImages,
        woScheduledAt: f.woScheduledAt,
      });
      if (data) {
        this.isWorkOrderDialogVisible.value = false;
        this.dataList.value = await this.demoService.getWorkOrders();
      }
    }
  }

  public editWorkOrder(row: any) {
    this.workOrderDialogHeader.value = '編輯派工';
    this.workOrderDialogFooter.value = '編輯';
    this.workOrderDialogFormList.value = this.editFormFields();
    this.workOrderDialogForm.value = {
      woId: String(row.woId ?? row.id ?? ''),
      woRtId: String(row.woRtId ?? ''),
      woStaffLine: String(row.woStaffLine ?? ''),
      woStaffPhone: String(row.woStaffPhone ?? ''),
      woStaffName: String(row.woStaffName ?? ''),
      woStatusTypeId: String(row.woStatusTypeId ?? '1'),
      woScheduledAt: String(row.woScheduledAt ?? ''),
      woRepairContent: String(row.woRepairContent ?? ''),
      woImages: String(row.woImages ?? ''),
    };
    this.isWorkOrderDialogVisible.value = true;
  }
}
