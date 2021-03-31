<template>
  <v-card>
    <v-card-text>
      <v-list flat>
        <v-card-title>정보</v-card-title>
        <v-list-item-group color="primary">
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>ID</v-list-item-title>
            </v-list-item-content>
            <v-list-item-content>
              <v-list-item-title v-text="board.id"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>Title</v-list-item-title>
            </v-list-item-content>
            <v-list-item-content>
              <v-list-item-title v-text="board.title"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>Body</v-list-item-title>
            </v-list-item-content>
            <v-list-item-content>
              <v-list-item-title v-text="board.body"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>E-mail</v-list-item-title>
            </v-list-item-content>
            <v-list-item-content>
              <v-list-item-title v-text="board.email"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>Phone</v-list-item-title>
            </v-list-item-content>
            <v-list-item-content>
              <v-list-item-title v-text="board.phone"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item v-for="(file,i) in files" v-bind:key="i">
            <v-list-item-content>
              <v-list-item-title v-if="(i==0)">File</v-list-item-title>
            </v-list-item-content>
            <v-list-item-content>
              <v-list-item-title v-text="file.originName" @click="download(file)"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
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
    </v-card-text>
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
    }
  },
  mounted() {
    axios({
      method: 'GET',
      url: url + '/boards/board/' + this.id,
      headers: authHeader()
    })
      .then((response) => {
        this.board = response.data
        if (this.board.files.length > 0)
          this.files = this.board.files
      })
      .catch((response) => {
        console.log('Failed to get board', response)
      })
  },
  methods: {
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
        headers: authHeader()
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
