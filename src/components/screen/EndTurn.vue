<template>
  <div @click="endTurn()" class="btn btn-dark m-3">End Turn</div>
</template>

<script setup>
import { computed } from "vue";
import { useStore } from "vuex";
const store = useStore();
const map = computed(() => store.getters.map);

function endTurn() {
  Object.keys(map.value).forEach((el) => {
    store.dispatch({ type: "endTurnGrowth", cellId: el });
  });
  Object.keys(map.value).forEach((el) => {
    store.dispatch({ type: "endTurnRefugees", cellId: el });
  });
  Object.keys(map.value).forEach((el) => {
    store.dispatch({ type: "endTurnTechProgress", cellId: el });
  });
  Object.keys(map.value).forEach((el) =>
    store.dispatch({ type: "endTurnConvertSpread", cellId: el })
  );
  Object.keys(map.value).forEach((el) =>
    store.dispatch({ type: "endTurnConvertAfterSpread", cellId: el })
  );
}
</script>
