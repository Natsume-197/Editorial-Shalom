<script setup>
import Navbar from "../../components/home/elements/Navbar.vue";
import Footer from "../../components/home/Footer.vue";
import { computed, reactive, ref } from "vue";
import { userStore } from "../../stores/user";
import { getRequestsUser } from "../../utils/actions";
import HistoryItem from "./modals/HistoryItem.vue"

const store = userStore();
const user = computed(() => store.userInfo);

let items = null;
const table = reactive({
  items: null,
});

const data = reactive({
  name: user.value.name,
  email: user.value.email,
  cellphone: "",
  zip_code: "",
  city: "",
  address: "",
});

getRequestsUser(user.value.id).then((response) => {
  table.items = response.data.sales_request;
});



let itemSelected = ref(null)
let isOpenAction = ref(false)

const actionsButton = (item) => {
    itemSelected.value = item
    isOpenAction.value = true
    
}

</script>

<template>
  <div class="mx-auto flex flex-col min-h-screen">
    <div class="flex-1">
      <Navbar />

      <section class="container px-4 mx-auto mt-32">
        <div class="flex items-center gap-x-3">
          <h2 class="text-xl font-bold text-gray-800 dark:text-white">
            Historial de pedidos
          </h2>

          <span
            class="px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full dark:bg-gray-800 dark:text-blue-400"
            >0 pedidos</span
          >
        </div>

        <HistoryItem v-if="isOpenAction" :item="itemSelected" :isOpen="isOpenAction" @close-modal="isOpenAction = false" />

        <div class="flex flex-col mt-6">
          <div class=" -my-2 overflow-x-auto -mx-8">
            <div
              class="inline-block min-w-full py-2 align-middle  px-8"
            >
              <div
                class="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg"
              >
                <table
                  class="min-w-full divide-y divide-gray-200 dark:divide-gray-700"
                >
                  <thead class="bg-gray-50 dark:bg-gray-800">
                    <tr>
                      <th
                        scope="col"
                        class="px-8 py-3.5 text-sm font-bold text-center rtl:text-right text-gray-500 dark:text-gray-400"
                      >
                        Número de pedido
                      </th>

                      <th
                        scope="col"
                        class="py-3.5 px-8 text-sm font-bold text-center rtl:text-right text-gray-500 dark:text-gray-400"
                      >
                        <span>Nombre</span>
                      </th>

                      <th
                        scope="col"
                        class="px-8 py-3.5 text-sm font-bold text-center rtl:text-right text-gray-500 dark:text-gray-400"
                      >
                        Correo
                      </th>

                      <th
                        scope="col"
                        class="px-8 py-3.5 text-sm font-bold text-center rtl:text-right text-gray-500 dark:text-gray-400"
                      >
                        Dirección
                      </th>

                      <th
                        scope="col"
                        class="px-8 py-3.5 text-sm font-bold text-center rtl:text-right text-gray-500 dark:text-gray-400"
                      >
                        Celular
                      </th>

                      <th
                        scope="col"
                        class="px-8 py-3.5 text-sm font-bold text-center rtl:text-right text-gray-500 dark:text-gray-400"
                      >
                        <span>Estado</span>
                      </th>

                      <th
                        scope="col"
                        class="px-8 py-3.5 text-sm font-bold text-center rtl:text-right text-gray-500 dark:text-gray-400"
                      >
                        Acciones
                      </th>

                      <th scope="col" class="relative py-3.5 px-4">
                        <span class="sr-only">Edit</span>
                      </th>
                    </tr>
                  </thead>

                  <tbody
                    class="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900"
                  >
                    <tr v-for="item in table.items">
                      <td
                        class="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap"
                      >
                        <div class="inline-flex items-center gap-x-3">
                          <div class="flex items-center gap-x-2">
                            <div>
                              <h2
                                class="font-medium text-gray-800 text-center dark:text-white"
                              >
                                {{ item.id }}
                              </h2>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td
                        class="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 text-center whitespace-nowrap"
                      >
                        {{ item.name }}
                      </td>

                      <td
                        class="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 text-center whitespace-nowrap"
                      >
                        {{ item.email }}
                      </td>

                      <td
                        class="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 text-center whitespace-nowrap"
                      >
                        {{ item.address }}
                      </td>

                      <td
                        class="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 text-center whitespace-nowrap"
                      >
                        {{ item.cell }}
                      </td>

                      <td
                        class="px-12 py-4 text-sm font-medium text-gray-700 whitespace-nowrap"
                      >
                        <div
                          class="inline-flex items-center px-3 py-1 rounded-full gap-x-2 bg-emerald-100/60 dark:bg-gray-800"
                        >
                          <span
                            class="h-1.5 w-1.5 rounded-full bg-emerald-500 text-center"
                          ></span>

                          <h2
                            class="text-sm font-normal text-emerald-500 text-center"
                          >
                            {{ item.status.name }}
                          </h2>
                        </div>
                      </td>

                      <td class="px-4 py-4 text-sm whitespace-nowrap">
                        <div class="ml-4 flex items-center gap-x-6">
                          <button
                            class="text-gray-500 transition-colors duration-200 dark:hover:text-red-500 dark:text-gray-300 hover:text-red-500 focus:outline-none"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke-width="1.5"
                              stroke="currentColor"
                              class="w-5 h-5"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                              />
                            </svg>
                          </button>

                          <button
                            @click="actionsButton(item)"
                            class="text-gray-500 transition-colors duration-200 dark:hover:text-yellow-500 dark:text-gray-300 hover:text-yellow-500 focus:outline-none"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              
                              stroke="currentColor"
                              class="w-5 h-5"
                            >
                              <path
                                d="M12 13.75C12.9665 13.75 13.75 12.9665 13.75 12C13.75 11.0335 12.9665 10.25 12 10.25C11.0335 10.25 10.25 11.0335 10.25 12C10.25 12.9665 11.0335 13.75 12 13.75Z"
                                fill="#000000"
                              />
                              <path
                                d="M19 13.75C19.9665 13.75 20.75 12.9665 20.75 12C20.75 11.0335 19.9665 10.25 19 10.25C18.0335 10.25 17.25 11.0335 17.25 12C17.25 12.9665 18.0335 13.75 19 13.75Z"
                                fill="#000000"
                              />
                              <path
                                d="M5 13.75C5.9665 13.75 6.75 12.9665 6.75 12C6.75 11.0335 5.9665 10.25 5 10.25C4.0335 10.25 3.25 11.0335 3.25 12C3.25 12.9665 4.0335 13.75 5 13.75Z"
                                fill="#000000"
                              />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div
                  v-if="!table.items"
                  class="flex items-center mt-2 text-center border rounded-lg h-96 dark:border-gray-700"
                >
                  <div class="flex flex-col w-full max-w-sm px-4 mx-auto">
                    <div
                      class="p-3 mx-auto text-blue-500 bg-blue-100 rounded-full dark:bg-gray-800"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        class="w-6 h-6"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                        />
                      </svg>
                    </div>
                    <h1 class="mt-3 text-lg text-gray-800 dark:text-white">
                      No hemos podido encontrar ningún pedido
                    </h1>
                    <p class="mt-2 text-gray-500 dark:text-gray-400">
                      Realiza un pedido en nuestra tienda o limpia la busqueda.
                    </p>
                    <div class="flex items-center mt-4 sm:mx-auto gap-x-3">
                      <button
                        class="w-1/2 px-5 py-2 text-sm text-gray-700 transition-colors duration-200 bg-white border rounded-lg sm:w-auto dark:hover:bg-gray-800 dark:bg-gray-900 hover:bg-gray-100 dark:text-gray-200 dark:border-gray-700"
                      >
                        Limpiar busqueda
                      </button>

                      <button
                        class="flex items-center justify-center w-1/2 px-5 py-2 text-sm tracking-wide text-white transition-colors duration-200 bg-blue-500 rounded-lg shrink-0 sm:w-auto gap-x-2 hover:bg-blue-600 dark:hover:bg-blue-500 dark:bg-blue-600"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          class="w-5 h-5"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>

                        <span>Comprar</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="flex items-center justify-between mt-6">
          <a
            href="#"
            class="flex items-center px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md gap-x-2 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-5 h-5 rtl:-scale-x-100"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
              />
            </svg>

            <span> previous </span>
          </a>

          <div class="items-center flex gap-x-3">
            <a
              href="#"
              class="px-2 py-1 text-sm text-blue-500 rounded-md dark:bg-gray-800 bg-blue-100/60"
              >1</a
            >
            <a
              href="#"
              class="px-2 py-1 text-sm text-gray-500 rounded-md dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100"
              >2</a
            >
            <a
              href="#"
              class="px-2 py-1 text-sm text-gray-500 rounded-md dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100"
              >3</a
            >
            <a
              href="#"
              class="px-2 py-1 text-sm text-gray-500 rounded-md dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100"
              >...</a
            >
            <a
              href="#"
              class="px-2 py-1 text-sm text-gray-500 rounded-md dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100"
              >12</a
            >
            <a
              href="#"
              class="px-2 py-1 text-sm text-gray-500 rounded-md dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100"
              >13</a
            >
            <a
              href="#"
              class="px-2 py-1 text-sm text-gray-500 rounded-md dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100"
              >14</a
            >
          </div>

          <a
            href="#"
            class="flex items-center px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md gap-x-2 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800"
          >
            <span> Next </span>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-5 h-5 rtl:-scale-x-100"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
              />
            </svg>
          </a>
        </div>
      </section>
    </div>

    
    <Footer />
  </div>

  
</template>