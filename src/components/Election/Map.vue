<template>
  <div class="map row-span-5 relative">
    <div class="absolute top-0.5 right-0.5 z-20">
      <a-switch v-model:checked="onlyOronNutag" @change="onlyOronNutagChanged" />

      <span class="text-xxs"> Зөвхөн орон нутгийн мэдээлэл</span>
    </div>
    <div class="flex justify-center flex-col items-center space-x-2  absolute bottom-0 left-1 z-20">

      <div v-if="props.selectionFeature">
        Орон нутаг: {{props.selectionFeature.section}} -р бүс
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

import {getStyle, redStyle, whiteStyle} from "~/components/Election/mapStyle";
import {provinceTooltip, sectionTooltip, soumTooltip} from "~/components/Election/mapTooltip";
import {getPolygonCenter} from "~/components/Election/mapUtils";

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
  div.innerHTML = '<a href="#" title="Тойргоор харах" class="map-back-btn">Улсын хэмээнд харах</a>';
  div.onclick = () => {
    selectedProvince.value = null;
    selectedSection.value = null;

    try {
      // Clear all tooltips
      map.value.eachLayer(layer => {
        if (layer.getTooltip) {
          const tooltip = layer.getTooltip();
          if (tooltip) {
            map.value.removeLayer(tooltip);
          }
        }
      });

      if (provinceLayer.value && map.value && map.value.hasLayer(provinceLayer.value)) {
        map.value.removeLayer(provinceLayer.value);
      }
      if (soumLayer.value && map.value && map.value.hasLayer(soumLayer.value)) {
        map.value.removeLayer(soumLayer.value);
      }

      map.value.removeControl(backButtonProvince);
      map.value.removeControl(backButtonSection);
      map.value.addLayer(sectionLayer.value);

      if (sectionLayer.value && sectionLayer.value.getBounds().isValid()) {
        map.value.fitBounds(sectionLayer.value.getBounds());
      }

      emit('objectSelected', 'country', null); // Emit event with section properties
    } catch (error) {
      console.error("Error handling back button section:", error);
      // Retry mechanism or further error handling logic can be added here if needed
    }
  };
  return div;
};

backButtonProvince.onAdd = function () {
  const div = L.DomUtil.create('div', '');
  div.innerHTML = '<a href="#" class="px-2">Бүсээр харах</a>';
  div.onclick = () => {
    try {
      // Clear all tooltips
      map.value.eachLayer(layer => {
        if (layer.getTooltip) {
          const tooltip = layer.getTooltip();
          if (tooltip) {
            map.value.removeLayer(tooltip);
          }
        }
      });

      if (soumLayer.value && map.value && map.value.hasLayer(soumLayer.value)) {
        map.value.removeLayer(soumLayer.value);
      }

      map.value.removeControl(backButtonProvince);

      selectedProvince.value = null;

      map.value.addLayer(provinceLayer.value);

      if (provinceLayer.value && provinceLayer.value.getBounds().isValid()) {
        map.value.fitBounds(provinceLayer.value.getBounds());
      }
    } catch (error) {
      console.error("Error handling back button province:", error);
      // Retry mechanism or further error handling logic can be added here if needed
    }
  };
  return div;
};


const emit = defineEmits(['objectSelected', 'onlyOronNutagChanged']);

function onlyOronNutagChanged(){
  emit('onlyOronNutagChanged', onlyOronNutag.value);
}


function loadSoums(name, feature) {
  d3.json('/election/map/soums/' + name + '.json').then((soumData) => {
    soumLayer.value = L.geoJSON(soumData, {
      onEachFeature: onEachSoum,
      style: redStyle // Apply the default style to soums
    }).addTo(map.value);

    // Add a button to go back to province view

    if (soumLayer.value && soumLayer.value.getBounds().isValid()) {
      map.value.fitBounds(soumLayer.value.getBounds()); // Zoom to the selected province
    }
    emit('objectSelected', 'province', feature.properties, soumData.features);  // Emit event with section properties


    backButtonProvince.addTo(map.value);
  });
}

function onEachSoum(feature, layer) {

    layer.bindTooltip(`${feature.properties.NAME} сум`, {permanent: false, sticky: true, direction: 'auto'});

  // Add any soum-specific interactions here

  layer.on('click', (e) => {



  });
}

function onEachProvince(feature, layer) {

    layer.bindTooltip(`${feature.properties.name_MN} аймаг`, {permanent: true, sticky: false, direction: 'auto'});


  layer.on('click', (e) => {

    map.value.removeLayer(provinceLayer.value);

    selectedProvince.value = feature.properties.name_MN
    loadSoums(feature.properties.name, feature);


    // Close any open tooltips
    map.value.eachLayer(function (l) {
      if (l.getTooltip && l.getTooltip()) {
        l.closeTooltip();
      }
    });

  });
}

function loadProvinces(section, feature) {
  d3.json('/election/map/' + section + '.json').then((soumData) => {
    provinceLayer.value = L.geoJSON(soumData, {
      onEachFeature: onEachProvince,
      style: redStyle // Apply the default style to soums
    }).addTo(map.value);

    // Add a button to go back to province view


    backButtonSection.addTo(map.value);

    emit('objectSelected', 'section', feature.properties, soumData.features);  // Emit event with section properties


  });
}

function onEachSection(feature, layer) {



      layer.bindTooltip(`${feature.properties.section}-р бүс`, {permanent: true, sticky: false, direction: 'auto'});



  // // Adding label to each section
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



    map.value.removeLayer(sectionLayer.value);

    selectedSection.value = feature.properties.section
    loadProvinces(feature.properties.section, feature);
    if (layer && layer.getBounds().isValid()) {
      map.value.fitBounds(layer.getBounds()); // Zoom to the selected province
    }


    // Close any open tooltips
    map.value.eachLayer(function (l) {
      if (l.getTooltip && l.getTooltip()) {
        l.closeTooltip();
      }
    });

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
  d3.json('/election/map/mongol.geojson').then((provinceData) => {
    L.geoJSON(provinceData, {
      style: whiteStyle // Apply the style based on the feature properties
    }).addTo(map.value);
  });

  d3.json('/election/map/Election2024.json').then((provinceData) => {
    sectionLayer.value = L.geoJSON(provinceData, {
      onEachFeature: onEachSection,
      style: getStyle // Apply the style based on the feature properties
    }).addTo(map.value);


    if (sectionLayer.value && sectionLayer.value.getBounds().isValid()) {
      map.value.fitBounds(sectionLayer.value.getBounds());
    }

  });
}

onMounted(() => {
  initMap();
});
</script>



<style scoped>
.countryLabel{
  background: rgba(255, 255, 255, 0);
  border:0;
  border-radius:0px;
  box-shadow: 0 0px 0px;
}
</style>
