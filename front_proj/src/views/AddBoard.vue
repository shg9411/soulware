<template>
  <v-container>
    <v-form ref="form" lazy-validation>
      <v-text-field v-model="board.title" :rules="[v => !!v || 'Title is required']" label="Title" required></v-text-field>
      <v-text-field v-model="board.body" :rules="[v => !!v || 'Body is required']" label="Body" required></v-text-field>
      <v-text-field v-model="board.email" :rules="emailRules" label="E-mail" required></v-text-field>
      <v-text-field v-model="board.phone" :rules="phoneRules" label="Phone" required></v-text-field>
      <v-file-input v-model="board.files" label="File"></v-file-input>
      <v-btn @click="saveBoard()">저장</v-btn>
      <v-btn @click="resetForm()">초기화</v-btn>
    </v-form>
  </v-container>
</template>
<script>
import axios from "axios";
import Board from '../models/board'
const url = "http://localhost:8000/boards/board/";
export default {
  name: 'AddBoard',
  data() {
    return {
      board: new Board('', '', '', ''),
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],
      phoneRules: [
        v => !!v || 'Phone Number is required',
        v =>
          /^\d{10,11}$/.test(v) ||
          'Phone Number must be valid'
      ]
    }
  },
  methods: {
    saveBoard() {
      if (this.$refs.form.validate()) {
        const fd = new FormData();
        fd.append("title", this.board.title);
        fd.append("body", this.board.body);
        fd.append("email", this.board.email);
        fd.append("phone", this.board.phone.replace(/[^0-9]/g, ""));
        if (this.board.files !== null) fd.append("files", this.board.files);
        axios
          .post(url, fd, {
            headers: {
              "Content-Type": "multipart/form-data"
            }
          })
          .then(response => {
            console.log(response.data);
            this.$router.push({ name: 'BoardDetail', params: { id: response.data.id } })
          })
          .catch(error => {
            console.log("Failed to save board", error.response);
          });
      }
    },
    resetForm() {
      (this.board.title = ""),
        (this.board.body = ""),
        (this.board.email = ""),
        (this.board.phone = ""),
        (this.board.files = null);
    }
  },
  components: {
  }
}
</script>