import Vue from "vue";
import VueRouter from "vue-router";
import WeatherApp from "../views/WeatherApp.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/weather",
    name: "weather",
    component: WeatherApp,
  },
  {
    path: "/today",
    name: "today",
    component: WeatherApp,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
