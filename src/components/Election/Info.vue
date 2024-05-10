<template>
  <div>
    <div class="relative shadow rounded-lg bg-white">
      <div class="absolute top-0 h-2 w-full bg-red-500 rounded-t-lg"></div>
      <div class="p-4">

        <div>
          <div class="pt-4 pb-2 flex justify-between space-x-10 ">
            <div class="">
              <span class="text-base font-semibold text-gray-800">President: Oregon</span>
              <p>7 Electoral Votes</p>
            </div>
            <div class="space-y-1 text-right text-blue-500">
              <div class="">
                <span class="text-base font-bold">Biden</span>
                <p>7 Electoral Votes</p>
              </div>
              <a-button size="small" shape="round">
                <template #icon> + </template>
                <span class="text-[10px] font-bold uppercase">Follow</span>
              </a-button>
            </div>
          </div>
        </div>

        <div class="">
          <div class="py-2 sm:grid sm:grid-cols-4 sm:gap-4 text-gray-500">
            <dt class="sm:col-span-2">Candidate</dt>
            <dd class="sm:mt-0 sm:col-span-1 text-right">%</dd>
            <dd class="sm:mt-0 sm:col-span-1 text-right">Votes</dd>
          </div>
          <div class="border-t border-gray-200 px-4 py-5 sm:p-0">
            <dl class="sm:divide-y sm:divide-gray-200 border-b border-gray-200">
              <div class="py-1 sm:grid sm:grid-cols-4 sm:gap-4">
                <dt class="text-gray-500 sm:col-span-2">Biden</dt>
                <dd class="dark:text-white sm:mt-0 sm:col-span-1 text-right">56.5%</dd>
                <dd class="dark:text-white sm:mt-0 sm:col-span-1 text-right">1,340,383</dd>
              </div>
              <div class="py-1 sm:grid sm:grid-cols-4 sm:gap-4">
                <dt class="text-gray-500 sm:col-span-2">Candidate</dt>
                <dd class="dark:text-white sm:mt-0 sm:col-span-1 text-right">56.5%</dd>
                <dd class="dark:text-white sm:mt-0 sm:col-span-1 text-right">1,340,383</dd>
              </div>
            </dl>
          </div>


          <div class="pt-4 flex justify-between space-x-10 ">
            <div class="text-xs">
              <span class="font-semibold text-gray-500">Est. 99% In</span>
              <p >Updated 08:37 p.m. ET, Dec. 5</p>
            </div>
            <a-button shape="round" >Full details</a-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>

</script>

<style scoped lang="less">

</style>
