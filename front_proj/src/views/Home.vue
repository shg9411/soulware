<template>
  <v-container fluid>
    <v-layout row wrap>
      <v-flex xs12 class="text-xs-center" mt-5>
        <router-link to="/add" tag="span" style="cursor: pointer">작성</router-link>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>

export default {
  name: 'Home',
  components: {

  }
}
</script>
