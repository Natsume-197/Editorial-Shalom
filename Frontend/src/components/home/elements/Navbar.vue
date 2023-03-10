<script setup>
import { ref, computed } from "vue";
import { useI18n } from "vue-i18n";
import { userStore } from "../../../stores/user";
import { api } from "../../../utils/axios";
import { useToast } from "vue-toastification";
import { useRouter } from "vue-router";
import BaseDivider from "../../dashboard/minimal/BaseDivider.vue";
import LanguageChooser from "../elements/LanguageChooser.vue";
import SearchBar from "./SearchBar.vue";
import { mdiCartMinus } from "@mdi/js";
import ShoppingCart from "../../../views/principal/ShoppingCart.vue";

import BaseIcon from "../../dashboard/minimal/BaseIcon.vue";

const toast = useToast();
const store = userStore();
const router = useRouter();

const isCartActive = ref(false);

let locale = "";
let isMenuOpen = ref(false);

const isAuth = computed(() => store.isLoggedIn);

const logout = () => {
  api
    .get("/logout")
    .then((response) => {
      // clear pinia state
      store.$patch((state) => {
        state.isLoggedIn = false;
        state.userInfo = {
          name: null,
          email: null,
          roles: null,
        };
      });
      // clear the browser localStorage
      window.localStorage.clear();
      // redirect to Home
      router.push("/");
      // Notify
      toast.success(`${response.data.message}`, {
        timeout: 4000,
        position: "bottom-right",
        icon: true,
      });
    })
    .catch((error) => {
      console.log(error);
      toast.error(`${error.response.data.message}`, {
        timeout: 4000,
        position: "bottom-right",
        icon: true,
      });
    });
};
const user = computed(() => store.userInfo);


</script>

