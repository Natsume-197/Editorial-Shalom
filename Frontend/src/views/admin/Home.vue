<script setup>
import { computed, ref, watch, reactive, onMounted } from "vue";
import { useMainStore } from "../../stores/main";
import { userStore } from "../../stores/user";
import LayoutDashboard from "../../layouts/LayoutDashboard.vue";
import SectionMain from "../../components/dashboard/sections/SectionMain.vue";
import SectionTitleLineWithButton from "../../components/dashboard/sections/SectionTitleLineWithButton.vue";
import CardBoxWidget from "../../components/dashboard/cardbox/CardBoxWidget.vue";
import {
  mdiChartTimelineVariant,
  mdiAccountMultiple,
  mdiCartOutline,
  mdiWeb,
} from "@mdi/js";
import SectionBannerCover from "../../components/dashboard/sections/SectionBannerCover.vue";
import { api } from "../../utils/axios";
import CardBoxTransaction from "../../components/dashboard/cardbox/CardBoxTransaction.vue";

const isAuth = computed(() => store.isLoggedIn);
const store = userStore();

const mainStore = useMainStore();
mainStore.fetch("clients");

let items = null;

let loadingComplete = ref(false);
items = computed(() => mainStore.clients);

let total_users = computed(() => items.value.length);
watch([loadingComplete, items], ([isLoadingValue, itemsValue]) => {
  if (!isLoadingValue && itemsValue !== null) {
    loadingComplete.value = true;
  }
});

const response_sales = reactive({
  data: null,
});

// Get all transaction history
async function getAllTransactions() {
  try {
    const res = await api.get("/sales_request_get");

    const sortedData = res.data.sales_request.sort((a, b) => {
      return new Date(b.purchase_date) - new Date(a.purchase_date);
    });
    response_sales.data = sortedData.slice(0, 4);
        
  } catch (error) {
    console.log(error);
  }
}

onMounted(() => {
  getAllTransactions();
});
</script>

<template>
  <div v-if="isAuth">
    <LayoutDashboard>
      <SectionMain>
        <SectionTitleLineWithButton
          :icon="mdiChartTimelineVariant"
          title="Resumen"
          main
        >
        </SectionTitleLineWithButton>
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

          <div class="grid grid-cols-1 gap-6 lg:grid-cols-3 mb-6">
            <CardBoxWidget
              trend-type="up"
              color="text-blue-500"
              :icon="mdiAccountMultiple"
              :number="total_users"
              label="Usuarios totales"
            />
            <CardBoxWidget
              trend-type="down"
              color="text-emerald-500"
              :icon="mdiCartOutline"
              :number="0"
              prefix=""
              label="Ventas (mensual)"
            />
            <CardBoxWidget
              trend-type="alert"
              color="text-white-500"
              :icon="mdiWeb"
              :number="0"
              prefix=""
              label="Pedidos (mensual)"
            />
          </div>

          <SectionTitleLineWithButton
            :icon="mdiChartTimelineVariant"
            title="Historial de Transacciones"
          >
          </SectionTitleLineWithButton>
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <div class="flex flex-col justify-between">
              <CardBoxTransaction
                v-for="(transaction, index) in response_sales.data"
                :key="index"
                :amount="transaction.total"
                :date="transaction.purchase_date"
                :account="transaction.name"
                :type="transaction.id_status"
                :name="transaction.name"
                :email="transaction.email"
              />
            </div>
            <div class="flex flex-col justify-between"></div>
          </div>
        </template>
      </SectionMain>
    </LayoutDashboard>
  </div>
</template>
