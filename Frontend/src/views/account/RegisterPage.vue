
<template>
  <div class="mx-auto flex flex-col min-h-screen">
    <div class="flex-1">
      <Navbar  />
      <div class="box-form bg-white">
        <div class="left" loading="lazy">
          <div class="overlay"></div>
        </div>
        <div class="right w-2/6">
          <div
            class="text-gray-700 text-center px-3 py-2 rounded-md text-2xl font-semibold"
          >
            Registro
          </div>
          <form @submit.prevent="submit">
            <div class="">
              <input
              class="placeholder-gray-500"
              type="text"
              name="name"
              required
              v-model="data.name"
              placeholder="Nombre"
            />
            <br />
            <input
            class="placeholder-gray-500"
              type="email"
              name="email"
              required
              v-model="data.email"
              placeholder="Correo"
            />
            <br />
            <input
            class="placeholder-gray-500"
              :type="showPass ? 'text' : 'password'"
              name="Contraseña"
              required
              v-model="data.password"
              placeholder="Contraseña"
            />
            <input
            class="placeholder-gray-500"
              :type="showPass ? 'text' : 'password'"
              required
              placeholder="Confirmar contraseña"
            />
          </div>
 
            <div class="flex items-center justify-between">
              <div
                class="flex items-center relative left-1/2 -translate-x-1/2 px-12"
              >
                <Captcha
                class="mt-6"
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
              <button>Registrarse</button>
            </button>
            <div class="mt-6 text-center text-gray-700">
              ¿Ya tienes una cuenta?
              <router-link to="/register" class="hover:underline"
                ><span class="font-bold text-sky-600"
                  >Inicia Sesión</span
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


<script setup>
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { useToast } from "vue-toastification";
import { api } from "../../utils/axios";
import EyeOn from "../../components/session/EyeOn.vue";
import EyeOff from "../../components/session/EyeOff.vue";
import Navbar from "../../components/home/elements/Navbar.vue";
import Footer from "../../components/home/Footer.vue";
import Captcha from "../../components/session/Captcha.vue";

const data = reactive({
  name: "",
  email: "",
  password: "",
  recaptcha: "",
});
const user = ref("");
const showPass = ref(false);
const router = useRouter();
const toast = useToast();

let tokenCaptcha = "";

var onVerifyRecaptcha = (recaptchaToken) => {
  tokenCaptcha = recaptchaToken;
};

var onExpireRecaptcha = (recaptchaToken) => {
  tokenCaptcha = "";
};


const submit = () => {
  api
    .post("/register", {
      name: data.name,
      email: data.email,
      password: data.password,
      recaptcha: tokenCaptcha,
    })
    .then((response) => {
      user.value = response.data.user;
      router.push("/login");
      toast.success(
        `Se ha registrado de forma exitosa. Verifique su correo a través del enlace de verificación enviado al mismo.`,
        {
          timeout: 6000,
          position: "top-right",
          icon: true,
        }
      );
    })
    .catch((error) => {
      if (error.response) {
        // Si la respuesta de la API tiene un estado, el error provino de la API
        const status = error.response.status;
        const message = error.response.data.message;
        toast.error(`Error al enviar la solicitud (${status}): ${message}`, {
          timeout: 5000,
          position: "top-right",
          icon: true,
        });
        console.log(error);
      } else if (error.request) {
        // Si la solicitud no pudo completarse, es un error de red
        toast.error(`Error al enviar la solicitud: Conexión con la API rechazada.`, {
          timeout: 5000,
          position: "top-right",
          icon: true,
        });
        console.log(error);
      } else {
        // En otros casos, puede haber un error en el código
        toast.error(`Error al enviar la solicitud: ${message}`, {
          timeout: 5000,
          position: "top-right",
          icon: true,
        });
      }
      console.log(error);
    });
};
</script>
