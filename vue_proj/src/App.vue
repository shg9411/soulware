<template>
  <div id='app'>
    <li class='nav-item'>
      <router-link class='nav-link' to='/board'>Board</router-link>
    </li>
    <li class='nav-item'>
      <router-link class='nav-link' to='/login'>Login</router-link>
    </li>
    <li class="nav-item">
      <a class="nav-link" href @click.prevent="logOut">Logout
      </a>
    </li>
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
  methods: {
    logOut () {
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
