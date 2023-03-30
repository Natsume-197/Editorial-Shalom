<script setup>
import { computed, ref, watch, reactive, onMounted } from "vue";
import { useMainStore } from "../../../stores/main";
import { mdiEye, mdiTrashCan, mdiTextSearch, mdiChat } from "@mdi/js";
import CardBoxModal from "../cardbox/CardBoxModal.vue";
import TableCheckboxCell from "./TableCheckboxCell.vue";
import BaseLevel from "../minimal/BaseLevel.vue";
import BaseButtons from "../minimal/BaseButtons.vue";
import BaseButton from "../minimal/BaseButton.vue";
import UserAvatar from "../UserAvatar.vue";
import { api } from "../../../utils/axios";
import { useToast } from "vue-toastification";
import FormControl from "../form/FormControl.vue";
import CardBoxComponentEmpty from "../cardbox/CardBoxComponentEmpty.vue";
import CardBox from "../cardbox/CardBox.vue";
import FormField from "../form/FormField.vue";
import ChatAdmin from "../extra/ChatAdmin.vue";

let props = defineProps({
  checkable: Boolean,
  selectedCategory: Number,
});

const mainStore = useMainStore();
mainStore.fetch("clients");

const items = computed(() => mainStore.clients);

let loadingComplete = ref(false);

watch([loadingComplete, items], ([isLoadingValue, itemsValue]) => {
  if (!isLoadingValue && itemsValue !== null) {
    loadingComplete.value = true;
  }
});

const searchTerm = ref("");

const filteredItems = computed(() => {
  const regex = new RegExp(searchTerm.value, "i");
  return items.value.filter(
    (item) =>
      regex.test(item.name) ||
      regex.test(item.second_name) ||
      regex.test(item.email) ||
      regex.test(item.name + " " + item.second_name) ||
      regex.test(item.is_verified)
  );
});

const toast = useToast();
const isModalActive = ref(false);
const isModalDangerActive = ref(false);

const checkedRows = ref([]);

let currentUser = ref();

const remove = (arr, cb) => {
  const newArr = [];
  arr.forEach((item) => {
    if (!cb(item)) {
      console.log(item);
      newArr.push(item);
    }
  });

  return newArr;
};

const checked = (isChecked, client) => {
  if (isChecked) {
    checkedRows.value.push(client);
  } else {
    checkedRows.value = remove(
      checkedRows.value,
      (row) => row.id === client.id
    );
  }
};

const currentSelected = (event, client) => {
  currentUser.value = client;
};

// CRUD
async function deleteUser(id) {
  console.log(id);
  try {
    await api.delete(`user/${id}`).then((response) => {
      mainStore.fetch("clients");
      toast.success(`${response.data.message}`, {
        timeout: 3000,
        position: "top-right",
        icon: true,
      });
    });
  } catch (error) {
    console.log(error);
  }
}

/////////////////////////////////////////

const perPage = ref(7);
const currentPage = ref(0);

const response = reactive({
  sales: null,
});

// Get all transaction history
async function getAllTransactions() {
  try {
    const res = await api.get("/sales_request_get");
    response.sales = res.data.sales_request;
  } catch (error) {
    console.log(error);
  }
}

// Get transaction by ID
async function getTransactionByID(id) {
  try {
    const res = await api.get("/sales_request_status/" + id);
    response.sales = res.data.sales_request;
  } catch (error) {
    console.log(error);
  }
}

// Filter items by search bar
const filteredItemSales = computed(() => {
  try {
    const regex = new RegExp(searchTerm.value, "i");
    return response.sales.filter((item) => regex.test(item.name));
  } catch (error) {
    return null;
  }
});

const numPages = computed(() =>
  Math.ceil(filteredItemSales.value.length / perPage.value)
);

const currentPageHuman = computed(() => currentPage.value + 1);

const pagesList = computed(() => {
  const pagesList = [];

  for (let i = 0; i < numPages.value; i++) {
    pagesList.push(i);
  }

  return pagesList;
});

// Items separated per page
const itemsPaginatedSales = computed(() =>
  filteredItemSales.value.slice(
    perPage.value * currentPage.value,
    perPage.value * (currentPage.value + 1)
  )
);

