<template>
  <v-app>
    <v-app-bar app>
      <v-toolbar-title>
        <router-link to="/" tag="span" style="cursor: pointer">
          {{ appTitle }}
        </router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-xs-only">
        <v-btn to="/">
          Home
        </v-btn>
        <v-btn v-if=currentUser @click.prevent='logout'>Log-out</v-btn>
        <v-btn v-else to="/login">
          Log-in
        </v-btn>
        <v-btn to="/board">
          board
        </v-btn>
      </v-toolbar-items>
    </v-app-bar>
    <v-main>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",
  computed: {
    currentUser() {
      return this.$store.state.auth.user
    },
  },
  data() {
    return {
      appTitle: 'Soulware',
      menuItems: [
        { title: 'Home', path: '/' },
        { title: 'Login', path: '/login' },
        { title: 'Board', path: '/board' }
      ]
    }
  },
  methods: {
    logout() {
      this.$store.dispatch('auth/logout')
      this.$router.push('/login')
    }
  }
};
</script>
<style>
</style>
