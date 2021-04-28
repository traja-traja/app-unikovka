export default {
  setUserIsLogged(state, payload) {
    state.userIsLogged = payload.userIsLogged;
  },

  setListOfUsers(state, payload) {
    state.listOfUsers = payload
  },

  setActiveUser(state, payload) {
    state.activeUser = payload
  }
};