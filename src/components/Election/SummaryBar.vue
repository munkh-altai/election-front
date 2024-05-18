<template>
<div class="bg-white  border-b-2 border-t-2  summary-bar grid grid-cols-4" style="height: 60px">

  <div class="flex justify-center ">
   <div class="relative ">
     <RadialChart color="#ff4a43"></RadialChart>
   </div>
    <div class="flex flex-col justify-center flex-grow " style="line-height: 20px">
     <span class="text-red-500 font-bold" style="line-height: 20px">МАН</span>
     <span class="text-red-500" style="line-height: 20px">3,747</span>
    </div>
  </div>

  <div class="flex justify-center ">
    <div class="relative ">
      <RadialChart color="#1a6aff"></RadialChart>
    </div>
    <div class="flex flex-col justify-center flex-grow" style="line-height: 20px">
      <span class="text-blue-600 font-bold" style="line-height: 20px">АН</span>
      <span class="text-blue-600" style="line-height: 20px">3,747</span>
    </div>
  </div>
  <div class="flex justify-center ">
    <div class="relative ">
      <RadialChart color="#5e1cae"></RadialChart>
    </div>
    <div class="flex flex-col justify-center flex-grow" style="line-height: 20px">
      <span class="text-purple-800 font-bold" style="line-height: 20px">Бусад</span>
      <span class="text-purple-800" style="line-height: 20px">3,747</span>
    </div>
  </div>
  <div class="flex justify-center ">
    <div class="relative ">
      <RadialChart color="#605e61"></RadialChart>
    </div>
    <div class="flex flex-col justify-center flex-grow" style="line-height: 20px">
      <span class="text-gray-600 font-bold" style="line-height: 20px">Саарал</span>
      <span class="text-gray-600" style="line-height: 20px">3,747</span>
    </div>
  </div>

</div>
</template>
<script setup >
import {defineProps} from "vue"

const props = defineProps({
  selectionType: String,
  selectionFeature: Object,
});
import RadialChart from "~/components/Election/RadialChart.vue";
</script>
