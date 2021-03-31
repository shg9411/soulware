<template>
  <v-card>
    <v-card-text>
      <v-form ref="form" lazy-validation>
        <v-text-field v-model="board.title" :rules="[v => !!v || 'Title is required']" label="Title" required></v-text-field>
        <v-text-field v-model="board.body" :rules="[v => !!v || 'Body is required']" label="Body" required></v-text-field>
        <v-text-field v-model="board.email" :rules="emailRules" label="E-mail" required></v-text-field>
        <v-text-field v-model="board.phone" :rules="phoneRules" label="Phone" required></v-text-field>
        <v-file-input show-size multiple v-model="board.files" label="File">
          <template v-slot:selection="{index,text}">
            <v-chip close @click:close="deleteChip(index)">{{text}}</v-chip>
          </template>
        </v-file-input>
        <v-card-actions>
          <v-btn text color="teal accent-4" @click="saveBoard()">
            Save
          </v-btn>
          <v-btn text color="teal accent-4" @click="resetForm()">
            Reset
          </v-btn>
        </v-card-actions>
      </v-form>
    </v-card-text>
  </v-card>
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
    deleteChip(index) {
      this.board.files.splice(index, 1)
    },
    saveBoard() {
      if (this.$refs.form.validate()) {
        if (this.board.files !== null && this.board.files.length > 0) {
          console.log("Multipart")
          const fd = new FormData();
          fd.append("title", this.board.title);
          fd.append("body", this.board.body);
          fd.append("email", this.board.email);
          fd.append("phone", this.board.phone.replace(/[^0-9]/g, ""));
          for (let i = 0; i < this.board.files.length; i++) {
            fd.append("files", this.board.files[i])
          }
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
        } else {
          console.log("JSON")
          axios
            .post(url, this.board, {
            })
            .then(response => {
              console.log(response.data);
              this.$router.push({ name: 'BoardDetail', params: { id: response.data.id } })
            })
            .catch(error => {
              console.log("Failed to save board", error.response);
            });
        }
      }
    },
    resetForm() {
      (this.board.title = "");
      (this.board.body = "");
      (this.board.email = "");
      (this.board.phone = "");
      (this.board.files = null);
    }
  },
}
</script>