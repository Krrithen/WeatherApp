//Original Copy
<template>
  <div
    id="app"
    v-if="dataLoaded"
    :class="
      typeof currentInfo != 'undefined' && currentInfo.current.temp_c > 20
        ? 'warm'
        : currentInfo.current.temp_c > 10
        ? ''
        : 'cool'
    "
  >
    <header-comp></header-comp>
    <div class="second">
      <greet-comp></greet-comp>
      <search-comp @newLocation="updateCurrentInfo"></search-comp>
    </div>
    <div class="mainDiv">
      <div class="weekDiv">
        <day-comp
          v-for="(item, index) in weekInfo"
          :key="index"
          v-bind:weekData="item"
        ></day-comp>
        <div class="graphContainer">
          <div class="graph">
            <p>TEMPERATURE</p>
            <graph-comps v-bind:CurrentData="currentInfo"></graph-comps>
          </div>
          <div class="graph">
            <p>WIND</p>
            <wind-graph-comp v-bind:CurrentData="currentInfo"></wind-graph-comp>
          </div>
        </div>
        <div class="hourlyContainer" id="HourView">
          <h2>HOURLY FORECAST</h2>
          <div class="scrollable">
            <hourly-comp
              v-for="(item, index) in currentInfo.forecast.forecastday[0].hour"
              :key="index"
              v-bind:hourData="item"
            ></hourly-comp>
          </div>
        </div>
      </div>
      <div class="todayDiv">
        <today-comp v-bind:CurrentData="currentInfo"></today-comp>
      </div>
    </div>
  </div>
</template>

<script>
import DayComp from "@/components/DayComps.vue";
import TodayComp from "@/components/TodayComp.vue";
import GreetComp from "@/components/GreetComp.vue";
import SearchComp from "@/components/SearchComp.vue";
import HeaderComp from "@/components/HeaderComp.vue";
import GraphComps from "@/components/GraphComps.vue";
import WindGraphComp from "@/components/WindGraphComp.vue";
import HourlyComp from "@/components/HourlyComp.vue";

export default {
  name: "WeatherApp",
  data() {
    return {
      currentInfo: [],
      weekInfo: [],
      forecastInfo: [],
      tempInfo: [],
      dataLoaded: false,
    };
  },
  components: {
    GraphComps,
    WindGraphComp,
    DayComp,
    TodayComp,
    GreetComp,
    SearchComp,
    HeaderComp,
    HourlyComp,
  },
  methods: {
    updateCurrentInfo(newLocation) {
      console.log(newLocation);
      this.$store.dispatch("getCurrentInfoApi", {
        success: (res) => {
          this.currentInfo = res;
          console.log("appvue", this.currentInfo);
          this.weekInfo = res.forecast.forecastday.slice(1, 7);
        },
        location: newLocation,
      });
    },
  },
  created: function () {
    localStorage.setItem("location", "bangalore");
    this.$store.dispatch("getCurrentInfoApi", {
      success: (res) => {
        this.currentInfo = res;
        this.weekInfo = res.forecast.forecastday.slice(1, 7);
        this.dataLoaded = true;
        // this.forecastInfo = res.forecast.forecastday;
        // console.log("created", this.forecastInfo);
      },
      location: localStorage.getItem("location"),
    });
  },
};
</script>

<style>
* {
  margin: 0;
  /* width: 100%;
  height: 100%;
  margin: 0px;
  padding: 0px;
  overflow-x: hidden; */
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  background-image: url("assets/NormalBackground.jpeg");
  background-repeat: no-repeat;
  background-size: cover;
  height: 100%;
  margin: 0;
}
#app.warm {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  background-image: url("assets/WarmBackground.jpeg");
  background-repeat: no-repeat;
  background-size: cover;
  height: 100%;
  margin: 0;
}
#app.cool {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  background-image: url("assets/CoolBackgrounds.jpeg");
  background-repeat: no-repeat;
  background-size: cover;
  height: 100%;
  margin: 0;
}
.mainDiv {
  display: flex;
  align-content: flex-start;
  background-color: transparent;
  height: 100%;
  padding-bottom: 2vh;
}
.weekDiv {
  width: 73vw;
  background-color: transparent;
  display: flex;
  /* justify-content: space-around; */
  flex-wrap: wrap;
  padding: 5px 20px;
  height: 100%;
}
.todayDiv {
  width: 27vw;
  background-color: transparent;
  display: flex;
  justify-content: center;
  padding: 5px 10px;
  height: 100%;
  margin-top: 4vh;
}
.second {
  display: flex;
  justify-content: space-between;
  height: 6vh;
}
.graph {
  width: 30vw;
  height: 20vh;
  background-color: rgba(0, 0, 0, 0.3);
  border: 2px solid rgb(50, 50, 50);
  margin: 2vh 2vw 0 2vw;
  border-radius: 25px;
  backdrop-filter: blur(2px);
}
.graphContainer p {
  text-align: center;
  color: white;
  font-weight: 600;
}
.hourlyContainer {
  background-color: rgba(0, 0, 0, 0.3);
  width: 31vw;
  height: 42vh;
  margin: 2vh 2vw 0 2vw;
  border-radius: 25px;
  border: 2px solid black;
  /* white-space: nowrap; */
  overflow: auto;
  backdrop-filter: blur(2px);
}
.scrollable {
  white-space: nowrap;
  overflow: auto;
}
.hourlyContainer h2 {
  text-align: center;
  margin: 2vh;
  color: white;
}
/* SmartPhones */
@media (max-width: 480px) {
  * {
    margin: 0px;
    padding: 0px;
    overflow-x: hidden;
  }
  #app {
    background-image: url("assets/MGreenBackground.jpeg");
  }
  #app.warm {
    background-image: url("assets/MGreenBackground.jpeg");
  }
  #app.cool {
    background-image: url("assets/MGreenBackground.jpeg");
  }
  .mainDiv {
    display: flex;
    flex-direction: column-reverse;
    background-color: transparent;
    height: 100%;
    padding-bottom: 2vh;
  }
  .todayDiv {
    width: 95vw;
    background-color: transparent;
    display: flex;
    justify-content: center;
    padding: 5px 10px;
    height: 100%;
    margin-top: 0vh;
  }
  .second {
    height: 5vh;
  }
  .weekDiv {
    width: 100%;
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    padding: 0;
    height: 100%;
  }
  .graph {
    width: 85vw;
    height: 28vh;
  }
  .graphContainer p {
    margin-top: 1vh;
  }
  .hourlyContainer {
    width: 85vw;
    height: 42vh;
  }
}
/* Tablets */
@media (min-width: 481px) and (max-width: 1200px) {
  .todayDiv {
    width: 40vw;
    background-color: transparent;
    display: flex;
    justify-content: center;
    padding: 0px 10px;
    height: 100%;
    margin-top: 0;
  }
  .weekDiv {
    width: 60vw;
    background-color: transparent;
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    padding: 0;
    height: 100%;
  }
  .graph {
    width: 55vw;
    height: 18vh;
  }
  .hourlyContainer {
    width: 55vw;
    height: 30vh;
  }
}
</style>
