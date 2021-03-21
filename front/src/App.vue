<template>
  <div>
    <board-header></board-header>
    <board-content
      v-bind:propsdata="boardList"
      v-on:saved="getBoardList"
    ></board-content>
    <board-footer></board-footer>
  </div>
</template>

<script>
import axios from "axios";
import BoardHeader from "./components/BoardHeader.vue";
import BoardContent from "./components/BoardContent.vue";
import BoardFooter from "./components/BoardFooter.vue";

let url = "http://localhost:8000/boards/board/";

export default {
  data: () => {
    return {
      boardList: [],
    };
  },
  components: {
    "board-header": BoardHeader,
    "board-content": BoardContent,
    "board-footer": BoardFooter,
  },
  mounted() {
    axios({
      method: "GET",
      url: url,
    })
      .then((response) => {
        this.boardList = response.data;
      })
      .catch((response) => {
        console.log("Failed to get boardList", response);
      });
  },
  methods: {
    getBoardList: function() {
      axios({
        method: "GET",
        url: url,
      })
        .then((response) => {
          this.boardList = response.data;
          console.log("Success", response);
        })
        .catch((error) => {
          console.log("Failed to get boardList", error.response);
        });
    },
  },
};
</script>
