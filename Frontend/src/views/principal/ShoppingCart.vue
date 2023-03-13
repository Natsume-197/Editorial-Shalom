<script setup>
import { ref, computed } from "vue";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  TransitionChild,
  TransitionRoot,
} from "@headlessui/vue";
import { XMarkIcon } from "@heroicons/vue/24/outline";
import { userStore } from "../../stores/user";
import ShoppingForm from "./ShoppingForm.vue";
import { useToast } from "vue-toastification";
import { useRouter } from "vue-router";

const toast = useToast();

const router = useRouter();


const props = defineProps({
  modelValue: {
    type: [String, Number, Boolean],
    default: null,
  },
});

let value = computed({
  get: () => props.modelValue,
});

const store = userStore();
const current_items = computed(() => store.shoppingCart.items);

const removeItemCart = (itemId) => {
  // Si el item existe, elimina el elemento
  if (itemId !== -1) {
    store.$patch((state) => {
      state.shoppingCart.items.splice(itemId, 1);
    });
  }
};

const removeAllItemCart = () => {
  store.$patch((state) => {
    state.shoppingCart.items = [];
  });
};

const totalPrice = computed(() => {
  let total = null;
  try {
    return current_items.value.reduce((total, item) => {
      return (total =
        total +
        parseFloat(item.price.replace("$", "")) *
          parseFloat(item.amount_selected));
    }, 0);
  } catch (error) {
    return (total = 0);
  }
});

const incrementCounter = (index) => {
  current_items.value[index].amount_selected++;
};

const decrementCounter = (index) => {
  if (current_items.value[index].amount_selected > 1) {
    current_items.value[index].amount_selected--;
  }
};

let isLoading = ref(false);
let isFormActive = ref(false);

