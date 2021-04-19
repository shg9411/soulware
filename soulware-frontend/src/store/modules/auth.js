import localforage from "localforage";
import jwt_decode from "jwt-decode";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import http from "@/utils/http";

dayjs.extend(duration);

const initialState = {
  ready: false,
  info: null,
  loggedIn: false,
  token: null,
};

export const auth = {
  namespaced: true,
  state: initialState,
  actions: {
    async login({ commit }, user) {
      return await http
        .process("auth", "login", {
          email: user.email,
          password: user.password,
        })
        .then(
          (data) => {
            let token = data.token;
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
    async refresh({ commit }, token) {
      return await http.process("auth", "refresh", { token: token }).then(
        (data) => {
          let token = data.token;
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
      localforage.removeItem("token").then(() => {
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
              return await dispatch("refresh", state.token);
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
