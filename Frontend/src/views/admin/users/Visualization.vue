<script setup>
import { mdiTableBorder, mdiExport } from "@mdi/js";
import SectionMain from "../../../components/dashboard/sections/SectionMain.vue";
import TableUsers from "../../../components/dashboard/tables/TableUsers.vue";
import CardBox from "../../../components/dashboard/cardbox/CardBox.vue";
import LayoutAuthenticated from "../../../layouts/LayoutDashboard.vue";
import SectionTitleLineWithButton from "../../../components/dashboard/sections/SectionTitleLineWithButton.vue";
import BaseButton from "../../../components/dashboard/minimal/BaseButton.vue";
</script>

<template>
  <LayoutAuthenticated>
    <SectionMain>
      <SectionTitleLineWithButton
        :icon="mdiTableBorder"
        title="Tabla Usuarios"
        main
      >

      </SectionTitleLineWithButton>

      <CardBox class="mb-6" has-table>
        <TableUsers />
      </CardBox>

    </SectionMain>
  </LayoutAuthenticated>
</template>
