<template>
  <div class="surface-section pb-8 pt-8 space-y-4">
    <portal to="header-left">
      <div class="page-title float-left">
        <div class="float-left pt-5">
          <h1 class="text-gray-700 dark:text-gray-200 text-base m-0 ">Сонгогчдын тоо сонгуулийн тойргоор</h1>

        </div>
      </div>
    </portal>
    <div class="container mx-auto xl:px-0 px-8">
      <div class="text-slate-800 font-bold lg:text-4xl text-2xl text-center">Сонгогчдын тоо сонгуулийн тойргоор</div>

      <highcharts :constructor-type="'mapChart'" ref="highcharts" :options="mapOptions"
                  class="map items-center justify-content-center" style="height: 500px"></highcharts>


    </div>
  </div>
</template>
<script>

import mnAll from "~/mapChart/data";
import axios from "~/plugins/core/axios";
import Highcharts from 'highcharts'

export default {
  computed: {

    lang: {
      drillUpText: "Буцах"
    },
    students() {

      return this.chart.students
    },
    chadamjiinGerchilgee() {

      return this.chart.chadamjiinGerchilgee;
    },
    schools() {

      return this.chart.schools
    },

  },
  data() {
    return {

      mapOptions: {
        lang: {
          drillUpText: "Буцах"
        },
        credits: {
          enabled: false
        },
        mapNavigation: {
          enabled: true,
          buttonOptions: {
            verticalAlign: 'bottom',
          },
        },


        chart: {
          backgroundColor: 'transparent',

          events: {
            drilldown: async (e) => {


              // Load the drilldown map

             const resSoum = await axios.get(`/election/map/soums/${e.point.NAME_EN}.json`)


              let subMapData = Highcharts.geojson(resSoum.data)


              if (!e.seriesOptions) {

                const chart = this.$refs.highcharts.chart;
                const drilldownId = e.point.drilldown;

                let currentAimag = e.point.drilldown;

                // Show the Font Awesome spinner
                chart.showLoading('Түр хүлээнэ үү');

                const drilldownSeries = {
                  name: e.point.name,
                  id: drilldownId,
                  data: subMapData.map((feature, i) => {


                    const index = mnAll.findIndex(r=>r.NAME_EN === e.point.NAME_EN);
                    let color = "f4f4f4"
                    if(index >= 0){
                      color = mnAll[index].color
                    }

                      if(e.point.NAME_EN !== "Ulaanbaatar"){

                        return {
                          ...feature,
                          name: feature.properties.NAME,
                          value: i, // Assuming 'i' represents some meaningful value here
                          color:color,
                        }
                      } else {

                        let dIndex = resSoum.data.features.findIndex(r=>r.properties.CODE == feature.properties.CODE)
                        return {
                          ...feature,
                          name: feature.properties.NAME,
                          value: resSoum.data.features[dIndex].value,
                          color:resSoum.data.features[dIndex].color,
                        }
                      }

                    }),
                  dataLabels: {
                    enabled: true,
                    format: '{point.name}',
                  }
                };

                chart.mapView.update(
                  {
                    chart: {
                      // Reset zoomType if you've set any
                      zoomType: null
                    },
                    // Attempt to re-center and zoom. Adjust these values based on your map data
                    mapView: {
                      center: [0, 0], // Center coordinates of your map data
                      zoom: 0, // Zoom level you wish to reset to
                      padding: 0 // Reset any padding you've applied
                    }
                  }
                );

                // Hide loading and add series
                chart.hideLoading();

                chart.addSeriesAsDrilldown(e.point, drilldownSeries);



              }
            },
            drillup: function (e) {
              e.target.mapView.projection.hasCoordinates = false;
              if (e.seriesOptions.custom && e.seriesOptions.custom.mapView) {
                e.target.mapView.update(
                  Highcharts.merge(
                    { insets: undefined },
                    e.seriesOptions.custom.mapView
                  ),
                  false
                );
              }
            }
          }

        },
        plotOptions: {
          series: {
            dataLabels: {

              style: {
                fontSize: 13,
                color: 'black',
                textShadow: 'none',
              },
              allowOverlap: true,
              inside: false,
              //align:'left',
              //verticalAlign: 'top',
              //verticalAlign: 'middle',
              //verticalAlign: 'top',
              y: 0,
              overflow: false,
              crop: false,
              enabled: false,
              padding: 0,
              verticalAlign: 'top'
            }
          },
          map: {
            color: '#f4f4f4',
            states: {
              hover: {
                color: '#d1d1d1'
              }
            },
            dataLabels: {
              style: {
                fontSize: 13,
                color: 'black',
                textShadow: 'none',
                fontWeight: 'normal'
              },
            }
          }
        },
        title: {
          text: '',
        },
        subtitle: {
          text: 'Аймаг, Нийслэл дээр дарж сум, дүүрэг харна уу',
        },
        colors: ["#ffffff"],
        series: [{
          name: 'Аймаг / Нийслэл',
          dataLabels: {
            enabled: true,
            format: '{point.NAME}',
            style: {
              color: 'yellow'
            },
            color: '#000'
          },
          borderColor: '#fff',
          borderWidth: 0.30,
          colorAxis: true,
          data: mnAll,


        }],
        drilldown: {
          activeAxisLabelStyle: {
            cursor: "pointer",
            color: "#d56",
            fontWeight: "bold",
            textDecoration: "underline"
          },
          activeDataLabelStyle: {
            color: '#000',
            cursor: "pointer",
            textDecoration: 'none',
            fontWeight: "normal",
          },
          animation: {
            duration: 1
          },
          drillUpButton: {
            relativeTo: 'spacingBox',
            position: {
              x: 0,
              y: 60
            }
          }
        }
      },
      focusedAimag: null,
      focusedAimagName: null,
      chart: {
        "chadamjiinGerchilgee": 30150,
        "schools": 582,
        "students": 44105,
        "ChadamjiinGerchilgeeByAiamag": [],
        "SchoolByAimag": [],
        "StudentByAiamag": [],
      }
    }
  },
  methods: {},

  mounted() {


  }
}
</script>
<style scoped>

</style>