// Extra functions
const categories = [
  { label: "Nuevo pedido", value: 1 },
  { label: "Procesando", value: 2 },
  { label: "Pagado", value: 3 },
  { label: "En envio", value: 4 },
  { label: "Entregado", value: 5 },
  { label: "Completado", value: 6 },
  { label: "Rechazado", value: 7 },
  { label: "Cancelado", value: 8 },
];

function getStatusName(id) {
  switch (id) {
    case 1:
      return "Nuevo pedido";
    case 2:
      return "Procesando";
    case 3:
      return "Pagado";
    case 4:
      return "En envío";
    case 5:
      return "Entregado";
    case 6:
      return "Completado";
    case 7:
      return "Rechazado";
    case 8:
      return "Cancelado";
    default:
      return "";
  }
}

getAllTransactions();

watch(
  () => props.selectedCategory,
  (newValue) => {
    if (newValue === 0) {
      getAllTransactions();
    } else {
      getTransactionByID(newValue);
    }
  }
);
let isOpenChat = ref(false);
const selectedCategory = ref();

watch(
  () => currentUser.value,
  (newValue) => {
    selectedCategory.value = categories[newValue.id_status - 1];
  }
);

async function changeStatusOrder() {
  const body = { id_status: selectedCategory.value.value }
  try {
    const res = await api.patch("/sales_request_update/" + currentUser.value.id, body);
    console.log(res)
  } catch (error) {
    console.log(error);
  }
}
</script>
<template>
  <template v-if="!loadingComplete">
    <!-- indicador de carga -->
    <div class="grid grid-cols-1 gap-6 lg:grid-cols-3 mb-6"></div>
    <div class="w-full h-32 flex justify-center items-center">
      <svg
        class="animate-spin -ml-1 mr-3 h-8 w-8 text-gray-500"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          class="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          stroke-width="4"
        ></circle>
        <path
          class="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm12 0a8 8 0 100-16v3a5 5 0 110 10V12z"
        ></path>
      </svg>
    </div>
  </template>
  <template v-else>
    <FormControl
      type="text"
      id="search"
      v-model.trim="searchTerm"
      placeholder="Buscador"
      :icon="mdiTextSearch"
      class="rounded-t-lg"
      autocomplete="off"
    />
    <CardBoxModal
      v-model="isModalActive"
      has-cancel
      v-if="currentUser"
      title="Detalles del pedido"
    >
      <!-- Detalles de los productos solicitados -->
      <!-- Productos -->
      <div class="flow-root">
        <ul role="list" class="-my-6 divide-y divide-gray-200 mr-4">
          <li
            v-for="(product, index) in currentUser.book_reserved"
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
                  class="flex justify-between text-base font-medium text-white"
                >
                  <h3>
                    <router-link to="/books" class="capitalize">
                      {{ product.book.book_t[0].title }}
                    </router-link>
                  </h3>

                  <p class="ml-4">
                    {{ product.book.price }}
                  </p>
                </div>

                <p class="mt-1 text-sm font-semibold text-gray-300 mb-1">
                  {{ product.book.category.name }}
                </p>
              </div>

              <p class="mt-1 text-sm text-gray-300">
                Unidades:
                {{ product.amount }}
              </p>
            </div>
          </li>
        </ul>
      </div>
      <div class="text-lg font-semibold text-right text-white mt-4">
        Total a pagar :
        <div class="inline font-normal ml-1">
          {{ currentUser.total }}
        </div>
      </div>
      <!-- Detalles del formulario -->
      <div class="border-t border-gray-200 m"></div>
      <div class="flex">
        <div class="flex-1 mb-4 mt-5 overflow-hidden">
          <h1 class="inline text-lg font-bold leading-none">
            Información de contacto
          </h1>
        </div>
      </div>
      <div class="pb-5">
        <h3 class="inline p-1 text-base font-normal leading-none">Nombre</h3>
        <input
          v-model="currentUser.name"
          placeholder="Nombre"
          class="text-black placeholder-gray-600 w-full mb-2 px-4 py-2.5 mt-2 text-base transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200 focus:border-blueGray-500 focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400"
        />
        <h3 class="inline p-1 text-base font-normal leading-none">Correo</h3>
        <input
          v-model="currentUser.email"
          placeholder="Correo"
          class="text-black placeholder-gray-600 mb-3 w-full px-4 py-2.5 mt-2 text-base transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200 focus:border-blueGray-500 focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400"
        />
        <div class="flex">
          <div class="flex-grow mb-2">
            <h3 class="inline p-1 text-base font-normal leading-none">
              Celular
            </h3>
            <input
              v-model="currentUser.cellphone"
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
            <h3 class="inline p-1 text-base font-normal leading-none">
              Código Postal
            </h3>
            <input
              v-model="currentUser.zip_code"
              placeholder="Código Postal"
              class="text-black placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200 focus:border-blueGray-500 focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400"
            />
          </div>
          <div class="flex-grow">
            <h3 class="inline p-1 text-base font-normal leading-none">
              Ciudad
            </h3>
            <input
              v-model="currentUser.city"
              placeholder="Ciudad"
              class="text-black placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200 focus:border-blueGray-500 focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400"
            />
          </div>
        </div>
        <h3 class="inline p-1 text-base font-normal leading-none">Dirección</h3>
        <input
          v-model="currentUser.address"
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
            <h3 class="inline p-1 text-base font-normal leading-none">
              Nombre del colegio
            </h3>
            <input
              v-model="currentUser.school_name"
              placeholder="Nombre del colegio"
              class="text-black placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200 focus:border-blueGray-500 focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400"
            />
          </div>
        </div>
        <h3 class="inline p-1 text-base font-normal leading-none mb-3">
          Mensaje
        </h3>
        <textarea
          v-model="currentUser.message"
          rows="4"
          placeholder="Mensaje"
          class="text-black resize-none placeholder-gray-600 w-full mt-2 text-base transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200 focus:border-blueGray-500 focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400"
        />
      </div>
      <div class="border-t border-gray-200 m"></div>
      <!-- Ajustes pedido -->
      <div class="flex">
        <div class="flex-1 mb-4 mt-5 overflow-hidden">
          <h1 class="inline text-lg font-bold leading-none">
            Ajustes del pedido
          </h1>
        </div>
      </div>
      <!-- Ajustes pedido (Cambiar estado del pedido) -->
      <FormField label="Estado del pedido" class="w-full">
        <FormControl :options="categories" v-model="selectedCategory" />
        <BaseButton
          color="info"
          label="Actualizar estado"
          @click="changeStatusOrder"
        />
      </FormField>
    </CardBoxModal>
    <CardBoxModal
      v-if="currentUser"
      v-model="isModalDangerActive"
      title="Advertencia"
      buttonLabel="Borrar"
      button="danger"
      has-cancel
      :functionConfirm="() => deleteUser(currentUser.id)"
    >
      <p>
        ¿Desea eliminar el usuario <b>{{ currentUser.name }}?</b>
      </p>
      <p>Esto cambio no es reversible.</p>
    </CardBoxModal>

    <div v-if="currentUser">
      <ChatAdmin
        :isOpen="isOpenChat"
        :item="currentUser"
        @close-modal-chat="isOpenChat = false"
      />
    </div>

    <div v-if="checkedRows.length" class="p-3 bg-gray-100/50 dark:bg-slate-800">
      <span
        v-for="checkedRow in checkedRows"
        :key="checkedRow.id"
        class="inline-block px-2 py-1 rounded-sm mr-2 text-sm bg-gray-100 dark:bg-slate-700"
      >
        {{ checkedRow.name }}
      </span>
    </div>
    <table>
      <thead>
        <tr>
          <th v-if="checkable" />
          <th />
          <th>ID de compra</th>
          <th>Fecha de compra</th>
          <th>Nombre</th>
          <th>Correo</th>
          <th>Direccion</th>
          <th>Celular</th>
          <th>Total</th>
          <th>Estado</th>
          <th />
        </tr>
      </thead>
      <tbody>
        <tr v-for="sale in itemsPaginatedSales" :key="sale.id">
          <TableCheckboxCell
            v-if="checkable"
            @checked="checked($event, sale)"
          />
          <td class="border-b-0 lg:w-6 before:hidden">
            <UserAvatar
              :username="sale.name"
              class="w-24 h-24 mx-auto lg:w-6 lg:h-6"
            />
          </td>
          <td data-label="ID">
            {{ sale.id }}
          </td>
          <td data-label="Date">
            <div class="text-center">
              {{ new Date(sale.purchase_date).toLocaleString() }}
            </div>
          </td>
          <td data-label="Name">
            {{ sale.name }}
          </td>
          <td data-label="Email">
            {{ sale.email }}
          </td>
          <td data-label="Address" class="lg:w-32">
            {{ sale.address }}
          </td>
          <td data-label="Cellphone" class="lg:w-32">
            {{ sale.cell }}
          </td>
          <td data-label="Total" class="lg:w-32">
            {{ sale.total }}
          </td>
          <td data-label="Created" class="lg:w-1 whitespace-nowrap">
            <div class="text-center">
              <span
                :class="{
                  'bg-blue-500': sale.id_status === 1,
                  'bg-rose-500': sale.id_status === 2,
                }"
                class="inline-block px-3 py-2 text-white rounded-full text-xs w-full"
                >{{ getStatusName(sale.id_status) }}</span
              >
            </div>
          </td>
          <td class="before:hidden lg:w-1 whitespace-nowrap">
            <BaseButtons type="justify-start lg:justify-end" no-wrap>
              <BaseButton
                color="info"
                :icon="mdiEye"
                small
                @click="currentSelected($event, sale), (isModalActive = true)"
              />
              <BaseButton
                color="warning"
                :icon="mdiChat"
                small
                @click="currentSelected($event, sale), (isOpenChat = true)"
              />
              <BaseButton
                color="danger"
                :icon="mdiTrashCan"
                small
                @click="
                  currentSelected($event, sale);
                  isModalDangerActive = true;
                "
              />
            </BaseButtons>
          </td>
        </tr>
      </tbody>
    </table>
    <template v-if="filteredItemSales.length === 0">
      <CardBoxComponentEmpty></CardBoxComponentEmpty>
    </template>
    <div class="p-3 lg:px-6 border-t border-gray-100 dark:border-slate-800">
      <BaseLevel>
        <BaseButtons>
          <BaseButton
            v-for="page in pagesList"
            :key="page"
            :active="page === currentPage"
            :label="page + 1"
            :color="page === currentPage ? 'lightDark' : 'whiteDark'"
            small
            @click="currentPage = page"
          />
        </BaseButtons>
        <small>Página {{ currentPageHuman }} de {{ numPages }}</small>
      </BaseLevel>
    </div>
  </template>
</template>

<style>
table {
  @apply w-full;
}

thead {
  @apply hidden lg:table-header-group;
}

tr {
  @apply max-w-full block relative border-b-4 border-gray-100
        lg:table-row lg:border-b-0 dark:border-slate-800;
}

tr:last-child {
  @apply border-b-0;
}

td:not(:first-child) {
  @apply lg:border-l lg:border-t-0 lg:border-r-0 lg:border-b-0 lg:border-gray-100 lg:dark:border-slate-700;
}

th {
  @apply lg:text-left lg:p-3;
}

td {
  @apply flex justify-between text-right py-3 px-4 align-top border-b border-gray-100
        lg:table-cell lg:text-left lg:p-3 lg:align-middle lg:border-b-0 dark:border-slate-800;
}

td:last-child {
  @apply border-b-0;
}

tbody tr,
tbody tr:nth-child(odd) {
  @apply lg:hover:bg-gray-100 lg:dark:hover:bg-slate-700/70;
}

tbody tr:nth-child(odd) {
  @apply lg:bg-gray-100/50 lg:dark:bg-slate-800/50;
}

td:before {
  content: attr(data-label);
  @apply font-semibold pr-3 text-left lg:hidden;
}
</style>
