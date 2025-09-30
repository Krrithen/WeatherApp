<template>
  <div
    id="app"
    :class="weatherClass"
    :style="{ backgroundImage: `url(${currentBackground})` }"
  >
    <!-- Loading State -->
    <div v-if="isLoading" class="loading-container">
      <div class="loading-spinner"></div>
      <p class="loading-text">Loading weather data...</p>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="error-container">
      <div class="error-content">
        <h2>⚠️ Weather Data Unavailable</h2>
        <p>{{ error }}</p>
        <button @click="retryLoad" class="retry-button">Try Again</button>
      </div>
    </div>

    <!-- Main Weather App -->
    <div v-else-if="hasWeatherData" class="weather-app">
      <div class="top-bar">
        <header-comp></header-comp>
      </div>
      <div class="mainDiv">
        <!-- Left Section - Very Small -->
        <div class="leftSection">
          <!-- Empty for now, same size as settings icon -->
        </div>

        <!-- Middle Section - Days, Temp, Wind, Hourly -->
        <div class="middleSection">
          <!-- Bottom Content Container -->
          <div class="bottom-content">
            <!-- Greeting and Quote Container -->
            <div class="greeting-quote-container">
              <!-- Greeting Section -->
              <div class="greeting-section">
                <h2 class="greeting">Hi, {{ displayName }}!</h2>
              </div>

              <!-- Quote Section -->
              <div class="quote-section">
                <p class="quote">"{{ currentQuote.text }}"</p>
                <span class="quote-author">- {{ currentQuote.author }}</span>
              </div>
            </div>

            <div class="buttons-container">
              <div
                class="small-button clickable"
                @click="openModal('temperature')"
              >
                <h4>TEMPERATURE</h4>
                <p>Chart</p>
              </div>
              <div class="small-button clickable" @click="openModal('wind')">
                <h4>WIND</h4>
                <p>Chart</p>
              </div>
              <div class="small-button clickable" @click="openModal('future')">
                <h4>FUTURE</h4>
                <p>Forecast</p>
              </div>
              <div class="small-button clickable" @click="openModal('hourly')">
                <h4>HOURLY</h4>
                <p>Forecast</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Right Section - Main Weather -->
        <div class="rightSection">
          <search-comp @newLocation="updateCurrentInfo"></search-comp>
          <today-comp
            :CurrentData="currentInfo"
            :temperatureUnit="temperatureUnit"
          ></today-comp>
        </div>
      </div>
    </div>

    <!-- Settings Component -->
    <settings-comp
      @temperature-unit-changed="handleTemperatureUnitChange"
      @default-location-changed="handleDefaultLocationChange"
      @user-name-changed="handleUserNameChange"
    ></settings-comp>

    <!-- Modals -->
    <!-- Temperature Graph Modal -->
    <modal-comp
      :isOpen="activeModal === 'temperature'"
      title="Temperature Forecast"
      @close="closeModal"
    >
      <div class="modal-graph-container">
        <graph-comps
          :CurrentData="currentInfo"
          :temperatureUnit="temperatureUnit"
        ></graph-comps>
      </div>
    </modal-comp>

    <!-- Wind Graph Modal -->
    <modal-comp
      :isOpen="activeModal === 'wind'"
      title="Wind Speed Forecast"
      @close="closeModal"
    >
      <div class="modal-graph-container">
        <wind-graph-comp :CurrentData="currentInfo"></wind-graph-comp>
      </div>
    </modal-comp>

    <!-- Hourly Forecast Modal -->
    <modal-comp
      :isOpen="activeModal === 'hourly'"
      title="24-Hour Forecast"
      @close="closeModal"
    >
      <div class="modal-hourly-container">
        <div class="hourly-grid">
          <hourly-comp
            v-for="(item, index) in hourlyForecast"
            :key="`modal-hour-${index}`"
            :hourData="item"
            :temperatureUnit="temperatureUnit"
          ></hourly-comp>
        </div>
      </div>
    </modal-comp>

    <!-- Future Forecast Modal -->
    <modal-comp
      :isOpen="activeModal === 'future'"
      title="3-Day Forecast"
      @close="closeModal"
    >
      <div class="modal-future-container">
        <div class="future-forecast-grid">
          <day-comp
            v-for="(item, index) in weekInfo"
            :key="`modal-day-${index}`"
            :weekData="item"
            :temperatureUnit="temperatureUnit"
          ></day-comp>
        </div>
      </div>
    </modal-comp>
  </div>
