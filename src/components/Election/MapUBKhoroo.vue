<template>
  <div class="map row-span-5 relative">
    <div class="absolute top-0.5 right-0.5 z-20">
      <a-switch v-model:checked="onlyOronNutag" />

      <span class="text-xxs"> Зөвхөн орон нутгийн мэдээлэл</span>
    </div>
    <div class="flex justify-center flex-col items-center space-x-2  absolute bottom-0 left-1 z-20">

      <div>
        Улаанбаатар: {{props.selectionFeature.section}} -р бүс
      </div>
      <div class="flex justify-center items-center space-x-2">
        <!-- 0-10% -->
        <div class="flex flex-col items-center">
          <div class="w-8 h-8 bg-white border border-gray-300"></div>
          <span class="text-xxs  mt-1">0-10%</span>
        </div>
        <!-- 10-20% -->
        <div class="flex flex-col items-center">
          <div class="w-8 h-8 bg-red-100"></div>
          <span class="text-xxs  mt-1">10-20%</span>
        </div>
        <!-- 20-30% -->
        <div class="flex flex-col items-center">
          <div class="w-8 h-8 bg-red-200"></div>
          <span class="text-xxs  mt-1">20-30%</span>
        </div>
        <!-- 30-40% -->
        <div class="flex flex-col items-center">
          <div class="w-8 h-8 bg-red-300"></div>
          <span class="text-xxs  t-xs mt-1">30-40%</span>
        </div>
        <!-- 40-50% -->
        <div class="flex flex-col items-center">
          <div class="w-8 h-8 bg-red-400"></div>
          <span class="text-xxs  mt-1">40-50%</span>
        </div>
        <!-- 50-60% -->
        <div class="flex flex-col items-center">
          <div class="w-8 h-8 bg-red-500"></div>
          <span class="text-xxs  mt-1">50-60%</span>
        </div>
        <!-- 60-100% -->
        <div class="flex flex-col items-center">
          <div class="w-8 h-8 bg-red-600" ></div>
          <span class="text-xxs  mt-1">60-100%</span>
        </div>
      </div>
    </div>
    <div id="map" class="z-10"></div>

  </div>
</template>
<script setup>

import {onMounted, ref, defineEmits, defineProps} from "vue";
import L from 'leaflet';
import "leaflet/dist/leaflet.css";
import * as d3 from 'd3';

const props = defineProps({
  selectionType: String,
  selectionFeature: Object,
});

import {getStyle, redStyle, whiteStyle} from "~/components/Election/mapStyle";

L.Tooltip.prototype._animateZoom = function (e) {
  if (!this._map) {
    return;
  }
  let pos = this._map._latLngToNewLayerPoint(this._latlng, e.zoom, e.center);
  this._setPosition(pos);
};

L.Tooltip.prototype._updatePosition = function () {
  if (!this._map) {
    return;
  }
  let pos = this._map.latLngToLayerPoint(this._latlng);
  this._setPosition(pos);
};
const onlyOronNutag = ref(false);
const map = ref(null);
const sectionLayer = ref(null);
const provinceLayer = ref(null);
const soumLayer = ref(null);
const selectedSection = ref(null);
const selectedProvince = ref(null);

const backButtonSection = L.control({position: 'bottomright'});
const backButtonProvince = L.control({position: 'bottomright'});

backButtonSection.onAdd = function () {
  const div = L.DomUtil.create('div', '');
  div.innerHTML =  `<a href="#" title="Тойргоор харах" class="map-back-btn">Улсын хэмээнд харах</a>`;
  div.onclick = function () {
    emit('objectSelected', 'country', null);  // Emit event with section properties
  };
  return div;
};
backButtonProvince.onAdd = function () {
  const div = L.DomUtil.create('div', '');
  div.innerHTML = '<a href="#"  class="px-2">Бүсээр харах</a>';
  div.onclick = function () {
    map.value.removeLayer(soumLayer.value);
    map.value.removeControl(backButtonProvince);

    selectedProvince.value = null;


    map.value.addLayer(provinceLayer.value);

    map.value.fitBounds(provinceLayer.value.getBounds()); // Reset view to show all provinces
  };
  return div;
};
const emit = defineEmits(['objectSelected']);



function loadSoums(name) {
  d3.json('/election/map/soums/' + name + '.json').then((soumData) => {
    soumLayer.value = L.geoJSON(soumData, {
      onEachFeature: onEachSoum,
      style: redStyle // Apply the default style to soums
    }).addTo(map.value);

    // Add a button to go back to province view


    backButtonProvince.addTo(map.value);
  });
}

