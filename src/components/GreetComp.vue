<template>
  <div class="container">
    <img src="../assets/sun.png" alt="NaN" />
    <h1>{{ greet() }}, Krrithen!</h1>
  </div>
</template>

<script>
export default {
  name: "DayComp",
  data() {
    return {
      time: "",
    };
  },
  methods: {
    greet: function () {
      var date = new Date();
      this.time = date.getHours();
      if (this.time < 12) {
        return "Good Morning";
      } else if (this.time < 18) {
        return "Good Afternoon";
      } else {
        return "Good Evening";
      }
    },
  },
};
</script>

<style scoped>
.container {
  display: flex;
  justify-content: flex-start;
  margin-left: 3%;
}
img {
  width: 15%;
  height: 100%;
}
h1 {
  font-size: 2vw;
  margin: auto;
  color: white;
  width: 26vw;
  text-align: center;
}

@media (max-width: 480px) {
  .container {
    display: none;
  }
}

@media (min-width: 481px) and (max-width: 1200px) {
  h1 {
    font-size: 3vw;
    margin: auto;
    color: white;
    width: 35vw;
    text-align: center;
  }
  img {
    display: none;
  }
}
</style>
