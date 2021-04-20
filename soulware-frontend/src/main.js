import Vue from "vue";
import Vuelidate from "vuelidate";
import App from "./app.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import localforage from "localforage";
import "typeface-noto-sans";
import "./assets/main.scss";
import "./filters";
import { TiptapVuetifyPlugin } from "tiptap-vuetify";
import "tiptap-vuetify/dist/main.css";

Vue.config.productionTip = false;
Vue.use(Vuelidate);
Vue.use(TiptapVuetifyPlugin, {
  vuetify,
  iconsGroup: "mdi",
});

localforage.config({
  driver: localforage.INDEXEDDB,
  name: "soulware",
  storeName: "app",
});

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
