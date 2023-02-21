<template>
  <the-header></the-header>
  <div class="min-vh-100 d-flex flex-column"><the-screen></the-screen></div>

  <the-footer class="mt-auto"></the-footer>
</template>

<script setup>
import TheHeader from "./components/TheHeader.vue";
import TheFooter from "./components/TheFooter.vue";
import TheScreen from "./components/screen/TheScreen.vue";
</script>

<style>
#app {
  font-family: Helvetica, Arial, sans-serif;
}
</style>
, TheHeader
