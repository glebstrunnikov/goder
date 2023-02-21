import { createStore } from "vuex";

// Global constants
const globalRows = 10; // number of rows
const globalCols = 16; // number of columns
const globalGrowth = 0.1; // growth modifer, determines the speed of every sells' stats' growth

// forming the global map
const globalMap = {};
for (let i = 1; i <= globalRows; i++) {
  const iR = i;
  for (let i = 1; i <= globalCols; i++) {
    const iRiC = "cell" + iR + "x" + i;
    globalMap[iRiC] = {
      pop: 0,
      fert: 0,
      tech: 0,
      popSpare: 0,
    };
  }
}

// a func to find the ids of the cell's neighbours
function findCellMates(cellId) {
  const reRow = /x.*/g;
  const row = parseInt(cellId.slice(4).replaceAll(reRow, ""));
  const reCol = /.*?x/g;
  const col = parseInt(cellId.slice(4).replaceAll(reCol, ""));

  const cellMates = [];
  if (row > 1) {
    cellMates.push(`cell${row - 1}x${col}`);
  }
  if (col < globalCols) {
    cellMates.push(`cell${row}x${col + 1}`);
  }
  if (row < globalRows) {
    cellMates.push(`cell${row + 1}x${col}`);
  }
  if (col > 1) {
    cellMates.push(`cell${row}x${col - 1}`);
  }
  return cellMates;
}

const store = createStore({
  state() {
    return {
      map: globalMap,
    };
  },
  getters: {
    map(state) {
      return state.map;
    },
  },
  mutations: {
    randomize(state) {
      Object.keys(state.map).forEach((key) => {
        state.map[key].pop = Math.floor(Math.random() * 10 + 1);
        state.map[key].fert = Math.floor(Math.random() * 10 + 1);
        state.map[key].tech = Math.floor(Math.random() * 10 + 1);
      });
    },

    // The global concept is quite simple. Each sell has 3 main stats: population, soil fertility and thechnology level. For the population to grow, you need it to be less then soil fertility capacity, fertility grows when the tech level is high enough, and in order to raise the tech level, you need it to be not less then the population. All simple stone-sizzors-paper.
    // The population level can raise a little bit above fertility on the next turn and push the three foward. Fertility can't - it's only catching up with the tech lvl. Tech can't precede population on its own, but there's an excluduon that'll be mentioned below: the technology progress
    // Every time the new population level percedes the cell's fertility, there's an exodus. Pepole go and populate the mearby cells. This results in religions spreading
    endTurnGrowth(state, payload) {
      const initialPop = state.map[payload.cellId].pop;
      const initialFert = state.map[payload.cellId].fert;
      const initialTech = state.map[payload.cellId].tech;

      let popGrowth;
      let popSpare = 0;
      if (initialPop > initialFert) {
        popGrowth = initialFert - initialPop;
        popSpare = initialPop - initialFert;
      } else {
        popGrowth = initialPop * globalGrowth;
      }

      if (
        initialPop < initialFert &&
        initialPop * (1 + globalGrowth) >= initialFert
      ) {
        popSpare = initialPop * (1 + globalGrowth) - initialFert;
      }

      let fertGrowth;
      if (initialFert >= initialTech) {
        fertGrowth = 0;
      } else {
        fertGrowth = initialFert * globalGrowth;
      }

      let techGrowth;
      if (initialTech >= initialPop) {
        techGrowth = 0;
      } else {
        techGrowth = initialTech * globalGrowth;
      }

      state.map[payload.cellId].pop = initialPop + popGrowth;
      state.map[payload.cellId].fert = initialFert + fertGrowth;
      state.map[payload.cellId].tech = initialTech + techGrowth;
      state.map[payload.cellId].popSpare = popSpare;
    },
    endTurnRefugees(state, payload) {
      const cellMates = findCellMates(payload.cellId);

      const refugees = state.map[payload.cellId].popSpare / cellMates.length;
      cellMates.forEach((el) => {
        state.map[el].pop += refugees;
      });
    },
    endTurnTechProgress(state, payload) {
      const cellMates = findCellMates(payload.cellId);
      let localTech = parseFloat(state.map[payload.cellId].tech);
      let localTechAvg = 0;
      cellMates.forEach((el) => {
        localTechAvg += parseFloat(state.map[el].tech);
      });
      localTechAvg = localTechAvg / cellMates.length;
      // if (payload.cellId == "cell1x1") {
      //   console.log(cellMates, localTechAvg);
      // }
      if (localTech < localTechAvg) {
        state.map[payload.cellId].tech =
          localTech + (localTechAvg - localTech) * globalGrowth;
      }
    },
  },
  actions: {
    increment1x1(context) {
      context.commit("increment1x1");
    },
    randomize(context) {
      context.commit("randomize");
    },
    endTurnGrowth(context, payload) {
      context.commit("endTurnGrowth", payload);
    },
    endTurnRefugees(context, payload) {
      context.commit("endTurnRefugees", payload);
    },
    endTurnTechProgress(context, payload) {
      context.commit("endTurnTechProgress", payload);
    },
  },
});

export default store;
