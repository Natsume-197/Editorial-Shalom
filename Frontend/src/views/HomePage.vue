<template>
  <div class="flex justify-center m-20 items-center flex-col">
    <h1 class="text-2xl font-bold">{{ $t("welcomeMsg") }}</h1>
  </div>
  <h1 class="text-2xl font-bold">i18n soporte</h1>
  <label for="locale">Locale: </label>
  <select
    v-model="$i18n.locale"
    id="locale"
    @change="setLanguageStorage($i18n.locale)"
  >
    <option
      v-for="locale in $i18n.availableLocales"
      :value="locale"
      :key="locale"
    >
      {{ locale }}
    </option>
  </select>


</template>

<script>
export default {
  setLanguageStorage(locale) {
    localStorage.setItem("language", locale);
  },
};
</script>