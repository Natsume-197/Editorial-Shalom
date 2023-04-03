<script setup>
import { computed, ref, watch, reactive, onMounted } from "vue";
import { useMainStore } from "../../../stores/main";
import {
  mdiEye,
  mdiTrashCan,
  mdiTextSearch,
  mdiFileUploadOutline,
} from "@mdi/js";
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
import BaseDivider from "../minimal/BaseDivider.vue";
import FormFilePicker from "../form/FormFilePicker.vue";

let props = defineProps({
  checkable: Boolean,
  selectedCategory: Number,
});

let state = reactive({});

onMounted(() => {
  api.get("/book/category").then((response) => {
    state.categories = response.data.categories
      .map((category) => {
        return {
          id: category.id,
          label:
            category.name.charAt(0).toUpperCase() +
            category.name.slice(1).toLowerCase(),
        };
      })
      .sort((a, b) => (a.label > b.label ? 1 : -1));
  });
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
      regex.test(item.book.book_t[0].title) ||
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

const perPage = ref(5);
const currentPage = ref(0);

const response = reactive({
  books: null,
});

// Get all transaction history
async function getAllBooks() {
  try {
    const res = await api.get("/book");
    console.log(res);
    response.books = res.data.books;
  } catch (error) {
    console.log(error);
  }
}

// Get transaction by ID
async function getTransactionByID(id) {
  try {
    const res = await api.get("/book/" + id);
    response.books = res.data.books;
  } catch (error) {
    console.log(error);
  }
}

// Filter items by search bar
const filteredItemSales = computed(() => {
  try {
    const regex = new RegExp(searchTerm.value, "i");
    return response.books.filter((item) => regex.test(item.book_t[0].title));
  } catch (error) {
    return null;
  }
});

const numPages = computed(() =>
  Math.ceil(filteredItemSales.value?.length / perPage.value)
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
  filteredItemSales.value?.slice(
    perPage.value * currentPage.value,
    perPage.value * (currentPage.value + 1)
  )
);

// Extra functions
const url_base = import.meta.env.VITE_API_URL_SHALOM + "/assets/books/covers/";

getAllBooks();

watch(
  () => props.selectedCategory,
  (newValue) => {
    if (newValue === 0) {
      getAllBooks();
    } else {
      getTransactionByID(newValue);
    }
  }
);
const selectedCategory = ref();

const form = reactive({
  file: null,
  preview: null,
});

const handleFileChange = (event) => {
  var input = event.target;
  if (input.files) {
    var reader = new FileReader();
    reader.onload = (e) => {
      form.preview = e.target.result;
    };
    form.cover = input.files[0];
    reader.readAsDataURL(input.files[0]);
  }
};

const updateBook = () => {
    const body = {
        isbn: currentUser.value.isbn,
        title_spanish: currentUser.value.book_t[0].title,
        title_english: currentUser.value.book_t[1].title,
        description_spanish: currentUser.value.book_t[0].description,
        description_english: currentUser.value.book_t[1].description,
        category: currentUser.value.category.id,
        price: currentUser.value.price,
        units_available: currentUser.value.units_available
    }
    console.log(body)
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
      has-main-button
      button-label="Actualizar"
      v-if="currentUser"
      title="Detalles del libro"
      :function-confirm="updateBook"
    >
      <div class="flow-root">
        <ul role="list" class="-my-6 divide-y divide-gray-200 mr-4">
          <li class="flex py-6">
            <div
              class="h-30 w-32 md:w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200"
            >
              <div v-if="form.preview">
                <img :src="form?.preview" class="object-cover object-center" />
              </div>

              <div v-else>
                <img
                  :src="url_base + currentUser.cover"
                  class="object-cover object-center"
                />
              </div>
            </div>
            <div class="ml-4 flex flex-1 flex-col">
              <div>
                <div
                  class="flex justify-between text-base font-medium text-white"
                >
                  <h3>
                    <router-link to="/books" class="capitalize">
                      {{ currentUser.book_t[0].title }}
                    </router-link>
                  </h3>

                  <p class="ml-4">${{ currentUser.price }}</p>
                </div>

                <p class="mt-1 text-sm font-semibold text-gray-300 mb-1">
                  {{ currentUser?.category?.name }}
                </p>
              </div>

              <p class="mt-1 text-sm text-gray-300">
                Unidades:
                {{ currentUser.units_available }}
              </p>
            </div>
          </li>
        </ul>
      </div>

      <!-- Detalles del formulario -->
      <div class="border-t border-gray-200 m"></div>

      <div class="pb-5">
        <div class="flex-1">
          <FormField label="Información de archivos">
            <BaseButtons class="mb-4">
              <FormFilePicker
                class=""
                v-model="form.file"
                label="Portada"
                outline
                noWrap
                @change="handleFileChange"
              />
              <FormFilePicker
                v-model="form.pdf"
                label="Preview"
                outline
                accept=".pdf"
                :icon="mdiFileUploadOutline"
              />
            </BaseButtons>
          </FormField>
        </div>

        <template v-if="currentUser.cover">
          <span
            class="inline-flex px-4 py-2 w-full justify-center bg-gray-100 dark:bg-blue-darkBg border-gray-200 dark:border-slate-700 border rounded-r cursor-default"
          >
            {{ currentUser.cover }}
          </span>
        </template>
        <template v-if="currentUser.preview && currentUser.cover">
          <br /><br />
        </template>

        <template v-if="currentUser.preview">
          <span
            class="inline-flex px-4 py-2 w-full justify-center bg-gray-100 dark:bg-blue-darkBg border-gray-200 dark:border-slate-700 border rounded-r cursor-default"
          >
            {{ currentUser.preview }}
          </span>
          <br />
        </template>
      </div>

      <div class="border-t border-gray-200 m"></div>

      <div class="flex">
        <div class="flex-1 mb-4 mt-5 overflow-hidden">
          <h1 class="inline text-lg font-bold leading-none">
            Información básica
          </h1>
        </div>
      </div>
      <div class="pb-5">
        <div class="flex">
          <div class="flex-grow w-2/5 pr-2 mb-3">
            <h3 class="inline p-1 text-base font-normal leading-none">ISBN</h3>
            <input
              v-model="currentUser.isbn"
              placeholder="Código Postal"
              class="text-black placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200 focus:border-blueGray-500 focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400"
            />
          </div>
          <div class="flex-grow">
            <h3 class="inline p-1 text-base font-normal leading-none">
              Total páginas
            </h3>
            <input
              v-model="currentUser.city"
              placeholder="Total páginas"
              class="text-black placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200 focus:border-blueGray-500 focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400"
            />
          </div>
        </div>
        <h3 class="inline p-1 text-base font-normal leading-none">
          Nombre en español
        </h3>
        <input
          v-model="currentUser.book_t[0].title"
          placeholder="Nombre"
          class="text-black placeholder-gray-600 w-full mb-2 px-4 py-2.5 mt-2 text-base transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200 focus:border-blueGray-500 focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400"
        />
        <h3 class="inline p-1 text-base font-normal leading-none">
          Nombre en inglés
        </h3>
        <input
          v-model="currentUser.book_t[1].title"
          placeholder="Nombre"
          class="text-black placeholder-gray-600 w-full mb-2 px-4 py-2.5 mt-2 text-base transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200 focus:border-blueGray-500 focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400"
        />
        <h3 class="inline p-1 text-base font-normal leading-none mb-3">
          Descripción en español
        </h3>
        <textarea
          v-model="currentUser.book_t[0].description"
          rows="4"
          placeholder="Descripción"
          class="text-black resize-none placeholder-gray-600 w-full mt-2 text-base transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200 focus:border-blueGray-500 focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400"
        />
        <h3 class="inline p-1 text-base font-normal leading-none mb-3">
          Descripción en inglés
        </h3>
        <textarea
          v-model="currentUser.book_t[1].description"
          rows="4"
          placeholder="Descripción"
          class="text-black resize-none placeholder-gray-600 w-full mt-2 text-base transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200 focus:border-blueGray-500 focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400"
        />
        <FormField label="Categoría">
          <FormControl v-model="form.category" :options="state.categories" />
        </FormField>

        <div class="border-t border-gray-200 mt-6"></div>
      </div>
      <div class="flex">
        <div class="flex-1 mb-4 overflow-hidden">
          <h1 class="inline text-lg font-bold leading-none">
            Información de venta
          </h1>
        </div>
        <div class="flex-none pt-2.5 pr-2.5 pl-1"></div>
      </div>
      <div class="pb-5 mb-3">
        <div class="flex">
          <div class="flex-grow w-3/5 pr-2 mb-3">
            <h3 class="inline p-1 text-base font-normal leading-none">
              Precio
            </h3>
            <input
              v-model="currentUser.price"
              placeholder="Código Postal"
              class="text-black placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200 focus:border-blueGray-500 focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400"
            />
          </div>
          <div class="flex-grow">
            <h3 class="inline p-1 text-base font-normal leading-none">
              Unidades disponibles
            </h3>
            <input
              v-model="currentUser.units_available"
              placeholder="Ciudad"
              class="text-black placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200 focus:border-blueGray-500 focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400"
            />
          </div>
        </div>
      </div>
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
          <th>ISBN</th>
          <th>Fecha Publicación</th>
          <th>Nombre Español</th>
          <th>Nombre Inglés</th>
          <th>Unidades disponibles</th>
          <th>Precio</th>
          <th>Estado</th>
          <th />
        </tr>
      </thead>
      <tbody>
        <tr v-for="book in itemsPaginatedSales" :key="book.id">
          <TableCheckboxCell
            v-if="checkable"
            @checked="checked($event, book)"
          />
          <td class="border-b-0 lg:w-1/12 before:hidden">
            <img
              class="object-fit object-scale-down"
              :src="url_base + book.cover"
            />
          </td>
          <td data-label="ID">
            {{ book.isbn }}
          </td>
          <td data-label="Date">
            <div class="text-center">
              {{ new Date(book.published_date).toLocaleString() }}
            </div>
          </td>
          <td data-label="Name">
            {{ book.book_t[0].title }}
          </td>
          <td data-label="Email">
            {{ book.book_t[1].title }}
          </td>
          <td data-label="Address" class="lg:w-32">
            {{ book.units_available }}
          </td>
          <td data-label="Cellphone" class="lg:w-32">
            {{ book.price }}
          </td>
          <td data-label="Total" class="lg:w-32">
            <div class="text-center">
              <span
                class="inline-block px-2 bg-emerald-500 py-1 text-white rounded-full text-xs w-full"
                >En Publicación</span
              >
            </div>
          </td>

          <td class="before:hidden lg:w-1 whitespace-nowrap">
            <BaseButtons type="justify-start lg:justify-end" no-wrap>
              <BaseButton
                color="info"
                :icon="mdiEye"
                small
                @click="currentSelected($event, book), (isModalActive = true)"
              />
              <BaseButton
                color="danger"
                :icon="mdiTrashCan"
                small
                @click="
                  currentSelected($event, book);
                  isModalDangerActive = true;
                "
              />
            </BaseButtons>
          </td>
        </tr>
      </tbody>
    </table>
    <template v-if="filteredItemSales?.length === 0">
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
