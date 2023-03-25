<template>
    <div
    
    :class="{
      dark: styleStore.darkMode,
      'overflow-hidden lg:overflow-visible': isAsideMobileExpanded,
    }"
  >
    <div
    
      :class="[layoutAsidePadding, { 'ml-60 lg:ml-0': isAsideMobileExpanded }]"
      class="pt-14 min-h-screen w-screen transition-position lg:w-auto bg-gray-50 dark:bg-blue-darkBg dark:text-slate-100" 
    >
      <NavBar
        :menu="menuNavBar"
        :class="[
          layoutAsidePadding,
          { 'ml-60 lg:ml-0': isAsideMobileExpanded },
        ]"
        @menu-click="menuClick"
      >
        <NavBarItemPlain
          display="flex lg:hidden"
          @click.prevent="isAsideMobileExpanded = !isAsideMobileExpanded"
        >
          <BaseIcon
            :path="isAsideMobileExpanded ? mdiBackburger : mdiForwardburger"
            size="24"
          />
        </NavBarItemPlain>
        <NavBarItemPlain
          display="hidden lg:flex xl:hidden"
          @click.prevent="isAsideLgActive = true"
        >
          <BaseIcon :path="mdiMenu" size="24" />
        </NavBarItemPlain>
        <NavBarItemPlain use-margin>

        </NavBarItemPlain>
      </NavBar>
      <AsideMenu
      
        :is-aside-mobile-expanded="isAsideMobileExpanded"
        :is-aside-lg-active="isAsideLgActive"
        :menu="menuAside"
        @menu-click="menuClick"
        @aside-lg-close-click="isAsideLgActive = false"
      />
      <slot />
      
      <FooterBar>
      </FooterBar>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { computed, onBeforeMount, ref } from "vue";
import { userStore } from "../stores/user";
import { useToast } from "vue-toastification";
import { api } from "../utils/axios";

// Components
import { mdiForwardburger, mdiBackburger, mdiMenu } from "@mdi/js";
import FooterBar from "../components/dashboard/FooterBar.vue";
import BaseIcon from "../components/dashboard/minimal/BaseIcon.vue";
import NavBar from "../components/dashboard/navbar/NavBar.vue";
import NavBarItemPlain from "../components/dashboard/navbar/NavBarItemPlain.vue";
import FormControl from "../components/dashboard/form/FormControl.vue";
import AsideMenu from "../components/dashboard/asideMenu/AsideMenu.vue";

// Assets CSS
import { useStyleStore } from "../stores/style";
import { useMainStore } from "../stores/main";

// Navbar and menu content
import menuNavBar from "../views/admin/routes/menuNavBar";
import menuAside from "../views/admin/routes/menuAside";

// Actions
import { logout } from "../utils/actions"

const router = useRouter();
const layoutAsidePadding = "xl:pl-60";
const styleStore = useStyleStore();

const isAsideMobileExpanded = ref(false);
const isAsideLgActive = ref(false);

router.beforeEach(() => {
  isAsideMobileExpanded.value = false;
  isAsideLgActive.value = false;
});

const menuClick = (event, item) => {
  if (item.isToggleLightDark) {
    styleStore.setDarkMode();
  }
  if (item.isLogout) {
    logout()
  }
};

const store = userStore();
useMainStore().setUser({
  name: store.userInfo.name
 
});

const content = ref("You are not logged in!");
const toast = useToast();

onBeforeMount(() => {
  api.get("/dashboard").then((response) => {
    content.value = response.data.message;
  });
});
</script>
