import { Ref, ref } from 'vue';
import { DemoService } from '@/service/demoService';

export class DemoRepairStaffController {
  private demoService = new DemoService();

  public tokenText: Ref<string> = ref('');
  public isGenerating: Ref<boolean> = ref(false);
  public dataList: Ref<Record<string, unknown>[]> = ref([]);
  public tableColumns: Ref<string[]> = ref([]);

  constructor() {
    this.init();
  }

  public async init() {
    const rows = await this.demoService.getRepairStaffs();
    this.dataList.value = Array.isArray(rows) ? rows : [];
    this.tableColumns.value = this.dataList.value.length > 0 ? Object.keys(this.dataList.value[0]) : [];
  }

  public async generateBindingCode() {
    if (this.isGenerating.value) return;
    this.isGenerating.value = true;
    try {
      const result = await this.demoService.generateLineStaffToken();
      this.tokenText.value = JSON.stringify(result);
    } catch (error) {
      this.tokenText.value = '';
    } finally {
      this.isGenerating.value = false;
    }
  }
}
