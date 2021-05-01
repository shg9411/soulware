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
                  key
                </th>
                <th class="text-center">
                  value
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td width="20%" class="text-center">작성일자</td>
                <td>{{board.created_at|datetime}}</td>
              </tr>
              <tr>
                <td class="text-center">기관/회사명</td>
                <td>{{board.organization}}</td>
              </tr>
              <tr>
                <td class="text-center">담당자</td>
                <td>{{board.manager}}</td>
              </tr>
              <tr>
                <td class="text-center">연락처</td>
                <td>{{board.phone}}</td>
              </tr>
              <tr>
                <td class="text-center">이메일</td>
                <td>
                  <a v-on:click="sendMail()" :href="`mailto:${board.email}?subject=Re:${board.title}`">{{board.email}}</a>
                </td>
              </tr>
              <tr>
                <td class="text-center">예산</td>
                <td>{{board.budget_display}}</td>
              </tr>
              <tr>
                <td class="text-center">예상 일정</td>
                <td>{{board.expected_period_display}}</td>
              </tr>
              <tr>
                <td class="text-center">프로젝트명</td>
                <td>{{board.title}}</td>
              </tr>
              <tr>
                <td class="text-center">프로젝트 설명</td>
                <td v-html='board.explanation'></td>
              </tr>
              <tr>
                <td class="text-center">상태</td>
                <td>{{board.status_display}}</td>
              </tr>
              <tr v-for="(file,idx) in files" :key="idx">
                <td v-if="idx==0" :rowspan="`${files.length}`" class="text-center">첨부파일</td>
                <td><a @click="download(file)" style="cursor: pointer">{{file.originName}}</a></td>
              </tr>
              <tr></tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col cols="2">
        <v-btn class="ma-2" outlined color="indigo" @click="showDialog()">
          Delete
        </v-btn>
      </v-col>
      <v-col cols="2">
        <v-btn class="ma-2" outlined color="indigo" @click="edit()">
          Edit
        </v-btn>
      </v-col>
      <v-col cols="2">
        <v-btn class="ma-2" outlined color="indigo" @click="$router.go(-1)">
          Back
        </v-btn>
      </v-col>
      <v-dialog v-model="dialog" max-width="500px">
        <v-card>
          <v-card-title>Delete</v-card-title>
          <v-card-text>삭제하시겠습니까?</v-card-text>
          <v-card-actions>
            <v-btn color="warning" text @click="del()">예</v-btn>
            <v-btn color="warning" text @click="dialog = false">아니오</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </div>
</template>
<script>
import http from "@/utils/http"
import { saveAs } from "file-saver"
export default {
  name: 'detail',
  props: ['id'],
  data() {
    return {
      board: {
        id: "",
        organization: "",
        manager: "",
        phone: "",
        title: "",
        email: "",
        budget: "",
        expected_period: "",
        explanation: "",
      },
      dialog: false,
      files: '',
    }
  },
  created() {
    this.init()
  },
  methods: {
    async init() {
      this.getBoard()
    },
    async getBoard() {
      try {
        const data = await http.process('board', 'detail', { id: this.id })
        for (const [key, value] of Object.entries(data)) {
          if (key != "files") {
            this.board[key] = value
          }
          else if (value.length > 0) {
            this.files = value
          }
        }
      } catch (err) {
        if (err.response.status == 404) {
          alert("게시글이 존재하지 않습니다.")
          this.$router.push('/admin/board')
        }
      }
    },
    sendMail() {
      
      // 
    },
    showDialog() {
      this.dialog = !this.dialog
    },
    edit() {
      this.$router.push({ name: 'BoardEdit', params: { id: this.id } })
    },
    async del() {
      this.dialog = false
      try {
        const data = await http.process('board', 'delete', { id: this.id })
        console.log(data)
      } catch (err) {
        console.log(err)
      }
      finally {
        this.$router.push('/admin/board')
      }
    },
    async download(file) {
      await http.process('board', 'download', { id: file.id }, { timeout: 5000, responseType: "blob" }).then(blob => { saveAs(blob, file.originName) })
    }
  }
}
</script>
<style scoped>
.v-btn {
  text-transform: none;
}
.tmp {
  height: 4.09rem;
}
</style>
<style lang="scss">
tbody {
  tr:hover {
    background-color: transparent !important;
  }
}
</style>