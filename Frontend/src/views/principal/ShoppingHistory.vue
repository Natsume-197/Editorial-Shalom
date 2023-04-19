<script setup>
import Navbar from "../../components/home/elements/Navbar.vue";
import Footer from "../../components/home/Footer.vue";
import { computed, reactive, ref } from "vue";
import { userStore } from "../../stores/user";
import { getRequestsUser } from "../../utils/actions";
import HistoryItem from "./modals/HistoryItem.vue";
import ChatUser from "./modals/ChatUser.vue";
import { api } from "../../utils/axios";
import { useToast } from "vue-toastification";

const store = userStore();
const user = computed(() => store.userInfo);
const toast = useToast();

let items = null;
const table = reactive({
  items: null,
  items_books: null,
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
  table.items = response.data.sales_request.sort(
    (a, b) =>
      new Date(b.purchase_date).getTime() -
      new Date(a.purchase_date).getTime()
  );
});

let itemSelected = ref(null);
let isOpenAction = ref(false);

const actionsButton = (item) => {
  itemSelected.value = item;
  isOpenAction.value = true;
};

const cancelProduct = async (item) => {
  const body = { id_status: 8}
  console.log(item)
  try {
    data.res = await api.patch(`sales_request_update/` + item.id, body);
    console.log(data.res.data);
    toast.success(`Se ha cancelado el pedido.`, {
        timeout: 3000,
        position: "top-right",
        icon: true,
    });
  } catch (error) {
    console.log(error);
  }
};

</script>

<template>
        <h2 class="text-xl font-bold text-gray-800 b dark:text-white mb-4">
          Historial de pedidos
        </h2>
        <HistoryItem
          v-if="isOpenAction"
          :item="itemSelected"
          :isOpen="isOpenAction"
          @close-modal="isOpenAction = false"
        />
        <div class="overflow-hidden rounded-lg shadow-xs ">
          <div class="overflow-x-auto">
            <table class="whitespace-no-wrap w-full">
              <thead>
                <tr
                  class="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700  dark:text-gray-400 dark:bg-gray-800"
                >
                  <th class="px-4 py-3">Número Pedido</th>
                  <th class="px-4 py-3">Cliente</th>
                  <th class="px-4 py-3">Dirección</th>
                  <th class="px-4 py-3">Celular</th>
                  <th class="px-4 py-3">Estado</th>
                  <th class="px-4 py-3">Total</th>
                  <th class="px-4 py-3">Fecha de compra</th>
                  <th class="px-4 py-3">Acciones</th>
                </tr>
              </thead>
              <tbody
                class="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800"
              >
                <tr
                  v-for="item in table.items"
                  class="text-gray-700 dark:text-gray-400"
                >
                  <td class="px-4 py-3 text-sm"># {{ item.id }}</td>

                  <td class="px-4 py-3">
                    <div class="flex items-center text-sm">
                      <div>
                        <p class="font-semibold">{{ item.name }}</p>
                        <p class="text-xs text-gray-600 dark:text-gray-400">
                          {{ item.email }}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td class="px-4 py-3 text-sm whitespace-nowrap">
                    {{ item.address }}
                  </td>
                  <td class="px-4 py-3 text-sm">
                    {{ item.cell }}
                  </td>

                  <td class="px-4 py-3 text-xs">
                    <span
                      class="px-2 py-1 font-semibold leading-tight whitespace-nowrap text-green-700 bg-green-100 rounded-full dark:bg-green-700 dark:text-green-100"
                    >
                      {{ item.status.name }}
                    </span>
                  </td>
                  <td class="px-4 py-3 text-sm whitespace-nowrap">$ {{ item.total }}</td>
                  <td class="px-4 py-3 text-sm whitespace-nowrap">
                    {{
                      new Date(item.purchase_date).toLocaleString("en-US", {
                        hour12: true,
                      })
                    }}
                  </td>

                  <td>
                    <button
                      @click="cancelProduct(item)"
                      class="text-gray-500 mx-4 transition-colors duration-200 dark:hover:text-red-500 dark:text-gray-300 hover:text-red-500 focus:outline-none"
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
                  </td>
                </tr>
              </tbody>
            </table>
            <div
              v-if="table?.items?.length === 0"
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

          <div v-if="table?.items?.length > 0"
            class="grid px-4 py-3 text-xs font-semibold tracking-wide text-gray-500 uppercase border-t dark:border-gray-700 bg-gray-50 sm:grid-cols-9 dark:text-gray-400 dark:bg-gray-800"
          >
            <span class="flex items-center col-span-3">
              Showing 21-30 of 100
            </span>
            <span class="col-span-2"></span>
            <!-- Pagination -->
            <span class="flex col-span-4 mt-2 sm:mt-auto sm:justify-end">
              <nav aria-label="Table navigation">
                <ul class="inline-flex items-center">
                  <li>
                    <button
                      class="px-3 py-1 rounded-md rounded-l-lg focus:outline-none focus:shadow-outline-purple"
                      aria-label="Previous"
                    >
                      <svg
                        aria-hidden="true"
                        class="w-4 h-4 fill-current"
                        viewBox="0 0 20 20"
                      >
                        <path
                          d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                          clip-rule="evenodd"
                          fill-rule="evenodd"
                        ></path>
                      </svg>
                    </button>
                  </li>
                  <li>
                    <button
                      class="px-3 py-1 rounded-md focus:outline-none focus:shadow-outline-sky"
                    >
                      1
                    </button>
                  </li>
                  <li>
                    <button
                      class="px-3 py-1 rounded-md focus:outline-none focus:shadow-outline-sky"
                    >
                      2
                    </button>
                  </li>
                  <li>
                    <button
                      class="px-3 py-1 text-white transition-colors duration-150 bg-sky-600 border border-r-0 border-sky-600 rounded-md focus:outline-none focus:shadow-outline-sky"
                    >
                      3
                    </button>
                  </li>
                  <li>
                    <button
                      class="px-3 py-1 rounded-md focus:outline-none focus:shadow-outline-sky"
                    >
                      4
                    </button>
                  </li>
                  <li>
                    <span class="px-3 py-1">...</span>
                  </li>
                  <li>
                    <button
                      class="px-3 py-1 rounded-md focus:outline-none focus:shadow-outline-sky"
                    >
                      8
                    </button>
                  </li>
                  <li>
                    <button
                      class="px-3 py-1 rounded-md focus:outline-none focus:shadow-outline-sky"
                    >
                      9
                    </button>
                  </li>
                  <li>
                    <button
                      class="px-3 py-1 rounded-md rounded-r-lg focus:outline-none focus:shadow-outline-sky"
                      aria-label="Next"
                    >
                      <svg
                        class="w-4 h-4 fill-current"
                        aria-hidden="true"
                        viewBox="0 0 20 20"
                      >
                        <path
                          d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                          clip-rule="evenodd"
                          fill-rule="evenodd"
                        ></path>
                      </svg>
                    </button>
                  </li>
                </ul>
              </nav>
            </span>
          </div>
        </div>
</template>
