<template>
  <div class="bg-success">
    <div @click="randomize()" class="btn btn-dark m-3">Randomize</div>
    <div @click="checkConv()" class="btn btn-dark m-3">?</div>
    <div @click="createRel()" class="btn btn-dark m-3">!</div>

    <div class="m-1 rounded-1 border border-primary d-flex">
      <div
        :style="{ 'flex-grow': testRel1 }"
        class="religion-share bg-primary pt-1"
      ></div>
      <div
        :style="{ 'flex-grow': testRel2 }"
        class="religion-share bg-warning pt-1"
      ></div>
      <div
        :style="{ 'flex-grow': testRel3 }"
        class="religion-share bg-info pt-1"
      ></div>
      <div
        :style="{ 'flex-grow': testRel4 }"
        class="religion-share bg-dark pt-1"
      ></div>
    </div>
    <form @submit.prevent="createRel(power, virality)" action="submit">
      <p>Create religion</p>
      <p>Power:</p>

      <input v-model="power" type="text" name="power" id="" />
      <p>Virality:</p>
      <input v-model="virality" type="text" name="virality" id="" />
      <button type="submit">Create!</button>
    </form>
    <button @click="createZeroRel()">Create Zero Religion</button>
    <br />
    <form @submit.prevent="setRel(cellId, newLocalRel)" action="submit">
      <p>Spread religion</p>
      <p>CellId:</p>
      <input v-model="cellId" type="text" name="cellId" id="" />
      <p>Shares:</p>
      Id1:
      <input v-model="id1" type="text" name="id1" id="" />
      Share1:
      <input v-model="share1" type="text" name="share1" id="" />
      Id2:
      <input v-model="id2" type="text" name="id2" id="" />
      Share2:
      <input v-model="share2" type="text" name="share2" id="" />
      Id3:
      <input v-model="id3" type="text" name="id3" id="" />
      Share3:
      <input v-model="share3" type="text" name="share3" id="" />
      <button type="submit">Set</button>
    </form>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useStore } from "vuex";

const religions = computed(() => store.getters.religions);
const map = computed(() => store.getters.map);

function randomize() {
  store.dispatch({ type: "randomize" });
}

const power = ref("0.5");
const virality = ref("0.5");

const store = useStore();

function createZeroRel() {
  if (religions.value.length == 0) {
    store.dispatch({
      type: "createRel",
      newRel: {
        relId: "id1",
        relPower: 0,
        relVirality: 0,
        relColor: "rgb(255,255,255)",
      },
    });
  }
  Object.keys(map.value).forEach((el) => {
    if (!map.value[el].locaRel) {
      setRel(el, { id1: 1 });
    }
  });
}

function createRel(power, virality) {
  store.dispatch({
    type: "createRel",
    newRel: {
      relId: `id${religions.value.length + 1}`,
      relPower: parseFloat(power),
      relVirality: parseFloat(virality),
      relColor: `rgb(${Math.floor(Math.random() * 255)},${Math.floor(
        Math.random() * 255
      )},${Math.floor(Math.random() * 255)})`,
    },
  });
}

function setRel(cellId, newLocalRel) {
  store.dispatch({ type: "setRel", relUpdate: { cellId, newLocalRel } });
}

const cellId = ref("cell1x1");
const id1 = ref("id1");
const share1 = ref("0.5");
const id2 = ref("id2");
const share2 = ref("0.25");
const id3 = ref("id3");
const share3 = ref("0.25");
const newLocalRel = computed(() => {
  let newLocalRel = {};
  newLocalRel[id1.value] = parseFloat(share1.value);
  newLocalRel[id2.value] = parseFloat(share2.value);
  newLocalRel[id3.value] = parseFloat(share3.value);

  return newLocalRel;
});

const testRel1 = {
  relId: 1,
  relPower: 0,
};
const testRel2 = {
  relId: 2,
  relPower: 0.3,
};
const testRel3 = {
  relId: 3,
  relPower: 0.2,
};
const testRel4 = {
  relId: 4,
  relPower: 0.4,
};

// const globalRels = [testRel1, testRel2, testRel3, testRel4];

// const localRels = {
//   1: 0.8,
//   2: 0.1,
//   3: 0.05,
//   4: 0.05,
// };

// function relChange(local, global) {
//   console.log(local, global);

//   global.forEach((el) => {
//     local[el.relId] += local[el.relId] * el.relPower;
//   });
//   console.log(local, global);

//   let sharesModSum = 0;
//   for (const el in local) {
//     sharesModSum += local[el];
//   }
//   console.log(sharesModSum);
//   for (const el in local) {
//     local[el] /= sharesModSum;
//   }
//   console.log(local);
// }

// function checkConv() {
//   relChange(localRels, globalRels);
// }
</script>

<style scoped>
.religion-share {
  height: 10px;
}
* {
  margin: 2px;
}
input {
  width: 50px;
  height: 20px;
  display: inline;
}
p {
  display: inline;
}
</style>
