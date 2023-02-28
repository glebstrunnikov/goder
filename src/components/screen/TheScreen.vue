<template>
  <div class="container my-4">
    <div class="row">
      <div class="col-1">
        <the-stats></the-stats>
      </div>
      <div class="col-7">
        <the-field></the-field>
      </div>
      <div class="col-4">
        <the-info></the-info> <end-turn></end-turn>
        <test-panel v-if="testMode.value === true">sss</test-panel>
      </div>
    </div>
  </div>
</template>

<script setup>
import TheField from "../field/TheField.vue";
import TheStats from "./TheStats.vue";
import TheInfo from "./TheInfo.vue";
import EndTurn from "./EndTurn.vue";
import TestPanel from "./TestPanel.vue";
import { useStore } from "vuex";
import { ref, computed } from "vue";
const store = useStore();
const testMode = ref();

testMode.value = computed(() => store.getters.testMode);
</script>
