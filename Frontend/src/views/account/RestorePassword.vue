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
  import { reactive, ref } from "vue";
  import { useRouter } from "vue-router";
  import { userStore } from "../../stores/user";
  import { useToast } from "vue-toastification";
  import { api } from "../../../utils/axios";
  import EyeOn from "../../components/EyeOn.vue";
  import EyeOff from "../../components/EyeOff.vue";
  import Captcha from "../../components/Captcha.vue";
  
  const data = reactive({
    email: "",
    password: "",
    recaptcha: ""
  });
  
  const showPass = ref(false);
  const router = useRouter();
  const store = userStore();
  const toast = useToast();
  
  let tokenCaptcha = ''
  
  var onVerifyRecaptcha = (recaptchaToken) => {
    tokenCaptcha = recaptchaToken
  }
  
  var onExpireRecaptcha = (recaptchaToken)=> {
    tokenCaptcha = ''
  }
  
  const submit = async () => {
    api
      .post("/login", {
        email: data.email,
        password: data.password,
        recaptcha: tokenCaptcha
      })
      .then((response) => {
        store.$patch((state) => {
          state.isLoggedIn = true;
          state.userInfo = {
            name: response.data.user.name,
            email: response.data.user.email,
          };
        });
  
        let searchParams = new URLSearchParams(window.location.search);
        if (searchParams.has("redirect")) {
          router.push({ path: `${searchParams.get("redirect")}` });
        } else {
          router.push({ path: "/dashboard" });
  
          toast.success(`${response.data.message}`, {
          timeout: 2000,
          position: "top-center",
          icon: true,
        });
        }
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
  