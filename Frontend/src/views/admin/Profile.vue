<script setup>
import { computed, ref, watch } from "vue";
import { useMainStore } from "../../stores/main";
import { userStore } from "../../stores/user";
import LayoutDashboard from "../../layouts/LayoutDashboard.vue";
import SectionMain from "../../components/dashboard/SectionMain.vue";
import CardBox from "../../components/dashboard/cardbox/CardBox.vue";
import BaseIcon from "../../components/dashboard/minimal/BaseIcon.vue";
import BaseButton from "../../components/dashboard/minimal/BaseButton.vue";
import SectionTitleLineWithButton from "../../components/dashboard/SectionTitleLineWithButton.vue";
import { mdiCheckDecagram, mdiAccount, mdiPencil, mdiCloudLock } from "@mdi/js";
import BaseButtons from "../../components/dashboard/minimal/BaseButtons.vue";
import BaseDivider from "../../components/dashboard/minimal/BaseDivider.vue";

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
</script>

<template>
  <div v-if="isAuth">
    <LayoutDashboard>
      <SectionMain>
        <SectionTitleLineWithButton :icon="mdiAccount" title="Perfil" main>
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

          <div class="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-6">
            <CardBox flex="flex-row" class="items-center">
              <div class="flex justify-start items-start">
                <UserAvatarCurrentUserWithUpload
                  class="w-24 h-24 md:w-36 md:h-36 mr-6"
                />
                <div class="flex-1">
                  <div class="flex justify-between items-center">
                    <div class="flex justify-start items-center mb-3">
                      <h1 class="text-2xl mr-1.5">
                        {{ mainStore.userName }}
                      </h1>
                      <BaseIcon
                        :path="mdiCheckDecagram"
                        :size="22"
                        class="text-blue-400"
                      />
                    </div>
                    <BaseButton
                      :icon="mdiPencil"
                      color="lightDark"
                      small
                      rounded-full
                    />
                  </div>

                  <BaseButtons class="text-gray-500">
                    Cuenta administrador
                  </BaseButtons>
                  <BaseButtons class="mt-6" class-addon="mr-9 last:mr-0 mb-3">
                  </BaseButtons>
                </div>
              </div>
            </CardBox>
          </div>
          <SectionTitleLineWithButton
            :icon="mdiCloudLock"
            title="Opciones de seguridad"
          />
          <CardBox class="mb-6">
            <div class="flex items-center justify-between">
              <p>
                Contraseña cambiada hace
                <b>15 días</b>
              </p>
              <BaseButton label="Cambiar contraseña" color="lightDark" small />
            </div>
          </CardBox>
        </template>
      </SectionMain>
    </LayoutDashboard>
  </div>
</template>
