import Vue from "vue";
Vue.filter("convertUtoL", (date) =>
  new Date(date * 1000).toLocaleDateString("ko-KR", {
    year: "2-digit",
    month: "2-digit",
    day: "2-digit",
  })
);
