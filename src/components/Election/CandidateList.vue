<template>
  <div class="p-2 h-full overflow-y-auto bg-white">

    <ul class="grid grid-cols-3 gap-1">
      <li v-for="(candidate, index) in candidateList" :key="index"
          :class="{'bg-green-100': candidate.selected, 'bg-gray-200': !candidate.selected}"
          class="rounded p-1 shadow transition-colors duration-300 text-xxs2">
        {{index+1}} {{ candidate.name }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const baseNames = ['Оюун-Эрдэн', 'Бат-Эрдэнэ', 'Баярцогт', 'Ганхуяг', 'Доржготов', 'Энхтүвшин', 'Нямдорж', 'Баттулга', 'Эрдэнэбат', 'Сүхбат', 'Чимэддорж', 'Батбаяр', 'Наранбаатар', 'Ууганбаяр', 'Түвшинбаяр', 'Алтангэрэл', 'Мөнхбаатар', 'Цогзолмаа', 'Жаргалсайхан', 'Хүрэлбаатар', 'Тэмүүжин', 'Эрдэнэчимэг', 'Болормаа', 'Одбаяр', 'Хатанбаатар', 'Сарангэрэл', 'Энхжаргал', 'Мөнхцэцэг', 'Ганболд', 'Лхагвасүрэн', 'Батжаргал', 'Амартүвшин', 'Эрдэнэсүх', 'Дуламсүрэн', 'Эрдэнэтуяа', 'Хүрэлсүх', 'Сайханбилэг', 'Жамъян', 'Баасанжав', 'Төмөрбаатар', 'Цэрэнбат', 'Гансүх', 'Баянмөнх', 'Амарсанаа', 'Жаргал', 'Цэвэгмид', 'Намсрай', 'Түмэнбаяр', 'Сайнбуян'];
const candidateList = ref([]);

const generateCandidates = () => {
  let allCandidates = [];
  let usedNames = new Set();
  while (usedNames.size < 48) {
    const randomIndex = Math.floor(Math.random() * baseNames.length);
    const surname = baseNames[randomIndex];
    const name = baseNames[Math.floor(Math.random() * baseNames.length)];
    const fullName = `${surname} ${name}`;
    if (!usedNames.has(fullName)) {
      allCandidates.push({
        name: fullName,
        selected: usedNames.size < 20  // Select first 20 as members
      });
      usedNames.add(fullName);
    }
  }
  candidateList.value = allCandidates;
};

generateCandidates();
</script>

<style scoped>
/* Tailwind CSS is applied via class names, so no additional CSS needed here unless customization is required */
</style>
