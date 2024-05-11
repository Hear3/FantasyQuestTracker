import { createStore } from 'vuex'

export default createStore({
  state: {
    isLoggedIn: false,
    userEmail: 'none',
    items: {
      shield: { visible: false },
      sword: { visible: false },
      helmet: { visible: false }
    }
  },
  mutations: {
    setLoggedIn(state, value) {
      state.isLoggedIn = value;
    },
    setUserEmail(state, value) {
      state.userEmail = value;
    },
    toggleItem(state, itemKey) {
      state.items[itemKey].visible = !state.items[itemKey].visible;
    },
    initializeItems(state, items) {
      state.items = items;
    }
  },
  actions: {
    updateLoggedIn({ commit }, value) {
      commit('setLoggedIn', value);
    },
    updateUserEmail({ commit }, value) {
      commit('setUserEmail', value);
    },
    toggleItem({ commit }, itemKey) {
      commit('toggleItem', itemKey);
      localStorage.setItem('items', JSON.stringify(this.state.items));
    },
    loadItems({ commit }) {
      const savedItems = localStorage.getItem('items');
      if (savedItems) {
        commit('initializeItems', JSON.parse(savedItems));
      }
    }
  },
  getters: {
    isLoggedIn: (state) => state.isLoggedIn,
    userEmail: (state) => state.userEmail,
    items: (state) => state.items
  }
})