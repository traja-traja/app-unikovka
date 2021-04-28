export default {
  userIsLogged(state) {
    return state.userIsLogged
  },

  listOfUsers(state) {
    return state.listOfUsers
  },

  activeUser(state) {
    return state.activeUser
  },

  userGender(state) {
    if (state.activeUser && state.activeUser.gender) {
      return state.activeUser.gender
    } else {
      return undefined
    }
  },

  userName(state) {
    if (state.activeUser) {
      return state.activeUser.firstName + ' ' + state.activeUser.lastName + '.'
    } else {
      return 'anonymous'
    }
  },

  userClassName(state) {
    if (state.activeUser) {
      return state.activeUser.className
    } else {
      return '?'
    }
  }
};