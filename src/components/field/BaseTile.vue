<template>
  <div
    @click="printInfo"
    :id="cellId"
    class="m-1 rounded-1 border border-primary"
  >
    <div class="pie-background" :style="pieStyle.value">
      <div class="p-1">
        <p class="test-param">{{ pop }}</p>
        <p class="test-param">{{ fert }}</p>
        <p class="test-param">{{ tech }}</p>
      </div>
    </div>
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

const pieStyle = ref();

pieStyle.value = computed(() => {
  let result = "background: conic-gradient(";
  let relNo = 0;
  let previousDeg = "";
  for (const religion in store.getters.map[cellId.value].localRel) {
    const currentRelColor = store.getters.religions.find(
      (el) => el.relId === religion
    ).relColor;
    switch (relNo) {
      case 0:
        result += currentRelColor;
        result += " ";
        previousDeg = store.getters.map[cellId.value].localRel[religion] * 360;
        result += previousDeg;
        result += "deg, ";
        relNo += 1;
        break;
      case Object.keys(store.getters.map[cellId.value].localRel).length - 1:
        result += currentRelColor;
        result += " ";
        result += previousDeg;
        result += "deg, ";
        break;
      default:
        result += currentRelColor;
        result += " ";
        result += previousDeg;
        result += "deg ";
        result +=
          parseFloat(previousDeg) +
          parseFloat(store.getters.map[cellId.value].localRel[religion] * 360);
        result += "deg, ";
        previousDeg =
          parseFloat(previousDeg) +
          parseFloat(store.getters.map[cellId.value].localRel[religion] * 360);
        relNo += 1;
        break;
    }
  }
  result = result.slice(0, result.length - 2);
  result += ")";

  return result;
});

function printInfo() {
  console.log(pieStyle.value);
  console.log(store.getters.map[cellId.value].localRel);
  console.log(cellId);
}
</script>

<style scoped>
.test-param {
  font-size: 9px;
  line-height: 0%;
}
.pie-background {
  height: 100%;
  /* background: conic-gradient(
    rgb(255, 255, 255) 36deg,
    orange 36deg 170deg,
    yellow 170deg
  ); */
  /* background: conic-gradient(
    rgb(255, 255, 255) 180deg,
    rgb(115, 17, 127) 180deg 90deg,
    rgb(247, 59, 231) 90deg
  ); */
  border-radius: 50%;
}
</style>
