<template>
  <div class="py-40 h-screen bg-gray-200">
    <div
      class="max-w-md mx-auto  bg-white rounded-xl shadow-md overflow-hidden md:max-w-md"
    >
      <div class="md:flex">
        <div class="w-full p-2 py-10">
          <div class="flex justify-center">
            <div class="relative">
              <img
                src="https://i.imgur.com/z4YSzDD.jpg"
                class="rounded-full"
                width="80"
              />
              <span
                class="absolute border-white border-4 h-5 w-5 top-12 left-16 bg-green-700 rounded-full"
              ></span>
            </div>
          </div>

          <div class="flex flex-col text-center mt-3 mb-4">
            <span class="text-2xl font-medium">{{ user.name }}</span>
            <span class="text-md text-gray-400">{{ user.email }}</span>
          </div>

          <p class="px-16 text-center text-md text-gray-800"></p>

          <div class="px-16 mt-3 text-center"></div>

          <div class="px-14 mt-5">
            <button
              class="h-12 bg-gray-200 w-full text-black text-md rounded hover:shadow hover:bg-gray-300 mb-2"
            >
              Soporte
            </button>
            <button
              class="h-12 bg-red-700 w-full text-white text-md rounded hover:shadow hover:bg-red-800"
            >
              Eliminar cuenta
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { userStore } from "../stores/user";

const store = userStore();
const user = computed(() => store.userInfo);
</script>
