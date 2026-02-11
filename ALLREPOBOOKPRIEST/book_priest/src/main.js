import Vue from "vue";
import App from "./App.vue";
import routerEngine from "artiqui/dist/router-engine.es.js";
import "@/assets/sass2/main.scss";
import "flatpickr/dist/flatpickr.min.css";
Vue.use(routerEngine);
new Vue({
  render: (h) => h(App),
}).$mount("#app");
