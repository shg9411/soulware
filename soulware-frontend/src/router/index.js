import Vue from "vue";
import VueRouter from "vue-router";
import VueGtag from "vue-gtag";
import store from "@/store";

const Home = () => import("@/views/home.vue");
const About = () => import("@/views/about.vue");
const Portfolio = () => import("@/views/portfolio.vue");
const Sovit = () => import("@/views/sovit.vue");
const Login = () => import("@/views/login.vue");
const Board = () => import("@/views/board.vue");
const AddBoard = () => import("@/views/add-board.vue");
const BoardDetail = () => import("@/components/board-detail.vue");
const BoardEdit = () => import("@/components/board-edit.vue");
const NotFound = () => import("@/components/not-found.vue");
const ChungdahmAllim = () => import("@/views/portfolio/chungdahm-allim.vue");
const ChungdahmLearning = () =>
  import("@/views/portfolio/chungdahm-learning-portal.vue");
const ChungdahmLoudclass = () =>
  import("@/views/portfolio/chungdahm-loudclass.vue");
const YujinIclebo = () => import("@/views/portfolio/yujin-iclebo.vue");
const IncheonAirport = () => import("@/views/portfolio/incheon-airport.vue");
const MobileGroupware = () => import("@/views/portfolio/mobile-groupware.vue");
const OfficeCore = () => import("@/views/portfolio/office-core.vue");
const SogangSpring = () => import("@/views/portfolio/sogang-spring.vue");

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
    path: "/portfolio/chungdahm-loudclass",
    name: "ChungdahmLoudclass",
    component: ChungdahmLoudclass,
  },
  {
    path: "/portfolio/yujin-iclebo",
    name: "YujinIclebo",
    component: YujinIclebo,
  },
  {
    path: "/portfolio/incheon-airport",
    name: "IncheonAirport",
    component: IncheonAirport,
  },
  {
    path: "/portfolio/mobile-groupware",
    name: "MobileGroupware",
    component: MobileGroupware,
  },
  {
    path: "/portfolio/office-core",
    name: "OfficeCore",
    component: OfficeCore,
  },
  {
    path: "/portfolio/sogang-spring",
    name: "SogangSpring",
    component: SogangSpring,
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
