import AuthService from "../../services/auth-service";
import localforage, { ready } from "localforage";
import jwt_decode from "jwt-decode";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";

dayjs.extend(duration);

let token = null;
localforage.getItem("token").then(function(value) {
  token = value;
});

const initialState = token
  ? { loggedIn: true, token, info: null, ready: false }
  : { loggedIn: false, token: null, info: null, ready: false };

export const auth = {
  namespaced: true,
  state: initialState,
  actions: {
    async login({ commit }, user) {
      return AuthService.login(user).then(
        (token) => {
          commit("loginSuccess", token);
          commit("setReady", true);
          return Promise.resolve(token);
        },
        (error) => {
          commit("loginFailure");
          return Promise.reject(error);
        }
      );
    },
    async logout({ commit }) {
      localforage.removeItem("token").then(function() {
        commit("setReady", false);
        commit("logout");
      });
    },
    async ready({ state, commit, dispatch }) {
      if (!state.ready) {
        await dispatch("validateUserData");
        commit("setReady", true);
      }
    },
    async validateUserData({ commit, state }) {
      if (state.token) {
        commit("loginSuccess", state.token);
        state.ready = true;
        if (state.loggedIn) {
          if (
            dayjs.duration(dayjs.unix(state.info.exp).diff(dayjs()))
              ._milliseconds < 0
          ) {
            if (
              dayjs.duration(dayjs.unix(state.info.nbf).diff(dayjs()))
                ._milliseconds < 0
            ) {
              commit("setReady", false);
              commit("logout");
            } else {
              AuthService.refresh(state.token).then((token) => {
                commit("loginSucces", token);
                console.log("refreshToken");
              });
            }
          }
        }
      }
    },
  },
  mutations: {
    setReady(state, data) {
      state.ready = data;
    },
    loginSuccess(state, token) {
      state.loggedIn = true;
      state.token = token;
      state.info = jwt_decode(token);
    },
    loginFailure(state) {
      state.loggedIn = false;
      state.token = null;
    },
    logout(state) {
      state.loggedIn = false;
      state.token = null;
      state.info = null;
    },
  },
};
