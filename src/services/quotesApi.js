class QuotesApiService {
  constructor() {
    this.baseUrl = "https://api.quotable.io";
  }

  async fetchRandomQuote() {
    try {
      // Create a cache key based on the current date (YYYY-MM-DD)
      const today = new Date().toISOString().split("T")[0];
      const cacheKey = `daily_quote_${today}`;

      // Check localStorage directly for today's quote
      const cached = this.getCachedFromStorage(cacheKey);
      if (cached) {
        return cached;
      }

      const response = await fetch(`${this.baseUrl}/random?tags=motivational`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      const quote = {
        text: data.content,
        author: data.author,
        timestamp: Date.now(),
        date: today,
      };

      // Save to localStorage with today's date as key
      this.saveToStorage(cacheKey, quote);

      return quote;
    } catch (error) {
      console.error("Error fetching quote:", error);
      const fallback = this.getFallbackQuote();
      const today = new Date().toISOString().split("T")[0];
      const cacheKey = `daily_quote_${today}`;
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

  getFallbackQuote() {
    const fallbackQuotes = [
      {
        text: "The only way to do great work is to love what you do.",
        author: "Steve Jobs",
        timestamp: Date.now(),
        date: new Date().toISOString().split("T")[0],
      },
      {
        text: "Success is not final, failure is not fatal: it is the courage to continue that counts.",
        author: "Winston Churchill",
        timestamp: Date.now(),
        date: new Date().toISOString().split("T")[0],
      },
      {
        text: "The future belongs to those who believe in the beauty of their dreams.",
        author: "Eleanor Roosevelt",
        timestamp: Date.now(),
        date: new Date().toISOString().split("T")[0],
      },
      {
        text: "It is during our darkest moments that we must focus to see the light.",
        author: "Aristotle",
        timestamp: Date.now(),
        date: new Date().toISOString().split("T")[0],
      },
      {
        text: "The way to get started is to quit talking and begin doing.",
        author: "Walt Disney",
        timestamp: Date.now(),
        date: new Date().toISOString().split("T")[0],
      },
      {
        text: "Don't be pushed around by the fears in your mind. Be led by the dreams in your heart.",
        author: "Roy T. Bennett",
        timestamp: Date.now(),
        date: new Date().toISOString().split("T")[0],
      },
      {
        text: "Believe you can and you're halfway there.",
        author: "Theodore Roosevelt",
        timestamp: Date.now(),
        date: new Date().toISOString().split("T")[0],
      },
      {
        text: "The only impossible journey is the one you never begin.",
        author: "Tony Robbins",
        timestamp: Date.now(),
        date: new Date().toISOString().split("T")[0],
      },
    ];

    const randomIndex = Math.floor(Math.random() * fallbackQuotes.length);
    return fallbackQuotes[randomIndex];
  }
}

export default new QuotesApiService();
