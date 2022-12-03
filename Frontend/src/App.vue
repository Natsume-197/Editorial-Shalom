<template>
  <main>
    <NavBar v-if="$route.path !== '/login' && $route.path !== '/register' && $route.path  !== '/account/resetPassword'" />
    <RouterView />
    <FooTerVue v-if="$route.path !== '/login' && $route.path !== '/register' && $route.path  !== '/account/resetPassword'" />
  </main>
</template>

<script setup>
import { RouterView } from 'vue-router'
import NavBar from './components/NavBar.vue'
import FooTerVue from './components/Footer.vue'
</script>
