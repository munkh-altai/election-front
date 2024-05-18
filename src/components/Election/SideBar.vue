<template>
  <div class="dashboard-page w-full px-2 overflow-y-auto">

    <div v-if="!onlyOronNutag">


      <a-tabs default-active-key="1" class="h-full " size="small" >
        <a-tab-pane key="1" tab="Суурь өнгө">

          <highcharts ref="highcharts" :options="chartOptionsBase"
                      class=" " ></highcharts>

        </a-tab-pane>
        <a-tab-pane key="2" tab="Сошиал өнгө">

          <highcharts :constructor-type="'chart'" ref="highcharts2" :options="chartOptionsSocial"
                      class=" items-center justify-content-center" ></highcharts>

        </a-tab-pane>

        <a-tab-pane key="3" tab="Бүгд">

          <highcharts :constructor-type="'chart'" ref="highcharts3" :options="chartOptionsAll"
                      class=" items-center justify-content-center" ></highcharts>

        </a-tab-pane>
        <a-tab-pane key="4" tab="Тоон мэдээлэл">
          <div class="w-full h-full overflow-auto">
            <a-table :columns="columns" :data-source="tableData" :pagination="false" />
          </div>
        </a-tab-pane>
      </a-tabs>
    </div>
    <div v-if="onlyOronNutag">
      <a-tabs default-active-key="1" class="h-full " size="small" >
        <a-tab-pane key="1" tab="Суурь өнгө">

          <highcharts ref="highcharts" :options="chartOptionsBase"
                      class=" " ></highcharts>

        </a-tab-pane>


        <a-tab-pane key="3" tab="Бүгд">

          <highcharts :constructor-type="'chart'" ref="highcharts3" :options="chartOptionsAll"
                      class=" items-center justify-content-center" ></highcharts>

        </a-tab-pane>

      </a-tabs>
      <a-tabs default-active-key="1" class="h-full " size="small" >

        <a-tab-pane key="2" tab="Сошиал өнгө">

          <highcharts :constructor-type="'chart'" ref="highcharts2" :options="chartOptionsSocial"
                      class=" items-center justify-content-center" ></highcharts>

        </a-tab-pane>


        <a-tab-pane key="4" tab="Тоон мэдээлэл">
          <div class="w-full h-full overflow-auto">
            <a-table :columns="columns" :data-source="tableData" :pagination="false" />
          </div>
        </a-tab-pane>
      </a-tabs>
    </div>

    <a-modal v-model:open="isModalVisible" title="МАН Дэмэжигчид" @ok="handleOk" :footer="null" @cancel="handleCancel" width="1000px">
      <p>МАН Дэмэжигчид...</p>
    </a-modal>
  </div>
</template>

<script>
import { ref, watchEffect } from 'vue';
import Highcharts from 'highcharts'
import { Chart } from 'highcharts-vue';

function getData(dataGroups, dataTypes, data) {
  const series = [];
  // Define the order of series manually for stacking
  const seriesOrder = [
    'cnt_base_saaral',
    'cnt_base_busad',
    'cnt_base_blue',
    'cnt_base_red',
    'manMembers',
    'cnt_sc_busad',
    'cnt_sc_blue',
    'cnt_sc_red',

  ];

  // Loop through the defined order instead of dataGroups
  seriesOrder.forEach(key => {
    const type = dataTypes[key];
    if (type) {
      const seriesData = data.map(item => item[key]);
      series.push({
        name: type.name,
        data: seriesData,
        color: type.color,
        stack: type.group,
        id: key,
        // linkedTo: type.linkedTo,
        // pointPlacement: type.group === 'social' ? 0.08 : type.group === 'manMembers' ? 0.05 : 0,
        dataLabels: {
          enabled: key === 'cnt_base_red' || key === 'cnt_base_blue' || key === 'manMembers',
          style: {
            textOutline: 'none',
            color:"#ffffff"
          }
        }
      });
    }
  });

  return series;
}