<template>
  <ShoppingCart class="z-50" v-model="isCartActive" />
  <header>
    <nav
      class="bg-white fixed w-full z-30 top-0 inset-x-0 border-b-4 border-yellow-500"
    >
      <div class="px-2 sm:px-6 lg:px-8">
        <div class="relative flex items-center justify-between h-20">
          <div class="absolute flex items-center lg:hidden">
            <button
              class="inline-flex items-center justify-center p-2 rounded-md text-gray-800 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
              @click="isMenuOpen = !isMenuOpen"
            >
              <span class="sr-only">Abrir Menú</span>
              <svg
                class="block h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
              <svg
                class="hidden h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <div
            class="flex-1 flex items-right justify-center items-stretch lg:justify-start"
          >
            <router-link to="/" class="flex-shrink-0 flex items-center">
              <img
                class="block ml-10 lg:hidden h-10 w-auto"
                src="../../../assets/icons/favicon.svg"
              />
              <img
                class="hidden lg:block h-8 w-auto"
                src="../../../assets/icons/favicon.svg"
              />
            </router-link>
            <p class="ml-4 mt-1 text-2xl lg:hidden">Editorial Shalom</p>
            <div class="hidden md:hidden lg:block lg:ml-6">
              <div class="flex space-x-4 text-center">
                <router-link
                  to="/"
                  class="text-gray-700 hover:border-sky-500 hover:text-sky-500 transition-all duration-200 border-transparent border-2 px-3 py-2 rounded-md text-xl font-semibold"
                  >{{ $t("navbar.homepage.home") }}</router-link
                >
                <router-link
                  to="/books"
                  class="text-gray-700 hover:border-sky-500 hover:text-sky-500 transition-all duration-200 border-transparent border-2 px-3 py-2 rounded-md text-lg font-semibold"
                  >{{ $t("navbar.homepage.books") }}</router-link
                >
                <router-link
                  to="/about"
                  class="text-gray-700 hover:border-sky-500 hover:text-sky-500 transition-all duration-200 border-transparent border-2 px-3 py-2 rounded-md text-lg font-semibold"
                  >{{ $t("navbar.homepage.aboutus") }}</router-link
                >
                <router-link
                  to="/contact"
                  class="text-gray-700 hover:border-sky-500 hover:text-sky-500 transition-all duration-200 border-transparent border-2 px-3 py-2 rounded-md text-lg font-semibold"
                  >{{ $t("navbar.homepage.contact") }}</router-link
                >
              </div>
            </div>
          </div>

          <LanguageChooser class="hidden md:hidden lg:inline-block" />
          <div class="">
            <strong
              class="relative inline-flex items-center rounded border-gray-200 px-1.5 py-1.5 text-xs font-medium"
            >
            <span v-if="store.shoppingCart.items ? store.shoppingCart.items.length !== 0 : false"
                class="absolute -top-2 -right-2 h-5 w-5 rounded-full text-white bg-rose-500 flex justify-center items-center items"
                ><span>{{ store.shoppingCart.items.length }}</span></span
              >
              <button
                class="flex items-center justify-between lg:ml-6 lg:-mr-1 mx-2 bg-white rounded-lg"
                @click="isCartActive = true"
              >
                <BaseIcon
                  :path="mdiCartMinus"
                  w=""
                  h=""
                  size="30"
                  class="items-center"
                />
              </button>
            </strong>
          </div>

          <div v-if="!isAuth">
            <div
              class="hidden sm:flex sm:items-center sm:ml-6 border-l-2 border-l-gray-400 pl-2"
            >
              <router-link
                to="/register"
                class="text-gray-700 hover:border-sky-500 hover:text-sky-500 border-2 border-transparent transition-all duration-200 mr-2 px-3 py-2 rounded-md text-xl font-semibold"
                >{{ $t("navbar.homepage.register") }}</router-link
              >
              <router-link
                to="/login"
                class="bg-sky-500 text-white hover:bg-sky-700 px-3 py-2 rounded-md text-lg font-medium ml-auto"
                >{{ $t("navbar.homepage.login") }}</router-link
              >
            </div>
          </div>
          <div v-else>
            <div v-if="user.roles.includes(1)">
              <div
                class="hidden md:hidden lg:inline-flex sm:flex sm:items-center sm:ml-6 border-l-2 border-l-gray-400 pl-2"
              >
                <div v-if="user.roles.includes(2)">
                  <router-link
                    to="/dashboard/inicio"
                    class="text-gray-800 hover:border-sky-500 hover:text-sky-500 border-2 border-transparent transition-all duration-200 mr-2 px-3 py-2 rounded-md text-xl font-semibold"
                    >{{ $t("navbar.homepage.dashboard") }}</router-link
                  >
                </div>
                <div v-if="user.roles.includes(1) && !user.roles.includes(2)">
                  <router-link
                    to="/profile"
                    class="text-gray-800 hover:border-sky-500 border-2 border-transparent transition-all duration-200 mr-2 px-3 py-2 rounded-md text-xl font-semibold"
                    >{{ $t("navbar.homepage.profile") }}</router-link
                  >
                </div>
                <button
                  @click="logout"
                  class="bg-rose-500 text-white hover:bg-rose-700 px-3 py-2 rounded-md text-xl font-semibold ml-auto"
                >
                  {{ $t("navbar.homepage.logout") }}
                </button>
              </div>
            </div>
          </div>

          <SearchBar />
        </div>
      </div>
      <div
        class="lg:hidden"
        :class="{ block: isMenuOpen, hidden: !isMenuOpen }"
      >
        <div class="px-2 pt-2 pb-3 space-y-1">
          <router-link
            to="/"
            class="text-gray-800 hover:text-gray-900 block px-3 py-2 rounded-md text-xl font-semibold"
            >{{ $t("navbar.homepage.home") }}</router-link
          >
          <router-link
            to="/books"
            class="text-gray-800 hover:text-gray-900 block px-3 py-2 rounded-md text-xl font-semibold"
            >{{ $t("navbar.homepage.books") }}</router-link
          >
          <router-link
            to="/about"
            class="text-gray-800 hover:text-gray-900 block px-3 py-2 rounded-md text-xl font-semibold"
            >{{ $t("navbar.homepage.aboutus") }}</router-link
          >
          <router-link
            to="/contact"
            class="text-gray-800 hover:border-sky-500 block px-3 py-2 rounded-md text-xl font-semibold"
            >{{ $t("navbar.homepage.contact") }}</router-link
          >

          <BaseDivider />

          <div v-if="!isAuth">
            <router-link
              to="/register"
              class="text-gray-800 hover:border-sky-500 block px-3 py-2 rounded-md text-xl font-semibold"
              >{{ $t("navbar.homepage.register") }}</router-link
            >
            <router-link
              to="/login"
              class="bg-sky-500 text-white hover:bg-sky-700 block px-3 py-2 rounded-md text-xl font-semibold"
              >{{ $t("navbar.homepage.login") }}</router-link
            >
          </div>
          <div v-else>
            <div v-if="user.roles.includes(1)">
              <div v-if="user.roles.includes(2)">
                <router-link
                  to="/dashboard/inicio"
                  class="text-gray-800 block px-3 py-2 rounded-md text-xl font-semibold"
                  >{{ $t("navbar.homepage.dashboard") }}</router-link
                >
              </div>
              <div v-if="user.roles.includes(1) && !user.roles.includes(2)">
                <router-link
                  to="/profile"
                  class="text-gray-800 block px-3 py-2 rounded-md text-xl font-semibold"
                  >{{ $t("navbar.homepage.profile") }}</router-link
                >
              </div>
              <a
                @click="logout"
                class="bg-rose-500 text-white hover:bg-rose-700 block px-3 py-2 rounded-md text-xl font-semibold"
              >
                {{ $t("navbar.homepage.logout") }}
              </a>
            </div>
          </div>

          <LanguageChooser class="p-1" />
        </div>
      </div>
    </nav>
  </header>
</template>
