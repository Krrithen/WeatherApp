// Modern Weather API Service
const API_KEY = "7a635d10a9b045d7a7c54416230902";
const BASE_URL = "https://api.weatherapi.com/v1";

class WeatherApiService {
  constructor() {
    this.cache = new Map();
    this.cacheTimeout = 5 * 60 * 1000; // 5 minutes
  }

  async fetchWeatherData(location) {
    const cacheKey = `weather_${location}`;
    const cached = this.cache.get(cacheKey);

    if (cached && Date.now() - cached.timestamp < this.cacheTimeout) {
      return cached.data;
    }

    try {
      const url = `${BASE_URL}/forecast.json?key=${API_KEY}&q=${encodeURIComponent(
        location
      )}&days=7&aqi=no&alerts=no`;
      
      console.log("Fetching weather data from:", url);
      
      const response = await fetch(url);

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Weather API Error Response:", errorText);
        throw new Error(
          `Weather API Error: ${response.status} ${response.statusText} - ${errorText}`
        );
      }

      const data = await response.json();
      console.log("Weather API Success:", data);

      // Validate the response structure
      if (!data || !data.forecast || !data.forecast.forecastday) {
        throw new Error("Invalid weather data structure received from API");
      }

      // Cache the result
      this.cache.set(cacheKey, {
        data,
        timestamp: Date.now(),
      });

      return data;
    } catch (error) {
      console.error("Weather API Error:", error);
      throw new Error(`Failed to fetch weather data: ${error.message}`);
    }
  }

  clearCache() {
    this.cache.clear();
  }
}

export default new WeatherApiService();
