export default {
  // @todo refactor

  setGameSettings(state, payload) {
    state.gameSettings = payload
  },

  setGoodGameResults(state, payload) {
    state.goodGameResults = payload
  },

  setBadGameResults(state, payload) {
    state.badGameResults = payload
  },

  setGameData(state, payload) {
    state.gameData = payload
  }
};