import mutations from './mutations.js'
import actions from './actions.js'
import getters from './getters.js'

export default {
  state() {
    return {
      userIsLogged: false,
      listOfUsers: null,
      activeUser: null
    }
  },
  mutations,
  actions,
  getters
}