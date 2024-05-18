<template>
  <portal to="header-left">
    <div class="flex-grow flex">

      <a-menu :selectedKeys="['province']" mode="horizontal" class="flex-grow">
        <a-menu-item key="province" class="doc-sub-menu">
          <template #icon>
            <inline-svg class="svg-icon ml-2" src="/assets/icons/duotone/Files/Selected-file.svg"/>
          </template>
          <nuxt-link :to="`/admin/map`" class="pl-1.5">
            Улсын хэмжээнд
          </nuxt-link>
        </a-menu-item>
        <a-menu-item key="ub" class="doc-sub-menu">
          <template #icon>
            <inline-svg class="svg-icon" src="/assets/icons/duotone/Communication/Archive.svg"/>
          </template>
          <nuxt-link :to="`/admin/map`">
            Улаанбаатар
          </nuxt-link>
        </a-menu-item>


      </a-menu>

    </div>
  </portal>
  <portal to="sub-top-menu">
  </portal>
</template>
<script setup>

import SummaryBar from "~/components/Election/SummaryBar.vue";
</script>
