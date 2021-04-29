<template>
  <div class="text-center" v-if="loading">
    <v-progress-circular indeterminate color="primary" :size="50"></v-progress-circular>
  </div>
  <div class="blog-section" v-else>
    <v-row no-gutters>
      <v-col v-for="blog in current" :key="blog.id" cols="12" sm="6" md="4" lg="3" class="col-pd">
        <v-card :href="blog.link" height="100%">
          <v-img :src="blog.thumbnail"></v-img>
          <v-card-title>{{blog.title}}</v-card-title>
          <v-card-text>
            {{blog.subtitle}}
            <span>{{blog.date|convertUtoL}}</span>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <div class="text-center" v-if="length">
      <v-pagination v-model="page" @input="getPage" :length="length" prev-icon="mdi-menu-left" next-icon="mdi-menu-right"></v-pagination>
    </div>
  </div>
</template>
 
<script>
import http from '@/utils/http'

export default {
  name: 'Blogs',
  data() {
    return {
      page: 1,
      current: [],
      length: null,
      loading: false,
    }
  },
  created() {
    this.init()
  },
  methods: {
    async init() {
      this.getPage(1)
    },
    async getPage(page) {
      this.loading = true
      try {
        const data = await http.process('blog', 'list', { page: page })
        if (data) {
          if (!this.length && data["pages"]) {
            this.length = data["pages"]
          }
          this.current = data["blogs"]
        } else {
          this.length = 0
        }
      } catch (err) {
        console.log(err)
      } finally {
        this.loading = false
      }
    }
  },
}
</script>
