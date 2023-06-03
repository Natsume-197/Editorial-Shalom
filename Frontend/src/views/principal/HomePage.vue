<script setup>
import Navbar from "../../components/home/elements/Navbar.vue";
import Showcase from "../../components/home/Showcase.vue";
import LandingPage from "../../components/home/LandingPage.vue";
import BookSeries from "../../components/home/BooksSeries.vue";
import LandingFeatures from "../../components/home/LandingFeatures.vue";
import Categories from "../../components/home/Categories.vue";
import Footer from "../../components/home/Footer.vue";
import { useToast } from "vue-toastification";
import { api } from "../../utils/axios";
import { useRouter } from "vue-router";

const toast = useToast();
const router = useRouter();

const tokenArray = window.location.href.split("/");

if (tokenArray.length > 4) {
  router.push("/");
  const token = tokenArray.slice(-2)[0];
  api
    .get("account/verify/" + token)
    .then(() => {
      toast.success(`Se ha verificado el correo electronico.`, {
        timeout: 5000,
        position: "bottom-right",
        icon: true,
      });
    })
    .catch((error) => {
      const status = error.response.status;
      const message = error.response.data.message;
      console.log(error);
      if (error.response) {
        // Si la respuesta de la API tiene un estado, el error provino de la API  
        if (status !== 401) {
          toast.error(`Error al enviar la solicitud (${status}): ${message}`, {
            timeout: 5000,
            position: "top-right",
            icon: true,
          });
        }
      } else if (error.request) {
        // Si la solicitud no pudo completarse, es un error de red
        toast.error(
          `Error al enviar la solicitud: Conexión con la API rechazada.`,
          {
            timeout: 5000,
            position: "top-right",
            icon: true,
          }
        );
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
}
</script>

<template>
  <div class="mx-auto flex flex-col min-h-screen">
    <div class="flex-1">
      <Navbar />
      <LandingPage />
      <Categories />
      <LandingFeatures />
      <BookSeries />
      <Suspense>
        <Showcase />
      </Suspense>
    </div>
    <Footer />
  </div>
</template>

<style>

@font-face {
  font-family: "Roboto";
}

* {
  font-family: 'Roboto', sans-serif;
}
body {
  overflow-x: hidden;
}
</style>
