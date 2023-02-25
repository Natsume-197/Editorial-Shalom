<script setup>
import Navbar from "../../components/home/elements/Navbar.vue";
import DetailsBook from "../../components/home/DetailsBook.vue";
import Footer from "../../components/home/Footer.vue";
</script>

<template>
  <div class="mx-auto">
    <Navbar />
    <Suspense>
      <DetailsBook class="p-10" />
    </Suspense>
    <Footer />
  </div>
</template>
