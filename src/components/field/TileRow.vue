<template>
  <div class="d-flex justify-content-evenly">
    <base-tile
      class="flex-grow-1"
      v-for="col in cols"
      :key="row + col"
      :row="row"
      :col="col"
    ></base-tile>
  </div>
</template>

<script setup>
import BaseTile from "./BaseTile.vue";
import { ref, inject } from "vue";
const cols = inject("cols");
const props = defineProps(["row"]);
const row = ref(props.row);
</script>
