<template>
  <div class="search__container">
    <input
      class="search__input"
      type="text"
      placeholder="Search"
      v-model="searchLocation"
      @keypress.enter="findLocation"
    />
    <!-- {{ search }} -->
  </div>
</template>

<script>
// import axios from "axios";
export default {
  name: "DayComp",
  emits: ["newLocation"],
  data() {
    return {
      searchLocation: "",
      list: [],
    };
  },
  methods: {
    findLocation() {
      this.$emit("newLocation", this.searchLocation);
    },
  },
};
</script>

<style scoped>
.search__container {
  padding-top: 0px;
  padding-right: 92px;
  width: 20vw;
  margin-top: 5px;
}
.search__input {
  width: 100%;
  padding: 12px 24px;

  background-color: black;
  opacity: 0.9;
  transition: transform 250ms ease-in-out;
  font-size: 24px;
  line-height: 18px;

  color: white;

  background-image: url("../assets/search.png");
  background-repeat: no-repeat;
  background-size: 30px 30px;
  background-position: 95% center;
  border-radius: 50px;
  border: 1px solid black;
  transition: all 250ms ease-in-out;
  backface-visibility: hidden;
  transform-style: preserve-3d;
}
.search__input::placeholder {
  color: color(white a(1));
  text-transform: uppercase;
  letter-spacing: 1.5px;
  font-weight: 500;
}

.search__input:hover,
.search__input:focus {
  padding: 12px 20px;
  outline: 0;
  border: 1px solid transparent;
  border-bottom: 1px solid white;
  border-radius: 0;
  background-color: transparent;
  background-position: 100% center;
}

@media (max-width: 480px) {
  .search__container {
    width: 100%;
    margin: 0;
    padding: 0;
    display: flex;
    justify-content: space-around;
  }
  .search__input {
    line-height: 10px;
    width: 70%;
  }
}

@media (min-width: 481px) and (max-width: 1200px) {
  .search__input {
    line-height: 10px;
    width: 90%;
  }
  .search__container {
    width: 50%;
    margin: 0;
    padding: 10px;
    display: flex;
    justify-content: space-around;
  }
}
</style>
