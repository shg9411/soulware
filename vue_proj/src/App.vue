<template>
  <div id='app'>
    <div class='nav-item'>
      <router-link class='nav-link' to='/board'>게시글 작성</router-link>
      <a v-if='currentUser' class="nav-link" href @click.prevent="logOut">Logout</a>
    </div>
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
  computed: {
    currentUser() {
      return this.$store.state.auth.user
    }
  },
  methods: {
    logOut() {
      this.$store.dispatch('auth/logout')
      this.$router.push('/login')
    }
  }
}
</script>

<style>
#app {
}
</style>
