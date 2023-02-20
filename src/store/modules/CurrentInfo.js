export default {
  state: {
    current: [],
    location: "Bangalore",
  },
  getters: {
    getCurrentInfo: (state) => state.current,
    getLocationInfo: (state) => state.location,
  },
  mutations: {
    setCurrentInfo: (state, value) => (state.current = value),
    setLocationInfo: (state, value) => (state.location = value),
  },
  actions: {
    getCurrentInfoApi: ({ commit }, { success, location }) => {
      // console.log(location);
      fetch(
        "http://api.weatherapi.com/v1/forecast.json?key=7a635d10a9b045d7a7c54416230902&q=" +
          location +
          "&days=7&aqi=no&alerts=no"
      )
        // fetch(`http://localhost:8090/location/getLocation/${location}`)
        .then((res) => res.json())
        .then((res) => {
          console.log("From Store", res);
          commit("setCurrentInfo", res);
          success && success(res);
        })
        .catch((errors) => {
          // alert("Entered location could not be found!");
          console.log("ERRORS: ", errors.code);
          // fetch(
          //   "http://api.weatherapi.com/v1/forecast.json?key=7a635d10a9b045d7a7c54416230902&q=Bangalore&days=7&aqi=no&alerts=no"
          // )
          //   .then((res) => res.json())
          //   .then((res) => {
          //     commit("setCurrentInfo", res);
          //   });
        });
    },
  },
};
