<template>
  <div class="h-full w-full p-2 overflow-auto bg-blue-100">
    <span class="font-bold mb-3 text-xs">Ястан</span>
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
function generateRandomData(workSectors) {
  const data = [];

  for (let i = 0; i < workSectors.length; i++) {
    let baseValue = 50000; // Minimum base value for all sectors
    if (workSectors[i] === "Халх" || workSectors[i] === "Захчин") {
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
  "Халх",
  "Казах",
  "Дөрвөд",
  "Буриад",
  "Баяд",
  "Дарьганга",
  "Урианхай",
  "Захчин",
  "Дархад",
  "Торгууд",
  "Өөлд",
  "Хотон",
  "Мянгад",
  "Барга",
  "Үзэмчин",
  "Харчин",
  "Хотогойд",
  "Элжигэн",
  "Цаатан",
  "Сартуул",
  "Тува",
  "Хорчин",
  "Узбек (Чантуу)",
  "Халимаг",
  "Түмэд",
  "Сөнөд",
  "Хамниган",
  "Хошууд",
  "Түвэд",
  "Монголын харьяат бусад",
  "Монголын харьяат гадаад",
  "Гадаад"
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

</script>

<style scoped>

</style>
