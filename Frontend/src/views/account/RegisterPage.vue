<template>
  <div
    class="w-full mt-24 flex flex-col sm:justify-center items-center pt-6 sm:pt-0 animate__animated animate__fadeIn">
    <div class="w-full sm:max-w-md p-5 mx-auto">
      <h2 class="mb-12 text-center text-5xl font-extrabold">Registro</h2>
      <form @submit.prevent="submit">
        <div class="mb-4">
          <label class="block mb-1" for="email">Nombre</label>
          <input
            type="text"
            name="name"
            required
            v-model="data.name"
            class="py-2 px-3 border border-gray-300 focus:border-red-300 focus:outline-none focus:ring focus:ring-red-200 focus:ring-opacity-50 rounded-md shadow-sm disabled:bg-gray-100 mt-1 block w-full" />
        </div>
        <div class="mb-4">
          <label class="block mb-1" for="email">Correo</label>
          <input
            type="email"
            name="email"
            required
            v-model="data.email"
            class="py-2 px-3 border border-gray-300 focus:border-red-300 focus:outline-none focus:ring focus:ring-red-200 focus:ring-opacity-50 rounded-md shadow-sm disabled:bg-gray-100 mt-1 block w-full" />
        </div>
        <div class="mb-4">
          <label class="mb-1" for="password">Contraseña</label>
          <div class="flex items-center">
            <input
              :type="showPass ? 'text' : 'password'"
              name="password"
              required
              v-model="data.password"
              class="py-2 px-3 border-l-2 border-y-2 border-gray-300 focus:border-red-300 focus:outline-none focus:ring focus:ring-red-200 focus:ring-opacity-50 rounded-l-md shadow-sm disabled:bg-gray-100 mt-1 w-full" />
            <div
              @click="showPass = !showPass"
              class="py-3 px-1 mt-1 border-y-2 border-r-2 hover:cursor-pointer border-gray-300 rounded-r-md">
              <EyeOff v-if="showPass" />
              <EyeOn v-else />
            </div>
          </div>
        </div>
        <div class="flex items-center">
        </div>
        <div class="mt-6">
          <button
            class="w-full inline-flex items-center justify-center px-4 py-2 bg-red-600 border border-transparent rounded-md font-semibold capitalize text-white hover:bg-red-700 active:bg-red-700 focus:outline-none focus:border-red-700 focus:ring focus:ring-red-200 disabled:opacity-25 transition">
            Registrarse
          </button>
        </div>
        <div class="mt-6 text-center">
          ¿Ya tienes una cuenta?
          <router-link to="/login" class="hover:underline"
            ><span class="font-bold">Iniciar Sesión</span></router-link
          >
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'
import { api } from '../../utils/axios'
import EyeOn from '../../components/EyeOn.vue'
import EyeOff from '../../components/EyeOff.vue'

const data = reactive({
  name: '',
  email: '',
  password: ''
})
const user = ref('')
const showPass = ref(false)
const router = useRouter()
const toast = useToast()

const submit = () => {
  api
    .post('/register', {
      name: data.name,
      email: data.email,
      password: data.password
    })
    .then(response => {
      user.value = response.data.user
      router.push('/login')
      toast.success(`Se ha registrado de forma exitosa. Verifique su correo a través del enlace de verificación enviado al mismo.`, {
        timeout: 6000,
        position: 'top-center',
        icon: true
      })
    })
    .catch(error => {
      if (error.response) {
        // Si la respuesta de la API tiene un estado, el error provino de la API
        const status = error.response.status
        const message = error.response.data.message
        toast.error(`Error al enviar la solicitud (${status}): ${message}`, {
          timeout: 5000,
          position: 'top-center',
          icon: true
        })
        console.log(error)
      } else if (error.request) {
        // Si la solicitud no pudo completarse, es un error de red
        toast.error(`Error al enviar la solicitud: Conexión con la API rechazada.`, {
          timeout: 5000,
          position: 'top-center',
          icon: true
        })
        console.log(error)
      } else {
        // En otros casos, puede haber un error en el código
        toast.error(`Error al enviar la solicitud: ${message}`, {
          timeout: 5000,
          position: 'top-center',
          icon: true
        })
      }
      console.log(error)
    })
}
</script>
