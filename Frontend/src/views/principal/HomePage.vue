<script setup>
import Navbar from "../../components/home/elements/Navbar.vue";
import Showcase from "../../components/home/Showcase.vue";
import LandingPage from "../../components/home/LandingPage.vue";
import BookSeries from "../../components/home/BooksSeries.vue";
import Footer from "../../components/home/Footer.vue";
</script>

<template>
  <div class="mx-auto flex flex-col min-h-screen">
    <div class="flex-1">
      <Navbar />
      <LandingPage />
      <BookSeries />
      <Showcase />
    </div>
    <Footer />
  </div>
</template>
