<script setup>
import { computed, ref, onMounted } from "vue";
import { useMainStore } from "../../stores/main";
import { userStore } from "../../stores/user";
import LayoutDashboard from "../../layouts/LayoutDashboard.vue";
const isAuth = computed(() => store.isLoggedIn);
const store = userStore();

</script>

<template>
  <div v-if="isAuth">
    <LayoutDashboard> 
        

    </LayoutDashboard>
  </div>
</template>
