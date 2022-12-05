<template>
  <div v-if="isAuth">
    <div class="flex items-center justify-center">
      <div class="bg-slate-700 rounded-xl m-16 border">
        <div class="flex flex-col p-10 px-16 space-y-6 items-center text-center">
          <p class="text-gray-400 md:text-2xl text-xl px-18">
            Dashboard exclusivo para usuarios que han iniciado sesión
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onBeforeMount, ref } from 'vue'
import { userStore } from '../../stores/user'
import { useToast } from 'vue-toastification'
import { api } from '../../../utils/axios'

const content = ref('You are not logged in!')
const store = userStore()
const toast = useToast()
const isAuth = computed(() => store.isLoggedIn)
const user = computed(() => store.userInfo)

onBeforeMount(() => {
  api
    .get('/dashboard')
    .then(response => {
      content.value = response.data.message
    })
    .catch(error => {
      console.log(error)
      toast.error(`${error.response.data.message}`, {
        timeout: 2000,
        position: 'top-center',
        icon: true
      })
    })
})
</script>
