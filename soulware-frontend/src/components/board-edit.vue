<template>
  <v-card>
    <v-container>
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-text-field :error-messages="titleErrors" v-model.trim="board.title" @input="$v.board.title.$touch()" @blur="$v.board.title.$touch()" label="Title" required></v-text-field>
        <v-textarea auto-grow clearable clear-icon="mdi-close-circle" :error-messages="bodyErrors" v-model.trim="board.body" @input="$v.board.body.$touch()" @blur="$v.board.body.$touch()" label="Body" required></v-textarea>
        <v-text-field :error-messages="emailErrors" v-model.trim="board.email" @input="$v.board.email.$touch()" @blur="$v.board.email.$touch()" label="E-mail" required></v-text-field>
        <v-text-field :error-messages="phoneErrors" v-model.trim="board.phone" @input="$v.board.phone.$touch()" @blur="$v.board.phone.$touch()" label="Phone" required></v-text-field>
        <v-row v-for="(file,idx) in current" :key="idx">
          <v-col v-if="visible[idx]" cols="3">
            <v-file-input :clearable="false" label="File" :value="file">
            </v-file-input>
          </v-col>
          <v-col v-if="visible[idx]">
            <v-card-actions>
              <v-btn @click="delOrigin(board.files[idx].id,idx)">
                삭제
              </v-btn>
            </v-card-actions>
          </v-col>
        </v-row>
        <v-file-input :rules="[files => !files.some(file => file.size > 2e7)||'File size cant exceed 20MB']" show-size multiple v-model="new_file" label="File">
          <template v-slot:selection="{index,text}">
            <v-chip close @click:close="deleteChip(index)">{{text}}</v-chip>
          </template>
        </v-file-input>
      </v-form>
      <v-card-actions>
        <v-btn :disabled="$v.$error|| !valid" text color="warning accent-4" @click="showDialog()">
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
import { required, minLength, maxLength, numeric, email } from "vuelidate/lib/validators";
const url = 'http://localhost:8000/boards/board/'
export default {
  name: 'edit',
  props: ['id'],
  data() {
    return {
      board: '',
      valid: true,
      dialog: false,
      header: authHeader(),
      deleted_files: [],
      current: [],
      visible: [],
      new_file: [],
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
  mounted() {
    axios({
      method: 'GET',
      url: url + this.id,
      headers: authHeader()
    })
      .then((response) => {
        this.board = response.data
        for (var i = 0; i < this.board.files.length; i++) {
          this.tmp = new File([], this.board.files[i].originName, { type: "text/plain" })
          this.current.push(this.tmp)
          this.visible.push(true)
        }
      })
      .catch((response) => {
        console.log('Failed to get board', response)
      })
  },
  methods: {
    deleteChip(index) {
      this.new_file.splice(index, 1)
    },
    delOrigin(x, idx) {
      this.deleted_files.push(x)
      this.$set(this.visible, idx, false)
    },
    showDialog() {
      if (this.$refs.form.validate())
        this.dialog = !this.dialog
    },
    save() {

      this.$v.$touch()
      this.$refs.form.validate()
      if (!this.$v.$error) {
        this.dialog = false
        const fd = new FormData();
        fd.append("title", this.board.title);
        fd.append("body", this.board.body);
        fd.append("email", this.board.email);
        fd.append("phone", this.board.phone.replace(/[^0-9]/g, ""));
        for (let i = 0; i < this.deleted_files.length; i++)
          fd.append("deleted_files[]", this.deleted_files[i])
        for (let i = 0; i < this.new_file.length; i++)
          fd.append("files", this.new_file[i])
        this.header['Content-Type'] = 'multipart/form-data'
        axios
          .patch(url + this.board.id + '/', fd, {
            headers: this.header
          })
          .then(response => {
            console.log(response.data);
            this.$router.push({ name: 'BoardDetail', params: { id: response.data.id } })
          })
          .catch(error => {
            console.log("Failed to edit board", error.response);
          });
      }
    }
  }
}
</script>
