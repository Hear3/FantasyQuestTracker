import { createStore } from 'vuex'

export default createStore({
  state: {
    isLoggedIn: false,
    userEmail: 'none'
  },
  mutations: {
    setLoggedIn(state, value) {
      state.isLoggedIn = value
    },
    setUserEmail(state, value) {
      state.userEmail = value
    }
  },
  actions: {
    updateLoggedIn({ commit }, value) {
      commit('setLoggedIn', value)
    },
    updateUserEmail({ commit }, value) {
      commit('setUserEmail', value)
    }
  },
  getters: {
    isLoggedIn: (state) => state.isLoggedIn,
    setUserEmail: (state) => state.setUserEmail
  }
})
