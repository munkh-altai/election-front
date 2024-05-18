<template>
  <div>
    <TopMenu/>
    <div class=" grid grid-cols-12 gap-2">
      <div  class="col-span-12 lg:col-span-8 dashboard-page">
        <div class="grid-cols-1 h-full w-full left-part relative">

          <Map
          @objectSelected="objectSelected"

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
            <BottomBar :selectionType="selectionType" :selectionFeature="selectionFeature"></BottomBar>
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
          <SideBar :onlyOronNutag="onlyOronNutag || selectionType !== 'country'"></SideBar>
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
import TopMenu from "~/components/Election/TopMenu.vue"

import SummaryBar from "~/components/Election/SummaryBar"
import SideBar from "~/components/Election/SideBar.vue"
import BottomBar from "~/components/Election/BottomBar.vue"
import MapUB from "~/components/Election/MapUB.vue"
import Map from "~/components/Election/Map.vue"
import MapUBKhoroo from "~/components/Election/MapUBKhoroo.vue";

function objectSelected(sType, feature){
  console.log(sType)
  console.log(feature)
  selectionType.value = sType
  selectionFeature.value = feature
}
</script>
