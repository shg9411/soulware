<template>
  <div class='home'>
    <div class='row'>
      <div class='col-md-4 col-lg4' v-for='(data,index) in boardList' :key='index'>
        <h3 @click='detail(data.id)'>{{data.title}}</h3>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
let url = 'http://localhost:8000/boards/board/'
export default {
  name: 'home',
  data () {
    return {
      boardList: []
    }
  },
  mounted () {
    axios({
      method: 'GET',
      url: url
    })
      .then((response) => {
        this.boardList = response.data
      })
      .catch((response) => {
        console.log('Failed to get boardList', response)
      })
  },
  methods: {
    detail (id) {
      this.$router.push({name: 'detail', params: {id: id}})
    }
  }
}
</script>

<style scoped>

</style>
