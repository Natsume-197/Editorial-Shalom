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
          <h2 class="title">Registro</h2>
          <form @submit.prevent="submit">
          <div class="mt-6 text-center">
            ¿Ya tienes una cuenta?
            <router-link to="/login" class="hover:underline"
              ><span class="font-bold">Iniciar Sesión</span></router-link
            >
          </div>
          <div class="inputs">
            <input
              type="text"
              name="name"
              required
              v-model="data.name"
              placeholder="Nombre"
            />
            <br />
            <input
              type="email"
              name="email"
              required
              v-model="data.email"
              placeholder="Correo"
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
          <br /><br />
          <div class="remember-me--forget-password">
            <!-- Angular -->
            <br />
          </div>
          <br />
          <button>Registrarse</button>
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

const data = reactive({
  name: "",
  email: "",
  password: "",
});
const user = ref("");
const showPass = ref(false);
const router = useRouter();
const toast = useToast();

const submit = () => {
  api
    .post("/register", {
      name: data.name,
      email: data.email,
      password: data.password,
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