</template>

<script>
import DayComp from "@/components/DayComps.vue";
import TodayComp from "@/components/TodayComp.vue";
import SearchComp from "@/components/SearchComp.vue";
import HeaderComp from "@/components/HeaderComp.vue";
import GraphComps from "@/components/GraphComps.vue";
import WindGraphComp from "@/components/WindGraphComp.vue";
import HourlyComp from "@/components/HourlyComp.vue";
import SettingsComp from "@/components/SettingsComp.vue";
import ModalComp from "@/components/ModalComp.vue";
import quotesApi from "@/services/quotesApi.js";
import backgroundService from "@/services/backgroundService.js";

export default {
  name: "ChromeDash",
  components: {
    GraphComps,
    WindGraphComp,
    DayComp,
    TodayComp,
    SearchComp,
    HeaderComp,
    HourlyComp,
    SettingsComp,
    ModalComp,
  },
  data() {
    return {
      temperatureUnit: "fahrenheit",
      activeModal: null, // 'hourly', 'temperature', 'wind', 'future', or null
      userName: "User", // Default user name
      currentQuote: {
        text: "The weather is a great metaphor for life - sometimes it's good, sometimes it's bad, and there's nothing much you can do about it but carry an umbrella.",
        author: "Terri Guillemets",
      },
      currentBackground: "",
    };
  },
  computed: {
    currentInfo() {
      return this.$store.getters.getCurrentInfo;
    },
    weekInfo() {
      return this.currentInfo?.forecast?.forecastday?.slice(0, 3) || [];
    },
    hourlyForecast() {
      return this.currentInfo?.forecast?.forecastday?.[0]?.hour || [];
    },
    isLoading() {
      return this.$store.getters.isLoading;
    },
    error() {
      return this.$store.getters.getError;
    },
    hasWeatherData() {
      return this.$store.getters.hasWeatherData;
    },
    displayName() {
      return this.userName || "User";
    },
    weatherClass() {
      if (!this.currentInfo?.current) return "";

      const temp = this.currentInfo.current.temp_c;
      if (temp > 20) return "warm";
      if (temp > 10) return "";
      return "cool";
    },
  },
  methods: {
    async updateCurrentInfo(newLocation) {
      try {
        await this.$store.dispatch("getCurrentInfoApi", newLocation);
        // Don't save searched location to localStorage - only use default location on refresh
      } catch (error) {
        console.error("Failed to update weather data:", error);
      }
    },
    handleTemperatureUnitChange(unit) {
      this.temperatureUnit = unit;
      localStorage.setItem("temperatureUnit", unit);
    },
    handleDefaultLocationChange(location) {
      // Update the default location in the store
      this.$store.dispatch("setDefaultLocation", location);
      // Optionally refresh weather data for the new default location
      this.updateCurrentInfo(location);
    },
    handleUserNameChange(newName) {
      this.userName = newName;
    },
    openModal(modalType) {
      this.activeModal = modalType;
    },
    closeModal() {
      this.activeModal = null;
    },
    async retryLoad() {
      const defaultLocation =
        this.$store.getters.getDefaultLocation || "Chicago";
      await this.updateCurrentInfo(defaultLocation);
    },
    async fetchNewBackground() {
      try {
        const background = await backgroundService.fetchRandomBackground();
        this.currentBackground = background.url;
      } catch (error) {
        console.error("Failed to fetch background:", error);
        // Set a fallback background
        this.currentBackground =
          "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80";
      }
    },
  },
  async created() {
    const savedTempUnit =
      localStorage.getItem("temperatureUnit") || "fahrenheit";
    const savedDefaultLocation =
      localStorage.getItem("defaultLocation") || "Chicago";
    const savedUserName = localStorage.getItem("userName") || "User";

    this.temperatureUnit = savedTempUnit;
    this.userName = savedUserName;

    // Set default location in store
    this.$store.dispatch("setDefaultLocation", savedDefaultLocation);

    // Always use the default location on app start/refresh
    await this.updateCurrentInfo(savedDefaultLocation);

    // Fetch a new motivational quote on app load
    try {
      const quote = await quotesApi.fetchRandomQuote();
      this.currentQuote = {
        text: quote.text,
        author: quote.author,
      };
    } catch (error) {
      console.error("Failed to fetch quote:", error);
      // Keep default quote if fetch fails
    }

    // Fetch a new background on app load
    await this.fetchNewBackground();
  },
};
</script>

