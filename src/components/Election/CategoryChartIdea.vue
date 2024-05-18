<template>
  <div class="h-full w-full p-2 overflow-auto">
    Ажил эрхлэлт салбраар
    <Chart :constructor-type="'chart'" :options="heatMapOptions"></Chart>
  </div>
</template>

<script setup>
import Highcharts from 'highcharts';
import { Chart } from 'highcharts-vue';
import {ref} from 'vue';
function generateRandomData(workSectors) {
  const data = [];
  for (let i = 0; i < workSectors.length; i++) {
    const cnt_base_red = Math.floor(Math.random() * 100000) + 100000;  // Random number between 50,000 and 150,000
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
function calculateTotals(data) {
  return data.map(sector => {
    const total = sector.cnt_base_red +
      sector.cnt_base_blue +
      sector.cnt_base_busad +
      sector.cnt_base_saaral +
      sector.manMembers +
      sector.cnt_sc_red +
      sector.cnt_sc_blue +
      sector.cnt_sc_busad;
    return {
      sector: sector.sector,
      total
    };
  });
}
const workSectors = [
  "БОЛОВСРОЛ", "ЭРҮҮЛ МЭНД", "ҮЙЛЧИЛГЭЭ", "ТЭЭВЭР, АГУУЛАХ", "ОСНАА, ЗОЧИД БУУДАЛ, ХООЛ",
  "УУЛ УУРХАЙ, ОЛБОРЛОЛТ", "МЭДЭЭЛЭЛ, ХОЛБОО", "БАРИЛГА", "УРЛАГ, ҮЗВЭР, ТОГЛООМ НААДАМ",
  "БОЛОВСРУУЛАХ ҮЙЛДВЭРЛЭЛ", "ТӨРИЙН УДИРДЛАГА", "БӨӨНИЙ, ЖИЖИГЛЭН ХУДАЛДАА", "САНХҮҮ, ДААТГАЛ",
  "ЭРЧИМ ХҮЧ, ДУЛААН, ХИЙ, УУР,", "ХӨДӨӨ АЖ АХУЙ", "ОУ-ын БАЙГУУЛЛАГА", "ЭВЛЭЛ, ХОРОО, НАМ, ШАШИН",
  "УС , ХОГ, ХАЯГДЛЫН МЕНЕЖМЕНТ", "БАЙГАЛЬ ОРЧИН, ШИНЖЛЭХ УХААН"
];

const generatedData = generateRandomData(workSectors);
const dataGroups = ["base", "manMembers", "social"];
const dataTypes = {
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

const chartOptions = ref({
  chart: {
    type: 'bar',
    height: 400,
  },
  title: {
    text: 'Ажил эрхлэлт салбраар'
  },
  xAxis: {
    categories: workSectors,
    title: {
      text: null
    }
  },
  yAxis: {
    min: 0,
    title: {
      text: 'Нийт тоо',
      align: 'high'
    },
    labels: {
      overflow: 'justify'
    }
  },
  tooltip: {
    valueSuffix: ' units'
  },
  plotOptions: {
    bar: {
      dataLabels: {
        enabled: true
      },
      stacking: 'normal'
    }
  },
  legend: {
    layout: 'vertical',
    align: 'right',
    verticalAlign: 'top',
    x: -40,
    y: 80,
    floating: true,
    borderWidth: 1,
    backgroundColor:
      Highcharts.defaultOptions.legend.backgroundColor || '#FFFFFF',
    shadow: true
  },
  credits: {
    enabled: false
  },
  series: [{
    name: 'МАН',
    data: generatedData.map(item => item.cnt_base_red)
  }, {
    name: 'АН',
    data: generatedData.map(item => item.cnt_base_blue)
  }, {
    name: 'Бусад',
    data: generatedData.map(item => item.cnt_base_busad)
  }, {
    name: 'Саарал',
    data: generatedData.map(item => item.cnt_base_saaral)
  }, {
    name: 'МАН гишүүд',
    data: generatedData.map(item => item.manMembers)
  }, {
    name: 'Сошиал МАН',
    data: generatedData.map(item => item.cnt_sc_red)
  }, {
    name: 'Сошиал АН',
    data: generatedData.map(item => item.cnt_sc_blue)
  }, {
    name: 'Сошиал Бусад',
    data: generatedData.map(item => item.cnt_sc_busad)
  }]
});
const comparisonData = calculateTotals(generatedData);

const comparisonChartOptions = ref({
  chart: {
    type: 'bar'
  },
  title: {
    text: ''
  },
  xAxis: {
    categories: comparisonData.map(item => item.sector),
    title: {
      text: ''
    }
  },
  yAxis: {
    min: 0,
    title: {
      text: '',
      align: 'high'
    },
    labels: {
      overflow: 'justify'
    }
  },
  tooltip: {
    valueSuffix: ' units'
  },
  plotOptions: {
    bar: {
      dataLabels: {
        enabled: true
      }
    }
  },
  legend: {
    enabled: false
  },
  credits: {
    enabled: false
  },
  series: [{
    name: 'Totals',
    data: comparisonData.map(item => item.total)
  }]
});
const pieChartOptions = ref({
  chart: {
    type: 'pie'
  },
  title: {
    text: ''
  },
  tooltip: {
    pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
  },
  plotOptions: {
    pie: {
      allowPointSelect: true,
      cursor: 'pointer',
      dataLabels: {
        enabled: true,
        format: '<b>{point.name}</b>: {point.percentage:.1f} %'
      },
      showInLegend: true
    }
  },
  series: [{
    name: 'Groups',
    colorByPoint: true,
    data: [{
      name: 'МАН',
      y: generatedData.reduce((sum, item) => sum + item.cnt_base_red, 0),
      sliced: true,
      selected: true
    }, {
      name: 'АН',
      y: generatedData.reduce((sum, item) => sum + item.cnt_base_blue, 0),
    }, {
      name: 'Бусад',
      y: generatedData.reduce((sum, item) => sum + item.cnt_base_busad, 0),
    }, {
      name: 'Саарал',
      y: generatedData.reduce((sum, item) => sum + item.cnt_base_saaral, 0),
    }]
  }]
});
const heatMapOptions = ref({
  chart: {
    type: 'heatmap',
    marginTop: 40,
    marginBottom: 80,
    plotBorderWidth: 1
  },
  title: {
    text: ''
  },
  xAxis: {
    categories: ['МАН', 'АН', 'Бусад', 'Саарал']
  },
  yAxis: {
    categories: workSectors,
    title: null
  },
  colorAxis: {
    min: 0,
    minColor: '#FFFFFF',
    maxColor: Highcharts.getOptions().colors[0]
  },
  legend: {
    align: 'right',
    layout: 'vertical',
    margin: 0,
    verticalAlign: 'top',
    y: 25,
    symbolHeight: 280
  },
  series: [{
    name: 'Contributions',
    borderWidth: 1,
    data: generatedData.flatMap((item, index) => [
      [0, index, item.cnt_base_red],
      [1, index, item.cnt_base_blue],
      [2, index, item.cnt_base_busad],
      [3, index, item.cnt_base_saaral]
    ]),
    dataLabels: {
      enabled: true,
      color: '#000000'
    }
  }]
});
const columnChartOptions = ref({
  chart: {
    type: 'column'
  },
  title: {
    text: 'Distribution of cnt_base_red Across Sectors'
  },
  xAxis: {
    categories: workSectors,
    crosshair: true
  },
  yAxis: {
    min: 0,
    title: {
      text: ''
    }
  },
  tooltip: {
    headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
    pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
      '<td style="padding:0"><b>{point.y:.1f}</b></td></tr>',
    footerFormat: '</table>',
    shared: true,
    useHTML: true
  },
  plotOptions: {
    column: {
      pointPadding: 0.2,
      borderWidth: 0
    }
  },
  series: [{
    name: 'cnt_base_red',
    data: generatedData.map(item => item.cnt_base_red)
  }]
});

const barChartOptions = ref({
  chart: {
    type: 'bar'
  },
  title: {
    text: ''
  },
  xAxis: {
    categories: workSectors,
    title: {
      text: null
    }
  },
  yAxis: {
    min: 0,
    title: {
      text: 'Value of cnt_base_red',
      align: 'high'
    },
    labels: {
      overflow: 'justify'
    }
  },
  tooltip: {
    valueSuffix: ' units'
  },
  plotOptions: {
    bar: {
      dataLabels: {
        enabled: true
      }
    }
  },
  legend: {
    layout: 'vertical',
    align: 'right',
    verticalAlign: 'top',
    x: -40,
    y: 80,
    floating: true,
    borderWidth: 1,
    backgroundColor:
      Highcharts.defaultOptions.legend.backgroundColor || '#FFFFFF',
    shadow: true
  },
  credits: {
    enabled: false
  },
  series: [{
    name: 'cnt_base_red',
    data: generatedData.map(item => item.cnt_base_red)
  }]
});
const sortedData = [...generatedData].sort((a, b) => b.cnt_base_red - a.cnt_base_red);
const barChartOptions2 = ref({
  chart: {
    type: 'bar',
    height: '600px'  // Height should be a number, not a string with px
  },
  title: {
    text: ''
  },
  xAxis: {
    categories: sortedData.map(item => item.sector),  // Use sorted data for categories
    labels: {
      enabled: false  // Hides the x-axis labels (sector names)
    },
    title: {
      text: null
    }
  },
  yAxis: {
    min: 0,
    title: {
      text: 'Value of cnt_base_red',
      align: 'high'
    },
    labels: {
      overflow: 'justify'
    }
  },
  tooltip: {
    headerFormat: '<b>{series.name}</b><br>',
    pointFormat: '{point.category}: {point.y} units'
  },
  plotOptions: {
    bar: {
      dataLabels: {
        enabled: true,
        formatter: function() {
          return `${this.point.category}: ${this.y}`;  // Display the sector name and value on the bar
        },
        inside: true,  // Position data labels inside the bars
        align: 'left',
        color: '#FFFFFF',  // Adjust color for better visibility
        style: {
          textOutline: 'none'
        }
      }
    },
    series: {
      pointPadding: 0,  // Adjust pointPadding
      groupPadding: 0.05  // Adjust groupPadding
    }
  },
  legend: {
    enabled: false  // Hide the legend if not needed
  },
  credits: {
    enabled: false
  },
  series: [{
    name: 'cnt_base_red',
    data: sortedData.map(item => item.cnt_base_red)  // Use sorted data for series
  }]
});


</script>

<style scoped lang="less">

</style>
