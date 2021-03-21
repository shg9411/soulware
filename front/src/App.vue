<template>
  <div>
    <board-header></board-header>
    <board-content v-bind:propsdata="boardList"></board-content>
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
      boardList: []
    };
  },
  components: {
    "board-header":BoardHeader,
    "board-content":BoardContent,
    "board-footer":BoardFooter

  },
  mounted() { // DOM 객체 생성 후 drf server 에서 데이터를 가져와 boardList 저장
    axios({
      method: "GET",
      url: url 
    })
      .then(response => {
        this.boardList = response.data;
      })
      .catch(response => {
        console.log("Failed to get boardList", response);
      });
  },
  methods: {
    getBoardList: function() {},
    updateBoardList: function() {},
    deleteBoardList: function() {}
  }
};
</script>