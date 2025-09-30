<template>
  <div class="search__container">
    <div class="search__wrapper">
      <input
        class="search__input"
        type="text"
        placeholder="Search for a city..."
        v-model="searchLocation"
        @keypress.enter="findLocation"
        @input="onInput"
        :disabled="isLoading"
        aria-label="Search for weather location"
      />
      <button
        class="search__button"
        @click="findLocation"
        :disabled="!searchLocation.trim() || isLoading"
        aria-label="Search weather"
      >
        <span v-if="isLoading" class="search__spinner"></span>
        <svg
          v-else
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M21 21L16.514 16.506L21 21ZM19 10.5C19 15.194 15.194 19 10.5 19C5.806 19 2 15.194 2 10.5C2 5.806 5.806 2 10.5 2C15.194 2 19 5.806 19 10.5Z"
            stroke="white"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </button>
    </div>
    <div v-if="error" class="search__error">{{ error }}</div>
  </div>
</template>

<script>
export default {
  name: "SearchComp",
  emits: ["newLocation"],
  data() {
    return {
      searchLocation: "",
      error: "",
      isLoading: false,
    };
  },
  computed: {
    storeLoading() {
      return this.$store.getters.isLoading;
    },
  },
  watch: {
    storeLoading(newVal) {
      this.isLoading = newVal;
    },
  },
  methods: {
    onInput() {
      this.error = "";
    },
    async findLocation() {
      if (!this.searchLocation.trim()) return;

      this.error = "";
      this.isLoading = true;

      try {
        await this.$emit("newLocation", this.searchLocation.trim());
      } catch (error) {
        this.error = "Failed to find location. Please try again.";
      } finally {
        this.isLoading = false;
      }
    },
  },
};
</script>

<style scoped>
.search__container {
  padding: 0;
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.search__wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.search__input {
  width: 100%;
  padding: 12px 50px 12px 24px;
  background-color: rgba(0, 0, 0, 0.3);
  color: white;
  border: 2px solid rgba(255, 255, 255, 0.2);
  border-radius: 50px;
  font-size: 16px;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
}

.search__input::placeholder {
  color: rgba(255, 255, 255, 0.7);
  font-weight: 400;
}

.search__input:focus {
  outline: none;
  border-color: rgba(255, 255, 255, 0.5);
  background-color: rgba(0, 0, 0, 0.4);
  transform: translateY(-2px);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
}

.search__input:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.search__button {
  position: absolute;
  right: 8px;
  background: rgba(255, 255, 255, 0.2);
  border: none;
  border-radius: 50%;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 16px;
}

.search__button:hover:not(:disabled) {
  background: rgba(255, 255, 255, 0.3);
  transform: scale(1.1);
}

.search__button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.search__spinner {
  width: 16px;
  height: 16px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top: 2px solid white;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.search__error {
  color: #ff6b6b;
  font-size: 14px;
  margin-top: 8px;
  text-align: center;
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
