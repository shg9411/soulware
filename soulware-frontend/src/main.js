import Vue from "vue";
import App from "./app.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import "typeface-noto-sans";
import "./assets/main.scss";

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");