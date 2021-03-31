<template>
  <v-card>
    <v-card-text>
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-text-field :error-messages="titleErrors" v-model.trim="board.title" @input="$v.board.title.$touch()" @blur="$v.board.title.$touch()" label="Title" required></v-text-field>
        <v-text-field :error-messages="bodyErrors" v-model.trim="board.body" @input="$v.board.body.$touch()" @blur="$v.board.body.$touch()" label="Body" required></v-text-field>
        <v-text-field :error-messages="emailErrors" v-model.trim="board.email" @input="$v.board.email.$touch()" @blur="$v.board.email.$touch()" label="E-mail" required></v-text-field>
        <v-text-field :error-messages="phoneErrors" v-model.trim="board.phone" @input="$v.board.phone.$touch()" @blur="$v.board.phone.$touch()" label="Phone" required></v-text-field>
        <v-file-input :rules="[files => !files.some(file => file.size > 2e7)||'File size cant exceed 20MB']" show-size multiple v-model="files" label="File">
          <template v-slot:selection="{index,text}">
            <v-chip close @click:close="deleteChip(index)">{{text}}</v-chip>
          </template>
        </v-file-input>
        <v-card-actions>
          <v-btn :disabled="$v.$error|| !valid" text color=" teal accent-4" @click="saveBoard()">
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
import { required, minLength, maxLength, numeric, email } from "vuelidate/lib/validators";
const url = "http://localhost:8000/boards/board/";
export default {
  name: 'AddBoard',
  data() {
    return {
      board: new Board('', '', '', ''),
      valid: true,
      files: []
    }
  },
  validations: {
    board: {
      title: {
        required,
        maxLength: maxLength(30)
      },
      body: {
        required,
        maxLength: maxLength(200)
      },
      email: {
        required,
        email
      },
      phone: {
        required,
        numeric,
        minLength: minLength(8),
        maxLength: maxLength(15)
      }
    }
  },
  computed: {
    titleErrors() {
      const errors = []
      if (!this.$v.board.title.$dirty) return errors
      !this.$v.board.title.required && errors.push('Title is required.')
      !this.$v.board.title.maxLength && errors.push('Title must be at most 30 characters long')
      return errors
    },
    bodyErrors() {
      const errors = []
      if (!this.$v.board.body.$dirty) return errors
      !this.$v.board.body.required && errors.push('Body is required')
      !this.$v.board.body.maxLength && errors.push('Body must be at most 200 characters long')
      return errors
    },
    phoneErrors() {
      const errors = []
      if (!this.$v.board.phone.$dirty) return errors
      !this.$v.board.phone.required && errors.push('Phone number is required.')
      !this.$v.board.phone.numeric && errors.push('Phone number only numeric')
      !this.$v.board.phone.minLength && errors.push('Phone number must be at least 8 numeric')
      !this.$v.board.phone.maxLength && errors.push('Phone number must be at most 15 numeric')
      return errors
    },
    emailErrors() {
      const errors = []
      if (!this.$v.board.email.$dirty) return errors
      !this.$v.board.email.email && errors.push('Must be valid e-mail')
      !this.$v.board.email.required && errors.push('E-mail is required')
      return errors
    }
  },
  methods: {
    deleteChip(index) {
      this.files.splice(index, 1)
    },
    saveBoard() {
      this.$v.$touch()
      this.$refs.form.validate()
      if (!this.$v.$error) {
        if (this.files !== null && this.files.length > 0) {
          console.log("Multipart")
          const fd = new FormData();
          fd.append("title", this.board.title);
          fd.append("body", this.board.body);
          fd.append("email", this.board.email);
          fd.append("phone", this.board.phone.replace(/[^0-9]/g, ""));
          for (let i = 0; i < this.files.length; i++) {
            fd.append("files", this.files[i])
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
              alert("게시글 작성에 실패하였습니다.")
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
              alert("게시글 작성에 실패하였습니다.")
            });
        }
      }
    },
    resetForm() {
      this.$v.$reset();
      this.board.title = "";
      this.board.body = "";
      this.board.email = "";
      this.board.phone = "";
      this.board.files = null;
    }
  },
}
</script>