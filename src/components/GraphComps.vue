<template>
  <LineChartGenerator
    v-if="loaded"
    :chart-options="chartOptions"
    :chart-data="chartData"
    :chart-id="chartId"
    :dataset-id-key="datasetIdKey"
    :plugins="plugins"
    :css-classes="cssClasses"
    :styles="styles"
    :width="width"
    :height="height"
    :key="componentKey"
  />
</template>

<script>
import { Line as LineChartGenerator } from "vue-chartjs/legacy";

import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  LinearScale,
  CategoryScale,
  PointElement,
} from "chart.js";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  LinearScale,
  CategoryScale,
  PointElement
);

export default {
  name: "LineChart",
  components: {
    LineChartGenerator,
  },
  props: {
    chartId: {
      type: String,
      default: "line-chart",
    },
    datasetIdKey: {
      type: String,
      default: "label",
    },
    width: {
      type: Number,
      default: 600,
    },
    height: {
      type: Number,
      default: 400,
    },
    cssClasses: {
      default: "",
      type: String,
    },
    styles: {
      type: Object,
      default: () => {},
    },
    plugins: {
      type: Object,
      default: () => {},
    },
    CurrentData: {
      type: Object,
      default: () => {},
    },
    temperatureUnit: {
      type: String,
      default: "fahrenheit",
    },
  },
  data() {
    return {
      graphData: [],
      loaded: false,
      componentKey: 0,
      chartData: {
        labels: [],
        datasets: [
          {
            fill: true,
            label: "Average Temperature",
            borderColor: "#ff6b6b",
            backgroundColor: "rgba(255, 107, 107, 0.2)",
            data: null,
            borderWidth: 3,
            pointRadius: 6,
            pointHoverRadius: 8,
            tension: 0.4,
          },
        ],
      },
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: {
            display: true,
            text: "3-Day Temperature Forecast",
            color: "white",
            font: {
              size: 18,
              weight: "bold",
            },
          },
          legend: {
            labels: {
              color: "white",
              font: {
                size: 14,
              },
            },
          },
          tooltip: {
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            titleColor: "white",
            bodyColor: "white",
            borderColor: "rgba(255, 255, 255, 0.2)",
            borderWidth: 1,
            cornerRadius: 8,
            displayColors: true,
            callbacks: {
              label: function (context) {
                const unit = context.dataset.label.includes("Celsius")
                  ? "°C"
                  : "°F";
                return `${context.dataset.label}: ${context.parsed.y}${unit}`;
              },
            },
          },
        },
        scales: {
          x: {
            ticks: {
              color: "white",
              font: {
                size: 12,
              },
            },
            grid: {
              color: "rgba(255, 255, 255, 0.1)",
            },
            title: {
              display: true,
              text: "Days",
              color: "white",
              font: {
                size: 14,
                weight: "bold",
              },
            },
          },
          y: {
            ticks: {
              color: "white",
              font: {
                size: 12,
              },
              callback: function (value) {
                const unit = this.temperatureUnit === "celsius" ? "°C" : "°F";
                return value + unit;
              },
            },
            grid: {
              color: "rgba(255, 255, 255, 0.1)",
            },
            title: {
              display: true,
              text: "Temperature",
              color: "white",
              font: {
                size: 14,
                weight: "bold",
              },
            },
          },
        },
      },
    };
  },
  mounted() {
    this.updateChartData();
  },
  watch: {
    CurrentData: {
      handler() {
        this.updateChartData();
      },
      deep: true,
    },
  },
  methods: {
    updateChartData() {
      if (!this.CurrentData?.forecast?.forecastday) return;

      this.loaded = false;
      this.graphData = [];

      try {
        const forecastDays = this.CurrentData.forecast.forecastday;
        const labels = [];

        forecastDays.forEach((day) => {
          const date = new Date(day.date);
          const dayName = date.toLocaleDateString("en-US", {
            weekday: "short",
          });
          labels.push(dayName);
          const temp =
            this.temperatureUnit === "celsius"
              ? day.day.avgtemp_c
              : day.day.avgtemp_f;
          this.graphData.push(temp);
        });

        this.chartData.labels = labels;
        this.chartData.datasets[0].data = this.graphData;
        this.componentKey += 1;
        this.loaded = true;
      } catch (error) {
        console.error("Error updating chart data:", error);
      }
    },
  },
};
</script>
