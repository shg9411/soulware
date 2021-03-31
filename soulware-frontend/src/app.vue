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
        <v-btn v-for="(item,idx) in menuItems" :href="item.path" :key=idx>
          {{item.title}}
        </v-btn>
      </v-toolbar-items>
    </v-app-bar>
    <v-main>
      <v-container>
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
        { title: 'About', path: '/about' },
        { title: 'Portfolio', path: '/portfolio' },
        { title: 'Sovit', path: '/sovit' },
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
