<script setup>
import {
  mdiBallotOutline,
  mdiLock,
  mdiMail,
  mdiMapMarker,
  mdiPhone,
} from "@mdi/js";
import SectionMain from "../../../components/dashboard/SectionMain.vue";
import CardBox from "../../../components/dashboard/CardBox.vue";
import LayoutAuthenticated from "../../../layouts/LayoutDashboard.vue";
import SectionTitleLineWithButton from "../../../components/dashboard/SectionTitleLineWithButton.vue";
import BaseButton from "../../../components/dashboard/minimal/BaseButton.vue";
import FormField from "../../../components/dashboard/FormField.vue";
import BaseDivider from "../../../components/dashboard/minimal/BaseDivider.vue";
import BaseButtons from "../../../components/dashboard/minimal/BaseButtons.vue";
import FormControl from "../../../components/dashboard/FormControl.vue";
import FormCheckRadioGroup from "../../../components/dashboard/FormCheckRadioGroup.vue";
import { reactive, ref } from "vue";
import { registerUser } from "../../../utils/actions";

const passShowHideClicked = ref(false);

const data = reactive({
  name: "",
  second_name: "",
  email: "",
  password: "",
  address: "",
  cellphone: "",
  switch: ["isVerified"],
});

const submitForm = async () => {
  await registerUser(data);
};
</script>

<template>
  <LayoutAuthenticated>
    <SectionMain>
      <SectionTitleLineWithButton
        :icon="mdiBallotOutline"
        title="Formulario Usuario"
        main
      >
      </SectionTitleLineWithButton>

      <CardBox isForm @submit.prevent="submitForm">
        <FormField label="Datos Básicos">
          <FormControl v-model="data.name" required placeholder="Nombre" />
          <FormControl
            v-model="data.second_name"
            placeholder="Apellido (opcional)"
          />
        </FormField>

        <FormField>
          <FormControl
            type="email"
            required
            v-model="data.email"
            name="email"
            placeholder="Correo"
            :icon="mdiMail"
          />
        </FormField>

        <FormField>
          <FormControl
            v-model="data.password"
            placeholder="Contraseña"
            type="password"
            :icon="mdiLock"
            name="password"
            @right-icon-click="passShowHideClicked = true"
          />
        </FormField>

        <FormField>
          <FormControl
            type="address"
            v-model="data.address"
            placeholder="Direccion"
            :icon="mdiMapMarker"
            required
          />
          <FormControl
            type="tel"
            placeholder="Celular"
            v-model="data.cellphone"
            required
            :icon="mdiPhone"
          />
        </FormField>

        <BaseDivider />

        <FormField label="Opciones">
          <FormField label="">
            <FormCheckRadioGroup
              v-model="data.switch"
              name="sample-switch"
              type="switch"
              :options="{
                isAdmin: 'Modo Administrador',
                isVerified: 'Verificado',
              }"
            />
          </FormField>
        </FormField>
        <template #footer>
          <BaseButtons>
            <BaseButton type="submit" color="info" label="Añadir" />
            <BaseButton type="reset" color="info" outline label="Reiniciar" />
          </BaseButtons>
        </template>
      </CardBox>
    </SectionMain>
  </LayoutAuthenticated>
</template>
