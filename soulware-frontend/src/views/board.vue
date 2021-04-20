<template>
  <v-card>
    <v-card-title v-if="boards && boards.length==0" class="justify-center">게시글이 없습니다.</v-card-title>
    <v-row>
      <v-col cols="12">
        <v-card v-for='(item, index) in boards' :key="index">
          <v-card-title @click="detail(item.id)" class="headline" v-html="item.title"></v-card-title>
          <v-card-subtitle v-html="item.manager"></v-card-subtitle>
        </v-card>
      </v-col>
    </v-row>
    <div class="text-center">
      <v-pagination v-model="page" @input="getPage" :length="pageLength" prev-icon="mdi-menu-left" next-icon="mdi-menu-right"></v-pagination>
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
      boards: null,
      pageLength: null,
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
      let totalCount = data.count;
      let totalLength = Math.ceil(totalCount / PAGE_SIZE)
      this.boards = data.results
      if (this.pageLength == null) {
        this.pageLength = totalLength
      }
    },
    detail(id) {
      this.$router.push({ name: 'BoardDetail', params: { id: id } })
    }
  }
}
</script>
