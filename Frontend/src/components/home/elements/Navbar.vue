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
import { vOnClickOutside } from "@vueuse/components";

import BaseIcon from "../../dashboard/minimal/BaseIcon.vue";

const toast = useToast();
const store = userStore();
const router = useRouter();

const isCartActive = ref(false);
let isOpen = ref(false);

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

var handleout = () => {
  isOpen.value = false;
};
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
            class="flex-1 flex items-right justify-center items-center lg:justify-start"
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
            <p class="ml-4 mt-1 text-xl items-center lg:text-2xl lg:hidden">
              Editorial Shalom
            </p>
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
              <span
                v-if="
                  store.shoppingCart.items
                    ? store.shoppingCart.items.length !== 0
                    : false
                "
                class="absolute -top-2 -right-2 h-5 w-5 rounded-full text-white bg-rose-500 flex justify-center items-center items"
                ><span>{{ store.shoppingCart.items.length }}</span></span
              >
              <button
                class="flex items-center justify-between outline-none lg:ml-6 lg:-mr-1 mx-2 bg-white rounded-lg"
                @click="isCartActive = true"
              >
                <BaseIcon
                  :path="mdiCartMinus"
                  w=""
                  h=""
                  size="32"
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

                <div ref="dropdown" class="relative inline-block">
                  <!-- Dropdown toggle button -->
                  <div v-if="user.roles.includes(1) && !user.roles.includes(2)">
                    <button
                      @click="isOpen = !isOpen"
                      v-on-click-outside="handleout"
                      class="relative flex items-center p-2 text-gray-800 bg-white transition-all duration-200 hover:border-sky-500 border-2 border-transparent focus:border-sky-500 focus:ring-opacity-40 dark:focus:ring-opacity-40 focus:ring-sky-300 dark:focus:ring-sky-400 focus:ring dark:text-white dark:bg-gray-800 focus:outline-none rounded-md text-xl font-semibold"
                    >
                      <span class="mx-1">{{
                        $t("navbar.homepage.profile")
                      }}</span>
                      <svg
                        class="w-5 h-5 mx-1"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M12 15.713L18.01 9.70299L16.597 8.28799L12 12.888L7.40399 8.28799L5.98999 9.70199L12 15.713Z"
                          fill="currentColor"
                        ></path>
                      </svg>
                    </button>
                  </div>
                  <!-- Dropdown menu -->
                  <div
                    v-show="isOpen"
                    v-bind:class="{
                      'opacity-0 scale-90': !isOpen,
                      'opacity-100 scale-100': isOpen,
                    }"
                    v-bind:transition="{
                      enter: 'transition ease-out duration-100 transform',
                      'enter-from': 'opacity-0 scale-90',
                      'enter-to': 'opacity-100 scale-100',
                      leave: 'transition ease-in duration-100 transform',
                      'leave-from': 'opacity-100 scale-100',
                      'leave-to': 'opacity-0 scale-90',
                    }"
                    class="absolute right-0 z-20 w-60 pt-2 mt-2 overflow-hidden origin-top-right bg-white rounded-md shadow-xl dark:bg-gray-800"
                  >
                    <a
                      href="#"
                      class="flex items-center p-3 -mt-2 text-sm text-gray-600 transition-colors duration-300 transform  dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white"
                    >
                      <img
                        class="flex-shrink-0 object-cover  rounded-full w-9 h-9 mr-2"
                        src="https://res.cloudinary.com/crunchbase-production/image/upload/c_lpad,f_auto,q_auto:eco,dpr_1/gdruy0cnkgnaadpxiadi"
                      />
                      <div class="mx-1">
                        <h1
                          class="text-sm font-semibold text-gray-700 dark:text-gray-200"
                        >
                          {{ user.name }}
                        </h1>
                        <p class="text-sm text-gray-500 dark:text-gray-400">
                          {{ user.email }}
                        </p>
                      </div>
                    </a>

                    <hr class="border-gray-200 dark:border-gray-700" />

                    <router-link
                    to="/profile"
                      class="flex items-center p-3 text-sm text-gray-600 capitalize transition-colors dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 dark:hover:text-white"
                    >
                      <svg
                        class="w-5 h-5 mx-1"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M7 8C7 5.23858 9.23858 3 12 3C14.7614 3 17 5.23858 17 8C17 10.7614 14.7614 13 12 13C9.23858 13 7 10.7614 7 8ZM12 11C13.6569 11 15 9.65685 15 8C15 6.34315 13.6569 5 12 5C10.3431 5 9 6.34315 9 8C9 9.65685 10.3431 11 12 11Z"
                          fill="currentColor"
                        ></path>
                        <path
                          d="M6.34315 16.3431C4.84285 17.8434 4 19.8783 4 22H6C6 20.4087 6.63214 18.8826 7.75736 17.7574C8.88258 16.6321 10.4087 16 12 16C13.5913 16 15.1174 16.6321 16.2426 17.7574C17.3679 18.8826 18 20.4087 18 22H20C20 19.8783 19.1571 17.8434 17.6569 16.3431C16.1566 14.8429 14.1217 14 12 14C9.87827 14 7.84344 14.8429 6.34315 16.3431Z"
                          fill="currentColor"
                        ></path>
                      </svg>

                      <router-link
                       to="/profile"
                       class="mx-1">Ver perfil</router-link>
                    </router-link>

                    <hr class="border-gray-200 dark:border-gray-700" />

                    <a
                      href="#"
                      class="flex items-center p-3  hover:bg-gray-200 text-sm text-gray-600 capitalize transition-colors dark:text-gray-300  dark:hover:bg-gray-700 dark:hover:text-white"
                    >
                      <svg
                        class="w-5 h-5 mx-1"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M13.8199 22H10.1799C9.71003 22 9.30347 21.673 9.20292 21.214L8.79592 19.33C8.25297 19.0921 7.73814 18.7946 7.26092 18.443L5.42392 19.028C4.97592 19.1709 4.48891 18.9823 4.25392 18.575L2.42992 15.424C2.19751 15.0165 2.27758 14.5025 2.62292 14.185L4.04792 12.885C3.98312 12.2961 3.98312 11.7019 4.04792 11.113L2.62292 9.816C2.27707 9.49837 2.19697 8.98372 2.42992 8.576L4.24992 5.423C4.48491 5.0157 4.97192 4.82714 5.41992 4.97L7.25692 5.555C7.50098 5.37416 7.75505 5.20722 8.01792 5.055C8.27026 4.91269 8.52995 4.78385 8.79592 4.669L9.20392 2.787C9.30399 2.32797 9.71011 2.00049 10.1799 2H13.8199C14.2897 2.00049 14.6958 2.32797 14.7959 2.787L15.2079 4.67C15.4887 4.79352 15.7622 4.93308 16.0269 5.088C16.2739 5.23081 16.5126 5.38739 16.7419 5.557L18.5799 4.972C19.0276 4.82967 19.514 5.01816 19.7489 5.425L21.5689 8.578C21.8013 8.98548 21.7213 9.49951 21.3759 9.817L19.9509 11.117C20.0157 11.7059 20.0157 12.3001 19.9509 12.889L21.3759 14.189C21.7213 14.5065 21.8013 15.0205 21.5689 15.428L19.7489 18.581C19.514 18.9878 19.0276 19.1763 18.5799 19.034L16.7419 18.449C16.5093 18.6203 16.2677 18.7789 16.0179 18.924C15.7557 19.0759 15.4853 19.2131 15.2079 19.335L14.7959 21.214C14.6954 21.6726 14.2894 21.9996 13.8199 22ZM7.61992 16.229L8.43992 16.829C8.62477 16.9652 8.81743 17.0904 9.01692 17.204C9.20462 17.3127 9.39788 17.4115 9.59592 17.5L10.5289 17.909L10.9859 20H13.0159L13.4729 17.908L14.4059 17.499C14.8132 17.3194 15.1998 17.0961 15.5589 16.833L16.3799 16.233L18.4209 16.883L19.4359 15.125L17.8529 13.682L17.9649 12.67C18.0141 12.2274 18.0141 11.7806 17.9649 11.338L17.8529 10.326L19.4369 8.88L18.4209 7.121L16.3799 7.771L15.5589 7.171C15.1997 6.90671 14.8132 6.68175 14.4059 6.5L13.4729 6.091L13.0159 4H10.9859L10.5269 6.092L9.59592 6.5C9.39772 6.58704 9.20444 6.68486 9.01692 6.793C8.81866 6.90633 8.62701 7.03086 8.44292 7.166L7.62192 7.766L5.58192 7.116L4.56492 8.88L6.14792 10.321L6.03592 11.334C5.98672 11.7766 5.98672 12.2234 6.03592 12.666L6.14792 13.678L4.56492 15.121L5.57992 16.879L7.61992 16.229ZM11.9959 16C9.78678 16 7.99592 14.2091 7.99592 12C7.99592 9.79086 9.78678 8 11.9959 8C14.2051 8 15.9959 9.79086 15.9959 12C15.9932 14.208 14.2039 15.9972 11.9959 16ZM11.9959 10C10.9033 10.0011 10.0138 10.8788 9.99815 11.9713C9.98249 13.0638 10.8465 13.9667 11.9386 13.9991C13.0307 14.0315 13.9468 13.1815 13.9959 12.09V12.49V12C13.9959 10.8954 13.1005 10 11.9959 10Z"
                          fill="currentColor"
                        ></path>
                      </svg>

                      <span class="mx-1"> Historial de pedidos </span>
                    </a>

                    <a
                      href="#"
                      class="flex items-center p-3 text-sm hover:bg-gray-200 text-gray-600 capitalize transition-colors transform dark:text-gray-300  dark:hover:bg-gray-700 dark:hover:text-white"
                    >
                      <svg
                        class="w-5 h-5 mx-1"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M12 22C6.47967 21.9939 2.00606 17.5203 2 12V11.8C2.10993 6.30452 6.63459 1.92794 12.1307 2.00087C17.6268 2.07379 22.0337 6.56887 21.9978 12.0653C21.9619 17.5618 17.4966 21.9989 12 22ZM11.984 20H12C16.4167 19.9956 19.9942 16.4127 19.992 11.996C19.9898 7.57928 16.4087 3.99999 11.992 3.99999C7.57528 3.99999 3.99421 7.57928 3.992 11.996C3.98979 16.4127 7.56729 19.9956 11.984 20ZM13 18H11V16H13V18ZM13 15H11C10.9684 13.6977 11.6461 12.4808 12.77 11.822C13.43 11.316 14 10.88 14 9.99999C14 8.89542 13.1046 7.99999 12 7.99999C10.8954 7.99999 10 8.89542 10 9.99999H8V9.90999C8.01608 8.48093 8.79333 7.16899 10.039 6.46839C11.2846 5.76778 12.8094 5.78493 14.039 6.51339C15.2685 7.24184 16.0161 8.57093 16 9.99999C15.9284 11.079 15.3497 12.0602 14.44 12.645C13.6177 13.1612 13.0847 14.0328 13 15Z"
                          fill="currentColor"
                        ></path>
                      </svg>

                      <span class="mx-1"> Historial de tickets </span>
                    </a>

                    <hr class="border-gray-200 dark:border-gray-700" />

                    <a
                      href="#"
                      class="flex items-center p-3 text-sm  text-gray-600 capitalize transition-colors  dark:text-gray-300 hover:bg-gray-200  dark:hover:bg-gray-700 dark:hover:text-white"
                    >
                      <svg
                        class="w-5 h-5 mx-1"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M13.8199 22H10.1799C9.71003 22 9.30347 21.673 9.20292 21.214L8.79592 19.33C8.25297 19.0921 7.73814 18.7946 7.26092 18.443L5.42392 19.028C4.97592 19.1709 4.48891 18.9823 4.25392 18.575L2.42992 15.424C2.19751 15.0165 2.27758 14.5025 2.62292 14.185L4.04792 12.885C3.98312 12.2961 3.98312 11.7019 4.04792 11.113L2.62292 9.816C2.27707 9.49837 2.19697 8.98372 2.42992 8.576L4.24992 5.423C4.48491 5.0157 4.97192 4.82714 5.41992 4.97L7.25692 5.555C7.50098 5.37416 7.75505 5.20722 8.01792 5.055C8.27026 4.91269 8.52995 4.78385 8.79592 4.669L9.20392 2.787C9.30399 2.32797 9.71011 2.00049 10.1799 2H13.8199C14.2897 2.00049 14.6958 2.32797 14.7959 2.787L15.2079 4.67C15.4887 4.79352 15.7622 4.93308 16.0269 5.088C16.2739 5.23081 16.5126 5.38739 16.7419 5.557L18.5799 4.972C19.0276 4.82967 19.514 5.01816 19.7489 5.425L21.5689 8.578C21.8013 8.98548 21.7213 9.49951 21.3759 9.817L19.9509 11.117C20.0157 11.7059 20.0157 12.3001 19.9509 12.889L21.3759 14.189C21.7213 14.5065 21.8013 15.0205 21.5689 15.428L19.7489 18.581C19.514 18.9878 19.0276 19.1763 18.5799 19.034L16.7419 18.449C16.5093 18.6203 16.2677 18.7789 16.0179 18.924C15.7557 19.0759 15.4853 19.2131 15.2079 19.335L14.7959 21.214C14.6954 21.6726 14.2894 21.9996 13.8199 22ZM7.61992 16.229L8.43992 16.829C8.62477 16.9652 8.81743 17.0904 9.01692 17.204C9.20462 17.3127 9.39788 17.4115 9.59592 17.5L10.5289 17.909L10.9859 20H13.0159L13.4729 17.908L14.4059 17.499C14.8132 17.3194 15.1998 17.0961 15.5589 16.833L16.3799 16.233L18.4209 16.883L19.4359 15.125L17.8529 13.682L17.9649 12.67C18.0141 12.2274 18.0141 11.7806 17.9649 11.338L17.8529 10.326L19.4369 8.88L18.4209 7.121L16.3799 7.771L15.5589 7.171C15.1997 6.90671 14.8132 6.68175 14.4059 6.5L13.4729 6.091L13.0159 4H10.9859L10.5269 6.092L9.59592 6.5C9.39772 6.58704 9.20444 6.68486 9.01692 6.793C8.81866 6.90633 8.62701 7.03086 8.44292 7.166L7.62192 7.766L5.58192 7.116L4.56492 8.88L6.14792 10.321L6.03592 11.334C5.98672 11.7766 5.98672 12.2234 6.03592 12.666L6.14792 13.678L4.56492 15.121L5.57992 16.879L7.61992 16.229ZM11.9959 16C9.78678 16 7.99592 14.2091 7.99592 12C7.99592 9.79086 9.78678 8 11.9959 8C14.2051 8 15.9959 9.79086 15.9959 12C15.9932 14.208 14.2039 15.9972 11.9959 16ZM11.9959 10C10.9033 10.0011 10.0138 10.8788 9.99815 11.9713C9.98249 13.0638 10.8465 13.9667 11.9386 13.9991C13.0307 14.0315 13.9468 13.1815 13.9959 12.09V12.49V12C13.9959 10.8954 13.1005 10 11.9959 10Z"
                          fill="currentColor"
                        ></path>
                      </svg>

                      <span class="mx-1"> Ajustes </span>
                    </a>

                    <a
                      href="#"
                      class="flex items-center p-3 text-sm capitalize transition-colors transform dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white bg-rose-500 text-white hover:bg-rose-700"
                    >
                      <svg
                        class="w-5 h-5 mx-1"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M19 21H10C8.89543 21 8 20.1046 8 19V15H10V19H19V5H10V9H8V5C8 3.89543 8.89543 3 10 3H19C20.1046 3 21 3.89543 21 5V19C21 20.1046 20.1046 21 19 21ZM12 16V13H3V11H12V8L17 12L12 16Z"
                          fill="currentColor"
                        ></path>
                      </svg>

                      <button @click="logout" class="mx-1">
                        {{ $t("navbar.homepage.logout") }}
                      </button>
                    </a>
                  </div>
                </div>
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
