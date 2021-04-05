import Vue from "vue";
import store from "../store";
import VueRouter from "vue-router";
import Home from "../views/home.vue";
import About from "../views/about.vue";
import Portfolio from "../views/portfolio.vue";
import Sovit from "../views/sovit.vue";
import Login from "../views/login.vue";
import Board from "../views/board.vue";
import AddBoard from "../views/add-board.vue";
import BoardDetail from "../components/board-detail.vue";
import BoardEdit from "../components/board-edit.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/about",
    name: "About",
    component: About,
  },
  {
    path: "/sovit",
    name: "Sovit",
    component: Sovit,
  },
  {
    path: "/portfolio",
    name: "Portfolio",
    component: Portfolio,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: { requirePersist: true },
  },
  {
    path: "/board",
    name: "Board",
    component: Board,
    meta: { requiresAuth: true },
  },
  {
    path: "/add",
    name: "AddBoard",
    component: AddBoard,
  },
  {
    path: "/board/:id",
    name: "BoardDetail",
    component: BoardDetail,
    meta: { requiresAuth: true },
    props: true,
  },
  {
    path: "/board/:id/edit",
    name: "BoardEdit",
    component: BoardEdit,
    meta: { requiresAuth: true },
    props: true,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

const waitStorage = async (_to) => {
  if (_to.matched.some((record) => record.meta.requirePersist)) {
    await store.restored;
  }
  return _to;
};

const _asyncLogin = (_to) => {
  return new Promise((resolve, reject) => {
    if (_to.matched.some((record) => record.meta.requiresAuth)) {
      store.dispatch("auth/ready");
      if (!store.state.auth.loggedIn) {
        reject({ denied: _to });
      } else {
        resolve(_to);
      }
    } else {
      resolve(_to);
    }
  });
};

router.beforeResolve((_to, _from, next) => {
  waitStorage(_to)
    .then((_to) => _asyncLogin(_to))
    .then(
      () => {
        next();
      },
      (err) => {
        console.log(err);
        if (err.denied) {
          next({
            path: "/login",
          });
        }
      }
    );
});

export default router;
