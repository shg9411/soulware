<template>
  <v-card>
    <v-container>
      <v-form ref="form" lazy-validation>
        <v-text-field v-model="board.title" :rules="[v => !!v || 'Title is required']" label="Title" required></v-text-field>
        <v-text-field v-model="board.body" :rules="[v => !!v || 'Body is required']" label="Body" required></v-text-field>
        <v-text-field v-model="board.email" :rules="emailRules" label="E-mail" required></v-text-field>
        <v-text-field v-model="board.phone" :rules="phoneRules" label="Phone" required></v-text-field>
        <!-- <v-file-input v-for="(file,idx) in current" label="File" v-bind:key="idx" :value="file">
        </v-file-input> -->
      </v-form>
      <v-card-actions>
        <v-btn text color="warning accent-4" @click="showDialog()">
          Save
        </v-btn>
        <v-btn text color="warning accent-4" @click="$router.go(-1)">
          Cancle
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
import authHeader from '../services/auth-header'
const url = 'http://localhost:8000/boards/board/'
export default {
  name: 'edit',
  props: ['id'],
  data() {
    return {
      board: '',
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
      ],
      deleted_files: [],
      // current: [],
      // tmp: ''
    }
  },
  mounted() {
    axios({
      method: 'GET',
      url: url + this.id,
      headers: authHeader()
    })
      .then((response) => {
        this.board = response.data
        // for (var i = 0; i < this.board.files.length; i++) {
        //   this.tmp = new File([], this.board.files[i].originName, { type: "text/plain" })
        //   console.log(this.current.push(this.tmp))
        // }
      })
      .catch((response) => {
        console.log('Failed to get board', response)
      })
  },
  methods: {
    showDialog() {
      if (this.$refs.form.validate())
        this.dialog = !this.dialog
    },
    save() {
      this.dialog = false
      const fd = new FormData();
      fd.append("title", this.board.title);
      fd.append("body", this.board.body);
      fd.append("email", this.board.email);
      fd.append("phone", this.board.phone.replace(/[^0-9]/g, ""));
      for (var i = 0; i < this.deleted_files.length; i++)
        fd.append("deleted_files[]", this.deleted_files[i])
      // if (this.board.files !== null) fd.append("files", this.board.files);
      // this.header['Content-Type'] = 'multipart/form-data'
      axios
        .patch(url + this.board.id + '/', fd, {
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
