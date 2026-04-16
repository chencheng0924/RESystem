import { Ref, ref } from 'vue';
import { DemoService } from '@/service/demoService'
export class DemoHomeController {
  private demoService = new DemoService()

  public dataList: Ref<any[]> = ref<any[]>([]);

  public isAddRepairTicketDialogVisible: Ref<boolean> = ref(false);
  public addRepairTicketDialogHeader: Ref<string> = ref('新增案件');
  public addRepairTicketDialogFooter: Ref<string> = ref('新增');

  public addRepairTicketDialogFormList: Ref<any[]> = ref<any[]>([
    {
      label: '社區',
      field: 'rtCommunityName',
      type: 'input',
    },
    {
      label: '單位',
      field: 'rtUnit',
      type: 'input',
    },
    {
      label: '地址',
      field: 'rtAddress',
      type: 'input',
    },
    {
      label: '居民名稱',
      field: 'rtResidentName',
      type: 'input',
    },
    {
      label: '聯絡人',
      field: 'rtContactName',
      type: 'input',
    },
    {
      label: '主旨',
      field: 'rtTitle',
      type: 'input',
    },
    {
      label: '描述',
      field: 'rtDescription',
      type: 'input',
    },
  ]);
  public addRepairTicketDialogForm: Ref<any> = ref({
    rtId: '',
    rtCode: '',
    rtCommunityName: '',
    rtUnit: '',
    rtAddress: '',
    rtResidentName: '',
    rtTitle: '',
    rtDescription: '',
    ticketStatus: {},
  });
  constructor() {
    this.init()
  }

  public async init() {
    this.dataList.value = await this.demoService.getDemoData();
  }

  public async addRepairTicket() {
    this.addRepairTicketDialogHeader.value = '新增案件';
    this.addRepairTicketDialogFooter.value = '新增';
    this.addRepairTicketDialogForm.value = {
      rtId: '',
      rtCode: '',
      rtCommunityName: '',
      rtUnit: '',
      rtAddress: '',
      rtResidentName: '',
      rtTitle: '',
      rtDescription: '',
      ticketStatus: {}
    };
    this.isAddRepairTicketDialogVisible.value = true;
  }

  public async submitRepairTicket() {
    if(this.addRepairTicketDialogFooter.value == '新增'){
    const data = await this.demoService.addRepairTicket(this.addRepairTicketDialogForm.value);
      if(data){
        this.isAddRepairTicketDialogVisible.value = false;
        this.dataList.value = await this.demoService.getDemoData();
      }
    } else if(this.addRepairTicketDialogFooter.value == '編輯'){
      console.log('this.addRepairTicketDialogForm.value', this.addRepairTicketDialogForm.value)
      const data = await this.demoService.editRepairTicket(this.addRepairTicketDialogForm.value);
      if(data){
        this.isAddRepairTicketDialogVisible.value = false;
        this.dataList.value = await this.demoService.getDemoData();
      }
    }
  }

  public async editRepairTicket(data: any) {
    this.isAddRepairTicketDialogVisible.value = true;
    this.addRepairTicketDialogHeader.value = '編輯案件';
    this.addRepairTicketDialogFooter.value = '編輯';
    this.addRepairTicketDialogForm.value = {
      rtId: data.rtId,
      rtCode: data.rtCode,
      rtCommunityName: data.rtCommunityName,
      rtUnit: data.rtUnit,
      rtAddress: data.rtAddress,
      rtResidentName: data.rtResidentName,
      rtContactName: data.rtContactName,
      rtTitle: data.rtTitle,
      rtDescription: data.rtDescription,
      ticketStatus: data.ticketStatus,
    };
    console.log('data', data)
  }
}