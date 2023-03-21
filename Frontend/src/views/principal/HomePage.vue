<script setup>
import Navbar from "../../components/home/elements/Navbar.vue";
import Showcase from "../../components/home/Showcase.vue";
import LandingPage from "../../components/home/LandingPage.vue";
import BookSeries from "../../components/home/BooksSeries.vue";
import LandingFeatures from "../../components/home/LandingFeatures.vue";
import Categories from "../../components/home/Categories.vue";
import Footer from "../../components/home/Footer.vue";
</script>

<template>
  <div class="mx-auto flex flex-col min-h-screen">
    <div class="flex-1">
      
      <Navbar />
      <LandingPage />
      <Categories/>
      <LandingFeatures/>
      <BookSeries />
      <Showcase />
    </div>
    <Footer />
  </div>
</template>
