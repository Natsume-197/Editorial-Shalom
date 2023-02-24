<script setup>
import { mdiTranslate } from "@mdi/js";
import BaseIcon from "../../components/dashboard/minimal/BaseIcon.vue";
import { ref, reactive, computed, watch } from "vue";
import { useI18n } from "vue-i18n";
import { userStore } from "../../stores/user";
import { api } from "../../utils/axios";
import { useToast } from "vue-toastification";
import { useRouter } from "vue-router";
import BaseDivider from "../dashboard/minimal/BaseDivider.vue";
import LanguageChooser from "./elements/LanguageChooser.vue";

const toast = useToast();
const store = userStore();
const router = useRouter();

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
  <header>
  <nav class="bg-white shadow-lg fixed w-full z-10">
    <div class="mx-auto px-2 sm:px-6 lg:px-8 ">
      <div class="relative flex items-center justify-between h-20 ">
        <div class="absolute inset-y-0 left-0 flex items-center sm:hidden ">
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
          class="flex-1 flex items-right justify-center sm:items-stretch sm:justify-start "
        >
          <a href="#" class="flex-shrink-0 flex items-center">
            <img
              class="block lg:hidden h-8 w-auto"
              src="../../assets/icons/favicon.svg"
              alt="Workflow"
            />
            <img
              class="hidden lg:block h-8 w-auto"
              src="../../assets/icons/favicon.svg"
              alt="Workflow"
            />
          </a>
          <p class="ml-4 mt-1 text-2xl  sm:hidden">Editorial Shalom</p>
          <div class="hidden sm:block sm:ml-6">
            <div class="flex space-x-4 text-center">
              <a
                href="#"
                class="text-gray-700 hover:border-sky-500 hover:text-sky-500 transition-all duration-200 border-transparent border-2 px-3 py-2 rounded-md text-xl font-semibold"
                >{{ $t("navbar.homepage.home") }}</a
              >
              <a
                href="#"
                class="text-gray-700 hover:border-sky-500 hover:text-sky-500 transition-all duration-200 border-transparent border-2 px-3 py-2 rounded-md text-lg font-semibold"
                >{{ $t("navbar.homepage.books") }}</a
              >
              <a
                href="#"
                class="text-gray-700 hover:border-sky-500 hover:text-sky-500 transition-all duration-200 border-transparent border-2 px-3 py-2 rounded-md text-lg font-semibold"
                >{{ $t("navbar.homepage.aboutus") }}</a
              >
              <a
                href="#"
                class="text-gray-700 hover:border-sky-500 hover:text-sky-500 transition-all duration-200 border-transparent border-2 px-3 py-2 rounded-md text-lg font-semibold"
                >{{ $t("navbar.homepage.contact") }}</a
              >
            </div>
          </div>
        </div>

        <LanguageChooser/>

        <div v-if="!isAuth">
          <div
            class="hidden sm:flex sm:items-center sm:ml-6 border-l-2 border-l-gray-400 pl-2"
          >
            <router-link
              to="/register"
              class="text-gray-800 hover:border-sky-500 border-2 border-transparent transition-all duration-200 mr-2 px-3 py-2 rounded-md text-lg font-medium"
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
              class="hidden sm:flex sm:items-center sm:ml-6 border-l-2 border-l-gray-400 pl-2"
            >
              <div v-if="user.roles.includes(2)">
                <router-link
                  to="/dashboard/inicio"
                  class="text-gray-800 hover:border-sky-500 border-2 border-transparent transition-all duration-200 mr-2 px-3 py-2 rounded-md text-xl font-semibold"
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
      </div>
    </div>
    <div class="sm:hidden " :class="{ block: isMenuOpen, hidden: !isMenuOpen }">
      <div class="px-2 pt-2 pb-3 space-y-1  ">
        <a
          href="#"
          class="text-gray-800 hover:text-gray-900 block px-3 py-2 rounded-md text-xl font-semibold"
          >{{ $t("navbar.homepage.home") }}</a
        >
        <a
          href="#"
          class="text-gray-800 hover:text-gray-900 block px-3 py-2 rounded-md text-xl font-semibold"
          >{{ $t("navbar.homepage.books") }}</a
        >
        <a
          href="#"
          class="text-gray-800 hover:text-gray-900 block px-3 py-2 rounded-md text-xl font-semibold"
          >{{ $t("navbar.homepage.aboutus") }}</a
        >
        <a
          href="#"
          class="text-gray-800 hover:border-sky-500 block px-3 py-2 rounded-md text-xl font-semibold"
          >{{ $t("navbar.homepage.contact") }}</a
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
      </div>
    </div>
  </nav>
</header>
</template>
