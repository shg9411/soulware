import Vue from "vue";
import Vuex from "vuex";

import { auth } from "./modules/auth";

import VuexPersistence from "vuex-persist";
import localforage from "localforage";

Vue.use(Vuex);

const vuexLocal = new VuexPersistence({
  key: "vuex",
  storage: localforage,
  supportCircular: true,
  asyncStorage: true,
  reducer: (state) => ({
    auth: {
      token: state.auth.token,
      loggedIn: state.auth.loggedIn,
    },
  }),
});

export default new Vuex.Store({
  modules: {
    auth,
  },
  plugins: [vuexLocal.plugin],
});
