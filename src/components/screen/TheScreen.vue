<template>
  <div class="container my-4">
    <div class="row">
      <div class="col-2">
        <the-stats></the-stats>
      </div>
      <div class="col-7">
        <the-field></the-field>
      </div>
      <div class="col-3"><the-info></the-info> <end-turn></end-turn></div>
    </div>
  </div>
</template>

<script setup>
import TheField from "../field/TheField.vue";
import TheStats from "./TheStats.vue";
import TheInfo from "./TheInfo.vue";
import EndTurn from "./EndTurn.vue";
</script>
