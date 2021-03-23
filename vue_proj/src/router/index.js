import Vue from "vue";
import Router from "vue-router";
import login from "@/components/login";
import detail from "@/components/detail";
import home from "@/components/home";
import board from "@/components/board";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "",
      name: "home",
      component: home
    },
    {
      path: "/login",
      name: "login",
      component: login
    },
    {
      path: "/detail/:id",
      name: "detail",
      component: detail,
      props: true
    },
    {
      path: "/board",
      name: "board",
      component: board
    }
  ]
});
