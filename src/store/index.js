import Vue from "vue";
import Vuex from "vuex";
import CurrentInfo from "./modules/CurrentInfo";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    CurrentInfo,
  },
});
