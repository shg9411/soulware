<template>
  <v-card class="mx-auto">
    <v-container fluid>
      <v-row>
        <v-col cols="12">
          <v-card v-for='(item, index) in boards' :key=index>
            <v-card-title @click="detail(item.id)" class="headline" v-html="item.title"></v-card-title>
            <v-card-subtitle v-html="item.body"></v-card-subtitle>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
import axios from "axios"
import authHeader from "../services/auth-header"
let url = "http://localhost:8000/boards/";
export default {
  name: 'Board',
  data() {
    return {
      boards: ''
    }
  },
  mounted() {
    axios.get(url + "board", { headers: authHeader() }).then(
      response => {
        this.boards = response.data
      },
      error => {
        this.boards = (error.response && error.response.data) || error.message || error.toString()
      }
    )
  },
  components: {

  },
  methods: {
    detail(id) {
      this.$router.push({ name: 'BoardDetail', params: { id: id } })
    }
  }
}
</script>
