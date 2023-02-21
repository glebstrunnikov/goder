<template>
  <div class="border border-primary p-1">
    <div class="world-edge d-flex flex-column">
      <tile-row
        class="flex-grow-1"
        v-for="row in rows"
        :key="row"
        :row="row"
      ></tile-row>
    </div>
  </div>
</template>

<script setup>
import { ref, provide } from "vue";
import TileRow from "./TileRow.vue";
const rows = ref();
const cols = ref();
rows.value = numToArr(10);
cols.value = numToArr(16);
provide("cols", cols.value);
function numToArr(num) {
  let result = [];
  for (let i = 1; i <= num; i++) {
    result.push(i);
  }
  return result;
}
</script>

<style scoped>
.world-edge {
  height: 28em;
}
</style>
