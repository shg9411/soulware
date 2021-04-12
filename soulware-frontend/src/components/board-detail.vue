<template>
  <v-card>
    <v-app-bar>
      <v-toolbar-title>Detail</v-toolbar-title>
    </v-app-bar>
    <v-container v-if="board">
      <v-row dense>
        <v-col cols="12">
          <v-card>
            <v-card-title>
              ID
            </v-card-title>
            <v-card-subtitle v-text="board.id"></v-card-subtitle>
          </v-card>
        </v-col>
        <v-col cols="12">
          <v-card>
            <v-card-title>
              Title
            </v-card-title>
            <v-card-subtitle v-text="board.title"></v-card-subtitle>
          </v-card>
        </v-col>
        <v-col cols="12">
          <v-card>
            <v-card-title>
              Body
            </v-card-title>
            <v-card-subtitle v-text="board.body"></v-card-subtitle>
          </v-card>
        </v-col>
        <v-col cols="12">
          <v-card>
            <v-card-title>
              E-mail
            </v-card-title>
            <v-card-subtitle v-text="board.email"></v-card-subtitle>
          </v-card>
        </v-col>
        <v-col cols="12">
          <v-card>
            <v-card-title>
              Phone
            </v-card-title>
            <v-card-subtitle v-text="board.phone"></v-card-subtitle>
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
import http from "../utils/http"
const URL = process.env.VUE_APP_API_SERVER
export default {
  name: 'detail',
  props: ['id'],
  data() {
    return {
      board: '',
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
      const data = await http.process('board', 'detail', { id: this.id })
      this.board = data
      if (this.board.files.length > 0)
        this.files = this.board.files
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
    download(file) {
      var xhr = new XMLHttpRequest();
      xhr.open("GET", URL + file.file, true)
      xhr.responseType = 'blob';
      xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
      xhr.send();
      xhr.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
          var _data = this.response;
          var _blob = new Blob([_data]);
          var link = document.createElement('a');
          link.href = window.URL.createObjectURL(_blob);
          link.download = file.originName;
          link.click();
        };
      };
    }
  }
}
</script>
