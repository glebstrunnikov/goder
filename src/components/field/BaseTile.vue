<template>
  <div
    @click="printInfo"
    :id="cellId"
    class="m-1 pt-1 px-1 rounded-1 border border-primary"
  >
    <p class="test-param">{{ pop }}</p>
    <p class="test-param">{{ fert }}</p>
    <p class="test-param">{{ tech }}</p>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { computed } from "vue";
import { useStore } from "vuex";
const store = useStore();
const props = defineProps(["row", "col"]);
const row = ref(props.row);
const col = ref(props.col);
const cellId = ref();
cellId.value = `cell${row.value}x${col.value}`;

const pop = ref();
pop.value = computed(() => store.getters.map[cellId.value].pop.toFixed(2));
const fert = ref();
fert.value = computed(() => store.getters.map[cellId.value].fert.toFixed(2));
const tech = ref();
tech.value = computed(() => store.getters.map[cellId.value].tech.toFixed(2));

function printInfo() {
  console.log(store.getters.map[cellId.value].localRel);
}
</script>

<style scoped>
.test-param {
  font-size: 9px;
  line-height: 0%;
}
</style>
