<template>
  <v-card>
    <v-list flat>
      <v-subheader>정보</v-subheader>
      <v-list-item-group color="primary">
        <v-list-item v-for="(value,name) in board" :key=name>
          <v-list-item-content>
            <v-list-item-title v-text="name"></v-list-item-title>
          </v-list-item-content>
          <v-spacer></v-spacer>
          <v-list-item-content>
            <v-list-item-title v-text="value"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-card>
</template>
<script>
import axios from 'axios'
import authHeader from '../services/auth-header'
let url = 'http://localhost:8000/boards/board/'
export default {
  name: 'detail',
  props: ['id'],
  data() {
    return {
      board: ''
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
  }
}
</script>