function onEachSoum(feature, layer) {
  // layer.bindTooltip(soumTooltip(feature), {permanent: false, sticky: true, direction: 'auto'});
  // Add any soum-specific interactions here

  layer.on('click', (e) => {

    emit('objectSelected', 'soum', feature.properties);  // Emit event with section properties
    L.DomEvent.stopPropagation(e);
  });
}

function onEachProvince(feature, layer) {
  // layer.bindTooltip(provinceTooltip(feature), {permanent: false, sticky: true, direction: 'auto'});

  layer.on('click', (e) => {

    map.value.removeLayer(provinceLayer.value);

    selectedProvince.value = feature.properties.name_MN
    loadSoums(feature.properties.name);
    map.value.fitBounds(layer.getBounds()); // Zoom to the selected province

    // Close any open tooltips
    map.value.eachLayer(function (l) {
      if (l.getTooltip && l.getTooltip()) {
        l.closeTooltip();
      }
    });
    emit('objectSelected', 'province', feature.properties);  // Emit event with section properties
    L.DomEvent.stopPropagation(e);

  });
}

function loadProvinces(section) {
  d3.json('/election/map/' + section + '.json').then((soumData) => {
    provinceLayer.value = L.geoJSON(soumData, {
      onEachFeature: onEachProvince,
      style: redStyle // Apply the default style to soums
    }).addTo(map.value);

    // Add a button to go back to province view


    backButtonSection.addTo(map.value);
  });
}

function onEachSection(feature, layer) {

 const percent = Math.floor(Math.random() * 20) + 30;
  layer.bindTooltip(`${feature.properties.name}`, {permanent: false, sticky: true, direction: 'auto'});

  // Adding label to each section
  // const center = getPolygonCenter(feature.geometry.coordinates[0][0]);
  // const label = L.marker(center, {
  //   icon: L.divIcon({
  //     className: 'label',
  //     html: `${feature.properties.section}-р бүс`,
  //     iconSize: [60, 40],
  //     iconAnchor: [30, 20] // Center the label icon
  //   })
  // }).addTo(map.value);

  layer.on('click', (e) => {

    // map.value.removeLayer(sectionLayer.value);
    //
    // selectedSection.value = feature.properties.section
    // loadProvinces(feature.properties.section);
    // map.value.fitBounds(layer.getBounds()); // Zoom to the selected province
    //
    // // Close any open tooltips
    // map.value.eachLayer(function (l) {
    //   if (l.getTooltip && l.getTooltip()) {
    //     l.closeTooltip();
    //   }
    // });
    // emit('objectSelected', 'section', feature.properties);  // Emit event with section properties
    // L.DomEvent.stopPropagation(e);

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




  d3.json('/election/map/khoroo.geojson').then((provinceData) => {

    let features = [];
    if(props.selectionFeature.section === "8"){
      features = provinceData.features.filter(f=>f.properties.name_desc === 'Баянзүрх');
    } else if(props.selectionFeature.section === "9"){
      features = provinceData.features.filter(f=>f.properties.name_desc === 'Баянгол');
    } else if(props.selectionFeature.section === "10"){
      features = provinceData.features.filter(f=>f.properties.name_desc === 'Сүхбаатар' || f.properties.name_desc === 'Чингэлтэй');
    } else if(props.selectionFeature.section === "11"){
      features = provinceData.features.filter(f=>f.properties.name_desc === 'Сонгинохайрхан');
    }else if(props.selectionFeature.section === "12"){
      features = provinceData.features.filter(f=>f.properties.name_desc === 'Хан-Уул');
    }else if(props.selectionFeature.section === "13"){
      features = provinceData.features.filter(f=>f.properties.name_desc === 'Багануур' || f.properties.name_desc === 'Багахангай' || f.properties.name_desc === 'Налайх');
    }

    backButtonSection.addTo(map.value);
    sectionLayer.value = L.geoJSON({
      ...provinceData,
      features:features
    }, {
      onEachFeature: onEachSection,
      style: getStyle // Apply the style based on the feature properties
    }).addTo(map.value);


    map.value.fitBounds(sectionLayer.value.getBounds());
  });
}

onMounted(() => {
  initMap();
});
</script>



<style scoped>

</style>
