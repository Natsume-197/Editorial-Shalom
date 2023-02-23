<script>
import { RouterView } from "vue-router";

export default {
  created() {
    const savedLanguage = localStorage.getItem("language");
    if (savedLanguage) {
      this.$i18n.locale = savedLanguage;
    }
  },
};
</script>

<template>
  <main>
    <RouterView />
  </main>
</template>
