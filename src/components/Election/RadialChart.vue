<template>
  <div class="chart-container">
    <apexchart
      type="radialBar"
      :options="chartOptions"
      :series="series"
    />
  </div>
</template>

<script>
import { ref, defineProps } from 'vue';
import VueApexCharts from 'vue3-apexcharts';

export default {
  name: 'RadialBarChart',
  components: {
    apexchart: VueApexCharts,
  },
  props:{
    color: String
  },
  setup(props) {
    const series = ref([67]);
    const chartHeight = ref(30); // Fixed height
    const chartWidth = ref(70); // Fixed width (more than height for rectangular shape)
    const fontSize = ref('12px')
    const chartOptions = ref({
      chart: {
        height: chartHeight.value,
        width: chartWidth.value,
        type: 'radialBar',
      },
      plotOptions: {
        radialBar: {
          hollow: {
            size: '70%', // Adjust this value to change the hollow size and thus the radial bar width
          },
          track: {
            show: true,
            background: '#e7e7e7',
            strokeWidth: '100%',
            opacity: 1,
            margin: 0, // margin is in pixels
          },
          dataLabels: {
            show: true,
            name: {
              show: false, // Hide the name label
            },
            value: {
              fontSize: fontSize.value, // Fixed font size
              show: true,
              offsetY: 4,
              color: props.color, // Set the text color to red
            },
          },
        },
      },
      colors: [props.color], // Set the radial bar color to red
      labels: [], // No labels needed
    });

    return {
      series,
      chartOptions,
    };
  },
};
</script>

<style scoped>
.chart-container {
  width: 100px; /* Fixed width */
  height: 50px; /* Fixed height */
  display: flex;
  justify-content: center;
  align-items: center;
  vertical-align: middle;
  padding-top: 15px;
}
</style>
