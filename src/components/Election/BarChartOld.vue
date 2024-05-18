<template>
  <div style="height: 700px; position: relative;">
    <apexchart type="bar" :options="chartOptions" :series="series"/>
  </div>
</template>

<script>
import { ref } from 'vue';
import VueApexCharts from 'vue3-apexcharts';

export default {
  name: 'BarChart',
  components: {
    apexchart: VueApexCharts,
  },
  setup() {
    const series = ref([
      {
        name: 'МАН',
        group: 'budget',
        data: [44000, 55000, 41000, 67000, 22000, 15000, 6000]
      },
      {
        name: 'Social',
        group: 'actual',
        data: [48000, 50000, 40000, 65000, 25000, 15000, 5555]
      },
      {
        name: 'АН',
        group: 'budget',
        data: [13000, 36000, 20000, 8000, 13000, 12000, 4444]
      },
      {
        name: 'Social',
        group: 'actual',
        data: [20000, 40000, 25000, 10000, 12000, 10000, 33333]
      }
    ]);

    const chartOptions = ref({
      chart: {
        type: 'bar',
        height: '100%', // Set the height here
        stacked: true,
        distributed: false,
      },
      yAxis: {
        min: 0,
        max: 1200,
        title: {
          text: 'Votes',
          align: 'high'
        }
      },
      xAxis: {
        type: 'category',
        title: {
          text: null
        },
        min: 0,
        max: 4,
        scrollbar: {
          enabled: true
        },
        tickLength: 0
      },
      stroke: {
        width: 1,
        colors: ['#fff']
      },
      dataLabels: {
        formatter: (val) => {
          return val / 1000 + 'K';
        }
      },
      plotOptions: {
        bar: {
          horizontal: true
        }
      },
      xaxis: {
        categories: [
          '1-р бүс',
          '2-р бүс',
          '3-р бүс',
          '4-р бүс',
          '5-р бүс',
          '6-р бүс',
          '7-р бүс'
        ],
        labels: {
          formatter: (val) => {
            return val / 1000 + 'K';
          }
        }
      },
      fill: {
        opacity: 1,
      },
      colors: ['#ff4a43', '#f67b76', '#1a6aff', '#7ca4f3'],
      legend: {
        position: 'top',
        horizontalAlign: 'left'
      }
    });

    return {
      series,
      chartOptions
    };
  }
};
</script>

<style scoped>
/* Add any necessary styling here */
</style>
