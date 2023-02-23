<template>
  <div
    class="w-full mt-24 flex flex-col sm:justify-center items-center pt-6 sm:pt-0 animate__animated animate__fadeIn"
  >
    <div class="w-full sm:max-w-md p-5 mx-auto">
      <h2 class="mb-12 text-center text-5xl font-extrabold">
        Inicio de Sesión
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
        <div class="mb-4">
          <label class="mb-1" for="password">Contraseña</label>
          <div class="flex items-center">
            <input
              :type="showPass ? 'text' : 'password'"
              name="password"
              required
              v-model="data.password"
              class="py-2 px-3 border-l-2 border-y-2 border-gray-300 focus:border-red-300 focus:outline-none focus:ring focus:ring-red-200 focus:ring-opacity-50 rounded-l-md shadow-sm disabled:bg-gray-100 mt-1 w-full"
            />
            <div
              @click="showPass = !showPass"
              class="py-3 px-1 mt-1 border-y-2 border-r-2 hover:cursor-pointer border-gray-300 rounded-r-md"
            >
              <EyeOff v-if="showPass" />
              <EyeOn v-else />
            </div>
          </div>
        </div>
        <div class="mt-6 flex items-center justify-between">
          <div class="flex items-center">
            <input
              type="checkbox"
              checked
              class="border border-gray-300 text-red-600 shadow-sm focus:border-red-300 focus:ring focus:ring-red-200 focus:ring-opacity-50"
            />
            <label
              for="remember_me"
              class="ml-2 mt-1 block text-sm leading-5 text-gray-900"
            >
              Recuerdame
            </label>
          </div>

          <router-link
            to="/account/resetPassword"
            class="text-sm hover:underline"
          >
            ¿Has olvidado tu contraseña?
          </router-link>
        </div>

        <div class="mt-6 flex items-center justify-between">
          <div class="flex items-center relative left-1/2 -translate-x-1/2">
            <Captcha
              name="recaptcha"
              @verify="onVerifyRecaptcha"
              @expired="onExpireRecaptcha"
            />
          </div>
        </div>

        <div class="mt-6">
          <button
            class="w-full inline-flex items-center justify-center px-4 py-2 bg-red-600 border border-transparent rounded-md font-semibold capitalize text-white hover:bg-red-700 active:bg-red-700 focus:outline-none focus:border-red-700 focus:ring focus:ring-red-200 disabled:opacity-25 transition"
          >
            Iniciar Sesión
          </button>
        </div>
        <div class="mt-6 text-center">
          ¿No tiene una cuenta?
          <router-link to="/register" class="hover:underline"
            ><span class="font-bold">Registrese</span></router-link
          >
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { computed, reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { userStore } from "../../stores/user";
import { useToast } from "vue-toastification";
import { api } from "../../utils/axios";
import EyeOn from "../../components/session/EyeOn.vue";
import EyeOff from "../../components/session/EyeOff.vue";
import Captcha from "../../components/session/Captcha.vue";

const isAuth = computed(() => store.isLoggedIn);

const router = useRouter();

const data = reactive({
  email: "",
  password: "",
  recaptcha: "",
});

const showPass = ref(false);
const store = userStore();
const toast = useToast();

let tokenCaptcha = "";

var onVerifyRecaptcha = (recaptchaToken) => {
  tokenCaptcha = recaptchaToken;
};

var onExpireRecaptcha = (recaptchaToken) => {
  tokenCaptcha = "";
};

const submit = async () => {
  api
    .post("/login", {
      email: data.email,
      password: data.password,
      recaptcha: tokenCaptcha,
    })
    .then((response) => {
      store.$patch((state) => {
        state.isLoggedIn = true;
        state.userInfo = {
          name: response.data.user.name,
          email: response.data.user.email,
          roles: response.data.user.roles.map(roles => roles.id_role)
        };
      });

      let searchParams = new URLSearchParams(window.location.search);
      if (searchParams.has("redirect")) {
        router.push({ path: `${searchParams.get("redirect")}` });
      } else {
        router.push({ path: "/" });

        toast.success(`${response.data.message}`, {
          timeout: 4000,
          position: "bottom-right",
          icon: true,
        });
      }
    })
};
</script>
