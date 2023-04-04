<template>
  <div class="mx-auto flex flex-col min-h-screen">
    <div class="flex-1">
      <Navbar />
      <div
        class="w-full mt-24 flex flex-col sm:justify-center items-center pt-6 sm:pt-0"
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
                  <div class="relative flex items-center mt-2">
                    <span class="absolute">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        class="w-6 h-6 mx-3 text-gray-400 dark:text-gray-500"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                        />
                      </svg>
                    </span>

                    <input
                      v-model="data.email"
                      type="email"
                      placeholder="Correo"
                      class="block w-full py-2.5 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg pl-11 pr-5 rtl:pr-11 rtl:pl-5  focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                    />
                  </div>
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
