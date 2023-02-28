import global from "./global";

export default {
  testModeToggle(state) {
    state.testMode = !state.testMode;
  },
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
      popGrowth = initialPop * global.globalGrowth;
    }

    if (
      initialPop < initialFert &&
      initialPop * (1 + global.globalGrowth) >= initialFert
    ) {
      popSpare = initialPop * (1 + global.globalGrowth) - initialFert;
    }

    let fertGrowth;
    if (initialFert >= initialTech) {
      fertGrowth = 0;
    } else {
      fertGrowth = initialFert * global.globalGrowth;
    }

    let techGrowth;
    if (initialTech >= initialPop) {
      techGrowth = 0;
    } else {
      techGrowth = initialTech * global.globalGrowth;
    }

    state.map[payload.cellId].pop = initialPop + popGrowth;
    state.map[payload.cellId].fert = initialFert + fertGrowth;
    state.map[payload.cellId].tech = initialTech + techGrowth;
    state.map[payload.cellId].popSpare = popSpare;
  },
  endTurnRefugees(state, payload) {
    const cellMates = global.findCellMates(payload.cellId);

    const refugees = state.map[payload.cellId].popSpare / cellMates.length;
    cellMates.forEach((el) => {
      state.map[el].pop += refugees;
    });
  },
  endTurnTechProgress(state, payload) {
    const cellMates = global.findCellMates(payload.cellId);
    let localTech = parseFloat(state.map[payload.cellId].tech);
    let localTechAvg = 0;
    cellMates.forEach((el) => {
      localTechAvg += parseFloat(state.map[el].tech);
    });
    localTechAvg = localTechAvg / cellMates.length;
    if (localTech < localTechAvg) {
      state.map[payload.cellId].tech =
        localTech + (localTechAvg - localTech) * global.globalGrowth;
    }
  },
  createRel(state, payload) {
    state.religions.push(payload.newRel);
    console.log("New global religions: ", state.religions);
  },
  setRel(state, payload) {
    state.map[payload.relUpdate.cellId].localRel =
      payload.relUpdate.newLocalRel;
    // console.log(
    //   "New local religions: ",
    //   state.map[payload.relUpdate.cellId].localRel,
    //   "on cell ",
    //   payload.relUpdate.cellId
    // );
  },
  endTurnConvertSpread(state, payload) {
    if (payload.cellId == "cell1x1" || payload.cellId == "cell1x2") {
      console.log(state.map[payload.cellId].localRel);
    }
    const cellMates = global.findCellMates(payload.cellId);
    console.log(cellMates, state.map[payload.cellId].localRel);
    cellMates.forEach((cellMate) => {
      for (const religion in state.map[payload.cellId].localRel) {
        const virality = state.religions.find(
          (el) => el.relId == religion
        ).relVirality;

        if (!state.map[cellMate].localRel[religion]) {
          state.map[cellMate].localRel[religion] = 0;
        }
        state.map[cellMate].localRel[religion] +=
          state.map[payload.cellId].localRel[religion] *
          virality *
          global.globalSpread *
          (state.map[payload.cellId].pop / state.map[cellMate].pop);
      }
    });
    if (payload.cellId == "cell1x1" || payload.cellId == "cell1x2") {
      console.log(state.map[payload.cellId].localRel);
    }
  },
  endTurnConvertAfterSpread(state, payload) {
    if (payload.cellId == "cell1x1") {
      console.log(state.map[payload.cellId].localRel);
    }

    state.religions.forEach((el) => {
      state.map[payload.cellId].localRel[el.relId] +=
        state.map[payload.cellId].localRel[el.relId] * el.relPower;
      console.log(state.map[payload.cellId].localRel[el.relId]);
      if (state.map[payload.cellId].localRel[el.relId] < global.globalMinRel) {
        state.map[payload.cellId].localRel[el.relId] = 0;
      }
      let sharesModSum = 0;
      for (const el in state.map[payload.cellId].localRel) {
        sharesModSum += state.map[payload.cellId].localRel[el];
      }
      for (const el in state.map[payload.cellId].localRel) {
        state.map[payload.cellId].localRel[el] /= sharesModSum;
        if (payload.cellId == "cell1x1") {
          console.log(state.map[payload.cellId].localRel);
        }
      }
    });
  },
};
