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
import axios from 'axios'
import authHeader from '../services/auth-header'
const url = 'http://localhost:8000'
export default {
  name: 'detail',
  props: ['id'],
  data() {
    return {
      board: '',
      dialog: false,
      files: '',
      header: '',
    }
  },
  created() {
    this.init()
  },
  methods: {
    async init() {
      authHeader().then((header) => {
        this.header = header
        this.getBoard()
      })
    },
    getBoard() {
      axios({
        method: 'GET',
        url: url + '/boards/board/' + this.id,
        headers: this.header
      })
        .then((response) => {
          this.board = response.data
          if (this.board.files.length > 0)
            this.files = this.board.files
        })
        .catch((error) => {
          if (error.response.status === 404) {
            console.log('Failed to get board', error.response.status)
            alert("게시글이 존재하지 않습니다.")
            this.$router.push('/');
          }
        })
    },
    showDialog() {
      this.dialog = !this.dialog
    },
    edit() {
      this.$router.push({ name: 'BoardEdit', params: { id: this.id } })
    },
    del() {
      this.dialog = false
      axios({
        method: 'DELETE',
        url: url + '/boards/board/' + this.id + '/',
        headers: this.header
      }).then((response) => {
        console.log(response.data)
        this.$router.push('/board')
      }).catch((response) => {
        console.log('Failed to delete board', response)
      })
    },
    download(file) {
      axios({
        method: 'GET',
        url: url + file.file,
        responseType: 'blob',
      }).then((response) => {
        var fileURL = window.URL.createObjectURL(new Blob([response.data]))
        var fileLink = document.createElement('a');
        fileLink.href = fileURL;
        fileLink.setAttribute('download', file.originName);
        document.body.appendChild(fileLink);
        fileLink.click();
      }).catch((response) => {
        console.log(response)
      })
    }
  }
}
</script>
