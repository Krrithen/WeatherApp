<template>
  <div class="container">
    <div class="image">
      <img
        v-if="weekData.day.condition.text == 'Sunny'"
        id="image1"
        src="../assets/sunny.png"
        alt="Sunny"
      />
      <img
        v-if="weekData.day.condition.text == 'Cloudy'"
        id="image2"
        src="../assets/cloudy.png"
        alt="Cloudy"
      />
      <img
        v-if="weekData.day.condition.text == 'Partly cloudy'"
        id="image3"
        src="../assets/partialCloudy.png"
        alt="Partly cloudy"
      />
      <img
        v-if="weekData.day.condition.text == 'Moderate rain'"
        id="image4"
        src="../assets/moderateRain.png"
        alt="Partly cloudy"
      />
      <img
        v-if="
          weekData.day.condition.text == 'Overcast' ||
          weekData.day.condition.text == 'Freezing fog'
        "
        id="image5"
        src="../assets/overcast.png"
        alt="Partly cloudy"
      />
      <img
        v-if="weekData.day.condition.text == 'Moderate or heavy snow showers'"
        id="image6"
        src="../assets/heavySnow.png"
        alt="Partly cloudy"
      />
      <img
        v-if="weekData.day.condition.text == 'Patchy rain possible'"
        id="image7"
        src="../assets/patchyRain.png"
        alt="Patchy rain possible"
      />
    </div>
    <p>{{ weekData.day.condition.text }}</p>
    <h1>{{ weekData.day.avgtemp_c }}°</h1>
    <h3 id="date">{{ weekData.date }}</h3>
  </div>
</template>

<script>
export default {
  name: "DayComp",
  props: ["weekData"],
  data() {
    return {
      date: "",
    };
  },
  // computed: {
  //   updateDay: function () {
  //     // var cd = this.weekData.date;
  //     // this.date = this.week[cd.getDay()];
  //     console.log(this.date);
  //     return this.date;
  //   },
  // },
};
</script>

<style scoped>
.container {
  min-width: 120px;
  width: 8vw;
  height: 23vh;
  border: 2px solid rgb(0, 0, 0);
  background-color: rgba(0, 0, 0, 0.3);
  margin: 2vh;
  border-radius: 25px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: whitesmoke;
  backdrop-filter: blur(1px);
}
h3,
h2,
h1 {
  display: flex;
  justify-content: center;
  margin: 0px;
}
.image {
  margin: 20px;
  height: 50%;
}
img {
  display: flex;
  justify-items: center;
  height: 80%;
  width: 100%;
  margin: 1vh auto 0 auto;
  /* padding: 25px; */
}
#date {
  margin-bottom: 2vh;
  font-size: 1vw;
}
.container:hover {
  box-shadow: 0px 0px 5px 5px whitesmoke;
}
p {
  text-align: center;
}

@media (max-width: 480px) {
  .container {
    height: 25vh;
  }
  .image {
    margin: 15px;
    height: 50%;
  }
  img {
    display: flex;
    justify-items: center;
    height: 100%;
    width: 90%;
    margin: auto;
    /* padding: 25px; */
  }
  p {
    height: 5vh;
  }
  h3 {
    font-size: 4vw;
    height: 8vw;
  }
  h1 {
    font-size: 6vw;
    height: 12vw;
  }
}

@media (min-width: 481px) and (max-width: 1200px) {
  .container {
    width: 10vw;
    height: 16vh;
    margin: 1vh;
    border-radius: 25px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    color: whitesmoke;
    backdrop-filter: blur(1px);
  }
}
</style>
