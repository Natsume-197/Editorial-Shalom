<script setup>
import { computed, ref, watch, reactive, onMounted } from "vue";
import { userStore } from "../../../stores/user";
import LayoutDashboard from "../../../layouts/LayoutDashboard.vue";
import { api } from "../../../utils/axios";
import SectionMain from "../../../components/dashboard/sections/SectionMain.vue";
import TableSales from "../../../components/dashboard/tables/TableSales.vue";
import CardBox from "../../../components/dashboard/cardbox/CardBox.vue";
import FormField from "../../../components/dashboard/form/FormField.vue";
import FormControl from "../../../components/dashboard/form/FormControl.vue";
import TableBooks from "../../../components/dashboard/tables/TableBooks.vue";

const isAuth = computed(() => store.isLoggedIn);
const store = userStore();

const categories = [
  "Todos los libros",
  "En Publicación",
  "Pausado",
  "Agotado"
];  

const selectedCategory = ref(categories[0]);
const selectedCategoryIndex = ref(0);

watch(selectedCategory, (newVal) => {
  selectedCategoryIndex.value = categories.indexOf(newVal);
});

let loadingComplete = ref(false);
onMounted(() => {
  loadingComplete.value = true;
});

</script>

<template>
  <div v-if="isAuth">
    <LayoutDashboard>
      <SectionMain>
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
          <!-- datos una vez cargados -->

          <FormField label="Categoría" class="w-80">
            <FormControl :options="categories" v-model="selectedCategory" />
          </FormField>

          <CardBox class="mb-6" has-table>
            <TableBooks :selectedCategory="selectedCategoryIndex" />
          </CardBox>
        </template>
      </SectionMain>
    </LayoutDashboard>
  </div>
</template>
