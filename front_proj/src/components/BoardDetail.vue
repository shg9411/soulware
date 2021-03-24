<template>
  <v-card>
    <v-card-text>
      <v-list flat>
        <v-subheader>정보</v-subheader>
        <v-list-item-group color="primary">
          <v-list-item v-for="(value,name) in board" :key=name>
            <v-list-item-content>
              <v-list-item-title v-text="name"></v-list-item-title>
            </v-list-item-content>
            <v-list-item-content>
              <v-list-item-title v-text="value"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
      <v-card-actions>
        <v-btn text color="teal accent-4" @click="showDialog()">
          Delete
        </v-btn>
        <v-btn text color="teal accent-4" @click="edit()">
          Edit
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
const url = 'http://localhost:8000/boards/board/'
export default {
  name: 'detail',
  props: ['id'],
  data() {
    return {
      board: '',
      dialog: false
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
      this.$router.push({ name: 'BoardEdit', params: { id: this.id, board: this.board } })
    },
    del() {
      this.dialog = false
      axios({
        method: 'DELETE',
        url: url + this.id + '/',
        headers: authHeader()
      }).then((response) => {
        console.log(response.data)
        this.$router.push('/board')
      }).catch((response) => {
        console.log('Failed to delete board', response)
      })
    }
  }
}
</script>
