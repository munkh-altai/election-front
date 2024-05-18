<template>
  <div class="h-full w-full pt-2 relative">
    <swiper

      class="z-10"
      :slides-per-view="1"
      :space-between="10"
      :loop="true"
      :autoplay="{ delay: 3000, disableOnInteraction: false, pauseOnMouseEnter:true }"
      :modules="[Autoplay]"
    >
      <swiper-slide>
        <div class="grid grid-cols-3 gap-2">
          <CategoryChart></CategoryChart>
          <CategoryChartMalchin></CategoryChartMalchin>
          <CategoryChartYastan></CategoryChartYastan>
<!--          <CandidateList class="col-span-2"></CandidateList>-->
        </div>
      </swiper-slide>
      <swiper-slide>
        <div class="grid grid-cols-3 gap-2">
<!--          <CategoryChart></CategoryChart>-->
<!--          <CategoryChartMalchin></CategoryChartMalchin>-->
          <CandidateList class="col-span-3"></CandidateList>
        </div>
      </swiper-slide>
      <Pause></Pause>
    </swiper>

  </div>
</template>

<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Autoplay } from 'swiper/modules';
import 'swiper/swiper-bundle.css';

import CategoryChart from './CategoryChart.vue';
import CategoryChartMalchin from './CategoryChartMalchin.vue';
import CategoryChartYastan from './CategoryChartYastan.vue';
import CandidateList from './CandidateList.vue';



import Pause from "~/components/Election/Pause.vue";

</script>

<style scoped lang="less">
/* Add any custom styles you need here */
</style>
