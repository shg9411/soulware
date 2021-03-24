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
    <div class="text-center">
      <v-pagination v-model="page" :length="length" prev-icon="mdi-menu-left" next-icon="mdi-menu-right"></v-pagination>
    </div>
  </v-card>
</template>

<script>
import axios from "axios"
import authHeader from "../services/auth-header"
const url = "http://localhost:8000/boards/";
export default {
  name: 'Board',
  data() {
    return {
      page: 1,
      boards: '',
      length: null,
    }
  },
  watch: {
    page: function (val) {
      this.getPage(val)
    }
  },
  mounted() {
    this.getPage(1)
  },
  components: {

  },
  methods: {
    getPage(page) {
      axios.get(url + "board/?page=" + page, { headers: authHeader() }).then(
        response => {
          this.boards = response.data.results
          if (this.length == null)
            this.length = Math.ceil(response.data.count / 3)
        },
        error => {
          this.boards = (error.response && error.response.data) || error.message || error.toString()
        }
      )
    },
    detail(id) {
      this.$router.push({ name: 'BoardDetail', params: { id: id } })
    }
  }
}
</script>
