<template>
  <div id="map-ub" class="map-container h-full w-full"></div>
</template>

<script setup>
import {defineEmits, onMounted, ref} from 'vue';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import * as d3 from 'd3';
import { getStyle, whiteStyle, redStyle } from '~/components/Election/mapStyle';
import { provinceTooltip, sectionTooltip, soumTooltip } from '~/components/Election/mapTooltip';
import { getPolygonCenter } from '~/components/Election/mapUtils';

const map = ref(null);
const sectionLayer = ref(null);
const provinceLayer = ref(null);
const soumLayer = ref(null);
const selectedProvince = ref(null);
const selectedSection = ref(null);


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

const emit = defineEmits(['objectSelected']);

function initMap() {
  map.value = L.map('map-ub').setView([48.0339078, 107.508754], 8);
  L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
    attribution: '',
    maxZoom: 18,
  }).addTo(map.value);

  d3.json('/election/map/Ulaanbaatar.json').then((data) => {
    sectionLayer.value = L.geoJSON(data, {
      onEachFeature: onEachSection,
      style: getStyle
    }).addTo(map.value);

    map.value.fitBounds(sectionLayer.value.getBounds());
  });
}

function onEachSection(feature, layer) {
  layer.bindTooltip(`${feature.properties.section}-р бүс`, {permanent: true, sticky: true, direction: 'auto'});
  const center = getPolygonCenter(feature.geometry.coordinates[0][0]);
  // L.marker(center, {
  //   icon: L.divIcon({
  //     className: 'label',
  //     html: `${feature.properties.section}`,
  //     iconSize: [60, 40],
  //     iconAnchor: [30, 20]
  //   })
  // }).addTo(map.value);

  layer.on('click', (e) => {
    selectedSection.value = feature.properties.section;


    emit('objectSelected', 'section-ub', feature.properties);
    // loadProvinces(feature.properties.section);
    // map.value.fitBounds(layer.getBounds());
    // L.DomEvent.stopPropagation(e);
  });
}

function loadProvinces(section) {
  d3.json('/election/map/' + section + '.json').then((data) => {
    if (provinceLayer.value) {
      map.value.removeLayer(provinceLayer.value);
    }
    provinceLayer.value = L.geoJSON(data, {
      onEachFeature: onEachProvince,
      style: redStyle
    }).addTo(map.value);
  });
}

function onEachProvince(feature, layer) {
  layer.bindTooltip(provinceTooltip(feature), {permanent: false, sticky: false, direction: 'auto'});
  layer.on('click', () => {
    selectedProvince.value = feature.properties.name;
    loadSoums(feature.properties.name);
    map.value.fitBounds(layer.getBounds());
  });
}

function loadSoums(name) {
  d3.json('/election/map/soums/' + name + '.json').then((data) => {
    if (soumLayer.value) {
      map.value.removeLayer(soumLayer.value);
    }
    soumLayer.value = L.geoJSON(data, {
      onEachFeature: onEachSoum,
      style: redStyle
    }).addTo(map.value);
  });
}

function onEachSoum(feature, layer) {
  layer.bindTooltip(soumTooltip(feature), {permanent: false, sticky: true, direction: 'auto'});
}

onMounted(initMap);
</script>

<style scoped>
.map-container {
  height: 100%;
  width: 100%;
}
</style>
