import weatherApi from "@/services/weatherApi";

export default {
  state: {
    current: null,
    defaultLocation: "Chicago",
    loading: false,
    error: null,
  },
  getters: {
    getCurrentInfo: (state) => state.current,
    getDefaultLocation: (state) => state.defaultLocation,
    isLoading: (state) => state.loading,
    getError: (state) => state.error,
    hasWeatherData: (state) => state.current !== null,
  },
  mutations: {
    setCurrentInfo: (state, value) => {
      state.current = value;
      state.error = null;
    },
    setDefaultLocation: (state, value) => (state.defaultLocation = value),
    setLoading: (state, value) => (state.loading = value),
    setError: (state, value) => (state.error = value),
  },
  actions: {
    async getCurrentInfoApi({ commit }, location) {
      commit("setLoading", true);
      commit("setError", null);

      try {
        const data = await weatherApi.fetchWeatherData(location);
        commit("setCurrentInfo", data);
        return data;
      } catch (error) {
        commit("setError", error.message);
        throw error;
      } finally {
        commit("setLoading", false);
      }
    },
    clearError({ commit }) {
      commit("setError", null);
    },
    setDefaultLocation({ commit }, location) {
      commit("setDefaultLocation", location);
    },
  },
};
