import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    favorites: []
  },
  mutations: {
    addFavorite(state, payload) {
      if (state.favorites && state.favorites.length < 4)
        state.favorites.push(payload);
    },
    removeFavorite(state, payload) {
      if (state.favorites && state.favorites.length > 0) {
        var index = state.favorites.indexOf(payload);

        if (index > 0) state.favorites.splice(index, 1);
      }
    }
  },
  getters: {
    favorite: state => payload => {
      return state.favorites.indexOf(payload) !== -1;
    }
  },
  actions: {},
  modules: {}
});
