import { Ref, ref } from 'vue';
import { RESystemStore } from '@/stores/RESystemStore/RESystemStore';

export class DemoService {
  private resSystemStore = RESystemStore();
  private demoApiUrl = (import.meta.env.VITE_DEMO_API_URL || '').replace(/\/$/, '');

  constructor() {
    this.init()
  }

  private async init() {
    console.log('DemoService init')
  }

  private getApiUrl(path: string) {
    return `${this.demoApiUrl}${path}`;
  }

  public async getDemoData() {
    // rtStatusTypeId=1&
    const url = this.getApiUrl(`/api/dw/repairTicket?page=1&pageSize=10`);
    return await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.resSystemStore.getToken()}`,
      },
    }).then(response => response.json()).then(data => {
      console.log('data', data)
      if(data.message == "success"){
        return data.response.rows;
      }
      return [];
    })
  }

  public async addRepairTicket(data: any) {
    const url = this.getApiUrl('/api/dw/repairTicket');
    return await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.resSystemStore.getToken()}`,
      },
      body: JSON.stringify(data),
    }).then(response => response.json()).then(data => {
      console.log('data', data)
      if(data.message == "success"){
        return data.response;
      }
      return null;
    })
  }

  public async editRepairTicket(data: any) {
    const url = this.getApiUrl(`/api/dw/repairTicket/${data.rtId}`);
    return await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.resSystemStore.getToken()}`,
      },
      body: JSON.stringify(data),
    }).then(response => response.json()).then(data => {
      console.log('data', data)
      if(data.message == "success"){
        return data.response;
      }
      return null;
    })
  }

  /** GET /api/dw/workOrder — 取得所有派工單 */
  public async getWorkOrders() {
    const url = this.getApiUrl('/api/dw/workOrder');
    return await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.resSystemStore.getToken()}`,
      },
    }).then(response => response.json()).then(data => {
      if (data.message == 'success' && data.response?.rows) {
        return data.response.rows;
      }
      if (data.message == 'success' && Array.isArray(data.response)) {
        return data.response;
      }
      return [];
    });
  }

  /** POST /api/dw/workOrder — 建立派工單 */
  public async addWorkOrder(body: {
    woRtId: number;
    woStaffLine: string;
    woStaffPhone: string;
    woStaffName: string;
    woStatusTypeId: number;
    woScheduledAt: string;
    woRepairContent: string;
    woImages: string;
  }) {
    const url = this.getApiUrl('/api/dw/workOrder');
    return await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.resSystemStore.getToken()}`,
      },
      body: JSON.stringify(body),
    }).then(response => response.json()).then(data => {
      if (data.message == 'success') {
        return data.response;
      }
      return null;
    });
  }

  /** PUT /api/dw/workOrder/:id — 修改派工單 */
  public async updateWorkOrder(
    woId: string | number,
    body: {
      woStatusTypeId: number;
      woStaffPhone: string;
      woStaffName: string;
      woRepairContent: string;
      woImages: string;
      woScheduledAt: string;
    },
  ) {
    const url = this.getApiUrl(`/api/dw/workOrder/${woId}`);
    return await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.resSystemStore.getToken()}`,
      },
      body: JSON.stringify(body),
    }).then(response => response.json()).then(data => {
      if (data.message == 'success') {
        return data.response;
      }
      return null;
    });
  }

  /** GET /api/dw/serviceRating — 取得所有評價 */
  public async getServiceRatings() {
    const url = this.getApiUrl('/api/dw/serviceRating');
    return await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.resSystemStore.getToken()}`,
      },
    }).then(response => response.json()).then(data => {
      if (data.message == 'success' && data.response?.rows) {
        return data.response.rows;
      }
      if (data.message == 'success' && Array.isArray(data.response)) {
        return data.response;
      }
      return [];
    });
  }

  /** POST /api/dw/lineStaffToken — 產生維修人員綁定碼 */
  public async generateLineStaffToken() {
    const url = this.getApiUrl('/api/dw/lineStaffToken');
    return await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.resSystemStore.getToken()}`,
      },
    }).then(response => response.json()).then(data => {
      if(data.status){
        return data.response.token
      }
      return data;
    });
  }

  /** GET /api/dw/repairStaff — 取得所有維修人員 */
  public async getRepairStaffs() {
    const url = this.getApiUrl('/api/dw/repairStaff');
    return await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.resSystemStore.getToken()}`,
      },
    }).then(response => response.json()).then(data => {
      if (data.message == 'success' && data.response?.rows) {
        return data.response.rows;
      }
      if (data.message == 'success' && Array.isArray(data.response)) {
        return data.response;
      }
      return [];
    });
  }

  public async addClientRepairRequest(data: any) {
    const url = this.getApiUrl('/api/dww/repairTicket/liff');
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    let responseData: any = null;
    try {
      responseData = await response.json();
    } catch {
      responseData = null;
    }
    return {
      status: response.status,
      ok: response.ok,
      data: responseData,
    };
  }

  public async addClientEvaluation(data: {
    idToken: string;
    srRtId: string;
    srOverallScore: number;
    srAttitudeScore: number;
    srQualityScore: number;
    srTimelinessScore: number;
    srComment: string;
    srSignedName: string;
    srSignatureUrl: string;
  }) {
    const url = `/api/dww/serviceRating/liff`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    let responseData: any = null;
    try {
      responseData = await response.json();
    } catch {
      responseData = null;
    }
    return {
      status: response.status,
      ok: response.ok,
      data: responseData,
    };
  }
}