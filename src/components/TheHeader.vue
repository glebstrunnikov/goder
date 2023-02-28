<template>
  <nav class="navbar navbar-expand-lg bg-warning bg-body-tertiary px-5 py-3">
    <div class="container-fluid">
      <div class="d-flex align-items-baseline">
        <a class="navbar-brand" href="#">Goder</a>
        <a class="nav-link px-3" href="#">Rules</a>
        <a class="nav-link px-3" href="#">About</a>
        <button @click="testModeToggle()" class="nav-link px-3" href="#">
          Test Mode
        </button>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { useStore } from "vuex";
const store = useStore();
function testModeToggle() {
  store.dispatch({ type: "testModeToggle" });
}
</script>
