import { Ref, ref } from 'vue'
import { mapControllerList } from './mapControll.model'
import { GMapStore } from '@/stores/map/GMapStore';
import { GMarker, Latlng, GMarkerType } from "../GoogleMap.model";
import { mapTrigger } from "@/stores/command/mapTrigger";
import { ToggleSwitchPassThroughOptions } from 'primevue/toggleswitch'
import { CommandFactory } from '@/lib/commandFactory/CommandFactory';

export class useStyle {
  public toggleSwitchOption: Ref<ToggleSwitchPassThroughOptions>
  constructor() {
    this.toggleSwitchOption = ref(this.getToggleSwitchOption())
  }

  public getToggleSwitchOption() {
    return {
      slider: ({ props }) => ({
        class: [
          { '!bg-[#01FF00]': props.modelValue == props.trueValue }
        ]
      }),
    }
  }

}
export class useMapControll {
  private locale?: any;
  private $t?: any;
  private $route?: any;
  private googleMapStore: any
  private mapStore: any
  private cmd

  public dataList?: Ref<mapControllerList[]>
  constructor(t, locale, route) {
    this.locale = locale;
    this.$t = t;
    this.$route = route;
    this.dataList = ref([])
    this.googleMapStore = GMapStore()
    this.mapStore = mapTrigger()
    this.cmd = new CommandFactory()

    this.init()
  }

  public init() {
    console.log('this.mapControllerList', this.googleMapStore.mapControllerList)
    if (this.googleMapStore.mapControllerList.length === 0) {
      this.dataList.value = [
        new mapControllerList({ title: '緊急救護', checked: true, type: 'accident' }),
        new mapControllerList({ title: '道路施工', checked: true, type: 'roadWork' }),
        new mapControllerList({ title: '道路淹水', checked: true, type: 'flood' }),
        new mapControllerList({ title: '營運站名', checked: true, type: 'station' }),
      ]
      this.googleMapStore.mapControllerList = this.dataList.value
    } else {
      this.dataList.value = this.googleMapStore.mapControllerList
    }
    this.mapStore.watchForRouteIdStatus.forEach(item => {
      const check = this.dataList.value.findIndex(itm => itm.routeid == item.routeid && itm.dirction == item.dirction)
      if (check == -1) {
        this.dataList.value.push(new mapControllerList({ title: `${item.routeName}(${item.dirction == 1 ? '返程' : '去程'})`, checked: item.isDraw, type: 'busLine', routeid: item.routeid, dirction: item.dirction }))
      } else {
        const idx = this.dataList.value.findIndex(itm => itm.routeid == item.routeid)
        this.dataList.value[idx].checked = item.isDraw
      }
    })
    this.checkHasSubRoute()
  }

  public checkHasSubRoute() {
    this.dataList.value.forEach(item => {
      // console.log('this.mapStore.watchForRouteIdStatus', this.mapStore.watchForRouteIdStatus)
      const check = this.mapStore.watchForRouteIdStatus.findIndex(x => item.routeid == x.routeid && item.dirction == x.dirction)
      if (check !== -1) {
        item.hasSubRoute = this.mapStore.watchForRouteIdStatus[check].hasSubRoute
      }
    })
    // console.log('this.dataList.value', this.dataList.value)
  }

  public handleItem(item: mapControllerList) {
    // console.log('item', item)
    if (item.type == 'busLine') {
      this.resetMap()
      const idx = this.mapStore.watchForRouteIdStatus.findIndex(itm => itm.routeid == item.routeid && itm.dirction == item.dirction)
      this.mapStore.watchForRouteIdStatus[idx].isDraw = item.checked
      this.mapStore.watchForRouteIdStatus[idx].isChecked = item.checked
      this.mapStore.watchForRouteIdStatus[idx].ischeckedSub = item.subchecked
      this.mapStore.watchForRouteIdStatus.forEach((x, dx) => {
        // console.log('x',x)
        if (x.isDraw) {
          if ((item.subchecked && item.hasSubRoute && idx == dx) || (x.isChecked && x.ischeckedSub)) {
            this.cmd.run(`Map showRoute routeId="${x.routeid}" openSubRoute="${x.ischeckedSub}" dirction=${x.dirction}`, this.mapStore.watchForRouteIdStatus[idx].sessionid, false)
          } else if (!x.isChecked && x.ischeckedSub) {
            this.cmd.run(`Map showRoute routeId="${x.routeid}" openSubRoute="${x.ischeckedSub}" openOldRoute=${x.isDraw} dirction=${x.dirction}`, this.mapStore.watchForRouteIdStatus[idx].sessionid, false)
          } else {
            this.cmd.run(`Map showRoute routeId="${x.routeid}" dirction=${x.dirction}`, this.mapStore.watchForRouteIdStatus[idx].sessionid, false)
          }
        } else if (x.ischeckedSub && !x.isChecked) {
          this.cmd.run(`Map showRoute routeId="${x.routeid}" openSubRoute="${item.subchecked}" openOldRoute=${!x.isDraw} dirction=${x.dirction}`, this.mapStore.watchForRouteIdStatus[idx].sessionid, false)
        }
      })
    } else {
      const list = this.googleMapStore.getGMarkerDatas()
      const newList = list.filter(itm => itm.layer == item.type)
      newList.forEach(x => {
        x.contentMarker.style.display = item.checked ? 'block' : 'none'
      })
    }
    this.googleMapStore.mapControllerList = this.dataList.value
  }

  public resetMap() {
    let oldoverlayList = this.googleMapStore.oldfirstpoint
    console.log('oldoverlayList', oldoverlayList)
    if (oldoverlayList && oldoverlayList.length > 0) {
      oldoverlayList.forEach(overlay => {
        overlay.setMap(null)
      })
      this.googleMapStore.oldfirstpoint = []
    }
    this.googleMapStore.oldfirstpoint = []
  }
}