<script setup>
import { ref, computed } from "vue";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  TransitionChild,
  TransitionRoot,
} from "@headlessui/vue";
import { ExclamationTriangleIcon } from "@heroicons/vue/24/outline";


const props = defineProps({
  item: {
    type: Object,
    default: null,
  },
  isOpen:{
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(["close-modal"]);

let open = computed({
  get: () => props.isOpen,
  set: (value) => emit("close-modal", value),

});


let closeModal = () =>{
    open.value = false
}

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

      <div class="fixed inset-0 z-10 overflow-y-auto ">
        <div
          class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0 pointer-events-none relative h-[calc(100%-1rem)] w-auto  min-[576px]:mx-auto  min-[576px]:h-[calc(100%-3.5rem)] min-[576px]:max-w-[500px]   "
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
              <div class="bg-white px-4 mt-2 overflow-y-scroll">
                <div class="sm:flex sm:items-start">
                 
                  <div class=" text-center  sm:text-left ">
             


                    <div class="flex h-full flex-col bg-white ">
                  <div class="flex-1 overflow-y-auto py-6 px-4 sm:px-6 ">
                    <div class="flex items-start justify-between ">
                      <DialogTitle class="text-2xl font-bold text-gray-900"
                        >Detalles del pedido</DialogTitle
                      >
                     
                    </div>

                    <div class="mt-8 overflow-y-auto ">
                      <div class="flow-root  ">
                        <ul role="list" class="-my-6 divide-y divide-gray-200 mr-4 ">
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
                                      titte
                                    </a>
                                  </h3>

                                  <p class="ml-4 ">price</p>
                                </div>

                                <p
                                  class="mt-1 text-sm font-semibold text-gray-500 mb-1"
                                >
                                  category
                                </p>
                              </div>

                              <p class="mt-1 text-sm text-gray-500">Unidades compradas: </p>
    
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>





                    <div class="mt-2">
          
                      {{ props.item }}
                      {{ props.item }}
                      {{ props.item }}
                      {{ props.item }}
                      {{ props.item }}
                      {{ props.item }}
                      {{ props.item }}
                      {{ props.item }}
                      {{ props.item }}
                      {{ props.item }}
                    </div>
                  </div>
                </div>
              </div>
              <div
                class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6"
              >
                <button
                  type="button"
                  class="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                  @click="closeModal"
                >
                  Deactivate
                </button>
                <button
                  type="button"
                  class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                  @click="closeModal"
                  ref="cancelButtonRef"
                >
                  Cancel
                </button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
