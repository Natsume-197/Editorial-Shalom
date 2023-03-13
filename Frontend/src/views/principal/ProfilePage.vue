<script setup>
import { computed } from "vue";
import { userStore } from "../../stores/user";
import Navbar from "../../components/home/elements/Navbar.vue";
import Footer from "../../components/home/Footer.vue";
import { onMounted } from "vue";

const store = userStore();
const user = computed(() => store.userInfo);

onMounted(() => {});
</script>

<template>
  <div class="mx-auto flex flex-col min-h-screen">
    <div class="flex-1">
      <Navbar />

      <div class="parent">
        <div class="div1 mt-32">
          <div
            class="dark:!bg-navy-800 shadow-shadow-500 shadow-3xl rounded-primary relative mx-auto flex h-full w-full max-w-[550px] flex-col items-center bg-white border rounded-2xl bg-cover bg-clip-border p-[16px] dark:text-white dark:shadow-none"
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
                <p class="text-lightSecondary text-sm font-normal">Pedidos</p>
              </div>
              <div class="flex flex-col items-center justify-center">
                <h3 class="text-bluePrimary text-2xl font-bold">0</h3>
                <p class="text-lightSecondary text-sm font-normal">Compras</p>
              </div>
              <div class="flex flex-col items-center justify-center">
                <h3 class="text-bluePrimary text-2xl font-bold">0</h3>
                <p class="text-lightSecondary text-sm font-normal">Tickets</p>
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
        <div class="div2 mt-32">





          
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>

<style>
.parent {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: repeat(5, 1fr);
  grid-column-gap: 0px;
  grid-row-gap: 0px;
}

.div1 {
  grid-area: 1 / 1 / 4 / 3;
}
.div2 {
  grid-area: 1 / 3 / 4 / 6;
}
</style>
