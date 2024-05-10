<template>
  <div>
    <portal to="header-left">
      <div class="page-title float-left">
        <div class="float-left pt-2">
          <h1 class="text-gray-700 dark:text-gray-200 text-base m-0">Үнсэн</h1>
          <h2 class="text-gray-400 text-xs m-0"><span>Сонгогдийн мэдээлэл</span></h2>
        </div>
      </div>
    </portal>
    <div class="grid md:grid-cols-12 grid-cols-1 gap-2">
      <div id="map" class="col-span-12 lg:col-span-8"></div>
      <div class="col-span-12 lg:col-span-4">
        <Info/>

      </div>
      <div class="col-span-12">bottom</div>
    </div>
  </div>
</template>

<script setup>
import {onMounted, ref} from 'vue';
import L from 'leaflet';
import "leaflet/dist/leaflet.css";
import * as d3 from 'd3';
import Info from "~/components/Election/Info.vue"

const map = ref(null);
const provinceLayer = ref(null);

// Define the default style
// Define the default style
const blueStyle = {
  color: '#ffffff',
  weight: 1,
  opacity: 1,
  fillOpacity: 1,
  stroke: true,
  dashArray: null,
  fillColor: '#1a6aff', // Same as color to fill
  fill: true,
  lineCap: 'round',
  lineJoin: 'round',
  strokeColor: '#ffffff' // White stroke color
};

// Define the style for specific provinces to be red
const redStyle = {
  color: '#ffffff',
  weight: 1,
  opacity: 1,
  fillOpacity: 1,
  stroke: true,
  dashArray: null,
  fillColor: '#ff4a43', // Same as color to fill
  fill: true,
  lineCap: 'round',
  lineJoin: 'round',
  strokeColor: '#ffffff' // White stroke color
};

// Function to determine the style of each province
function getStyle(feature) {
  // Adjust the condition to match the property you want to check
  if (feature.properties.name === 'Khentii') {
    return blueStyle;
  }
  return redStyle;
}

// Load soums GeoJSON based on province_id
function loadSoums(name) {
  d3.json('/election/map/soums/' + name + '.json').then((soumData) => {
    const soumLayer = L.geoJSON(soumData, {
      onEachFeature: onEachSoum,
      style: redStyle // Apply the default style to soums
    }).addTo(map.value);

    // Add a button to go back to province view
    const backButton = L.control({position: 'topright'});
    backButton.onAdd = function () {
      const div = L.DomUtil.create('div', '');
      div.innerHTML = '<a href="#" title="Улсын хэмжээнд харах" class="px-2">Буцах</a>';
      div.onclick = function () {
        map.value.removeLayer(soumLayer);
        map.value.removeControl(backButton);
        map.value.setView([46.8625, 103.8467], 5); // Reset view to show all provinces
        map.value.addLayer(provinceLayer.value);
      };
      return div;
    };
    backButton.addTo(map.value);
  });
}

function onEachSoum(feature, layer) {
  layer.bindTooltip(feature.properties.NAME, {permanent: false, sticky: true, direction: 'auto'});
  // Add any soum-specific interactions here
}

function onEachProvince(feature, layer) {
  layer.bindTooltip(feature.properties.name_MN, {permanent: false, sticky: true, direction: 'auto'});

  layer.on('click', (e) => {
    map.value.removeLayer(provinceLayer.value);
    loadSoums(feature.properties.name);
    map.value.fitBounds(layer.getBounds()); // Zoom to the selected province

    // Close any open tooltips
    map.value.eachLayer(function (l) {
      if (l.getTooltip && l.getTooltip()) {
        l.closeTooltip();
      }
    });

    L.DomEvent.stopPropagation(e);
  });
}

function initMap() {
  // Initialize the map
  map.value = L.map('map').setView([46.8625, 103.8467], 5);

  // Add a tile layer
  L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
    attribution: '',
    maxZoom: 18,
  }).addTo(map.value);

  // Load province GeoJSON
  d3.json('/election/map/mongoliaLow.json').then((provinceData) => {
    provinceLayer.value = L.geoJSON(provinceData, {
      onEachFeature: onEachProvince,
      style: getStyle // Apply the style based on the feature properties
    }).addTo(map.value);
  });
}

onMounted(() => {
  initMap();
});
</script>

<style>
#map {
  padding-bottom: 65%;

}

.leaflet-control-attribution {
  display: none !important;
}

.leaflet-control-zoom {
  border: none !important;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 0.1rem 0.3rem 0px, rgba(0, 0, 0, 0.15) 0px 0.1rem 0.5rem 0px;
}

svg path {
  &:focus {
    outline: none;
  }
}


</style>
