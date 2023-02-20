<template>
  <div class="component">
    <h2>{{ CurrentData.location.name }}</h2>
    <h3>{{ CurrentData.location.country }}</h3>
    <h1>{{ CurrentData.current.temp_c }}°</h1>
    <!-- <h1>{{ CurrentData.forecast.forecastday[0].day.condition.text }}</h1> -->
    <!-- <img id="image1" src="../assets/ThunderRain.png" alt="NaN" /> -->

    <img
      v-if="CurrentData.forecast.forecastday[0].day.condition.text == 'Sunny'"
      id="image1"
      src="../assets/sunny.png"
      alt="Sunny"
    />
    <img
      v-if="CurrentData.forecast.forecastday[0].day.condition.text == 'Cloudy'"
      id="image1"
      src="../assets/cloudy.png"
      alt="Cloudy"
    />
    <img
      v-if="
        CurrentData.forecast.forecastday[0].day.condition.text ==
        'Partly cloudy'
      "
      id="image1"
      src="../assets/partialCloudy.png"
      alt="Partly cloudy"
    />
    <img
      v-if="
        CurrentData.forecast.forecastday[0].day.condition.text ==
        'Patchy rain possible'
      "
      id="image1"
      src="../assets/patchyRain.png"
      alt="Patchy rain possible"
    />
    <img
      v-if="
        CurrentData.forecast.forecastday[0].day.condition.text ==
        'Moderate rain'
      "
      id="image1"
      src="../assets/moderateRain.png"
      alt="Moderate rain"
    />
    <img
      v-if="
        CurrentData.forecast.forecastday[0].day.condition.text == 'Overcast' ||
        CurrentData.forecast.forecastday[0].day.condition.text == 'Freezing fog'
      "
      id="image1"
      src="../assets/overcast.png"
      alt="Partly cloudy"
    />
    <img
      v-if="
        CurrentData.forecast.forecastday[0].day.condition.text ==
        'Moderate or heavy snow showers'
      "
      id="image1"
      src="../assets/heavySnow.png"
      alt="heavy snow showers"
    />
    <div class="extra">
      <h2>{{ CurrentData.current.humidity }}</h2>
      <h2>{{ CurrentData.current.precip_in }}</h2>
      <h2>{{ CurrentData.current.wind_kph }}</h2>
    </div>
    <div class="extraDes">
      <h3>&nbsp;HUMIDITY</h3>
      <h3>PRECIPITATION</h3>
      <h3>WIND&ensp;&ensp;&ensp;&ensp;</h3>
    </div>
    <button @click="scroll">MORE DETAILS</button>
    <!-- <p>{{ CurrentData.forecast.forecastday }}</p> -->
  </div>
</template>

<script>
export default {
  name: "TodayComp",
  props: ["CurrentData"],
  data() {
    return {
      currentInfo: [],
    };
  },
  methods: {
    scroll() {
      const element = document.getElementById("HourView");
      element.scrollIntoView({ behavior: "smooth" });
    },
  },
};
</script>

<style scoped>
.component {
  width: 100%;
  height: 100%;
  border: 2px solid black;
  background-color: rgba(0, 0, 0, 0.3);
  margin: 2vh 5vh;
  border-radius: 25px;
  display: flex;
  justify-content: space-around;
  flex-direction: column;
  position: relative;
  color: whitesmoke;
  backdrop-filter: blur(2px);
}
.component:hover {
  box-shadow: 0px 0px 5px 5px whitesmoke;
}
.extra,
.extraDes {
  display: flex;
  justify-content: space-around;
}
.extra h2 {
  margin-top: 30px;
  margin-bottom: 0;
}
.extraDes h3 {
  margin: 0;
  margin-bottom: 15px;
}
h3 {
  display: flex;
  justify-content: center;
  margin: 0;
  font-size: 1em;
  text-transform: uppercase;
}
h2 {
  display: flex;
  justify-content: center;
  /* margin-top: 5vh; */
  font-size: 2em;
  margin-top: 30px;
  margin-bottom: 10px;
}
h1 {
  /* display: flex; */
  /* justify-content: center; */
  font-size: 6vw;
  margin: 0 auto;
}
#image1 {
  width: 12vw;
  height: 10vw;
  margin: 0 auto;
  left: 20%;
}
button {
  height: 5vh;
  width: 10vw;
  margin: 20px auto;
  padding: 10px;
  border-radius: 0;
  background-color: black;
  color: white;
}
button:hover {
  background-color: white;
  color: black;
  cursor: pointer;
}

@media (max-width: 480px) {
  .component {
    margin: 2vh 3vh;
  }
  #image1 {
    width: 50vw;
    height: 22vh;
    margin: 0 auto;
    left: 20%;
  }
  button {
    height: 5vh;
    width: 30vw;
    margin: 20px auto;
    padding: 0px;
    border-radius: 0;
    background-color: black;
    color: white;
  }
}
@media (min-width: 481px) and (max-width: 1200px) {
  .component {
    width: 100%;
    height: 100%;
    border: 2px solid black;
    background-color: rgba(0, 0, 0, 0.3);
    margin: 1vh 1vw;
    border-radius: 25px;
    display: flex;
    justify-content: space-around;
    flex-direction: column;
    position: relative;
    color: whitesmoke;
    backdrop-filter: blur(2px);
  }
  button {
    height: 3vh;
    width: 15vw;
    margin: 20px auto;
    padding: 0px;
    border-radius: 0;
    background-color: black;
    color: white;
  }
}
</style>
