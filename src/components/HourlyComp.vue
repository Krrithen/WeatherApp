<template>
  <div class="hourDiv">
    <div class="time-section">
      <p class="time">{{ convertTime(hourData.time) }}</p>
    </div>

    <div class="weather-section">
      <img
        :src="weatherIcon"
        :alt="hourData.condition.text"
        class="weather-icon"
      />
      <p class="temperature">
        {{ displayTemperature }}°{{
          temperatureUnit === "fahrenheit" ? "F" : "C"
        }}
      </p>
    </div>

    <div class="condition-section">
      <h3>{{ hourData.condition.text }}</h3>
    </div>

    <div class="details-section">
      <div class="detail-item">
        <span class="detail-label">HUMIDITY</span>
        <span class="detail-value">{{ hourData.humidity }}%</span>
      </div>
      <div class="detail-item">
        <span class="detail-label">WIND</span>
        <span class="detail-value">{{ hourData.wind_kph }} km/h</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HourlyComp",
  props: ["hourData", "temperatureUnit"],
  data() {
    return {};
  },
  computed: {
    displayTemperature() {
      if (this.temperatureUnit === "celsius") {
        return this.hourData.temp_c;
      }
      return this.hourData.temp_f;
    },
    weatherIcon() {
      const condition = this.hourData.condition.text.toLowerCase();

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
    convertTime: function (dayTime) {
      var temp = dayTime.split(" ")[1];
      return temp;
    },
  },
};
</script>

<style scoped>
.hourDiv {
  width: 8vw;
  min-width: 120px;
  height: 25vh;
  background: linear-gradient(135deg, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.2));
  margin: 1vw;
  border-radius: 25px;
  display: flex;
  flex-direction: column;
  position: relative;
  border: 2px solid rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  transition: all 0.3s ease;
  overflow: hidden;
  flex-shrink: 0;
  padding: 15px;
  box-sizing: border-box;
  color: white;
}

.hourDiv::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 50%;
  height: 100%;
  background: linear-gradient(
    45deg,
    transparent,
    rgba(255, 255, 255, 0.1),
    transparent
  );
  transform: translateX(-100%);
  transition: transform 0.6s ease;
}

.hourDiv:hover::before {
  transform: translateX(100%);
}

.hourDiv:hover {
  transform: translateY(-8px) scale(1.02);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.4);
  border-color: rgba(255, 255, 255, 0.3);
}

/* Time Section */
.time-section {
  text-align: center;
  margin-bottom: 10px;
}

.time {
  font-size: 0.9rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.9);
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
  margin: 0;
}

/* Weather Section */
.weather-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 10px;
}

.weather-icon {
  width: 40px;
  height: 40px;
  object-fit: contain;
  margin-bottom: 8px;
}

.temperature {
  font-size: 1.8rem;
  font-weight: 700;
  color: white;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
  margin: 0;
}

/* Condition Section */
.condition-section {
  text-align: center;
  margin-bottom: 10px;
}

.condition-section h3 {
  font-size: 0.7rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.8);
  text-transform: uppercase;
  margin: 0;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
  line-height: 1.2;
}

/* Details Section */
.details-section {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: auto;
}

.detail-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 4px 0;
}

.detail-label {
  font-size: 0.6rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.7);
  text-transform: uppercase;
}

.detail-value {
  font-size: 0.7rem;
  font-weight: 700;
  color: white;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
}

/* Responsive Design */
@media (max-width: 768px) {
  .hourDiv {
    width: 26vw;
    min-width: 100px;
    height: 30vh;
    padding: 12px;
  }

  .time {
    font-size: 0.8rem;
  }

  .temperature {
    font-size: 1.5rem;
  }

  .weather-icon {
    width: 35px;
    height: 35px;
  }

  .condition-section h3 {
    font-size: 0.6rem;
  }

  .detail-label {
    font-size: 0.5rem;
  }

  .detail-value {
    font-size: 0.6rem;
  }
}

@media (max-width: 480px) {
  .hourDiv {
    width: 30vw;
    min-width: 90px;
    height: 35vh;
    padding: 10px;
  }

  .time {
    font-size: 0.7rem;
  }

  .temperature {
    font-size: 1.3rem;
  }

  .weather-icon {
    width: 30px;
    height: 30px;
  }

  .condition-section h3 {
    font-size: 0.5rem;
  }

  .detail-label {
    font-size: 0.4rem;
  }

  .detail-value {
    font-size: 0.5rem;
  }
}
</style>
