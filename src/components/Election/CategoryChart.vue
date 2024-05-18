<template>
  <div class="h-full w-full p-2 overflow-auto bg-blue-100">
    <span class="font-bold mb-3 text-xs">Ажил эрхлэлт салбараар</span>
    <div>
      <!-- Loop through data to generate bars -->
      <div v-for="(item, index) in sortedData" :key="index" @click="openModal(item.sector)" class="cursor-pointer">
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
    <!-- Modal for displaying detailed data -->
    <a-modal v-model:open="isModalOpen" :title="`${selectedSector}-н салбар`" :footer="null" @ok="handleOk" @cancel="handleCancel" width="1000px">
      <SideBar/>
    </a-modal>
  </div>
</template>

<script setup>
import SideBar from "~/components/Election/SideBar.vue";
import {ref} from "vue";
const numberFormatter = new Intl.NumberFormat('en-US');
const columns = ref([
  { title: 'Бүс   ', dataIndex: 'zone', key: 'zone', minWidth: 100 },
  { title: 'МАН', dataIndex: 'cnt_base_red', key: 'cnt_base_red', customRender: ({ text }) => numberFormatter.format(text) },
  { title: 'АН', dataIndex: 'cnt_base_blue', key: 'cnt_base_blue', customRender: ({ text }) => numberFormatter.format(text) },
  { title: 'Бусад', dataIndex: 'cnt_base_busad', key: 'cnt_base_busad', customRender: ({ text }) => numberFormatter.format(text) },
  { title: 'Саарал', dataIndex: 'cnt_base_saaral', key: 'cnt_base_saaral', customRender: ({ text }) => numberFormatter.format(text) },
  { title: 'МАН гишүүд', dataIndex: 'manMembers', key: 'manMembers', customRender: ({ text }) => numberFormatter.format(text) },
  { title: 'Сошиал МАН', dataIndex: 'cnt_sc_red', key: 'cnt_sc_red', customRender: ({ text }) => numberFormatter.format(text) },
  { title: 'Сошиал АН', dataIndex: 'cnt_sc_blue', key: 'cnt_sc_blue', customRender: ({ text }) => numberFormatter.format(text) },
  { title: 'Сошиал Бусад', dataIndex: 'cnt_sc_busad', key: 'cnt_sc_busad', customRender: ({ text }) => numberFormatter.format(text) }
]);
// Dummy data generation and sorting logic
function generateRandomData(workSectors) {
  const data = [];


  for (let i = 0; i < workSectors.length; i++) {
    let baseValue = 50000; // Minimum base value for all sectors
    if (workSectors[i] === "Боловсрол" || workSectors[i] === "Үйлчилгээ") {
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

const workSectors = [
  "Боловсрол", "Эрүүл мэнд", "Үйлчилгээ", "Тээвэр, агуулах", "ОСНАА, зочид буудал, хоол",
  "Уул уурхай, олборлолт", "Мэдээлэл, холбоо", "Барилга", "Урлаг, үзвэр, тоглоом наадам",
  "Боловсруулах үйлдвэрлэл", "Төрийн удирдлага", "Бөөний, жижиглэн худалдаа", "Санхүү, даатгал",
  "Эрчим хүч, дулаан, хий, уур,", "Хөдөө аж ахуй", "ОУ-ын байгууллага", "Эвлэл, хороо, нам, шашин",
  "Ус , хог, хаягдлын менежмент", "Байгаль орчин, шинжлэх ухаан"
];

const generatedData = generateRandomData(workSectors);
const sortedData = [...generatedData].sort((a, b) => b.cnt_base_red - a.cnt_base_red);
const total = computed(() => {
  return sortedData.reduce((sum, item) => sum + item.cnt_base_red, 0);
});

const calculateWidth = (value) => {
  return (value / total.value * 100).toFixed(2);
};

const calculatePercentage = (value) => {
  return ((value / total.value) * 100).toFixed(2);
};


const isModalOpen = ref(false);
const selectedSector = ref(null);

function openModal(item) {
  selectedSector.value = item;
  isModalOpen.value = true;
}

function handleOk() {
  isModalOpen.value = false;
}

function handleCancel() {
  isModalOpen.value = false;
}

</script>

<style scoped>

</style>