<style>
* {
  margin: 0;
  box-sizing: border-box;
}

/* Loading States */
.loading-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.loading-spinner {
  width: 50px;
  height: 50px;
  border: 4px solid rgba(255, 255, 255, 0.3);
  border-top: 4px solid white;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 20px;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.loading-text {
  font-size: 1.2rem;
  font-weight: 500;
}

/* Error States */
.error-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%);
  color: white;
}

.error-content {
  text-align: center;
  padding: 2rem;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.error-content h2 {
  margin-bottom: 1rem;
  font-size: 1.8rem;
}

.error-content p {
  margin-bottom: 1.5rem;
  opacity: 0.9;
}

.retry-button {
  background: rgba(255, 255, 255, 0.2);
  border: 2px solid white;
  color: white;
  padding: 12px 24px;
  border-radius: 25px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s ease;
}

.retry-button:hover {
  background: white;
  color: #ff6b6b;
  transform: translateY(-2px);
}

/* Weather App Container */
.weather-app {
  height: 100vh;
  display: flex;
  flex-direction: column;
}

/* Top Bar Layout */
.top-bar {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  height: 20vh;
  position: relative;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  height: 100%;
  margin: 0;
  transition: background-image 0.5s ease-in-out;
}
.mainDiv {
  display: flex;
  background-color: transparent;
  height: calc(100vh - 20vh);
  padding: 40px 20px 20px 20px;
  gap: 20px;
  overflow: visible;
}
/* Left Section - Very Small */
.leftSection {
  width: 50px;
  background-color: transparent;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 10px;
  height: 100%;
  overflow: hidden;
}

/* Middle Section - Days, Temp, Wind, Hourly */
.middleSection {
  flex: 1;
  background-color: transparent;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 20px 20px 20px 20px;
  height: 100%;
  overflow: visible;
}

/* Greeting Section */
.greeting-section {
  margin-bottom: 5px;
}

.greeting {
  font-size: 4rem;
  font-weight: 700;
  color: white;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
  margin: 0;
}

/* Quote Section */
.quote-section {
  padding: 20px;
  width: 60%;
  text-align: center;
}

.quote {
  font-size: 1.3rem;
  font-style: italic;
  color: rgba(255, 255, 255, 1);
  line-height: 1.6;
  margin: 0 0 10px 0;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.7);
}

.quote-author {
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.9);
  font-weight: 600;
  text-align: center;
  display: block;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.6);
}

/* Bottom Content Container */
.bottom-content {
  display: flex;
  flex-direction: column;
  height: 100%;
  position: relative;
}

/* Greeting and Quote Container */
.greeting-quote-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  flex: 1;
  min-height: 0;
}

/* Right Section - Main Weather */
.rightSection {
  width: 27vw;
  background-color: transparent;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 20px 10px;
  height: 100%;
  overflow: visible;
  gap: 20px;
}

/* Days Section - Now controlled by Future button modal */

.graph:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.4);
  border-color: rgba(255, 255, 255, 0.3);
}
.buttons-container {
  display: flex;
  gap: 15px;
  width: 100%;
  justify-content: space-between;
}

.small-button {
  flex: 1;
  height: 12vh;
  background: linear-gradient(135deg, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.2));
  border: 2px solid rgba(255, 255, 255, 0.2);
  border-radius: 20px;
  backdrop-filter: blur(10px);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  color: white;
  min-width: 0;
  position: relative;
  overflow: hidden;
}

.small-button::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    45deg,
    transparent,
    rgba(255, 255, 255, 0.1),
    transparent
  );
  transform: translateX(-100%);
  transition: transform 0.6s ease;
  z-index: 1;
  border-radius: 20px;
  overflow: hidden;
  pointer-events: none;
}

.small-button:hover::before {
  transform: translateX(100%);
}

.small-button h4 {
  margin: 0 0 5px 0;
  font-size: 14px;
  font-weight: 700;
  color: white;
  line-height: 1.2;
  position: relative;
  z-index: 2;
}

