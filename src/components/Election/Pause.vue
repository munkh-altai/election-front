<script setup >
import { useSwiper } from 'swiper/vue';
import { ref } from 'vue';
const running  = ref(true);
const swiper = useSwiper();

function play() {
  running.value = true;
  swiper.value.autoplay.start();
}
function pause() {
  running.value = false;
  swiper.value.autoplay.stop();
}
</script>

<template>
  <div class="absolute top-0 right-0 z-20">

    <inline-svg @click="pause" v-if="running" class="w-8 h-8 svg-icon cursor-pointer" src="/election/pause.svg"/>
    <inline-svg @click="play" v-show="!running" class="w-8 h-8 svg-icon cursor-pointer" src="/election/play.svg"/>

  </div>
</template>
