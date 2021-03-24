<template>
  <v-card>
    <v-container>
      <v-form ref="form" lazy-validation>
        <v-text-field v-model="editedBoard.title" :rules="[v => !!v || 'Title is required']" label="Title" required></v-text-field>
        <v-text-field v-model="editedBoard.body" :rules="[v => !!v || 'Body is required']" label="Body" required></v-text-field>
        <v-text-field v-model="editedBoard.email" :rules="emailRules" label="E-mail" required></v-text-field>
        <v-text-field v-model="editedBoard.phone" :rules="phoneRules" label="Phone" required></v-text-field>
        <v-file-input v-model="editedBoard.files" label="File"></v-file-input>
      </v-form>
      <v-card-actions>
        <v-btn text color="teal accent-4" @click="showDialog()">
          Save
        </v-btn>
      </v-card-actions>
    </v-container>
    <v-dialog v-model="dialog" max-width="500px">
      <v-card>
        <v-card-title>Save</v-card-title>
        <v-card-text>저장하시겠습니까?</v-card-text>
        <v-card-actions>
          <v-btn color="warning" text @click="save()">예</v-btn>
          <v-btn color="warning" text @click="dialog = false">아니오</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
</template>
 
<script>
import axios from "axios";
import Board from "../models/board"
import authHeader from '../services/auth-header'
const url = 'http://localhost:8000/boards/board/'
export default {
  name: 'edit',
  props: ['board'],
  data() {
    return {
      editedBoard: new Board(this.board.title, this.board.body, this.board.email, this.board.phone),
      dialog: false,
      header: authHeader(),
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
    showDialog() {
      if (this.$refs.form.validate())
        this.dialog = !this.dialog
    },
    save() {
      this.dialog = false
      const fd = new FormData();
      fd.append("title", this.editedBoard.title);
      fd.append("body", this.editedBoard.body);
      fd.append("email", this.editedBoard.email);
      fd.append("phone", this.editedBoard.phone.replace(/[^0-9]/g, ""));
      if (this.editedBoard.files !== null) fd.append("files", this.editedBoard.files);
      this.header['Content-Type'] = 'multipart/form-data'
      axios
        .put(url + this.board.id + '/', fd, {
          headers: this.header
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
}
</script>
