import Vue from "vue";
import dayjs from "dayjs";
Vue.filter("convertUtoL", (date) => dayjs(date * 1000).format("YYYY-MM-DD"));
