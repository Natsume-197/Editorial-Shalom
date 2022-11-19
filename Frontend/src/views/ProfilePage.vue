<template>
  <div class="flex justify-center mt-32">
    <div class="align-middle rounded-3xl shadow-xl my-3 bg-red-500">
      <div class="text-center px-3 pb-6 pt-2 text-white font-bold text-xl">
        <h3>Nombre : {{ user.name }}</h3>
        <p>Correo: {{ user.email }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { userStore } from '../stores/user'

const store = userStore()
const user = computed(() => store.userInfo)
</script>
