<template>
  <div class="  tab-content">

    <div class="grid grid-cols-2 gap-4 tab-content">
      <div>
        <h2 class="text-lg font-semibold text-green-700  text-center">Шилдэг 10 аймаг</h2>
        <Chart :options="topChartOptions"></Chart>
      </div>
      <div>
        <h2 class="text-lg font-semibold text-gray-700  text-center">Хамгийн муу 10 аймаг</h2>
        <Chart :options="bottomChartOptions"></Chart>
      </div>
    </div>
  </div>
</template>

<script setup>
import {ref, computed, defineProps} from 'vue';
import Highcharts from 'highcharts'
import { Chart } from 'highcharts-vue';
const props = defineProps({
  selectionType: String,
  selectionFeature: Object,
});
const provincesData = ref([
  { name: 'Улаанбаатар', supportPercentage: 78 },
  { name: 'Ховд', supportPercentage: 65 },
  { name: 'Өмнөговь', supportPercentage: 62 },
  { name: 'Хэнтий', supportPercentage: 60 },
  { name: 'Баянхонгор', supportPercentage: 58 },
  { name: 'Баян-Өлгий', supportPercentage: 55 },
  { name: 'Архангай', supportPercentage: 53 },
  { name: 'Говь-Алтай', supportPercentage: 52 },
  { name: 'Булган', supportPercentage: 50 },
  { name: 'Дорнод', supportPercentage: 49 },
  { name: 'Сэлэнгэ', supportPercentage: 35 },
  { name: 'Дархан', supportPercentage: 34 },
  { name: 'Дорноговь', supportPercentage: 33 },
  { name: 'Дундговь', supportPercentage: 31 },
  { name: 'Сүхбаатар', supportPercentage: 30 },
  { name: 'Ховсгол', supportPercentage: 28 },
  { name: 'Завхан', supportPercentage: 25 },
  { name: 'Төв', supportPercentage: 23 },
  { name: 'Говьсүмбэр', supportPercentage: 21 },
  { name: 'Увс', supportPercentage: 19 },
]);

const sortedProvinces = computed(() => {
  return provincesData.value.sort((a, b) => b.supportPercentage - a.supportPercentage);
});

const topSupportProvinces = computed(() => {
  return sortedProvinces.value.slice(0, 10);
});

const bottomSupportProvinces = computed(() => {
  return sortedProvinces.value.slice(-10).reverse(); // Reverse to make the chart more intuitive
});

const createChartOptions = (data, title, color) => {
  return {
    chart: {
      type: 'bar',
    },
    title: {
      text: title,
    },
    xAxis: {
      categories: data.map(item => item.name),
      title: {
        text: null,
      },

    },
    yAxis: {
      min: 0,
      max: 100, // Set the maximum value for the x-axis
      title: {
        text: '',
        align: 'high'
      },
      labels: {
        overflow: 'justify'
      }
    },
    plotOptions: {
      bar: {
        dataLabels: {
          enabled: true
        }
      }
    },

    credits: {
      enabled: false
    },
    series: [{
      name: 'Дэмжигчийн хувь %',
      data: data.map(item => item.supportPercentage),
      color: color,
      dataLabels: {
        enabled: true,
        formatter: function() {
          return this.y+"%"; // Format numbers with commas as thousands separators
        },
        style: {
          textOutline: 'none'
        }
      },
    }]
  };
};

const topChartOptions = computed(() => {
  return createChartOptions(topSupportProvinces.value, '', '#28a745'); // green
});

const bottomChartOptions = computed(() => {
  return createChartOptions(bottomSupportProvinces.value, '', '#776b6c'); // red
});
</script>

<style scoped>
/* Tailwind CSS is applied via class names, so no additional CSS needed here unless customization is required */
</style>
