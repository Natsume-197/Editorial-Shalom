<script setup>
import { mdiTranslate } from "@mdi/js";
import { ref, reactive, computed, watch } from "vue";
import { useI18n } from "vue-i18n";

import BaseIcon from "../../dashboard/minimal/BaseIcon.vue";
const i18nLocale = useI18n();
const { t } = useI18n();

let translate = computed(() => {
  return {
    es: t("navbar.languages.spanish"),
    en: t("navbar.languages.english"),
  };
});

const data = reactive({
  isOptionsExpanded: false,
  selectedOption: translate.value[i18nLocale.locale.value],
});

const setOption = (option) => {
  data.selectedOption = translate.value[option];
  data.isOptionsExpanded = false;
  localStorage.setItem("language", option);
  window.location.reload();
};
</script>

<template>
  <div class="relative sm:block text-xl font-semibold">
    <button
      class="flex items-center justify-between px-3 py-2 bg-white w-full border border-gray-500 rounded-lg"
      @click="data.isOptionsExpanded = !data.isOptionsExpanded"
      @blur="data.isOptionsExpanded = false"
    >
      <BaseIcon
        :path="mdiTranslate"
        w="w-10 md:w-5"
        h="h-10 md:h-5"
        size="24"
        class="md:mr-2"
      />
      <span class="">{{ data.selectedOption }}</span>
      <svg
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        class="h-4 w-4 transform transition-transform duration-200 ease-in-out"
        :class="data.isOptionsExpanded ? 'rotate-180' : 'rotate-0'"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M19 9l-7 7-7-7"
        />
      </svg>
    </button>
    <transition
      enter-active-class="transform transition duration-500 ease-custom"
      enter-class="-translate-y-1/2 scale-y-0 opacity-0"
      enter-to-class="translate-y-0 scale-y-100 opacity-100"
      leave-active-class="transform transition duration-300 ease-custom"
      leave-class="translate-y-0 scale-y-100 opacity-100"
      leave-to-class="-translate-y-1/2 scale-y-0 opacity-0"
    >
      <ul
        v-show="data.isOptionsExpanded"
        class="absolute left-0 right-0 mb-4 mt-1 text-xl font-semibold bg-white divide-y rounded-lg shadow-lg overflow-hidden"
      >
        <li
          v-for="locale in $i18n.availableLocales"
          :value="locale"
          :key="locale"
          class="ml-6 cursor-pointer"
          @mousedown.prevent="setOption(locale)"
        >
          {{ translate[locale] }}
        </li>
      </ul>
    </transition>
  </div>
</template>
