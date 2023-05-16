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
              <div class="flex space-x-4 text-center align-middle items-center">
                <router-link
                  to="/"
                  class="text-gray-700 hover:border-sky-500 hover:text-sky-500 transition-all duration-200 border-transparent border-2 px-2 py-2 rounded-md text-lg font-semibold"
                  >{{ $t("navbar.homepage.home") }}</router-link
                >
                <router-link
                  to="/books"
                  class="text-gray-700 hover:border-sky-500 hover:text-sky-500 transition-all duration-200 border-transparent border-2 px-2 py-2 rounded-md text-lg font-semibold"
                  >{{ $t("navbar.homepage.books") }}</router-link
                >
                <router-link
                  to="/about"
                  class="text-gray-700 hover:border-sky-500 hover:text-sky-500 transition-all duration-200 border-transparent border-2 px-2 py-2 rounded-md text-lg font-semibold"
                  >{{ $t("navbar.homepage.aboutus") }}</router-link
                >
                <router-link
                  to="/contact"
                  class="text-gray-700 hover:border-sky-500 hover:text-sky-500 transition-all duration-200 border-transparent border-2 px-2 py-2 rounded-md text-lg font-semibold"
                  >{{ $t("navbar.homepage.contact") }}</router-link
                >

                <LanguageChooser class="hidden md:hidden sm:hidden lg:block px-2" />

              </div>
            </div>
          </div>


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
                <div v-if="user.roles.includes(1) && !user.roles.includes(2)">
                  <div ref="dropdown" class="relative inline-block">
                    <!-- Dropdown toggle button -->
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
                      class="flex items-center p-3 -mt-2 text-sm text-gray-600 transition-colors duration-300 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white"
                    >
                      <img
                        class="flex-shrink-0 object-cover rounded-full w-9 h-9 mr-2"
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

                      
                      <router-link to="/profile" class="mx-1"
                        >Ver perfil y pedidos</router-link
                      >
                    </router-link>

                    <hr class="border-gray-200 dark:border-gray-700" />

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

                <div v-if="user.roles.includes(2)">
                  <div ref="dropdown" class="relative inline-block">
                    <!-- Dropdown toggle button -->
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
                      class="flex items-center p-3 -mt-2 text-sm text-gray-600 transition-colors duration-300 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white"
                    >
                      <img
                        class="flex-shrink-0 object-cover rounded-full w-9 h-9 mr-2"
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
                      to="/dashboard"
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

                      <router-link to="/dashboard" class="mx-1"
                        >Dashboard</router-link
                      >
                    </router-link>

                    <hr class="border-gray-200 dark:border-gray-700" />

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
