<template>
  <div class="mx-auto flex flex-col min-h-screen">
    <div class="flex-1">
      <Navbar class="" />
      <div class="box-form">
        <div class="left">
          <div class="overlay">
            <h1>Editorial Shalom</h1>
          </div>
        </div>
        <div class="right">
          <h2 class="title">Inicio de Sesión</h2>
          <form @submit.prevent="submit">
            <div class="mt-6 text-center">
              ¿No tiene una cuenta?
              <router-link to="/register" class="hover:underline"
                ><span class="font-bold">Registrese</span></router-link
              >
            </div>
            <div class="inputs">
              <input
                ttype="email"
                name="email"
                v-model="data.email"
                required
                placeholder="Correo"
                color
              />
              <br />
              <input
                :type="showPass ? 'text' : 'password'"
                name="password"
                required
                v-model="data.password"
                placeholder="Contraseña"
              />
            </div>
            <br />
            <div class="mt-6 flex items-center justify-between">
              <div class="flex items-center relative left-1/2 -translate-x-1/2">
                <Captcha
                  name="recaptcha"
                  @verify="onVerifyRecaptcha"
                  @expired="onExpireRecaptcha"
                />
              </div>
            </div>
            <br />
            <label
              for="remember_me"
              class="ml-2 mt-1 block text-sm leading-5 text-gray-900"
            >
              Recuerdame
            </label>
            <div class="mt-6 flex items-center justify-between">
              <router-link to="/account/resetPassword" class="text-sm hover:underline">
                ¿Has olvidado tu contraseña?
              </router-link>
            </div>
            <br />
            <button>Iniciar Sesión</button>
          </form>
        </div>
      </div>
    </div>
    <Footer />
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
