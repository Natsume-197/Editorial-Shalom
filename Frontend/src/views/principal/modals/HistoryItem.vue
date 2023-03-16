<script setup>
import { ref, reactive, computed } from "vue";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  TransitionChild,
  TransitionRoot,
} from "@headlessui/vue";
import ChatUser from "./ChatUser.vue";

const props = defineProps({
  item: {
    type: Object,
    default: null,
  },
  isOpen: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["close-modal"]);

let open = computed({
  get: () => props.isOpen,
  set: (value) => emit("close-modal", value),
});

let closeModal = () => {
  open.value = false;
};

const data = reactive({
  name: props.item.name,
  email: props.item.email,
  cellphone: props.item.cell,
  zip_code: props.item.zip_code,
  city: props.item.city,
  address: props.item.address,
  address: props.item.address,
  school_name: props.item.school_name,
  message: props.item.message,
});

let isOpenChat = ref(false);
let openModalChat = () => {
  isOpenChat.value = true;
};
</script>

<template>
  <TransitionRoot as="template" :show="open" @click="closeModal">
    <Dialog as="div" class="relative z-50">
      <TransitionChild
        as="template"
        enter="ease-out duration-300"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="ease-in duration-200"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div
          class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
        />
      </TransitionChild>

      <div class="fixed inset-0 z-10">
        <div
          class="flex min-h-full items-center p-4 text-center sm:p-0 pointer-events-none relative h-[calc(100%-1rem)] w-auto min-[576px]:mx-auto min-[576px]:h-[calc(100%-3.5rem)] min-[576px]:max-w-[700px]"
        >
          <TransitionChild
            as="template"
            enter="ease-out duration-300"
            enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enter-to="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leave-from="opacity-100 translate-y-0 sm:scale-100"
            leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <DialogPanel
              class="pointer-events-auto relative flex max-h-[80%] w-full flex-col overflow-hidden rounded-md border-none bg-white bg-clip-padding text-current shadow-lg outline-none dark:bg-neutral-600"
            >
              <ChatUser
                :isOpen="isOpenChat"
                :item="props.item"
                @close-modal-chat="isOpenChat = false"
              />

              <div class="bg-white px-4 mt-2 overflow-y-auto">
                <div class="sm:flex sm:items-start">
                  <div class="text-center sm:text-left">
                    <div class="flex h-full flex-col bg-white">
                      <div class="flex-1 py-6 px-4 sm:px-6">
                        <div class="flex items-start justify-between">
                          <DialogTitle class="text-2xl font-bold text-gray-900"
                            >Detalles del pedido</DialogTitle
                          >
                        </div>

                        <div class="mt-4 text-lg font-bold">
                          Libros seleccionados
                        </div>

                        <div class="mt-4 overflow-y-auto" style="height: 345px">
                          <div class="flow-root">
                            <ul
                              role="list"
                              class="-my-6 divide-y divide-gray-200 mr-4"
                            >
                              <li
                                v-for="(product, index) in item.book_reserved"
                                :key="index"
                                class="flex py-6"
                              >
                                <div
                                  class="h-30 w-32 md:w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200"
                                >
                                  <img
                                    src="http://localhost:5000/api/assets/books/covers/test.jpg"
                                    class="object-cover object-center"
                                  />
                                </div>
                                <div class="ml-4 flex flex-1 flex-col">
                                  <div>
                                    <div
                                      class="flex justify-between text-base font-medium text-gray-900"
                                    >
                                      <h3>
                                        <a href="/books" class="capitalize">
                                          {{
                                            props.item.book_reserved[index].book
                                              .book_t[0].title
                                          }}
                                        </a>
                                      </h3>

                                      <p class="ml-4">
                                        {{
                                          props.item.book_reserved[index].price
                                        }}
                                      </p>
                                    </div>

                                    <p
                                      class="mt-1 text-sm font-semibold text-gray-500 mb-1"
                                    >
                                      {{
                                        props.item.book_reserved[index].book
                                          .category.name
                                      }}
                                    </p>
                                  </div>

                                  <p class="mt-1 text-sm text-gray-500">
                                    Unidades:
                                    {{ props.item.book_reserved[index].amount }}
                                  </p>
                                </div>
                              </li>
                            </ul>
                          </div>
                        </div>

                        <div
                          class="text-lg font-semibold text-right text-gray-900 mt-4"
                        >
                          Total a pagar :
                          <div class="inline font-normal ml-1">
                            {{ props.item.total }}
                          </div>
                        </div>

                        <hr class="mt-4" />
                        <div class="border-t border-gray-200 m"></div>

                        <div class="flex">
                          <div class="flex-1 mb-4 mt-5 overflow-hidden">
                            <h1 class="inline text-lg font-bold leading-none">
                              Información de contacto
                            </h1>
                          </div>
                        </div>

                        <div class="pb-5">
                          <h3
                            class="inline p-1 text-base font-normal leading-none"
                          >
                            Nombre
                          </h3>
                          <input
                            v-model="data.name"
                            placeholder="Nombre"
                            class="text-black placeholder-gray-600 w-full mb-2 px-4 py-2.5 mt-2 text-base transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200 focus:border-blueGray-500 focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400"
                          />
                          <h3
                            class="inline p-1 text-base font-normal leading-none"
                          >
                            Correo
                          </h3>
                          <input
                            v-model="data.email"
                            placeholder="Correo"
                            class="text-black placeholder-gray-600 mb-3 w-full px-4 py-2.5 mt-2 text-base transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200 focus:border-blueGray-500 focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400"
                          />
                          <div class="flex">
                            <div class="flex-grow mb-2">
                              <h3
                                class="inline p-1 text-base font-normal leading-none"
                              >
                                Celular
                              </h3>
                              <input
                                v-model="data.cellphone"
                                placeholder="Celular"
                                class="text-black placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200 focus:border-blueGray-500 focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400"
                              />
                            </div>
                          </div>
                        </div>
                        <div class="flex">
                          <div class="flex-1 mb-4 overflow-hidden">
                            <h1 class="inline text-lg font-bold leading-none">
                              Información de entrega
                            </h1>
                          </div>
                          <div class="flex-none pt-2.5 pr-2.5 pl-1"></div>
                        </div>
                        <div class="pb-5 mb-3">
                          <div class="flex">
                            <div class="flex-grow w-2/5 pr-2 mb-3">
                              <h3
                                class="inline p-1 text-base font-normal leading-none"
                              >
                                Código Postal
                              </h3>
                              <input
                                v-model="data.zip_code"
                                placeholder="Código Postal"
                                class="text-black placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200 focus:border-blueGray-500 focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400"
                              />
                            </div>
                            <div class="flex-grow">
                              <h3
                                class="inline p-1 text-base font-normal leading-none"
                              >
                                Ciudad
                              </h3>
                              <input
                                v-model="data.city"
                                placeholder="Ciudad"
                                class="text-black placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200 focus:border-blueGray-500 focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400"
                              />
                            </div>
                          </div>
                          <h3
                            class="inline p-1 text-base font-normal leading-none"
                          >
                            Dirección
                          </h3>
                          <input
                            v-model="data.address"
                            placeholder="Dirección"
                            class="text-black placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200 focus:border-blueGray-500 focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400"
                          />
                        </div>
                        <div class="flex">
                          <div class="flex-1 mb-3 overflow-hidden">
                            <h1 class="inline text-lg font-bold leading-none">
                              Información adicional
                            </h1>
                          </div>
                          <div class="flex-none pt-2.5 pr-2.5 pl-1"></div>
                        </div>
                        <div class="pb-5">
                          <div class="flex">
                            <div class="flex-grow w-2/5 pr-2 mb-3">
                              <h3
                                class="inline p-1 text-base font-normal leading-none"
                              >
                                Nombre del colegio
                              </h3>
                              <input
                                v-model="data.school_name"
                                placeholder="Nombre del colegio"
                                class="text-black placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200 focus:border-blueGray-500 focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400"
                              />
                            </div>
                          </div>
                          <h3
                            class="inline p-1 text-base font-normal leading-none mb-3"
                          >
                            Mensaje
                          </h3>
                          <textarea
                            v-model="data.message"
                            rows="4"
                            placeholder="Mensaje"
                            class="text-black resize-none placeholder-gray-600 w-full mt-2 text-base transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200 focus:border-blueGray-500 focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400"
                          />
                        </div>
                        <hr class="mt-2" />
                        <div class="border-t border-gray-200 m"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6"
              >
                <button
                  type="button"
                  class="inline-flex w-full justify-center rounded-md bg-sky-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-sky-500 sm:ml-3 sm:w-auto"
                  @click="openModalChat"
                >
                  Abrir conversación
                </button>
                <button
                  type="button"
                  class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                  @click="closeModal"
                  ref="cancelButtonRef"
                >
                  Cerrar
                </button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
