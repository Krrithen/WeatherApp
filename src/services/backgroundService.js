class BackgroundService {
  constructor() {
    // Get API key from environment variables for security
    this.apiKey =
      process.env.VUE_APP_UNSPLASH_ACCESS_KEY || "YOUR_UNSPLASH_ACCESS_KEY";
    this.baseUrl = "https://api.unsplash.com";
  }

  async fetchRandomBackground() {
    try {
      // Create a cache key based on the current date (YYYY-MM-DD)
      const today = new Date().toISOString().split("T")[0];
      const cacheKey = `daily_background_${today}`;

      // Check localStorage directly for today's background
      const cached = this.getCachedFromStorage(cacheKey);
      if (cached) {
        return cached;
      }

      // If no API key is set, return fallback backgrounds
      if (this.apiKey === "YOUR_UNSPLASH_ACCESS_KEY") {
        const fallback = this.getFallbackBackground();
        this.saveToStorage(cacheKey, fallback);
        return fallback;
      }

      const response = await fetch(
        `${this.baseUrl}/photos/random?query=landscape,nature,city&orientation=landscape&client_id=${this.apiKey}`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      const background = {
        url: data.urls.full,
        thumb: data.urls.thumb,
        description:
          data.description || data.alt_description || "Beautiful landscape",
        photographer: data.user.name,
        photographerUrl: data.user.links.html,
        timestamp: Date.now(),
        date: today,
      };

      // Save to localStorage with today's date as key
      this.saveToStorage(cacheKey, background);

      return background;
    } catch (error) {
      console.error("Error fetching background:", error);
      const fallback = this.getFallbackBackground();
      const today = new Date().toISOString().split("T")[0];
      const cacheKey = `daily_background_${today}`;
      this.saveToStorage(cacheKey, fallback);
      return fallback;
    }
  }

  getCachedFromStorage(key) {
    try {
      const stored = localStorage.getItem(key);
      if (stored) {
        const cached = JSON.parse(stored);
        const today = new Date().toISOString().split("T")[0];
        if (cached.date === today) {
          return cached;
        }
      }
    } catch (error) {
      console.error("Error reading from localStorage:", error);
    }
    return null;
  }

  saveToStorage(key, data) {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
      console.error("Error saving to localStorage:", error);
    }
  }

  getFallbackBackground() {
    const fallbackBackgrounds = [
      {
        url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
        thumb:
          "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80",
        description: "Mountain landscape",
        photographer: "Unsplash",
        photographerUrl: "https://unsplash.com",
        timestamp: Date.now(),
        date: new Date().toISOString().split("T")[0],
      },
      {
        url: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80",
        thumb:
          "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80",
        description: "Forest landscape",
        photographer: "Unsplash",
        photographerUrl: "https://unsplash.com",
        timestamp: Date.now(),
        date: new Date().toISOString().split("T")[0],
      },
      {
        url: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2086&q=80",
        thumb:
          "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80",
        description: "Lake landscape",
        photographer: "Unsplash",
        photographerUrl: "https://unsplash.com",
        timestamp: Date.now(),
        date: new Date().toISOString().split("T")[0],
      },
      {
        url: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80",
        thumb:
          "https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80",
        description: "Nature landscape",
        photographer: "Unsplash",
        photographerUrl: "https://unsplash.com",
        timestamp: Date.now(),
        date: new Date().toISOString().split("T")[0],
      },
      {
        url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
        thumb:
          "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80",
        description: "Desert landscape",
        photographer: "Unsplash",
        photographerUrl: "https://unsplash.com",
        timestamp: Date.now(),
        date: new Date().toISOString().split("T")[0],
      },
    ];

    const randomIndex = Math.floor(Math.random() * fallbackBackgrounds.length);
    return fallbackBackgrounds[randomIndex];
  }

  setApiKey(key) {
    this.apiKey = key;
  }
}

export default new BackgroundService();
