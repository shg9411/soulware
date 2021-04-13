<template>
  <v-card>
    <v-card-title v-if="message" class="justify-center">{{message}}</v-card-title>
    <v-row>
      <v-col cols="12">
        <v-card v-for='(item, index) in boards' :key=index>
          <v-card-title @click="detail(item.id)" class="headline" v-html="item.title"></v-card-title>
          <v-card-subtitle v-html="item.body"></v-card-subtitle>
        </v-card>
      </v-col>
    </v-row>
    <div class="text-center">
      <v-pagination v-model="page" :length="length" prev-icon="mdi-menu-left" next-icon="mdi-menu-right"></v-pagination>
    </div>
  </v-card>
</template>

<script>
import http from "@/utils/http"

const PAGE_SIZE = 3

export default {
  name: 'Board',
  data() {
    return {
      page: 1,
      boards: '',
      message: '',
      length: null,
    }
  },
  watch: {
    page: function (val) {
      this.getPage(val)
    }
  },
  created() {
    this.init()
  },
  methods: {
    async init() {
      this.getPage(1)
    },
    async getPage(page) {
      const data = await http.process('board', 'list', { page: page })
      if (this.length == null)
        this.length = Math.ceil(data.count / PAGE_SIZE)
      this.boards = data.results
      if (this.boards.length == 0)
        this.message = "게시글이 없습니다."
    },
    detail(id) {
      this.$router.push({ name: 'BoardDetail', params: { id: id } })
    }
  }
}
</script>
