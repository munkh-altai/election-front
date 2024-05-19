<template>
  <div class="h-full w-full  relative px-2 overflow-hidden">
    <div class="h-full w-full  relative  overflow-hidden">
      <a-tabs v-model:activeKey="activeKey"  size="small">
        <a-tab-pane key="1" tab="Дэмжигчид" class="">
          <div class="grid grid-cols-3 gap-2 tab-content">
            <CategoryChart></CategoryChart>
            <CategoryChartMalchin></CategoryChartMalchin>
            <CategoryChartYastan></CategoryChartYastan>
          </div>
        </a-tab-pane>
        <a-tab-pane key="2" tab="Намын жагсаалт" class="">
          <CandidateList class=" tab-content"></CandidateList>
        </a-tab-pane>
        <a-tab-pane key="3" tab="Шилдэг, Хамгийн муу" class="tab-content">
          <TopAndWorst
            :selectionType="selectionType"
            :selectionFeature="selectionFeature"
            :selectionFeatures="selectionFeatures"
          ></TopAndWorst>
        </a-tab-pane>
      </a-tabs>
    </div>
    <div class="absolute top-0.5 right-0 z-20">
      <inline-svg @click="pause" v-if="running" class="w-8 h-8 svg-icon cursor-pointer" src="/election/pause.svg"/>
      <inline-svg @click="play" v-if="!running" class="w-8 h-8 svg-icon cursor-pointer" src="/election/play.svg"/>
    </div>
  </div>
</template>

<script setup>
import {ref, onMounted, onUnmounted, defineProps} from 'vue';
import CategoryChart from './CategoryChart.vue';
import CategoryChartMalchin from './CategoryChartMalchin.vue';
import CategoryChartYastan from './CategoryChartYastan.vue';
import CandidateList from './CandidateList.vue';
import TopAndWorst from './TopAndWorst.vue';

const props = defineProps({
  selectionType: String,
  selectionFeature: Object,
  selectionFeatures: Array,
});

const activeKey = ref('1');
const running = ref(true);
let intervalId = null;

const switchTab = () => {
  if (activeKey.value === '1') {
    activeKey.value = '2';
  } else if (activeKey.value === '2') {
    activeKey.value = '3';
  } else if (activeKey.value === '3') {
    activeKey.value = '1';
  }
};

function play() {
  if (!intervalId) {
    intervalId = setInterval(switchTab, 10000);
  }
  running.value = true;
}

function pause() {
  if (intervalId) {
    clearInterval(intervalId);
    intervalId = null;
  }
  running.value = false;
}

onMounted(() => {
  play();  // Start playing automatically when component is mounted
});

onUnmounted(() => {
  pause();  // Clean up the interval when component is destroyed
});
</script>

<style scoped lang="less">

</style>
