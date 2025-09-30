<template>
  <div class="component" role="region" aria-label="Current weather information">
    <h2>{{ CurrentData.location.name }}</h2>
    <h3>{{ CurrentData.location.country }}</h3>
    <h1 aria-label="Temperature">
      {{ displayTemperature }}°{{
        temperatureUnit === "fahrenheit" ? "F" : "C"
      }}
    </h1>

    <img
      :src="weatherIcon"
      :alt="weatherCondition"
      id="image1"
      class="weather-icon"
    />

    <div class="weather-details" role="group" aria-label="Weather details">
      <div class="detail-item">
        <span class="detail-value" aria-label="Humidity"
          >{{ CurrentData.current.humidity }}%</span
        >
        <span class="detail-label">HUMIDITY</span>
      </div>
      <div class="detail-item">
        <span class="detail-value" aria-label="Precipitation"
          >{{ CurrentData.current.precip_in }} in</span
        >
        <span class="detail-label">PRECIPITATION</span>
      </div>
      <div class="detail-item">
        <span class="detail-value" aria-label="Wind speed"
          >{{ CurrentData.current.wind_kph }} km/h</span
        >
        <span class="detail-label">WIND</span>
      </div>
    </div>

    <button
      @click="openWeatherWebsite"
      class="details-button"
      aria-label="Open weather website for more details"
    >
      MORE DETAILS
    </button>
  </div>
</template>

<script>
export default {
  name: "TodayComp",
  props: {
    CurrentData: {
      type: Object,
      required: true,
    },
    temperatureUnit: {
      type: String,
      default: "fahrenheit",
    },
  },
  computed: {
    displayTemperature() {
      if (this.temperatureUnit === "celsius") {
        return this.CurrentData.current.temp_c;
      }
      return this.CurrentData.current.temp_f;
    },
    weatherCondition() {
      return (
        this.CurrentData?.forecast?.forecastday?.[0]?.day?.condition?.text ||
        "Unknown"
      );
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
  methods: {
    openWeatherWebsite() {
      // Open weather.com today page in new tab
      window.open("https://weather.com/weather/today", "_blank");
    },
  },
};
</script>

<style scoped>
.component {
  width: 100%;
  height: 100%;
  border: 2px solid rgba(255, 255, 255, 0.2);
  background: linear-gradient(135deg, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.2));
  border-radius: 25px;
  display: flex;
  justify-content: space-around;
  flex-direction: column;
  position: relative;
  color: whitesmoke;
  backdrop-filter: blur(10px);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  transition: all 0.3s ease;
  overflow: hidden;
  padding: 20px;
  box-sizing: border-box;
}

.component::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    45deg,
    transparent,
    rgba(255, 255, 255, 0.1),
    transparent
  );
  transform: translateX(-100%);
  transition: transform 0.6s ease;
}

.component:hover::before {
  transform: translateX(100%);
}
.component:hover {
  transform: translateY(-8px) scale(1.02);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.4);
  border-color: rgba(255, 255, 255, 0.3);
}
.weather-details {
  display: flex;
  justify-content: space-around;
  margin: 20px 0;
}

.detail-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.detail-value {
  font-size: 1.5em;
  font-weight: 600;
  margin-bottom: 5px;
  color: white;
}

.detail-label {
  font-size: 0.8em;
  font-weight: 500;
  text-transform: uppercase;
  opacity: 0.8;
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
  font-size: 2em;
  margin-top: 30px;
  margin-bottom: 10px;
}
h1 {
  font-size: 6vw;
  margin: 0 auto;
}
.weather-icon {
  width: 80px;
  height: 80px;
  margin: 0 auto;
  object-fit: contain;
}
.details-button {
  height: 5vh;
  width: 10vw;
  margin: 20px auto;
  padding: 10px;
  border-radius: 25px;
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.2),
    rgba(255, 255, 255, 0.1)
  );
  border: 2px solid rgba(255, 255, 255, 0.3);
  color: white;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
}

.details-button:hover {
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.3),
    rgba(255, 255, 255, 0.2)
  );
  border-color: rgba(255, 255, 255, 0.5);
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
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