.small-button p {
  margin: 0;
  font-size: 12px;
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.2;
  position: relative;
  z-index: 2;
}
.hourly-button {
  background: linear-gradient(135deg, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.2));
  width: 31vw;
  height: 35vh;
  border-radius: 25px;
  border: 2px solid rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  color: white;
}

.hourly-button h2 {
  margin: 0 0 15px 0;
  font-size: 20px;
  font-weight: 700;
  color: white;
}

.hourly-button p {
  margin: 0;
  font-size: 16px;
  color: rgba(255, 255, 255, 0.8);
}

.hourlyContainer:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.4);
  border-color: rgba(255, 255, 255, 0.3);
}
.scrollable {
  white-space: nowrap;
  overflow-x: auto;
  overflow-y: hidden;
  padding: 10px;
}

/* Clickable Elements */
.clickable {
  cursor: pointer;
  transition: all 0.3s ease;
}

.clickable:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.4);
  border-color: rgba(255, 255, 255, 0.3);
}

/* Modal Content Styles */
.modal-graph-container {
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  box-sizing: border-box;
}

.modal-hourly-container {
  height: 100%;
  overflow-y: auto;
}

.modal-future-container {
  height: 100%;
  width: 100%;
  overflow-y: auto;
  padding: 20px 0;
  box-sizing: border-box;
  min-height: 500px;
  display: flex;
  flex-direction: column;
}

.future-forecast-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  width: 100%;
  flex: 1;
  padding: 0 20px;
  box-sizing: border-box;
}

.future-forecast-grid .container {
  width: 100% !important;
  height: 100% !important;
  min-width: unset !important;
  margin: 0 !important;
  border-radius: 25px !important;
  background: linear-gradient(135deg, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.5));
  border: 2px solid rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(20px);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.4);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden !important;
  padding: 15px 15px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  visibility: visible !important;
  opacity: 1 !important;
  isolation: isolate !important;
}

.future-forecast-grid .container:hover {
  transform: translateY(-8px) scale(1.03);
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5);
  border-color: rgba(255, 255, 255, 0.4);
  background: linear-gradient(135deg, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.6));
}

.future-forecast-grid .container .image {
  margin: 2px 0 !important;
  height: auto !important;
  display: flex !important;
  justify-content: center !important;
  align-items: center !important;
  position: relative !important;
  z-index: 2 !important;
}

.future-forecast-grid .container img,
.future-forecast-grid .container .weather-icon {
  height: 60px !important;
  width: 60px !important;
  object-fit: contain !important;
  margin: 0 auto !important;
  display: block !important;
  filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3)) !important;
}

.future-forecast-grid .container h1 {
  font-weight: 700 !important;
  font-size: 5rem !important;
  margin: 2px 0 !important;
  color: white !important;
  text-shadow: 0 3px 6px rgba(0, 0, 0, 0.6) !important;
  visibility: visible !important;
  opacity: 1 !important;
  position: relative !important;
  z-index: 2 !important;
  display: block !important;
}

.future-forecast-grid h3 {
  font-weight: 600;
  font-size: 1rem;
  opacity: 1 !important;
  margin: 1px 0;
  color: white !important;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
  visibility: visible !important;
  position: relative;
  z-index: 2;
}

.future-forecast-grid .container #date {
  font-weight: 600 !important;
  font-size: 1.3rem !important;
  opacity: 1 !important;
  margin: 1px 0 !important;
  color: white !important;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5) !important;
  visibility: visible !important;
  position: relative !important;
  z-index: 2 !important;
  display: block !important;
}

.future-forecast-grid .container p {
  text-align: center !important;
  font-weight: 600 !important;
  font-size: 1.5rem !important;
  margin: 1px 0 !important;
  color: white !important;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5) !important;
  opacity: 1 !important;
  line-height: 1.3 !important;
  visibility: visible !important;
  position: relative !important;
  z-index: 2 !important;
  display: block !important;
}

.hourly-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  padding: 20px 0;
}
.hourlyContainer h2 {
  text-align: center;
  margin: 20px 0 15px 0;
  color: white;
  font-weight: 700;
  font-size: 1.3rem;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
  letter-spacing: 1px;
}
/* SmartPhones */
@media (max-width: 480px) {
  * {
    margin: 0px;
    padding: 0px;
    overflow-x: hidden;
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
