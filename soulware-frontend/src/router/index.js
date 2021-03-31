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

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!store.state.auth.status.loggedIn)
      next({
        path: "/login",
      });
    else {
      next();
    }
  } else {
    next();
  }
});

export default router;
