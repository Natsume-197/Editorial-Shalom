<script setup>
import Navbar from "../../components/home/elements/Navbar.vue";
import Showcase from "../../components/home/Showcase.vue";
import Footer from "../../components/home/Footer.vue";

import BookShowcase from "../../components/home/BookShowcase.vue";
</script>

<template>
  <div class="mx-auto flex flex-col min-h-screen">
    <div class="flex-1">
      <Navbar class="" />
      <Suspense>
      <BookShowcase />
    </Suspense>
    </div>    
    <Footer />
  </div>
</template>