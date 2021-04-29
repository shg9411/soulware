import Vue from "vue";
import VueRouter from "vue-router";
import VueGtag from "vue-gtag";
import store from "@/store";

const Home = () => import("@/views/home.vue");
const About = () => import("@/views/about.vue");
const Portfolio = () =>
  import(/*webpackChunkName: "portfolio"*/ "@/views/portfolio.vue");
const Sovit = () =>
  import(/*webpackChunkName: "portfolio"*/ "@/views/sovit.vue");
const Login = () => import(/*webpackChunkName: "board"*/ "@/views/login.vue");
const Board = () => import(/*webpackChunkName: "board"*/ "@/views/board.vue");
const AddBoard = () =>
  import(/*webpackChunkName: "board"*/ "@/views/add-board.vue");
const BoardDetail = () =>
  import(/*webpackChunkName: "board"*/ "@/components/board-detail.vue");
const BoardEdit = () =>
  import(/*webpackChunkName: "board"*/ "@/components/board-edit.vue");
const NotFound = () => import("@/components/not-found.vue");
const ChungdahmAllim = () =>
  import(
    /*webpackChunkName: "portfolio"*/ "@/views/portfolio/chungdahm-allim.vue"
  );
const ChungdahmLearning = () =>
  import(
    /*webpackChunkName: "portfolio"*/ "@/views/portfolio/chungdahm-learning-portal.vue"
  );
const ChungdahmLoudclass = () =>
  import(
    /*webpackChunkName: "portfolio"*/ "@/views/portfolio/chungdahm-loudclass.vue"
  );
const YujinIclebo = () =>
  import(
    /*webpackChunkName: "portfolio"*/ "@/views/portfolio/yujin-iclebo.vue"
  );
const IncheonAirport = () =>
  import(
    /*webpackChunkName: "portfolio"*/ "@/views/portfolio/incheon-airport.vue"
  );
const MobileGroupware = () =>
  import(
    /*webpackChunkName: "portfolio"*/ "@/views/portfolio/mobile-groupware.vue"
  );
const OfficeCore = () =>
  import(/*webpackChunkName: "portfolio"*/ "@/views/portfolio/office-core.vue");
const SogangSpring = () =>
  import(
    /*webpackChunkName: "portfolio"*/ "@/views/portfolio/sogang-spring.vue"
  );
const Success = () =>
  import(/*webpackChunkName: "board"*/ "@/components/board-save-success.vue");

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
    meta: { float: true },
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
    path: "/admin/login",
    name: "Login",
    component: Login,
    meta: { requirePersist: true, bg: true, hide: true },
  },
  {
    path: "/admin/board",
    name: "Board",
    component: Board,
    meta: { requiresAuth: true, requirePersist: true, bg: true, hide: true },
  },
  {
    path: "/add",
    name: "AddBoard",
    component: AddBoard,
    meta: { bg: true, hide: true },
  },
  {
    path: "/admin/board/:id",
    name: "BoardDetail",
    component: BoardDetail,
    meta: { requiresAuth: true, requirePersist: true, bg: true, hide: true },
    props: true,
  },
  {
    path: "/admin/board/:id/edit",
    name: "BoardEdit",
    component: BoardEdit,
    meta: { requiresAuth: true, requirePersist: true, bg: true, hide: true },
    props: true,
  },
  {
    path: "/save-success",
    name: "Success",
    component: Success,
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

// https://matteo-gabriele.gitbook.io/vue-gtag/auto-tracking
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
        if (err.denied) {
          next({
            name: "Login",
          });
        }
      }
    );
});

export default router;
