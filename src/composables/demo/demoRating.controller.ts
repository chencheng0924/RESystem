import { Ref, ref } from 'vue';
import { DemoService } from '@/service/demoService';

export class DemoRatingController {
  private demoService = new DemoService();

  public dataList: Ref<any[]> = ref<any[]>([]);

  constructor() {
    this.init();
  }

  public async init() {
    this.dataList.value = await this.demoService.getServiceRatings();
  }
}
