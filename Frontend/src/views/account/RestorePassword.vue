<template>
  <div class="container mx-auto px-4" v-if="!tokenIsValid">
    <div class="w-1/2 mx-auto bg-white rounded shadow p-4">
      <p v-if="error.length > 0" class="text-red-800 text-xl italic mt-4">
        {{ error }}
      </p>
    </div>
  </div>
  <div class="container mx-auto px-4 m-auto" v-if="tokenIsValid">
    <div class="w-1/2 mx-auto bg-white rounded shadow p-4">
      <h1 class="text-3xl font-bold mb-4">Reestablecer contraseña</h1>
      <form @submit.prevent="resetPassword">
        <div class="mb-4">
          <label
            class="block text-gray-700 text-sm font-bold mb-2"
            for="password"
          >
            Nueva contraseña
          </label>
          <input
            v-model="password"
            id="password"
            name="password"
            type="password"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div class="mb-4">
          <label
            class="block text-gray-700 text-sm font-bold mb-2"
            for="confirm-password"
          >
            Confirmar nueva contraseña
          </label>
          <input
            v-model="confirmPassword"
            id="confirm-password"
            name="confirm-password"
            type="password"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <p
          v-if="error.length > 0"
          class="text-red-800 text-xl mb-2 italic mt-4"
        >
          {{ error }}
        </p>
        <div class="flex items-center justify-between">
          <button
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Restablecer contraseña
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { api } from "../../../utils/axios";
import { useToast } from "vue-toastification";

const token = window.location.href.split("/").slice(-2)[0];
const toast = useToast();

export default {
  data() {
    return {
      password: "",
      confirmPassword: "",
      error: "",
      tokenIsValid: false,
    };
  },
  async created() {
    try {
      // Verificar si el token es válido haciendo una llamada a la API
      await api.post("account/resetpassword/" + token);
      this.tokenIsValid = true;
    } catch (error) {
      // Mostrar un mensaje de error si el token no es válido
      this.error = "El token para reestablecer la contraseña no es válido.";
    }
  },
  methods: {
    async resetPassword() {
      if (this.password !== this.confirmPassword) {
        toast.error("Las contraseñas no coinciden", {
          timeout: 2000,
          position: "top-center",
          icon: true,
        });
        return;
      }

      try {
        const response = await api.post("account/resetpassword/" + token, {
          password: this.password,
        });

        // Redirigir al usuario a la página de inicio de sesión una vez que se haya restablecido la contraseña
        this.$router.push("/login");

        toast.success(`${response.data.message}`, {
          timeout: 2000,
          position: "top-center",
          icon: true,
        });
      } catch (error) {
        this.error = error.message;
      }
    },
  },
};
</script>
