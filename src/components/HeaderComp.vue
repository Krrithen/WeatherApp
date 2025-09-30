<template>
  <div class="dateDiv">
    <h1>{{ time }}</h1>
    <h2>{{ date }}</h2>
  </div>
</template>

<script>
export default {
  name: "HeaderComp",
  data() {
    return {
      time: "",
      date: "",
      week: [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ],
      month: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ],
      timerID: setInterval(this.updateTime, 1000),
    };
  },
  methods: {
    updateTime: function () {
      var cd = new Date();
      this.time =
        this.zeroPadding(cd.getHours(), 2) +
        ":" +
        this.zeroPadding(cd.getMinutes(), 2) +
        ":" +
        this.zeroPadding(cd.getSeconds(), 2);

      this.date =
        this.week[cd.getDay()] +
        ", " +
        this.zeroPadding(cd.getDate(), 2) +
        " " +
        this.month[cd.getMonth()] +
        ", " +
        this.zeroPadding(cd.getFullYear(), 4);
    },
    zeroPadding: function (num, digit) {
      var zero = "";
      for (var i = 0; i < digit; i++) {
        zero += "0";
      }
      return (zero + num).slice(-digit);
    },
  },
};
</script>

<style scoped>
.dateDiv {
  color: white;
  height: 20vh;
}
.dateDiv h2 {
  color: whitesmoke;
  padding-left: 4vw;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
  font-weight: 600;
}
.dateDiv h1 {
  height: 12vh;
  margin: 0;
  padding-left: 4vw;
  padding-top: 2vh;
  font-size: 10vh;
  color: whitesmoke;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
  font-weight: 700;
}

@media (max-width: 480px) {
  .dateDiv {
    color: white;
    height: 20vh;
  }
  .dateDiv h1 {
    padding: 0;
    padding-top: 2vh;
    font-size: 9vh;
    text-align: center;
  }
  .dateDiv h2 {
    color: whitesmoke;
    padding: 0;
    text-align: center;
  }
}
</style>
