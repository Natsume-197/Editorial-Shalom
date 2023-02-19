<script setup>
import { computed, ref } from "vue";
import { useMainStore } from "../../stores/main";
import { mdiEye, mdiTrashCan } from "@mdi/js";
import CardBoxModal from "./CardBoxModal.vue";
import TableCheckboxCell from "./TableCheckboxCell.vue";
import BaseLevel from "./minimal/BaseLevel.vue";
import BaseButtons from "./minimal/BaseButtons.vue";
import BaseButton from "./minimal/BaseButton.vue";
import UserAvatar from "./UserAvatar.vue";
import { api } from "../../utils/axios";
import { useToast } from "vue-toastification";

defineProps({
  checkable: Boolean,

});

const mainStore = useMainStore();
mainStore.fetch("clients");

const items = computed(() => mainStore.clients);
console.log(items.value)

const toast = useToast();
const isModalActive = ref(false);
const isModalDangerActive = ref(false);
const perPage = ref(5);
const currentPage = ref(0);
const checkedRows = ref([]);

let currentUser = ref();

const itemsPaginated = computed(() =>
  items.value.slice(
    perPage.value * currentPage.value,
    perPage.value * (currentPage.value + 1)
  )
);

const numPages = computed(() => Math.ceil(items.value.length / perPage.value));

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
async function deleteUser(id){
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
};

</script>
<template>
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
          {{ client.name }}
        </td>
        <td data-label="Company">
          {{ client.second_name }}
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
          {{  new Date(client.created_at).toLocaleString()}}
        </td>
        <td data-label="Created" class="lg:w-1 whitespace-nowrap">
          <small
            class="text-gray-500 dark:text-slate-400"
            :title="client.is_verified"
            >{{ client.is_verified }}</small
          >
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
