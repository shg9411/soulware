import Vue from "vue";
import VueRouter from "vue-router";
import VueGtag from "vue-gtag";
import store from "../store";
import Home from "../views/home.vue";
import About from "../views/about.vue";
import Portfolio from "../views/portfolio.vue";
import Sovit from "../views/sovit.vue";
import Login from "../views/login.vue";
import Board from "../views/board.vue";
import AddBoard from "../views/add-board.vue";
import BoardDetail from "../components/board-detail.vue";
import BoardEdit from "../components/board-edit.vue";
import NotFound from "../components/not-found.vue";
import ChungdahmAllim from "../views/portfolio/chungdahm-allim.vue";
import ChungdahmLearning from "../views/portfolio/chungdahm-learning-portal.vue";
import YujinIclebo from "../views/portfolio/yujin-iclebo.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: { float: true },
  },
  {
    path: "/about",
    name: "About",
    component: About,
    meta: { float: true },
  },
  {
    path: "/sovit",
    name: "Sovit",
    component: Sovit,
    meta: { float: true },
  },
  {
    path: "/portfolio",
    name: "Portfolio",
    component: Portfolio,
  },
  {
    path: "/portfolio/chungdahm-allim",
    name: "ChungdahmAllim",
    component: ChungdahmAllim,
  },
  {
    path: "/portfolio/chungdahm-learning-portal",
    name: "ChungdahmLearning",
    component: ChungdahmLearning,
  },
  {
    path: "/portfolio/yujin-iclebo",
    name: "YujinIclebo",
    component: YujinIclebo,
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
    meta: { requiresAuth: true, requirePersist: true },
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
    meta: { requiresAuth: true, requirePersist: true },
    props: true,
  },
  {
    path: "/board/:id/edit",
    name: "BoardEdit",
    component: BoardEdit,
    meta: { requiresAuth: true, requirePersist: true },
    props: true,
  },
  {
    path: "/page-not-found",
    component: NotFound,
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: "/page-not-found",
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  scrollBehavior() {
    return { x: 0, y: 0 };
  },
  routes,
});

Vue.use(
  VueGtag,
  {
    config: { id: "G-HHDQKNS8WX" },
    pageTrackerTemplate(to) {
      return {
        page_title: to.name,
        page_path: to.path,
      };
    },
  },
  router
);

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
