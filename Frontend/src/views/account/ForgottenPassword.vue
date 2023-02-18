<template>
  <div
    class="w-full mt-24 flex flex-col sm:justify-center items-center pt-6 sm:pt-0 animate__animated animate__fadeIn"
  >
    <div class="w-full sm:max-w-md p-5 mx-auto">
      <h2 class="mb-12 text-center text-5xl font-extrabold">
        ¿Has olvidado la contraseña?
      </h2>
      <form @submit.prevent="submit">
        <div class="mb-4">
          <label class="block mb-1" for="email">Correo</label>
          <input
            type="email"
            name="email"
            v-model="data.email"
            required
            class="py-2 px-3 border-2 border-gray-300 focus:border-red-300 focus:outline-none focus:ring focus:ring-red-200 focus:ring-opacity-50 rounded-md shadow-sm disabled:bg-gray-100 mt-1 block w-full"
          />
        </div>

        <div class="mt-6">
          <button
            class="w-full inline-flex items-center justify-center px-4 py-2 bg-red-600 border border-transparent rounded-md font-semibold capitalize text-white hover:bg-red-700 active:bg-red-700 focus:outline-none focus:border-red-700 focus:ring focus:ring-red-200 disabled:opacity-25 transition"
          >
            Reestablecer contraseña
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { reactive } from "vue";
import { useRouter } from "vue-router";
import { useToast } from "vue-toastification";
import { api } from "../../utils/axios";

const data = reactive({
  email: "",
});

const router = useRouter();
const toast = useToast();

const submit = async () => {
  api
    .post("/account/resetpassword/", {
      email: data.email,
    })
    .then((response) => {
      router.push({ path: "/" });

      toast.success(`${response.data.message}`, {
        timeout: 2000,
        position: "top-center",
        icon: true,
      });
    })
    .catch((error) => {
      console.log(error);
      toast.error(`${error.response.data.message}`, {
        timeout: 2000,
        position: "top-center",
        icon: true,
      });
    });
};
</script>
