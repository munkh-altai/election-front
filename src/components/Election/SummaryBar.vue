<template>
  <div class="bg-white border-b-2 border-t-2 summary-bar grid grid-cols-4" style="height: 60px">
    <div class="flex justify-center">
      <div class="relative">
        <RadialChart :percent="percentages.cnt_base_red" color="#ff4a43"></RadialChart>
      </div>
      <div class="flex flex-col justify-center flex-grow" style="line-height: 20px">
        <span class="text-red-500 font-bold" style="line-height: 20px">МАН</span>
        <span class="text-red-500" style="line-height: 20px">{{$number(data.cnt_base_red)}}</span>
      </div>
    </div>
    <div class="flex justify-center">
      <div class="relative">
        <RadialChart :percent="percentages.cnt_base_blue" color="#1a6aff"></RadialChart>
      </div>
      <div class="flex flex-col justify-center flex-grow" style="line-height: 20px">
        <span class="text-blue-600 font-bold" style="line-height: 20px">АН</span>
        <span class="text-blue-600" style="line-height: 20px">{{$number(data.cnt_base_blue)}}</span>
      </div>
    </div>
    <div class="flex justify-center">
      <div class="relative">
        <RadialChart :percent="percentages.cnt_base_busad" color="#5e1cae"></RadialChart>
      </div>
      <div class="flex flex-col justify-center flex-grow" style="line-height: 20px">
        <span class="text-purple-800 font-bold" style="line-height: 20px">Бусад</span>
        <span class="text-purple-800" style="line-height: 20px">{{$number(data.cnt_base_busad)}}</span>
      </div>
    </div>
    <div class="flex justify-center">
      <div class="relative">
        <RadialChart :percent="percentages.cnt_base_saaral" color="#605e61"></RadialChart>
      </div>
      <div class="flex flex-col justify-center flex-grow" style="line-height: 20px">
        <span class="text-gray-600 font-bold" style="line-height: 20px">Саарал</span>
        <span class="text-gray-600" style="line-height: 20px">{{$number(data.cnt_base_saaral)}}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import {defineProps, onMounted, ref, watch} from 'vue';


const data = ref({
  cnt_base_red: 0,
  cnt_base_blue: 0,
  cnt_base_busad: 0,
  cnt_base_saaral:0,
});
const percentages = ref({
  cnt_base_red: 0,
  cnt_base_blue: 0,
  cnt_base_busad: 0,
  cnt_base_saaral: 0,
});

const props = defineProps({
  selectionType: String,
  selectionFeature: Object,
});
import RadialChart from '~/components/Election/RadialChart.vue';

function calculatePercentages() {
  const total = data.value.cnt_base_red + data.value.cnt_base_blue + data.value.cnt_base_busad + data.value.cnt_base_saaral;
  percentages.value =  {
    cnt_base_red: ((data.value.cnt_base_red / total) * 100).toFixed(0),
    cnt_base_blue: ((data.value.cnt_base_blue / total) * 100).toFixed(0),
    cnt_base_busad: ((data.value.cnt_base_busad / total) * 100).toFixed(0),
    cnt_base_saaral: ((data.value.cnt_base_saaral / total) * 100).toFixed(0),
  }

}

function generateData() {
  const cnt_base_red = Math.floor(Math.random() * 500000) + 30;

  data.value = {
    cnt_base_red: cnt_base_red + 300000,
    cnt_base_blue: Math.floor(Math.random() * (cnt_base_red - 300000)) + 100000,
    cnt_base_busad: Math.floor(Math.random() * (cnt_base_red - 200000)) + 100000,
    cnt_base_saaral: Math.floor(Math.random() * (cnt_base_red - 170000)) + 50000,
  };

  calculatePercentages();
}
onMounted(()=>{
  generateData();
})
watch(() => props.selectionType, (newVal, oldVal) => {
  if (newVal !== oldVal) {
    generateData();
  }
});
</script>
