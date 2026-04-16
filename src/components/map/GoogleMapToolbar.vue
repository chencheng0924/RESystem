<script setup lang="ts">
import { GMapStore } from '@/stores/map/GMapStore';
import { onMounted, ref, watch } from 'vue';
import { MapBusLine } from '@/components/map/GoogleMap.model'
import { commandTriggerStore } from "@/stores/command/commandTrigger";
import { CommandFactory } from '@/lib/commandFactory/CommandFactory';
const commandStore = commandTriggerStore()
const props = defineProps({
    text: {
        type: String,
    }
})


const selectedPlatenumb = ref(commandStore.selectBusItem);
const platenumbs = ref([]);
const store = GMapStore()
const mapRef = ref(store.getMapRef())
onMounted(() => {
    platenumbs.value = store.oldfirstpoint?.map((x) => {
        let plates = x.getDynamicBusLine().DynamicBusLatLngs.map(p => p.getPlatenumb());
        return { items: plates }
    }).flatMap(x => x.items)
    .map((x) => {
        return { name: x, code: x };
    })
    console.log('selectedPlatenumb', selectedPlatenumb)

})

const eventClick = () => {
    platenumbs.value = store.oldfirstpoint?.map((x) => {
        let plates = x.getDynamicBusLine().DynamicBusLatLngs.map(p => p.getPlatenumb());
        return { items: plates }
    }).flatMap(x => x.items)
        .map((x) => {
            return { name: x, code: x };
        })
}
const eventChange = (e) => {
    commandStore.selectBusItem = e.value
    let mapBusLine: MapBusLine = store.findMapBusLineByBus(selectedPlatenumb.value.name) as MapBusLine;

    let routeId = mapBusLine.OrgRouteEntity.entiy.routeid;
    let dir = mapBusLine.OrgRouteEntity.entiy.direction;
    let cmd = new CommandFactory();
    cmd.run(`Map focusPointByBus platenumb="${selectedPlatenumb.value.name}"`);
    cmd.run(`Host showDrawerByBus routeId="${routeId}" dir="${dir}" platenum=${e.value.name}`);

}

const eventClick2d=()=>{
    store.focusPoint( {
      tilt: 0,
      heading: 0,
      zoom: 14.5
    })
}
const eventClick3d=()=>{
    store.focusPoint( {
      tilt: 60,
      heading: 0,
      zoom: 14.5
    })
}

</script>

<template>
    <div >
        <Select fluid  v-model="selectedPlatenumb" :options="platenumbs" optionLabel="name" placeholder="請選擇公車"
        @change="eventChange" />
    </div>
    <div class="flex justify-start">
        <Button class="mr-2" severity="contrast" text @click="eventClick2d"  outlined >2D</Button>
        <Button class="mr-2" severity="contrast" text @click="eventClick3d"  outlined >3D</Button>
        <Button icon="pi pi-refresh" class="mr-2" severity="contrast" outlined text @click="eventClick" />
    </div>
   
   
</template>
