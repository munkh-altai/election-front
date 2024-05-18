
export function soumTooltip(feature){
  return `<div>
    <div class="relative  rounded-lg bg-white">
      <div class="absolute top-0 h-2 w-full bg-red-500 rounded-t-lg"></div>
      <div class="p-4">

        <div>
          <div class="pt-4 flex justify-between space-x-10 ">
            <div class="">
              <span class="text-base font-semibold text-gray-800">${feature.properties.NAME} сум</span>
              <p>Сонгогчийн нийт тоо: 3,000,000</p>
            </div>
            <div class="space-y-1 text-right text-red-500">
              <div class="">
                <span class="text-base font-bold">МАН</span>
                <p class="text-[11px] font-bold">Тэгүүлж буй</p>
              </div>
            </div>
          </div>
          <div class="pb-2 flex justify-between space-x-10 font-semibold">

          </div>
        </div>

        <div class="">
          <div class="py-2 sm:grid sm:grid-cols-4 sm:gap-4 text-gray-500">
            <dt class="sm:col-span-2">Нам, Эвсэл</dt>
            <dd class="sm:mt-0 sm:col-span-1 text-right">%</dd>
            <dd class="sm:mt-0 sm:col-span-1 text-right">Дэмжигч</dd>
          </div>
          <div class="border-t border-gray-200 px-4 py-5 sm:p-0">
            <dl class="sm:divide-y sm:divide-gray-200 border-b border-gray-200">
              <div class="py-1 sm:grid sm:grid-cols-4 sm:gap-4 font-medium">
                <dt class="text-gray-800 sm:col-span-2 flex items-center space-x-2">
                  <span class="h-2 w-2 rounded-full flex flex-none bg-red-500"></span>
                  <span class="text-red-500">МАН</span>
                </dt>
                <dd class="dark:text-white sm:mt-0 sm:col-span-1 text-right">56.5%</dd>
                <dd class="dark:text-white sm:mt-0 sm:col-span-1 text-right">1,340,383</dd>
              </div>
              <div class="py-1 sm:grid sm:grid-cols-4 sm:gap-4 font-medium">
                <dt class="text-gray-800 sm:col-span-2 flex items-center space-x-2">
                  <span class="h-2 w-2 rounded-full flex flex-none bg-blue-600"></span>
                  <span class="text-blue-600">АН</span>
                </dt>
                <dd class="dark:text-white sm:mt-0 sm:col-span-1 text-right">20.5%</dd>
                <dd class="dark:text-white sm:mt-0 sm:col-span-1 text-right">540,383</dd>
              </div>
              <div class="py-1 sm:grid sm:grid-cols-4 sm:gap-4 font-medium">
                <dt class="text-gray-800 sm:col-span-2 flex items-center space-x-2">
                  <span class="h-2 w-2 rounded-full flex flex-none bg-fuchsia-800"></span>
                  <span>Бусад</span>
                </dt>
                <dd class="dark:text-white sm:mt-0 sm:col-span-1 text-right">15.5%</dd>
                <dd class="dark:text-white sm:mt-0 sm:col-span-1 text-right">10,383</dd>
              </div>
              <div class="py-1 sm:grid sm:grid-cols-4 sm:gap-4 font-medium">
                <dt class="text-gray-800 sm:col-span-2 flex items-center space-x-2">
                  <span class="h-2 w-2 rounded-full flex flex-none bg-gray-500"></span>
                  <span>Саарал</span>
                </dt>
                <dd class="dark:text-white sm:mt-0 sm:col-span-1 text-right">10.5%</dd>
                <dd class="dark:text-white sm:mt-0 sm:col-span-1 text-right">2,383</dd>
              </div>
            </dl>
          </div>


          <div class="pt-4 flex justify-between space-x-10 ">
            <div class="text-xs">
              <span class="font-semibold text-gray-500">Шинэчлэгдсэн огноо</span>
              <p >2024-05-10 12:50</p>
            </div>
            <a-button shape="round" >Дэлгэрэнгүй</a-button>
          </div>
        </div>
      </div>
    </div>
  </div>`
}
export function provinceTooltip(feature){
  return `<div>
    <div class="relative  rounded-lg bg-white">
      <div class="absolute top-0 h-2 w-full bg-red-500 rounded-t-lg"></div>
      <div class="p-4">

        <div>
          <div class="pt-4 flex justify-between space-x-10 ">
            <div class="">
              <span class="text-base font-semibold text-gray-800">${feature.properties.name_MN} аймаг</span>
              <p>Сонгогчийн нийт тоо: 3,000,000</p>
            </div>
            <div class="space-y-1 text-right text-red-500">
              <div class="">
                <span class="text-base font-bold">МАН</span>
                <p class="text-[11px] font-bold">Тэгүүлж буй</p>
              </div>

            </div>
          </div>
          <div class="pb-2 flex justify-between space-x-10 font-semibold">

          </div>
        </div>

        <div class="">
          <div class="py-2 sm:grid sm:grid-cols-4 sm:gap-4 text-gray-500">
            <dt class="sm:col-span-2">Нам, Эвсэл</dt>
            <dd class="sm:mt-0 sm:col-span-1 text-right">%</dd>
            <dd class="sm:mt-0 sm:col-span-1 text-right">Дэмжигч</dd>
          </div>
          <div class="border-t border-gray-200 px-4 py-5 sm:p-0">
            <dl class="sm:divide-y sm:divide-gray-200 border-b border-gray-200">
              <div class="py-1 sm:grid sm:grid-cols-4 sm:gap-4 font-medium">
                <dt class="text-gray-800 sm:col-span-2 flex items-center space-x-2">
                  <span class="h-2 w-2 rounded-full flex flex-none bg-red-500"></span>
                  <span class="text-red-500">МАН</span>
                </dt>
                <dd class="dark:text-white sm:mt-0 sm:col-span-1 text-right">56.5%</dd>
                <dd class="dark:text-white sm:mt-0 sm:col-span-1 text-right">1,340,383</dd>
              </div>
              <div class="py-1 sm:grid sm:grid-cols-4 sm:gap-4 font-medium">
                <dt class="text-gray-800 sm:col-span-2 flex items-center space-x-2">
                  <span class="h-2 w-2 rounded-full flex flex-none bg-blue-600"></span>
                  <span class="text-blue-600">АН</span>
                </dt>
                <dd class="dark:text-white sm:mt-0 sm:col-span-1 text-right">20.5%</dd>
                <dd class="dark:text-white sm:mt-0 sm:col-span-1 text-right">540,383</dd>
              </div>
              <div class="py-1 sm:grid sm:grid-cols-4 sm:gap-4 font-medium">
                <dt class="text-gray-800 sm:col-span-2 flex items-center space-x-2">
                  <span class="h-2 w-2 rounded-full flex flex-none bg-fuchsia-800"></span>
                  <span>Бусад</span>
                </dt>
                <dd class="dark:text-white sm:mt-0 sm:col-span-1 text-right">15.5%</dd>
                <dd class="dark:text-white sm:mt-0 sm:col-span-1 text-right">10,383</dd>
              </div>
              <div class="py-1 sm:grid sm:grid-cols-4 sm:gap-4 font-medium">
                <dt class="text-gray-800 sm:col-span-2 flex items-center space-x-2">
                  <span class="h-2 w-2 rounded-full flex flex-none bg-gray-500"></span>
                  <span>Саарал</span>
                </dt>
                <dd class="dark:text-white sm:mt-0 sm:col-span-1 text-right">10.5%</dd>
                <dd class="dark:text-white sm:mt-0 sm:col-span-1 text-right">2,383</dd>
              </div>
            </dl>
          </div>


          <div class="pt-4 flex justify-between space-x-10 ">
            <div class="text-xs">
              <span class="font-semibold text-gray-500">Шинэчлэгдсэн огноо</span>
              <p >2024-05-10 12:50</p>
            </div>
            <a-button shape="round" >Дэлгэрэнгүй</a-button>
          </div>
        </div>
      </div>
    </div>
  </div>`
}
export function sectionTooltip(feature){
  return `<div>
    <div class="relative  rounded-lg bg-white">
    <div class="absolute top-0 h-2 w-full bg-red-500 rounded-t-lg"></div>
  <div class="p-4">

    <div>
      <div class="pt-4 flex justify-between space-x-10 ">
        <div class="">
          <span class="text-base font-semibold text-gray-800">${feature.properties.section}-р бүс</span>
          <p>Сонгогчийн нийт тоо: 3,000,000</p>
        </div>
        <div class="space-y-1 text-right text-red-500">
          <div class="">
            <span class="text-base font-bold">МАН</span>
            <p class="text-[11px] font-bold">Тэгүүлж буй</p>
          </div>

        </div>
      </div>
      <div class="pb-2 flex justify-between space-x-10 font-semibold">
        ${feature.properties.units}
      </div>
    </div>

    <div class="">
      <div class="py-2 sm:grid sm:grid-cols-4 sm:gap-4 text-gray-500">
        <dt class="sm:col-span-2">Нам, Эвсэл</dt>
        <dd class="sm:mt-0 sm:col-span-1 text-right">%</dd>
        <dd class="sm:mt-0 sm:col-span-1 text-right">Дэмжигч</dd>
      </div>
      <div class="border-t border-gray-200 px-4 py-5 sm:p-0">
        <dl class="sm:divide-y sm:divide-gray-200 border-b border-gray-200">
          <div class="py-1 sm:grid sm:grid-cols-4 sm:gap-4 font-medium">
            <dt class="text-gray-800 sm:col-span-2 flex items-center space-x-2">
              <span class="h-2 w-2 rounded-full flex flex-none bg-red-500"></span>
              <span class="text-red-500">МАН</span>
            </dt>
            <dd class="dark:text-white sm:mt-0 sm:col-span-1 text-right">56.5%</dd>
            <dd class="dark:text-white sm:mt-0 sm:col-span-1 text-right">1,340,383</dd>
          </div>
          <div class="py-1 sm:grid sm:grid-cols-4 sm:gap-4 font-medium">
            <dt class="text-gray-800 sm:col-span-2 flex items-center space-x-2">
              <span class="h-2 w-2 rounded-full flex flex-none bg-blue-600"></span>
              <span class="text-blue-600">АН</span>
            </dt>
            <dd class="dark:text-white sm:mt-0 sm:col-span-1 text-right">20.5%</dd>
            <dd class="dark:text-white sm:mt-0 sm:col-span-1 text-right">540,383</dd>
          </div>
          <div class="py-1 sm:grid sm:grid-cols-4 sm:gap-4 font-medium">
            <dt class="text-gray-800 sm:col-span-2 flex items-center space-x-2">
              <span class="h-2 w-2 rounded-full flex flex-none bg-fuchsia-800"></span>
              <span>Бусад</span>
            </dt>
            <dd class="dark:text-white sm:mt-0 sm:col-span-1 text-right">15.5%</dd>
            <dd class="dark:text-white sm:mt-0 sm:col-span-1 text-right">10,383</dd>
          </div>
          <div class="py-1 sm:grid sm:grid-cols-4 sm:gap-4 font-medium">
            <dt class="text-gray-800 sm:col-span-2 flex items-center space-x-2">
              <span class="h-2 w-2 rounded-full flex flex-none bg-gray-500"></span>
              <span>Саарал</span>
            </dt>
            <dd class="dark:text-white sm:mt-0 sm:col-span-1 text-right">10.5%</dd>
            <dd class="dark:text-white sm:mt-0 sm:col-span-1 text-right">2,383</dd>
          </div>
        </dl>
      </div>


      <div class="pt-4 flex justify-between space-x-10 ">
        <div class="text-xs">
          <span class="font-semibold text-gray-500">Шинэчлэгдсэн огноо</span>
          <p >2024-05-10 12:50</p>
        </div>
        <a-button shape="round" >Дэлгэрэнгүй</a-button>
      </div>
    </div>
  </div>
</div>
</div>`
}
