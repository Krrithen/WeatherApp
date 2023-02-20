<template>
  <div class="hourDiv">
    <p class="time">{{ convertTime(hourData.time) }}</p>
    <p>{{ hourData.temp_c }}°</p>
    <h3>{{ hourData.condition.text }}</h3>
    <h4>HUMIDITY<br />{{ hourData.humidity }}</h4>
    <h4>WIND<br />{{ hourData.wind_kph }}</h4>
  </div>
</template>

<script>
export default {
  name: "HourlyComp",
  props: ["hourData"],
  data() {
    return {};
  },
  methods: {
    convertTime: function (dayTime) {
      var temp = dayTime.split(" ")[1];
      // console.log(this.hourData);
      return temp;
    },
  },
};
</script>

<style scoped>
.hourDiv {
  width: 8vw;
  height: 30vh;
  background-color: rgba(255, 255, 255, 0.5);
  margin: 1vw;
  border-radius: 25px;
  display: inline-block;
  position: relative;
}
.hourDiv:after {
  content: "";
  background-color: rgb(53, 53, 53);
  /* position: absolute; */
  width: 3px;
  height: 20vh;
  top: 5vh;
  left: 9vw;
  position: absolute;
  display: inline-block;
}
.time {
  text-align: center;
  font-size: 1vw;
  font-weight: 400;
  margin: 2vh;
}
p {
  text-align: center;
  font-size: 3vw;
  font-weight: 500;
}
h4 {
  text-align: center;
  font-weight: 500;
  margin: 0;
}
.hourDiv h3 {
  text-align: center;
  font-weight: 800;
  margin: 1vh 0 1vh 0;
  text-transform: uppercase;
  color: aliceblue;
  /* white-space: normal; */
}
@media (max-width: 480px) {
  .hourDiv {
    width: 26vw;
    height: 30vh;
    margin: 1vw;
  }
  .hourDiv:after {
    display: none;
  }
  .time {
    font-size: 4vw;
    font-weight: 400;
  }
  p {
    font-size: 8vw;
    font-weight: 600;
  }
  .hourDiv h3 {
    text-align: center;
    font-weight: 800;
    margin: 1vh 0 1vh 0;
  }
}
@media (min-width: 481px) and (max-width: 1200px) {
  .hourDiv {
    width: 14vw;
    height: 22vh;
    margin: 1vw;
  }
  .hourDiv:after {
    display: none;
  }
  .time {
    font-size: 2vw;
    font-weight: 400;
  }
}
</style>
