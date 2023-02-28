export default {
  testModeToggle(context) {
    context.commit("testModeToggle");
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
  createRel(context, payload) {
    context.commit("createRel", payload);
  },
  setRel(context, payload) {
    context.commit("setRel", payload);
  },
  endTurnConvertSpread(context, payload) {
    context.commit("endTurnConvertSpread", payload);
  },
  endTurnConvertAfterSpread(context, payload) {
    context.commit("endTurnConvertAfterSpread", payload);
  },
};
