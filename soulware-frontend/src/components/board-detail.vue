<template>
  <v-card>
    <v-app-bar>
      <v-toolbar-title>Detail</v-toolbar-title>
    </v-app-bar>
    <v-container>
      <v-row dense>
        <v-col cols="12" v-for="(value,key) in board" :key="key">
          <v-card>
            <v-card-title>
              {{key}}
            </v-card-title>
            <v-card-subtitle>{{value}}</v-card-subtitle>
          </v-card>
        </v-col>
        <v-col v-if="files" cols="12">
          <v-card>
            <v-card-title>
              Files
            </v-card-title>
            <v-card-actions>
              <v-btn class="ml-2 mt-5" outlined rounded small v-for="(file,i) in files" :key="i" @click="download(file)">{{file.originName}}</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
      <v-card-actions>
        <v-btn text color="error accent-4" @click="showDialog()">
          Delete
        </v-btn>
        <v-btn text color="warning accent-4" @click="edit()">
          Edit
        </v-btn>
        <v-btn text color="teal accent-4" @click="$router.go(-1)">
          Back
        </v-btn>
      </v-card-actions>
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
    </v-container>
  </v-card>
</template>
<script>
import http from "@/utils/http"
import Board from "@/models/board"
import { saveAs } from "file-saver"
export default {
  name: 'detail',
  props: ['id'],
  data() {
    return {
      board: new Board('', '', '', ''),
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
          if (key != "files")
            this.board[key] = value
          else if (value.length > 0)
            this.files = value
        }
      } catch (err) {
        if (err.response.status == 404) {
          alert("게시글이 존재하지 않습니다.")
          this.$router.push('/board')
        }
      }
    },
    showDialog() {
      this.dialog = !this.dialog
    },
    edit() {
      this.$router.push({ name: 'BoardEdit', params: { id: this.id } })
    },
    async del() {
      this.dialog = false
      const data = await http.process('board', 'delete', { id: this.id })
      console.log(data)
      this.$router.push('/board')
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
</style>
