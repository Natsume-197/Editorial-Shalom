<script setup>
import { containerMaxW } from "../../assets/style/config";
import BaseLevel from "../dashboard/minimal/BaseLevel.vue";
const year = new Date().getFullYear();
</script>

<template>
  <footer class="py-2 pb-10 px-6" :class="containerMaxW">
    <BaseLevel>
      <div class="text-center md:text-left">
        <b
          >&copy;{{ year }},
          <a href="/" target="_blank">EditorialShalom.com</a></b
        >
        <slot />
      </div>
    </BaseLevel>
  </footer>
</template>
