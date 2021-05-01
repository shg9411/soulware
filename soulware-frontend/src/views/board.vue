<template>
  <div>
    <div class="tmp"></div>
    <v-row justify="center">
      <v-col cols="10">
        <v-simple-table>
          <template v-slot:default>
            <thead>
              <tr>
                <th width="20%" class="text-center">
                  번호
                </th>
                <th width="60%" class="text-center">
                  프로젝트 명
                </th>
                <th width="20%" class="text-center">
                  상태
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="boards && boards.length==0">
                <td colspan="3" class="text-center">문의사항이 존재하지 않습니다.</td>
              </tr>
              <tr v-else v-for="(item,index) in boards" :key="index" @click="detail(item.id)" style="cursor: pointer">
                <td class="text-center">{{item.id}}</td>
                <td class="text-center">{{item.title}}</td>
                <td class="text-center">{{item.status_display}}</td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-col>
    </v-row>
    <div>
      <v-pagination v-model="page" @input="getPage" :length="pageLength" prev-icon="mdi-menu-left" next-icon="mdi-menu-right"></v-pagination>
    </div>
  </div>
</template>

<script>
import http from "@/utils/http"
const PAGE_SIZE = 5

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
<style scoped>
.tmp {
  height: 4.09rem;
}
</style>