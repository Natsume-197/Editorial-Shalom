<script setup>
import { XMarkIcon } from "@heroicons/vue/24/outline";
import { DialogTitle } from "@headlessui/vue";
import { reactive, computed } from "vue";
import { userStore } from "../../stores/user";
import { createRequestSale } from "../../utils/actions"

const emit = defineEmits(["close-form", "close-modal"]);

const backButton = () => {
  emit("close-form", false);
};

const store = userStore();


const data = reactive({
  id: store.userInfo.id,
  name: "",
  email: "",
  cellphone: "",
  zip_code: "",
  city: "",
  address: "",
  school_name: "",
  message: "",
});

const current_items = computed(() => store.shoppingCart.items);
let payload = {};

const reserveBooks = async () => {
  payload = {
    shopping_form: data,
    cart: current_items.value,
  };
  console.log(JSON.parse(JSON.stringify(payload)));

  await createRequestSale(payload)
};
</script>
<template>
  <div class="flex justify-center h-screen bg-gray-200 antialiased">
    <div class="flex h-screen bg-gray-100">
      <div class="">
        <div>
          <div class="flex-1 overflow-y-auto py-6 px-4 sm:px-6">
            <div class="flex items-start justify-between">
              <DialogTitle class="text-2xl font-bold text-gray-900"
                >Confirmemos tus datos</DialogTitle
              >
              <div class="ml-3 flex h-7 items-center">
                <button
                  type="button"
                  class="-m-2 p-2 text-gray-400 hover:text-gray-500"
                  @click="emit('close-modal', false)"
                >
                  <span class="sr-only">Cerrar panel</span>
                  <XMarkIcon class="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
            </div>
            <p class="mt-2 text-base -mb-2">
              Nos pondremos en contacto contigo para acordar un medio de pago.
            </p>
          </div>

          <div class="bg-white rounded-lg shadow">
            <div class="flex">
              <div class="flex-1 mb-2 pl-5 overflow-hidden">
                <svg
                  class="inline align-text-top"
                  height="24px"
                  viewBox="0 0 24 24"
                  width="24px"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="#000000"
                >
                  <g>
                    <path
                      d="m4.88889,2.07407l14.22222,0l0,20l-14.22222,0l0,-20z"
                      fill="none"
                      id="svg_1"
                      stroke="null"
                    ></path>
                    <path
                      d="m7.07935,0.05664c-3.87,0 -7,3.13 -7,7c0,5.25 7,13 7,13s7,-7.75 7,-13c0,-3.87 -3.13,-7 -7,-7zm-5,7c0,-2.76 2.24,-5 5,-5s5,2.24 5,5c0,2.88 -2.88,7.19 -5,9.88c-2.08,-2.67 -5,-7.03 -5,-9.88z"
                      id="svg_2"
                    ></path>
                    <circle
                      cx="7.04807"
                      cy="6.97256"
                      r="2.5"
                      id="svg_3"
                    ></circle>
                  </g>
                </svg>
                <h1 class="inline text-xl font-normal leading-none -ml-1">
                  Información de contacto
                </h1>
              </div>
            </div>

            <div class="px-5 pb-5">
              <input
                v-model="data.name"
                placeholder="Nombre"
                class="text-black placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200 focus:border-blueGray-500 focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400"
              />
              <input
                v-model="data.email"
                placeholder="Correo"
                class="text-black placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200 focus:border-blueGray-500 focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400"
              />
              <div class="flex">
                <div class="flex-grow">
                  <input
                    v-model="data.cellphone"
                    placeholder="Celular"
                    class="text-black placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200 focus:border-blueGray-500 focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400"
                  />
                </div>
              </div>
            </div>
            <div class="flex">
              <div class="flex-1 mb-2 pl-5 overflow-hidden">
                <svg
                  class="inline align-text-top"
                  width="21"
                  height="20.5"
                  viewBox="0 0 512 512"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlns:xlink="http://www.w3.org/1999/xlink"
                >
                  <title>contact-details</title>
                  <g
                    id="Page-1"
                    stroke="none"
                    stroke-width="1"
                    fill="none"
                    fill-rule="evenodd"
                  >
                    <g
                      id="icon"
                      fill="#000000"
                      transform="translate(42.666667, 85.333333)"
                    >
                      <path
                        d="M426.666667,1.42108547e-14 L426.666667,341.333333 L3.55271368e-14,341.333333 L3.55271368e-14,1.42108547e-14 L426.666667,1.42108547e-14 Z M384,42.6666667 L42.6666667,42.6666667 L42.6666667,298.666667 L384,298.666667 L384,42.6666667 Z M341.333333,213.333333 L341.333333,245.333333 L234.666667,245.333333 L234.666667,213.333333 L341.333333,213.333333 Z M146.666667,155.733333 C177.493333,155.733333 202.666667,181.333333 202.666667,213.333333 L74.6666667,213.333333 C74.6666667,181.333333 99.7387207,155.733333 130.666667,155.733333 L146.666667,155.733333 Z M341.333333,149.333333 L341.333333,181.333333 L234.666667,181.333333 L234.666667,149.333333 L341.333333,149.333333 Z M138.666667,78.62624 C154.13064,78.62624 166.666667,91.162267 166.666667,106.62624 C166.666667,122.090213 154.13064,134.62624 138.666667,134.62624 C123.202694,134.62624 110.666667,122.090213 110.666667,106.62624 C110.666667,91.162267 123.202694,78.62624 138.666667,78.62624 Z M341.333333,85.3333333 L341.333333,117.333333 L234.666667,117.333333 L234.666667,85.3333333 L341.333333,85.3333333 Z"
                        id="Combined-Shape"
                      ></path>
                    </g>
                  </g>
                </svg>

                <h1 class="inline text-xl font-normal leading-none">
                  Información de entrega
                </h1>
              </div>
              <div class="flex-none pt-2.5 pr-2.5 pl-1"></div>
            </div>
            <div class="px-5 pb-5">
              <div class="flex">
                <div class="flex-grow w-2/5 pr-2">
                  <input
                    v-model="data.zip_code"
                    placeholder="Código Postal"
                    class="text-black placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200 focus:border-blueGray-500 focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400"
                  />
                </div>
                <div class="flex-grow">
                  <input
                    v-model="data.city"
                    placeholder="Ciudad"
                    class="text-black placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200 focus:border-blueGray-500 focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400"
                  />
                </div>
              </div>
              <input
                v-model="data.address"
                placeholder="Dirección"
                class="text-black placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200 focus:border-blueGray-500 focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400"
              />
            </div>
            <div class="flex">
              <div class="flex-1 mb-2 pl-5 overflow-hidden">
                <svg
                  class="inline align-text-top"
                  width="21"
                  height="20.5"
                  viewBox="0 0 512 512"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlns:xlink="http://www.w3.org/1999/xlink"
                >
                  <title>contact-details</title>
                  <g
                    id="Page-1"
                    stroke="none"
                    stroke-width="1"
                    fill="none"
                    fill-rule="evenodd"
                  >
                    <g
                      id="icon"
                      fill="#000000"
                      transform="translate(42.666667, 85.333333)"
                    >
                      <path
                        d="M426.666667,1.42108547e-14 L426.666667,341.333333 L3.55271368e-14,341.333333 L3.55271368e-14,1.42108547e-14 L426.666667,1.42108547e-14 Z M384,42.6666667 L42.6666667,42.6666667 L42.6666667,298.666667 L384,298.666667 L384,42.6666667 Z M341.333333,213.333333 L341.333333,245.333333 L234.666667,245.333333 L234.666667,213.333333 L341.333333,213.333333 Z M146.666667,155.733333 C177.493333,155.733333 202.666667,181.333333 202.666667,213.333333 L74.6666667,213.333333 C74.6666667,181.333333 99.7387207,155.733333 130.666667,155.733333 L146.666667,155.733333 Z M341.333333,149.333333 L341.333333,181.333333 L234.666667,181.333333 L234.666667,149.333333 L341.333333,149.333333 Z M138.666667,78.62624 C154.13064,78.62624 166.666667,91.162267 166.666667,106.62624 C166.666667,122.090213 154.13064,134.62624 138.666667,134.62624 C123.202694,134.62624 110.666667,122.090213 110.666667,106.62624 C110.666667,91.162267 123.202694,78.62624 138.666667,78.62624 Z M341.333333,85.3333333 L341.333333,117.333333 L234.666667,117.333333 L234.666667,85.3333333 L341.333333,85.3333333 Z"
                        id="Combined-Shape"
                      ></path>
                    </g>
                  </g>
                </svg>

                <h1 class="inline text-xl font-normal leading-none">
                  Información adicional
                </h1>
              </div>
              <div class="flex-none pt-2.5 pr-2.5 pl-1"></div>
            </div>
            <div class="px-5 pb-5">
              <div class="flex">
                <div class="flex-grow w-2/5 pr-2">
                  <input
                    v-model="data.school_name"
                    placeholder="Nombre del colegio"
                    class="text-black placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200 focus:border-blueGray-500 focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400"
                  />
                </div>
              </div>
              <textarea
                v-model="data.message"
                rows="4"
                placeholder="Mensaje"
                class="text-black resize-none placeholder-gray-600 w-full mt-2 text-base transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200 focus:border-blueGray-500 focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400"
              />
            </div>
            <hr class="mt-4" />
            <div class="border-t border-gray-200 m">
              <div class="mx-6 mb-2 mt-6">
                <button
                  @click="reserveBooks"
                  class="flex items-center w-full justify-center rounded-md border border-transparent bg-sky-500 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-sky-600"
                >
                  Realizar pedido
                </button>
              </div>
              <div class="mx-6 mb-2">
                <button
                  @click="backButton"
                  class="flex items-center w-full justify-center rounded-md border border-transparent bg-gray-500 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-gray-600"
                >
                  Regresar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
