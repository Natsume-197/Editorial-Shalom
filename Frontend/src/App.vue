<template>
  <main>
    <NavBar v-show="showNavBar" />
    <RouterView />
    <FooTerVue v-show="showFooter" />
  </main>
</template>

<script>
import { RouterView } from "vue-router";
import NavBar from "./components/NavBar.vue";
import FooTerVue from "./components/Footer.vue";

export default {
  created() {
    const savedLanguage = localStorage.getItem('language')
    if (savedLanguage) {
      this.$i18n.locale = savedLanguage
    }  
  },
  data() {
    return {
      showNavBar: false,
      showFooter: false,
    };
  },
  watch: {
    $route(route) {
      if (
        route.path !== "/login" &&
        route.path !== "/register" &&
        route.path !== "/account/resetPassword" &&
        // route.path !== "/dashboard" &&
        !route.path.includes("/account/resetpassword/")
      ) {
        this.showNavBar = true;
        this.showFooter = true;
      } else {
        this.showNavBar = false;
        this.showFooter = false;
      }
    },
  },
  components: {
    NavBar,
    FooTerVue
  },
};
</script>
