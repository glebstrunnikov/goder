import { createStore } from "vuex";

import rootActions from "./actions";
import rootMutations from "./mutations";
import global from "./global";

const store = createStore({
  state() {
    return {
      map: global.globalMap,
      religions: [],
      testMode: true,
    };
  },
  getters: {
    map(state) {
      return state.map;
    },
    religions(state) {
      return state.religions;
    },
    testMode(state) {
      return state.testMode;
    },
  },

  mutations: rootMutations,
  actions: rootActions,
});

export default store;
