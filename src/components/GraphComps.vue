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
      default: 200,
    },
    height: {
      type: Number,
      default: 140,
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
  },
  data() {
    return {
      graphData: [],
      loaded: false,
      componentKey: 0,
      chartData: {
        labels: [
          "2023-02-15",
          "2023-02-16",
          "2023-02-17",
          "2023-02-18",
          "2023-02-19",
          "2023-02-20",
          "2023-02-21",
        ],
        datasets: [
          {
            fill: true,
            label: "Temperature",
            borderColor: "red",
            backgroundColor: "red",
            data: null,
            borderWidth: 2,
          },
        ],
      },
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            labels: {
              color: "white",
            },
          },
        },
        scales: {
          x: {
            ticks: {
              color: "white",
            },
          },
          y: {
            ticks: {
              color: "white",
            },
          },
        },
      },
    };
  },
  mounted: function () {
    this.loaded = false;
    try {
      for (let weekDay in this.CurrentData.forecast.forecastday) {
        this.graphData.push(
          this.CurrentData.forecast.forecastday[weekDay].day.avgtemp_c
        );
      }
      this.chartData.datasets[0].data = this.graphData;
      // console.log(this.chartData.datasets[0].data);
      this.loaded = true;
    } catch (e) {
      console.error(e);
    }
  },
  watch: {
    CurrentData(newData, oldData) {
      console.log(newData);
      console.log(oldData);
      this.loaded = false;
      this.graphData = [];
      try {
        for (let weekDay in newData.forecast.forecastday) {
          this.graphData.push(
            newData.forecast.forecastday[weekDay].day.avgtemp_c
          );
        }
        this.chartData.datasets[0].data = this.graphData;
        // console.log("chart", this.chartData.datasets[0].data);
        this.componentKey += 1;
        this.loaded = true;
      } catch (e) {
        console.error(e);
      }
    },
  },
};
</script>
