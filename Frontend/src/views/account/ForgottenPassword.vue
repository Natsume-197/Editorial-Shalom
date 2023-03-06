<template>
  <div class="mx-auto flex flex-col min-h-screen">
    <div class="flex-1">
      <Navbar class="" />
      <div
        class="w-full mt-24 flex flex-col sm:justify-center items-center pt-6 sm:pt-0 animate__animated animate__fadeIn"
      >
        <div class="w-full sm:max-w-md p-5 mx-auto">
          <h2 class="mb-12 text-center text-5xl font-extrabold">
            ¿Has olvidado la contraseña?
          </h2>
          <br />
          <form @submit.prevent="submit">
            <div class="screen-1">
              <div class="email">
                <div class="sec-2">
                  <ion-icon name="mail-outline"></ion-icon>
                  <input placeholder="Correo" type="email" name="email" v-model="data.email" required />
                </div>
              </div>
            </div>

            <div class="mt-6">
              <button
                class="back w-full inline-flex items-center justify-center px-4 py-2 bg-red-600 border border-transparent rounded-md font-semibold capitalize text-white hover:bg-red-700 active:bg-red-700 focus:outline-none focus:border-red-700 focus:ring focus:ring-red-200 disabled:opacity-25 transition"
              >
                Reestablecer contraseña
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script setup>
import { reactive } from "vue";
import { useRouter } from "vue-router";
import { useToast } from "vue-toastification";
import { api } from "../../utils/axios";
import Navbar from "../../components/home/elements/Navbar.vue";
import Footer from "../../components/home/Footer.vue";

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
        timeout: 5000,
        position: "top-right",
        icon: true,
      });
    })
    .catch((error) => {
      console.log(error);
      toast.error(`${error.response.data.message}`, {
        timeout: 5000,
        position: "top-right",
        icon: true,
      });
    });
};
</script>
<style>
.back {
  background-image: linear-gradient(135deg, #0ea5e9 100%, #0ea5e9 100%);
}
.screen-1 .email {
  background: white;
  box-shadow: 0 0 2em #e6e9f9;
  padding: 1em;
  display: flex;
  flex-direction: column;
  gap: 0.5em;
  border-radius: 20px;
  color: #4d4d4d;
  margin-top: -3em;
}
.screen-1 .email input {
  outline: none;
  border: none;
}
.screen-1 .email input::-moz-placeholder {
  color: black;
  font-size: 0.9em;
}
.screen-1 .email input:-ms-input-placeholder {
  color: black;
  font-size: 0.9em;
}
.screen-1 .email input::placeholder {
  color: black;
  font-size: 0.9em;
}
.screen-1 .email ion-icon {
  color: #4d4d4d;
  margin-bottom: -0.2em;
}
</style>
