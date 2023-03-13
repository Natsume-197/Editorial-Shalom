<script setup>
import { computed, reactive } from "vue";
import { userStore } from "../../stores/user";
import Navbar from "../../components/home/elements/Navbar.vue";
import Footer from "../../components/home/Footer.vue";
import { onMounted } from "vue";

const store = userStore();
const user = computed(() => store.userInfo);

const data = reactive({
  name: user.value.name,
  email: user.value.email,
  cellphone: "",
  zip_code: "",
  city: "",
  address: "",
});

onMounted(() => {});
</script>

<template>
  <div class="mx-auto flex flex-col min-h-screen">
    <div class="flex-1">
      <Navbar />

      <section
        class="flex justify-center bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 overflow-hidden min-h-screen"
      >
        <div class="px-4 py-8 sm:py-12 sm:px-6 lg:pt-16 lg:px-8">
          <div
            class="grid grid-cols-1 gap-y-8 lg:grid-cols-3 lg:items-center lg:gap-x-16 mt-32"
          >
            <div class="max-w-lg text-center lg:mx-0 lg:text-left">
              <div
                class="dark:!bg-navy-800 shadow-shadow-500 shadow-3xl rounded-primary relative mx-auto flex h-full w-full flex-col items-center bg-white border rounded-2xl bg-cover bg-clip-border p-[16px] dark:text-white dark:shadow-none"
              >
                <p class="font-bold text-2xl text-left mb-2">
                  Perfil del usuario
                </p>

                <div
                  class="relative mt-1 flex h-32 w-full justify-center rounded-xl bg-cover"
                  style="
                    background-image: url('https://i.ibb.co/FWggPq1/banner.png');
                  "
                >
                  <div
                    class="absolute -bottom-12 flex h-[88px] w-[88px] items-center justify-center rounded-full border-[4px] border-white bg-pink-400"
                  >
                    <img
                      class="h-full w-full rounded-full"
                      src="https://res.cloudinary.com/crunchbase-production/image/upload/c_lpad,f_auto,q_auto:eco,dpr_1/gdruy0cnkgnaadpxiadi"
                      alt=""
                    />
                  </div>
                </div>
                <div class="mt-16 flex flex-col items-center">
                  <h4 class="text-bluePrimary text-xl font-bold">
                    {{ user.name }}
                  </h4>
                  <p class="text-lightSecondary text-base font-normal">
                    {{ user.email }}
                  </p>
                </div>

                <div class="mt-6 mb-3 flex gap-4 md:!gap-14">
                  <div class="flex flex-col items-center justify-center">
                    <h3 class="text-bluePrimary text-2xl font-bold">0</h3>
                    <p class="text-lightSecondary text-sm font-normal">
                      Pedidos
                    </p>
                  </div>
                  <div class="flex flex-col items-center justify-center">
                    <h3 class="text-bluePrimary text-2xl font-bold">0</h3>
                    <p class="text-lightSecondary text-sm font-normal">
                      Compras
                    </p>
                  </div>
                  <div class="flex flex-col items-center justify-center">
                    <h3 class="text-bluePrimary text-2xl font-bold">0</h3>
                    <p class="text-lightSecondary text-sm font-normal">
                      Tickets
                    </p>
                  </div>
                </div>

                <button
                  @click="removeAccount"
                  class="bg-sky-500 w-full mt-2 text-white hover:bg-sky-700 block px-3 py-2 rounded-md text-xl font-semibold"
                >
                  Historial de pedidos
                </button>
                <button
                  @click="removeAccount"
                  class="bg-rose-500 w-full mt-2 text-white hover:bg-rose-700 block px-3 py-2 rounded-md text-xl font-semibold"
                >
                  Eliminar cuenta
                </button>
              </div>
            </div>

            <div class="grid grid-cols-1">
              <div
                class="bg-white shadow-md rounded-2xl px-8 pt-6 pb-8 mb-4 flex flex-col my-2"
              >
                <p class="font-bold text-2xl text-left mb-6">
                  Detalles del usuario
                </p>
                <div class="-mx-3 md:flex mb-6">
                  <div class="md:w-full px-3">
                    <label
                      class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                      for="grid-last-name"
                    >
                      Nombre
                    </label>
                    <input
                      v-model="data.name"
                      placeholder="No disponible"
                      class="text-black placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200 focus:border-blueGray-500 focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400"
                    />
                  </div>
                </div>
                <div class="-mx-3 md:flex mb-6">
                  <div class="md:w-full px-3">
                    <label
                      class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                      for="grid-last-name"
                    >
                      Correo
                    </label>
                    <input
                      v-model="data.email"
                      placeholder="Correo"
                      class="text-black placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200 focus:border-blueGray-500 focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400"
                    />
                  </div>
                  <div class="md:w-full px-3">
                    <label
                      class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                      for="grid-last-name"
                    >
                      Celular
                    </label>
                    <input
                      v-model="data.cellphone"
                      placeholder="No disponible"
                      class="text-black placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200 focus:border-blueGray-500 focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400"
                    />
                  </div>
                </div>

                <div class="-mx-3 md:flex mb-6">
                  <div class="md:w-full px-3">
                    <label
                      class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                      for="grid-last-name"
                    >
                      Dirección
                    </label>
                    <input
                      v-model="data.address"
                      placeholder="No disponible"
                      class="text-black placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200 focus:border-blueGray-500 focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400"
                    />
                  </div>
                </div>

                <div class="-mx-3 md:flex mb-2">
                  <div class="md:w-1/2 px-3 mb-6 md:mb-0">
                    <label
                      class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                      for="grid-city"
                    >
                      Código postal
                    </label>
                    <input
                      v-model="data.zip_code"
                      placeholder="No disponible"
                      class="text-black placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200 focus:border-blueGray-500 focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400"
                    />
                  </div>
                  <div class="md:w-1/2 px-3">
                    <label
                      class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                      for="grid-state"
                    >
                      Ciudad
                    </label>
                    <div class="relative">
                      <input
                        v-model="data.city"
                        placeholder="No disponible"
                        class="text-black placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200 focus:border-blueGray-500 focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400"
                      />
                    </div>
                  </div>
                </div>
                <button
                  @click="removeAccount"
                  class="bg-sky-500 mt-4 text-white hover:bg-sky-700 block px-3 py-2 rounded-md text-xl font-semibold"
                >
                  Actualizar información
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>

    <Footer />
  </div>
</template>

<style></style>
