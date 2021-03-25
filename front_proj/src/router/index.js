import Vue from "vue";
import store from "../store";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import Board from "../views/Board.vue";
import AddBoard from "../views/AddBoard.vue";
import BoardDetail from "../components/BoardDetail.vue";
import BoardEdit from "../components/BoardEdit.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
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
