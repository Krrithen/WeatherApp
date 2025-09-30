<template>
  <div class="container">
    <div class="image">
      <img :src="weatherIcon" :alt="weatherCondition" class="weather-icon" />
    </div>
    <p>{{ weekData.day.condition.text }}</p>
    <h1>
      {{ displayTemperature }}°{{
        temperatureUnit === "fahrenheit" ? "F" : "C"
      }}
    </h1>
    <h3 id="date">{{ formattedDate }}</h3>
  </div>
</template>

<script>
export default {
  name: "DayComp",
  props: ["weekData", "temperatureUnit"],
  data() {
    return {
      date: "",
    };
  },
  computed: {
    displayTemperature() {
      if (this.temperatureUnit === "celsius") {
        return this.weekData.day.avgtemp_c;
      }
      return this.weekData.day.avgtemp_f;
    },
    formattedDate() {
      if (!this.weekData?.date) return "";

      // Just return the raw date string
      return this.weekData.date;
    },
    weatherCondition() {
      return this.weekData?.day?.condition?.text || "Unknown";
    },
    weatherIcon() {
      const condition = this.weatherCondition.toLowerCase();

      // Handle various condition text variations
      if (condition.includes("sunny") || condition.includes("clear")) {
        return require("../assets/sunny.png");
      }
      if (condition.includes("cloudy") && condition.includes("partly")) {
        return require("../assets/partialCloudy.png");
      }
      if (condition.includes("cloudy") || condition.includes("overcast")) {
        return require("../assets/cloudy.png");
      }
      if (condition.includes("rain") && condition.includes("moderate")) {
        return require("../assets/moderateRain.png");
      }
      if (condition.includes("rain") && condition.includes("patchy")) {
        return require("../assets/patchyRain.png");
      }
      if (condition.includes("snow") || condition.includes("heavy snow")) {
        return require("../assets/heavySnow.png");
      }
      if (condition.includes("overcast") || condition.includes("fog")) {
        return require("../assets/overcast.png");
      }

      // Default to sunny if no match
      return require("../assets/sunny.png");
    },
  },
};
</script>

<style scoped>
.container {
  min-width: 180px;
  width: 200px;
  height: 200px;
  border: 2px solid rgba(255, 255, 255, 0.2);
  background: linear-gradient(135deg, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.2));
  border-radius: 25px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  color: whitesmoke;
  backdrop-filter: blur(10px);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  flex-shrink: 0;
  padding: 15px 15px;
  box-sizing: border-box;
  isolation: isolate;
}

.container:hover {
  transform: translateY(-8px) scale(1.02);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.4);
  border-color: rgba(255, 255, 255, 0.3);
}
h3,
h2,
h1 {
  display: flex;
  justify-content: center;
  margin: 0px;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
  position: relative;
  z-index: 2;
}

h1 {
  font-weight: 700;
  font-size: 4rem;
  margin: 2px 0;
  flex-shrink: 0;
}

h3 {
  font-weight: 600;
  font-size: 1.2rem;
  opacity: 0.9;
  margin: 1px 0;
  flex-shrink: 0;
}
.image {
  margin: 2px 0;
  height: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  position: relative;
  z-index: 2;
}
img {
  height: 60px;
  width: 60px;
  object-fit: contain;
  margin: 0 auto;
}

.weather-icon {
  height: 60px;
  width: 60px;
  object-fit: contain;
  margin: 0 auto;
  display: block;
}
#date {
  margin: 1px 0 0 0;
  font-size: 1rem;
  flex-shrink: 0;
  color: white;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
  opacity: 1;
  visibility: visible;
}
p {
  text-align: center;
  font-weight: 600;
  font-size: 1.2rem;
  margin: 1px 0;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
  opacity: 0.9;
  flex-shrink: 0;
  line-height: 1.2;
  position: relative;
  z-index: 2;
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
