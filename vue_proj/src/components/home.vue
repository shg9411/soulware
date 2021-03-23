<template>
  <div class='container'>
    <div class='jumbotron'>
      <div v-for='(data, index) in  content' v-bind:key='index'>
        <h4 @click='detail(data.id)'>{{data.title}} - {{data.body}}</h4>
      </div>
    </div>
  </div>
</template>

<script>
import UserService from '../services/user.service'
export default {
  name: 'home',
  data() {
    return {
      content: ''
    }
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn
    }
  },
  created() {
    if (!this.loggedIn) {
      this.$router.push('/login')
    }
  },
  mounted() {
    UserService.getBoard().then(
      response => {
        this.content = response.data
      },
      error => {
        this.content =
          (error.response && error.response.data) ||
          error.message ||
          error.toString()
      }
    )
  },
  methods: {
    detail(id) {
      this.$router.push({ name: 'detail', params: { id: id } })
    }
  }
}
</script>
