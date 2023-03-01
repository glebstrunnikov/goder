<template>
  <div @click="endTurn()" class="btn btn-dark m-3">End Turn</div>
  <div @click="endTurn100()" class="btn btn-dark m-3">End 100 Turns</div>
</template>

<script setup>
import { computed } from "vue";
import { useStore } from "vuex";
const store = useStore();
const map = computed(() => store.getters.map);

function pseudoShuffle(array) {
  let result = array;
  // array.forEach((el) => {
  //   const coin = Math.random();
  //   if (coin >= 0.5) {
  //     result.push(el);
  //   } else result.unshift(el);
  // });

  const coin = Math.random();
  if (coin >= 0.5) {
    result = array.reverse();
  }
  return result;
}

// console.log(result);

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
  pseudoShuffle(Object.keys(map.value)).forEach((el) =>
    store.dispatch({ type: "endTurnConvertSpread", cellId: el })
  );
  pseudoShuffle(Object.keys(map.value)).forEach((el) =>
    store.dispatch({ type: "endTurnConvertAfterSpread", cellId: el })
  );
}

function endTurn100() {
  for (let i = 1; i <= 100; i++) {
    endTurn();
  }
}
</script>
