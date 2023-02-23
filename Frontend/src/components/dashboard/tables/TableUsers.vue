<script setup>
import { computed, ref, watch } from "vue";
import { useMainStore } from "../../../stores/main";
import { mdiEye, mdiTrashCan, mdiTextSearch } from "@mdi/js";
import CardBoxModal from "../cardbox/CardBoxModal.vue";
import TableCheckboxCell from "../TableCheckboxCell.vue";
import BaseLevel from "../minimal/BaseLevel.vue";
import BaseButtons from "../minimal/BaseButtons.vue";
import BaseButton from "../minimal/BaseButton.vue";
import UserAvatar from "../UserAvatar.vue";
import { api } from "../../../utils/axios";
import { useToast } from "vue-toastification";
import FormControl from "../form/FormControl.vue";
import CardBoxComponentEmpty from "../cardbox/CardBoxComponentEmpty.vue"
import CardBox from "../cardbox/CardBox.vue"
defineProps({
  checkable: Boolean,
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
      regex.test(item.name + " " + item.second_name) || regex.test(item.is_verified)
  );
});

const toast = useToast();
const isModalActive = ref(false);
const isModalDangerActive = ref(false);
const perPage = ref(7);
const currentPage = ref(0);
const checkedRows = ref([]);

let currentUser = ref();

const itemsPaginated = computed(() =>
  // Slice items for each page
  filteredItems.value.slice(
    perPage.value * currentPage.value,
    perPage.value * (currentPage.value + 1)
  )
);

const numPages = computed(() =>
  Math.ceil(filteredItems.value.length / perPage.value)
);

const currentPageHuman = computed(() => currentPage.value + 1);

const pagesList = computed(() => {
  const pagesList = [];

  for (let i = 0; i < numPages.value; i++) {
    pagesList.push(i);
  }

  return pagesList;
});

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
  console.log(client);
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
      class="rounded-lg"
      autocomplete="off"
    />
    <CardBoxModal
      v-model="isModalActive"
      buttonLabel="Modificar"
      has-cancel
      v-if="currentUser"
      title="Detalles del usuario"
    >
      <p><b>Nombre: </b> {{ currentUser.name }}</p>
      <p><b>Apellido: </b></p>
      <p><b>Correo: </b></p>
      <p><b>Direccion: </b></p>
      <p><b>Celular: </b></p>
      <p><b>Fecha de creación: </b></p>
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
          <th>Nombre</th>
          <th>Apellido</th>
          <th>Correo</th>
          <th>Direccion</th>
          <th>Celular</th>
          <th>Creación</th>
          <th>Estado</th>
          <th />
        </tr>
      </thead>
      
      <tbody>
        <tr v-for="client in itemsPaginated" :key="client.id">
          <TableCheckboxCell
            v-if="checkable"
            @checked="checked($event, client)"
          />
          <td class="border-b-0 lg:w-6 before:hidden">
            <UserAvatar
              :username="client.name"
              class="w-24 h-24 mx-auto lg:w-6 lg:h-6"
            />
          </td>          
          <td data-label="Name">
            <div class="text-center">
            {{ client.name }}
          </div>
          </td>
          <td data-label="Company">
            {{ client.second_name ? client.second_name : '' }}

          </td>
          <td data-label="City">
            {{ client.email }}
          </td>
          <td data-label="Progress" class="lg:w-32">
            {{ client.address }}
          </td>
          <td data-label="Cellphone" class="lg:w-32">
            {{ client.cellphone }}
          </td>
          <td data-label="Cellphone" class="lg:w-32">
            {{ new Date(client.created_at).toLocaleString() }}
          </td>
          <td data-label="Created" class="lg:w-1 whitespace-nowrap">
            <div class="text-center">
   <span :class="{'bg-emerald-500': client.is_verified, 'bg-rose-500': !client.is_verified}" class="inline-block px-2 py-1 text-white rounded-full text-xs w-full">{{ client.is_verified ? 'Verificado' : 'No verificado' }}</span>
</div>
          </td>
          <td class="before:hidden lg:w-1 whitespace-nowrap">
            <BaseButtons type="justify-start lg:justify-end" no-wrap>
              <BaseButton
                color="info"
                :icon="mdiEye"
                small
                @click="currentSelected($event, client), (isModalActive = true)"
              />
              <BaseButton
                color="danger"
                :icon="mdiTrashCan"
                small
                @click="
                  currentSelected($event, client);
                  isModalDangerActive = true;
                "
              />
            </BaseButtons>
            
          </td>
          
        </tr>
        
      </tbody>
      
    </table>
    <template v-if="filteredItems.length === 0">
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
