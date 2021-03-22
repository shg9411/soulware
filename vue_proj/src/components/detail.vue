<template>
  <div class='detail'>
    <div class='container'>
      <div v-for="(value, name) in  board" v-if="value != null" v-bind:key="value">
        {{ name }} : {{ value }}
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
let url = 'http://localhost:8000/boards/board/'
export default {
  name: 'detail',
  props: ['id'],
  data () {
    return {
      board: ''
    }
  },
  mounted () {
    axios({
      method: 'GET',
      url: url + this.id
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
