<script setup>
import { computed, reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { userStore } from "../../stores/user";
import { useToast } from "vue-toastification";
import { api } from "../../utils/axios";
import EyeOn from "../../components/session/EyeOn.vue";
import EyeOff from "../../components/session/EyeOff.vue";
import Captcha from "../../components/session/Captcha.vue";
import Navbar from "../../components/home/elements/Navbar.vue";
import Footer from "../../components/home/Footer.vue";

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
          roles: response.data.user.roles.map((roles) => roles.id_role),
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
    });
};
</script>

<template>
  <div class="mx-auto flex flex-col min-h-screen">
    <div class="flex-1">
      <Navbar class="" />
      <div class="box-form bg-white">
        <div class="left">
          <div class="overlay"></div>
        </div>
        <div class="right">
          <div
            class="text-gray-700 text-center px-3 py-2 rounded-md text-2xl font-semibold"
          >
            Inicio de Sesión
          </div>
          <form @submit.prevent="submit">
            <div class="">
              <input
                class="placeholder-gray-500"
                type="email"
                name="email"
                v-model="data.email"
                required
                placeholder="Correo"
                color
              />
              <br />
              <input
                class="placeholder-gray-500"
                :type="showPass ? 'text' : 'password'"
                name="password"
                required
                v-model="data.password"
                placeholder="Contraseña"
              />
            </div>
            <div class="mt-6 flex text-sky-600 justify-end font-bold">
              <router-link to="/account/resetPassword" class="hover:underline">
                ¿Has olvidado tu contraseña?
              </router-link>
            </div>
            <br />
            <div class="flex items-center justify-between">
              <div
                class="flex items-center relative left-1/2 -translate-x-1/2 px-12"
              >
                <Captcha
                  name="recaptcha"
                  @verify="onVerifyRecaptcha"
                  @expired="onExpireRecaptcha"
                />
              </div>
            </div>

            <br />
            <button
              class="bg-sky-500 text-white hover:bg-sky-700 block w-full flex-auto py-2 rounded-md text-xl font-semibold text-center"
            >
              <router-link to="/login">Iniciar Sesión</router-link>
            </button>
            <div class="mt-6 text-center text-gray-700  ">
              ¿No tienes una cuenta?
              <router-link to="/register" class="hover:underline"
                ><span class="font-bold text-sky-600"
                  >Registrate</span
                ></router-link
              >
            </div>
          </form>
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>