function generateRandomData(numZones) {
  const data = [];
  for (let i = 1; i <= numZones; i++) {
    const cnt_base_red = Math.floor(Math.random() * 20) + 30; // Random number between 50 and 150
    const cnt_base_blue = Math.floor(Math.random() * (cnt_base_red - 15)) + 10; // Random number between 10 and cnt_base_red - 10
    const cnt_base_busad = Math.floor(Math.random() * (cnt_base_blue - 20)) + 10; // Random number between 10 and cnt_base_blue - 10
    const cnt_base_saaral = Math.floor(Math.random() * (cnt_base_busad - 15)) + 5; // Random number between 10 and cnt_base_busad - 10

    const manMembers = Math.floor(Math.random() * 8); // Random number between 0 and 20
    const cnt_sc_red = Math.floor(Math.random() * 15); // Random number between 0 and 20
    const cnt_sc_blue = Math.floor(Math.random() * 8); // Random number between 0 and 20
    const cnt_sc_busad = Math.floor(Math.random() * 5); // Random number between 0 and 20

    data.push({
      id: `${i}`,
      zone: `${i}-р бүс`,
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

export default {
  name: 'SideBar',
  components: {
    highcharts: Chart
  },
  props:{
    onlyOronNutag:Boolean
  },
  setup(props) {
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

    const isModalVisible = ref(false);
    // Function to handle the modal close
    const handleOk = () => {
      isModalVisible.value = false;
    };

    // Function to handle the modal cancel
    const handleCancel = () => {
      isModalVisible.value = false;
    };

    const dataGroups = ["base", "manMembers", "social"];
    const dataTypesBase = {
      cnt_base_red: {
        name: 'МАН',
        color: 'rgba(255, 74, 67, 1)',
        group: 'base',
        linkedTo: undefined
      },
      cnt_base_blue: {
        name: 'АН',
        color: 'rgba(26, 106, 255, 1)',
        group: 'base',
        linkedTo: undefined
      },
      cnt_base_busad: {
        name: 'Бусад',
        color: 'rgba(116, 59, 168, 1)',
        group: 'base',
        linkedTo: undefined
      },
      cnt_base_saaral: {
        name: 'Саарал',
        color: 'rgba(117, 115, 118, 1)',
        group: 'base',
        linkedTo: undefined
      },
      // manMembers: {
      //   name: 'МАН гишүүд',
      //   color: 'rgb(225,55,48)',
      //   group: 'manMembers',
      //   linkedTo: 'cnt_base_red'
      // },
      // cnt_sc_red: {
      //   name: 'Сошиал МАН',
      //   color: 'rgba(198,27,20,0.5)',
      //   group: 'social',
      //   linkedTo: 'cnt_base_red'
      // },
      // cnt_sc_blue: {
      //   name: 'Сошиал АН',
      //   color: 'rgba(26, 106, 255, 0.5)',
      //   group: 'social',
      //   linkedTo: 'cnt_base_blue'
      // },
      // cnt_sc_busad: {
      //   name: 'Сошиал Бусад',
      //   color: 'rgba(116, 59, 168, 0.5)',
      //   group: 'social',
      //   linkedTo: 'cnt_base_busad'
      // },
    };
    const dataTypesAll = {
      cnt_base_red: {
        name: 'МАН',
        color: 'rgba(255, 74, 67, 1)',
        group: 'base',
        linkedTo: undefined
      },
      cnt_base_blue: {
        name: 'АН',
        color: 'rgba(26, 106, 255, 1)',
        group: 'base',
        linkedTo: undefined
      },
      cnt_base_busad: {
        name: 'Бусад',
        color: 'rgba(116, 59, 168, 1)',
        group: 'base',
        linkedTo: undefined
      },
      cnt_base_saaral: {
        name: 'Саарал',
        color: 'rgba(117, 115, 118, 1)',
        group: 'base',
        linkedTo: undefined
      },
      manMembers: {
        name: 'МАН гишүүд',
        color: 'rgb(225,55,48)',
        group: 'manMembers',
        linkedTo: 'cnt_base_red'
      },
      cnt_sc_red: {
        name: 'Сошиал МАН',
        color: 'rgba(198,27,20,0.5)',
        group: 'social',
        linkedTo: 'cnt_base_red'
      },
      cnt_sc_blue: {
        name: 'Сошиал АН',
        color: 'rgba(26, 106, 255, 0.5)',
        group: 'social',
        linkedTo: 'cnt_base_blue'
      },
      cnt_sc_busad: {
        name: 'Сошиал Бусад',
        color: 'rgba(116, 59, 168, 0.5)',
        group: 'social',
        linkedTo: 'cnt_base_busad'
      },
    };
    const dataTypesSocial = {

      cnt_sc_red: {
        name: 'Сошиал МАН',
        color: 'rgba(255, 74, 67, 1)',
        group: 'social',
        linkedTo: 'cnt_base_red'
      },
      cnt_sc_blue: {
        name: 'Сошиал АН',
        color: 'rgba(26, 106, 255, 1)',
        group: 'social',
        linkedTo: 'cnt_base_blue'
      },
      cnt_sc_busad: {
        name: 'Сошиал Бусад',
        color: 'rgba(116, 59, 168, 1)',
        group: 'social',
        linkedTo: 'cnt_base_busad'
      },
    };

    const numberOfSection = props.onlyOronNutag ? 7 : 13;
    console.log(numberOfSection)

    const data =generateRandomData(numberOfSection);

    const tableData = ref(data.map(item => ({
      key: item.id,
      ...item
    })));

    const chartDataBase = getData(dataGroups, dataTypesBase, data);
    const chartDataSocial = getData(dataGroups, dataTypesSocial, data);
    const chartDataAll = getData(dataGroups, dataTypesAll, data);

    const chartOptionsAll = ref({
      chart: {
        type: 'bar',
        // height: 75.8*numberOfSection,
        events: {
          load: function() {
            const chart = this;
            // Attach click event to 'МАН' series
            chart.series.forEach(series => {
              if (series.name === 'МАН') {
                series.points.forEach(point => {
                  point.graphic.on('click', function() {
                    isModalVisible.value = true;
                  });
                });
              }
            });
          }
        }
      },
      title: {
        text: ''
      },
      xAxis: {
        type: 'category',
        categories: data.map(r => r.zone)
      },

      legend: {
        reversed: true,
        align: 'center', // Aligns the legend in the center
        verticalAlign: 'top', // Positions the legend at the top of the chart
        layout: 'horizontal', // Layout can be 'horizontal' or 'vertical'
        borderWidth: 0, // Optional: adds a border around the legend
        backgroundColor: 'rgba(255,255,255,0.85)', // Optional: background color
        floating: false, // Set true if you want to allow the legend to overlap the chart
        y: -15 // Adjust the vertical offset from the top
      },
      yAxis: {
        min: 0,
        max: 100, // Set the maximum value for the x-axis
        title: {
          text: ''
        }
      },
      plotOptions: {
        series: {
          stacking: 'normal',
          borderWidth: 0,
          dataLabels: {
            enabled: true,
            formatter: function() {
              return this.y+"%"; // Format numbers with commas as thousands separators
            },
            style: {
              textOutline: 'none'
            }
          },
          // pointPadding: 0.8, // Adjust pointPadding
          groupPadding: 0.05, // Adjust groupPadding
        }
      },
      tooltip: {
        shared: true,
        headerFormat: '<span style="font-size: 15px">{point.key}</span><br/>',
        formatter: function () {
          const points = this.points;
          const pointFormat = (point) => `<span style="color:${point.color}">\u25CF</span> ${point.series.name}: <b>${Highcharts.numberFormat(point.y, 0, '.', ',')}</b><br/>`;
          let tooltipText = `<span style="font-size: 15px">${this.x}</span><br/>`;
          const seriesOrder = [
            'МАН', 'МАН гишүүд', 'АН', 'Бусад', 'Саарал', 'Сошиал МАН', 'Сошиал АН', 'Сошиал Бусад'
          ];

          // Order points based on custom seriesOrder
          seriesOrder.forEach(seriesName => {
            const point = points.find(p => p.series.name === seriesName);
            if (point) {
              tooltipText += pointFormat(point);
            }
          });

          return tooltipText;
        },
        useHTML: true
      },
      series: chartDataAll
    });

    const chartOptionsBase = ref({
      chart: {
        type: 'bar',
        height: (props.onlyOronNutag ? 50 : 30 )*numberOfSection,
        events: {
          load: function() {
            const chart = this;
            // Attach click event to 'МАН' series
            chart.series.forEach(series => {
              if (series.name === 'МАН') {
                series.points.forEach(point => {
                  point.graphic.on('click', function() {
                    isModalVisible.value = true;
                  });
                });
              }
            });
          }
        }
      },
      title: {
        text: ''
      },
      xAxis: {
        type: 'category',
        categories: data.map(r => r.zone)
      },

      legend: {
        reversed: true,
        align: 'center', // Aligns the legend in the center
        verticalAlign: 'top', // Positions the legend at the top of the chart
        layout: 'horizontal', // Layout can be 'horizontal' or 'vertical'
        borderWidth: 0, // Optional: adds a border around the legend
        backgroundColor: 'rgba(255,255,255,0.85)', // Optional: background color
        floating: false, // Set true if you want to allow the legend to overlap the chart
        y: -15 // Adjust the vertical offset from the top
      },
      yAxis: {
        min: 0,
        max: 100,  // Control the maximum value to manage the scale of the yAxis
        title: {
          text: ''
        },

      },
      plotOptions: {
        series: {
          stacking: 'normal',
          borderWidth: 0,
          dataLabels: {
            enabled: true,
            formatter: function() {
              return this.y+"%"; // Format numbers with commas as thousands separators
            },
            style: {
              textOutline: 'none'
            }
          },
          pointPadding: 0.1, // Adjust pointPadding
          groupPadding: 0.05, // Adjust groupPadding
          pointWidth: 20  // Fix the width of each bar to 20 pixels
        }
      },
      tooltip: {
        shared: true,
        headerFormat: '<span style="font-size: 15px">{point.key}</span><br/>',
        formatter: function () {
          const points = this.points;
          const pointFormat = (point) => `<span style="color:${point.color}">\u25CF</span> ${point.series.name}: <b>${Highcharts.numberFormat(point.y, 0, '.', ',')}</b><br/>`;
          let tooltipText = `<span style="font-size: 15px">${this.x}</span><br/>`;
          const seriesOrder = [
            'МАН', 'МАН гишүүд', 'АН', 'Бусад', 'Саарал', 'Сошиал МАН', 'Сошиал АН', 'Сошиал Бусад'
          ];

          // Order points based on custom seriesOrder
          seriesOrder.forEach(seriesName => {
            const point = points.find(p => p.series.name === seriesName);
            if (point) {
              tooltipText += pointFormat(point);
            }
          });

          return tooltipText;
        },
        useHTML: true
      },
      series: chartDataBase
    });

    const chartOptionsSocial = ref({
      chart: {
        type: 'bar',
        height: (props.onlyOronNutag ? 50 : 30 )*numberOfSection,
        events: {
          load: function() {
            const chart = this;
            // Attach click event to 'МАН' series
            chart.series.forEach(series => {
              if (series.name === 'МАН') {
                series.points.forEach(point => {
                  point.graphic.on('click', function() {
                    isModalVisible.value = true;
                  });
                });
              }
            });
          }
        }
      },
      title: {
        text: ''
      },
      xAxis: {
        type: 'category',
        categories: data.map(r => r.zone)
      },

      legend: {
        reversed: true,
        align: 'center', // Aligns the legend in the center
        verticalAlign: 'top', // Positions the legend at the top of the chart
        layout: 'horizontal', // Layout can be 'horizontal' or 'vertical'
        borderWidth: 0, // Optional: adds a border around the legend
        backgroundColor: 'rgba(255,255,255,0.85)', // Optional: background color
        floating: false, // Set true if you want to allow the legend to overlap the chart
        y: -15 // Adjust the vertical offset from the top
      },
      yAxis: {
        min: 0,
        max: 100, // Set the maximum value for the x-axis
        title: {
          text: ''
        }
      },
      plotOptions: {
        series: {
          stacking: 'normal',
          borderWidth: 0,
          dataLabels: {
            enabled: true,
            formatter: function(v) {

              console.log(v)
              return this.y+"%"; // Format numbers with commas as thousands separators
            },
            style: {
              textOutline: 'none'
            }
          },
          // pointPadding: 0.8, // Adjust pointPadding
          groupPadding: 0.05, // Adjust groupPadding
        }
      },
      tooltip: {
        shared: true,
        headerFormat: '<span style="font-size: 15px">{point.key}</span><br/>',
        formatter: function () {
          const points = this.points;
          const pointFormat = (point) => `<span style="color:${point.color}">\u25CF</span> ${point.series.name}: <b>${Highcharts.numberFormat(point.y, 0, '.', ',')}</b><br/>`;
          let tooltipText = `<span style="font-size: 15px">${this.x}</span><br/>`;
          const seriesOrder = [
            'МАН', 'МАН гишүүд', 'АН', 'Бусад', 'Саарал', 'Сошиал МАН', 'Сошиал АН', 'Сошиал Бусад'
          ];

          // Order points based on custom seriesOrder
          seriesOrder.forEach(seriesName => {
            const point = points.find(p => p.series.name === seriesName);
            if (point) {
              tooltipText += pointFormat(point);
            }
          });

          return tooltipText;
        },
        useHTML: true
      },
      series: chartDataSocial
    });

    // This function can be used to refresh data and chart
    const refreshChartData = () => {
      const numberOfSection = props.onlyOronNutag ? 7 : 13;
      const data = generateRandomData(numberOfSection);
      tableData.value = data.map(item => ({ key: item.id, ...item }));

      chartOptionsBase.value.series = getData(["base", "manMembers", "social"], dataTypesBase, data);
      chartOptionsBase.value.chart.height = (props.onlyOronNutag ? 50 : 30 ) * numberOfSection;

      chartOptionsSocial.value.series = getData(["base", "manMembers", "social"], dataTypesSocial, data);
      chartOptionsSocial.value.chart.height = (props.onlyOronNutag ? 50 : 30 ) * numberOfSection;
    };

    // Watch the `onlyOronNutag` prop for changes
    watchEffect(() => {
      refreshChartData();
    });

    return {
      isModalVisible, handleOk, handleCancel, columns, tableData, chartOptionsBase, chartOptionsSocial, chartOptionsAll
    };
  }
};
</script>

<style scoped>

</style>
