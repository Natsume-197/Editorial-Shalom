<script setup>
import { containerMaxW } from "../../config";
import BaseLevel from "../dashboard/minimal/BaseLevel.vue";
const year = new Date().getFullYear();
</script>

<template>
  <footer class="py-2 px-6" :class="containerMaxW">
    <BaseLevel>
      <div class="text-center md:text-left">
        <b
          >&copy;{{ year }},
          <a href="https://justboil.me/" target="_blank">EditorialShalom.com</a></b
        >
        <slot />
      </div>
    </BaseLevel>
  </footer>
</template>
