<template>
  <div class="h-full w-full p-2 overflow-auto bg-blue-100">
    <span class="font-bold mb-3 text-xs">Малчин болон мал бүхий иргэн</span>
    <div>
      <!-- Loop through data to generate bars -->
      <div v-for="(item, index) in sortedData" :key="index">
        <div class="grid grid-cols-3 items-center text-xs mb-2">
          <div class="col-span-2 text-left capitalize">{{ item.sector }} - {{ $number(item.cnt_base_red) }}</div>
          <div class="text-right">{{ calculatePercentage(item.cnt_base_red) }}%</div>
        </div>
        <div class="relative">
          <div class="w-full rounded-[999px] overflow-hidden bg-slate-100 h-2">
            <div class="bg-red-600 h-full"
                 :style="`width: ${calculateWidth(item.cnt_base_red)}%; transition: width 1s linear 0s;`"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>

// Dummy data generation and sorting logic
import {defineProps, onMounted, ref, watchEffect} from "vue";

function generateRandomData(workSectors) {
  const data = [];

  for (let i = 0; i < workSectors.length; i++) {
    let baseValue = 50000; // Minimum base value for all sectors
    if (workSectors[i] === "401 - 500" || workSectors[i] === "501 - 600") {
      baseValue = 400000; // Higher base value for key sectors
    }

    const cnt_base_red = Math.floor(Math.random() * 100000) + baseValue;
    const cnt_base_blue = Math.floor(Math.random() * (cnt_base_red - 50000)) + 10000;  // Random number between 10,000 and cnt_base_red - 10,000
    const cnt_base_busad = Math.floor(Math.random() * (cnt_base_blue - 20000)) + 10000;  // Random number between 10,000 and cnt_base_blue - 10,000
    const cnt_base_saaral = Math.floor(Math.random() * (cnt_base_busad - 15000)) + 5000;  // Random number between 5,000 and cnt_base_busad - 5,000

    const manMembers = Math.floor(Math.random() * 80000);  // Random number between 0 and 80,000
    const cnt_sc_red = Math.floor(Math.random() * 30000);  // Random number between 0 and 30,000
    const cnt_sc_blue = Math.floor(Math.random() * 10000);  // Random number between 0 and 10,000
    const cnt_sc_busad = Math.floor(Math.random() * 15000);  // Random number between 0 and 15,000

    data.push({
      id: i + 1,
      sector: workSectors[i],
      cnt_base_red,
      cnt_base_blue,
      cnt_base_busad,
      cnt_base_saaral,
      manMembers,
      cnt_sc_red,
      cnt_sc_blue,
      cnt_sc_busad
    });

  }
  return data;
}

function generateRandomDataOther(workSectors) {
  const data = [];

  for (let i = 0; i < workSectors.length; i++) {
    let baseValue = 5000; // Minimum base value for all sectors
    if (workSectors[i] === "401 - 500" || workSectors[i] === "501 - 600") {
      baseValue = 40000; // Higher base value for key sectors
    }

    const cnt_base_red = Math.floor(Math.random() * 10000) + baseValue;
    const cnt_base_blue = Math.floor(Math.random() * (cnt_base_red - 5000)) + 1000;  // Random number between 10,000 and cnt_base_red - 10,000
    const cnt_base_busad = Math.floor(Math.random() * (cnt_base_blue - 20000)) + 1000;  // Random number between 10,000 and cnt_base_blue - 10,000
    const cnt_base_saaral = Math.floor(Math.random() * (cnt_base_busad - 15000)) + 500;  // Random number between 5,000 and cnt_base_busad - 5,000

    const manMembers = Math.floor(Math.random() * 8000);  // Random number between 0 and 80,000
    const cnt_sc_red = Math.floor(Math.random() * 3000);  // Random number between 0 and 30,000
    const cnt_sc_blue = Math.floor(Math.random() * 1000);  // Random number between 0 and 10,000
    const cnt_sc_busad = Math.floor(Math.random() * 1500);  // Random number between 0 and 15,000

    data.push({
      id: i + 1,
      sector: workSectors[i],
      cnt_base_red,
      cnt_base_blue,
      cnt_base_busad,
      cnt_base_saaral,
      manMembers,
      cnt_sc_red,
      cnt_sc_blue,
      cnt_sc_busad
    });

  }
  return data;
}

const props = defineProps({
  selectionType: String,
  selectionFeature: Object,
  selectionFeatures: Array,
});

const workSectors = [
  "100 хүртэл малтай",
  "100 - 200 малтай",
  "201 - 300 малтай",
  "301 - 400 малтай",
 "401 - 500 малтай",
  "501 - 600 малтай",
  "601 - 700 малтай",
  "701 - 800 малтай",
  "801 - 900 малтай",
  "901 - 999 малтай",
  "1000 дээш малтай",
];




const calculateWidth = (value) => {
  return (value / total.value * 100).toFixed(2);
};

const calculatePercentage = (value) => {
  return ((value / total.value) * 100).toFixed(2);
};

const generatedData = ref([]);
const sortedData = ref([]);

const total = computed(() => {
  return sortedData.value.reduce((sum, item) => sum + item.cnt_base_red, 0);
});

function init(){
  if(props.selectionType === 'country'){
    generatedData.value = generateRandomData(workSectors);
  } else {
    generatedData.value = generateRandomDataOther(workSectors);
  }


  sortedData.value = [...generatedData.value].sort((a, b) => b.cnt_base_red - a.cnt_base_red);

}

watchEffect(() => {
  init();
});

onMounted(()=>{
  init()
})
</script>

<style scoped>

</style>
