<template>
  <div>
    <TopMenu/>
    <div class=" grid grid-cols-12 gap-2">
      <div  class="col-span-12 lg:col-span-8 dashboard-page">
        <div class="grid-cols-1 h-full w-full left-part relative">

          <Map
          @objectSelected="objectSelected"
@only-oron-nutag-changed="onlyOronNutagChanged"
          v-if="selectionType === 'country' || selectionType === 'section' || selectionType === 'province' || selectionType === 'soum'"
          :selectionType="selectionType" :selectionFeature="selectionFeature"
          />
          <MapUBKhoroo
          @objectSelected="objectSelected"
          :selectionType="selectionType" :selectionFeature="selectionFeature"
          v-if="selectionType === 'section-ub' || selectionType === 'khoroo'"

          />

          <SummaryBar :selectionType="selectionType" :selectionFeature="selectionFeature"/>
          <div class="bottom-part overflow-hidden">
            <BottomBar :selectionType="selectionType"
                       :selectionFeature="selectionFeature"
                       :selectionFeatures="selectionFeatures"

            ></BottomBar>
          </div>
        </div>
      </div>
      <div class="col-span-12 lg:col-span-4 bg-white flex flex-col items-center">
        <div style="height: 50%; width: 100%" v-if="!onlyOronNutag && selectionType === 'country'">
          <MapUB
            @objectSelected="objectSelected"
          ></MapUB>
        </div>
        <div :style="`height: ${onlyOronNutag || selectionType !== 'country' ? 100 : 50}%; width: 100%`" class="border-t-2">
          <SideBar
            :onlyOronNutag="onlyOronNutag || selectionType !== 'country'"
            :selectionType="selectionType"
            :selectionFeatures="selectionFeatures"
            :selectionFeature="selectionFeature"
          ></SideBar>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import {defineProps, ref} from "vue";


definePageMeta({
  layout: 'form',
})
const selectionType = ref("country");
const selectionFeature = ref(null);
const selectionFeatures = ref([]);
import TopMenu from "~/components/Election/TopMenu.vue"

const onlyOronNutag = ref(false);
import SummaryBar from "~/components/Election/SummaryBar"
import SideBar from "~/components/Election/SideBar.vue"
import BottomBar from "~/components/Election/BottomBar.vue"
import MapUB from "~/components/Election/MapUB.vue"
import Map from "~/components/Election/Map.vue"
import MapUBKhoroo from "~/components/Election/MapUBKhoroo.vue";

function onlyOronNutagChanged(v){
  onlyOronNutag.value = v
}
function objectSelected(sType, feature, features){

  selectionType.value = sType
  selectionFeature.value = feature
  selectionFeatures.value = features
}
</script>