const buyProduct = () => {
  if(store.isLoggedIn === false){
    isLoading.value = true;
    setTimeout(() => {
      router.push('/login')
      toast.info(`Para poder continuar con tu pedido, por favor inicia sesión.`, {
        timeout: 5000,
        position: "top-right",
        icon: true,
      });
      isLoading.value = false;
    }, 1000);
    
  }else{
    isLoading.value = true;
  setTimeout(() => {
    isFormActive.value = true;
  }, 1000);
  }
};
</script>
<template>
  <TransitionRoot as="template" :show="value">
    <Dialog
      as="div"
      class="relative z-10"
      @close="$emit('update:modelValue', false)"
      @close-modal="$emit('update:modelValue', false)"
    >
      <TransitionChild
        as="template"
        enter="ease-in-out duration-500"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="ease-in-out duration-500"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div
          class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
        />
      </TransitionChild>

      <div class="fixed inset-0 overflow-hidden">
        <div class="absolute inset-0 overflow-hidden">
          <div
            class="pointer-events-none fixed inset-y-0 right-0 flex max-w-full  pl-10"
          >
            <TransitionChild
              as="template"
              enter="transform transition ease-in-out duration-500 sm:duration-700"
              enter-from="translate-x-full"
              enter-to="translate-x-0"
              leave="transform transition ease-in-out duration-500 sm:duration-700"
              leave-from="translate-x-0"
              leave-to="translate-x-full"
            >
              <DialogPanel class="pointer-events-auto w-screen max-w-md">
                <ShoppingForm
                  v-if="isFormActive"
                  @close-form="(isFormActive = false), (isLoading = false)"
                  @close-modal="$emit('update:modelValue', false)"
                />
                <div class="flex h-full flex-col bg-white shadow-xl">
                  <div class="flex-1 overflow-y-auto py-6 px-4 sm:px-6">
                    <div class="flex items-start justify-between">
                      <DialogTitle class="text-2xl font-bold text-gray-900"
                        >Carrito de compras</DialogTitle
                      >
                      <div class="ml-3 flex h-7 items-center">
                        <button
                          type="button"
                          class="-m-2 p-2 text-gray-400 hover:text-gray-500"
                          @click="$emit('update:modelValue', false)"
                        >
                          <span class="sr-only">Cerrar panel</span>
                          <XMarkIcon class="h-6 w-6" aria-hidden="true" />
                        </button>
                      </div>
                    </div>

                    <div class="mt-8">
                      <div class="flow-root">
                        <ul role="list" class="-my-6 divide-y divide-gray-200">
                          <li
                            v-for="(product, index) in current_items"
                            :key="index"
                            class="flex py-6"
                          >
                            <div
                              class="h-30 w-32 md:w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200"
                            >
                              <img
                                :src="product.cover"
                                :alt="product.imageAlt"
                                class="object-cover object-center"
                              />
                            </div>
                            <div class="ml-4 flex flex-1 flex-col">
                              <div>
                                <div
                                  class="flex justify-between text-base font-medium text-gray-900"
                                >
                                  <h3>
                                    <a href="/books" class="capitalize">{{
                                      product.title
                                    }}</a>
                                  </h3>

                                  <p class="ml-4">{{ product.price }}</p>
                                </div>

                                <p
                                  class="mt-1 text-sm font-semibold text-gray-500 mb-1"
                                >
                                  {{ product.category }}
                                </p>
                              </div>

                              <p class="mt-1 text-sm text-gray-500">Unidades</p>
                              <div
                                class="flex flex-1 items-end justify-between text-sm"
                              >
                                <div
                                  class="flex h-10 w-24 overflow-hidden rounded border border-gray-300"
                                >
                                  <input
                                    :value="product.amount_selected"
                                    class="w-full px-4 py-2 outline-none ring-inset ring-indigo-500 transition duration-100 focus:ring"
                                  />

                                  <div class="flex flex-col divide-y border-l">
                                    <button
                                      @click="incrementCounter(index)"
                                      class="flex w-6 flex-1 select-none items-center justify-center bg-white leading-none transition duration-100 hover:bg-gray-200 active:bg-gray-200"
                                    >
                                      +
                                    </button>
                                    <button
                                      @click="decrementCounter(index)"
                                      class="flex w-6 flex-1 select-none items-center justify-center bg-white leading-none transition duration-100 hover:bg-gray-200 active:bg-gray-200"
                                    >
                                      -
                                    </button>
                                  </div>
                                </div>

                                <div class="flex">
                                  <button
                                    type="button"
                                    class="font-medium text-indigo-600 hover:text-indigo-500"
                                    @click="removeItemCart(index)"
                                  >
                                    Eliminar
                                  </button>
                                </div>
                              </div>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div class="border-t border-gray-200 py-6 px-4 sm:px-6">
                    <div
                      class="flex justify-between text-base font-medium text-gray-900"
                    >
                      <p>Total</p>
                      <p>
                        $
                        {{
                          totalPrice.toLocaleString("es-CO", {
                            maximumFractionDigits: 3,
                            useGrouping: true,
                          })
                        }}
                        (COP)
                      </p>
                    </div>
                    <p class="mt-0.5 text-sm text-gray-500"></p>

                    <div class="mt-6">
                      <button
                        v-if="!isLoading"
                        @click="buyProduct"
                        class="flex items-center w-full justify-center rounded-md border border-transparent bg-sky-500 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-sky-600"
                      >
                        Siguiente
                      </button>
                      <button
                        v-else
                        type="button"
                        disabled
                        class="flex items-center justify-center rounded-md border border-transparent w-full bg-sky-500 px-6 py-3 text-base font-medium text-white shadow-sm cursor-pointer select-none disabled:pointer-events-none"
                      >
                        <svg class="h-4 w-4 animate-spin" viewBox="3 3 18 18">
                          <path
                            class="fill-blue-800"
                            d="M12 5C8.13401 5 5 8.13401 5 12C5 15.866 8.13401 19 12 19C15.866 19 19 15.866 19 12C19 8.13401 15.866 5 12 5ZM3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12Z"
                          ></path>
                          <path
                            class="fill-blue-100"
                            d="M16.9497 7.05015C14.2161 4.31648 9.78392 4.31648 7.05025 7.05015C6.65973 7.44067 6.02656 7.44067 5.63604 7.05015C5.24551 6.65962 5.24551 6.02646 5.63604 5.63593C9.15076 2.12121 14.8492 2.12121 18.364 5.63593C18.7545 6.02646 18.7545 6.65962 18.364 7.05015C17.9734 7.44067 17.3403 7.44067 16.9497 7.05015Z"
                          ></path>
                        </svg>
                        <p class="ml-3">Cargando...</p>
                      </button>
                    </div>
                    <div class="mt-2">
                      <a
                        @click="removeAllItemCart"
                        class="flex items-center justify-center rounded-md border border-transparent bg-rose-500 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-rose-600"
                        >Limpiar carrito</a
                      >
                    </div>
                    <div
                      class="mt-6 flex justify-center text-center text-sm text-gray-500"
                    >
                      <p>
                        o
                        <button
                          type="button"
                          class="font-medium text-sky-600 hover:text-sky-500"
                          @click="$emit('update:modelValue', false)"
                        >
                          continua comprando
                          <span aria-hidden="true"> &rarr;</span>
                        </button>
                      </p>
                    </div>
                  </div>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
