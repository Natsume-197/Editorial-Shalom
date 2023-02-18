<script setup>
import { mdiTableBorder, mdiAccountPlus } from "@mdi/js";
import SectionMain from "../../components/dashboard/SectionMain.vue";
import TableUsers from "../../components/dashboard/TableUsers.vue";
import CardBox from "../../components/dashboard/CardBox.vue";
import LayoutAuthenticated from "../../layouts/LayoutDashboard.vue";
import SectionTitleLineWithButton from "../../components/dashboard/SectionTitleLineWithButton.vue";
import BaseButton from "../../components/dashboard/minimal/BaseButton.vue";
</script>

<template>
  <LayoutAuthenticated>
    <SectionMain>
      <SectionTitleLineWithButton
        :icon="mdiTableBorder"
        title="Tabla Usuarios"
        main
      >
        <BaseButton
          target="_blank"
          :icon="mdiAccountPlus"
          label="Añadir un usuario"
          color="contrast"
          rounded-full
          small
        />
      </SectionTitleLineWithButton>

      <CardBox class="mb-6" has-table>
        <TableUsers />
      </CardBox>

    </SectionMain>
  </LayoutAuthenticated>
</template>
