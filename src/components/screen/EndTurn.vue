<template>
  <div @click="endTurn()" class="btn btn-dark m-3">End Turn</div>
  <div @click="randomize()" class="btn btn-dark m-3">Randomize</div>
  <div @click="checkConv()" class="btn btn-dark m-3">?</div>
  <div class="m-1 rounded-1 border border-primary d-flex">
    <div
      :style="{ 'flex-grow': testRel1 }"
      class="religin-share bg-primary pt-1"
    ></div>
    <div
      :style="{ 'flex-grow': testRel2 }"
      class="religin-share bg-warning pt-1"
    ></div>
    <div
      :style="{ 'flex-grow': testRel3 }"
      class="religin-share bg-info pt-1"
    ></div>
    <div
      :style="{ 'flex-grow': testRel4 }"
      class="religin-share bg-dark pt-1"
    ></div>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import { useStore } from "vuex";
const store = useStore();
const map = computed(() => store.getters.map);

// БЛЯЯЯЯЯЯЯЯЯЯЯ

const testRel1 = ref(1);
const testRel2 = ref(3);
const testRel3 = ref(1);
const testRel4 = ref(9);

const religions = computed(() => [
  testRel1.value,
  testRel2.value,
  testRel3.value,
  testRel4.value,
]);

function checkConv() {
  console.log(religions.value);
  console.log(getShares(religions.value));

  function getShares(arr) {
    let result = [];
    arr.forEach((el) => {
      result.push(
        el /
          arr.reduce(
            (accumulator, currentValue) => accumulator + currentValue,
            0
          )
      );
    });
    return result;
  }
  let sharesMod = [];
  getShares(religions.value).forEach((el) => {
    sharesMod.push(Math.pow(el, 0.5));
  });
  sharesMod = getShares(sharesMod);

  sharesMod;
  religions.value;
}

// БЛЯЯЯЯЯЯЯЯЯЯЯ

function randomize() {
  store.dispatch({ type: "randomize" });
}

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
}
</script>

<style scoped>
.religin-share {
  height: 10px;
}
</style>
