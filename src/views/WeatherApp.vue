<template>
  <div class="WeatherApp">
    <!-- <div class="other"></div>
    <div class="other">hioiiiiiiii</div>
    <greet-comp></greet-comp>
    <div class="mainDiv">
      <div class="weekDiv">
        <day-comp v-for="index in 6" :key="index"></day-comp>
      </div>
      <div class="todayDiv">
        <today-comp v-bind:CurrentData="currentInfo"></today-comp>
      </div>
    </div> -->
  </div>
</template>

<script>
// import DayComp from "@/components/DayComps.vue";
// import TodayComp from "@/components/TodayComp.vue";
// import GreetComp from "@/components/GreetComp.vue";

export default {
  name: "WeatherApp",
  data() {
    return {
      currentInfo: [],
    };
  },
  components: {
    // DayComp,
    // TodayComp,
    // GreetComp,
  },
  created: function () {
    this.$store.dispatch("getCurrentInfoApi", {
      success: (res) => {
        this.currentInfo = res;
      },
    });
  },
};
</script>

<style scoped>
.WeatherApp {
  background-image: url("../assets/Rain.jpeg");
  background-repeat: no-repeat;
  background-size: cover;
}
.mainDiv {
  display: flex;
  align-content: flex-start;
  background-color: transparent;
  height: 100%;
}
.weekDiv {
  width: 75vw;
  background-color: bisque;
  display: flex;
  justify-content: space-around;
  padding: 15px;
  height: 100%;
}
.todayDiv {
  width: 25vw;
  background-color: darkgray;
  display: flex;
  justify-content: center;
  padding: 20px;
  height: 100%;
}
.other {
  height: 14vh;
}
</style>
