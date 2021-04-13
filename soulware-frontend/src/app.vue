<template>
  <v-app>
    <v-navigation-drawer right v-model="drawer" fixed temporary>
      <v-list dense>
        <v-list-item v-for="item in menuItems" :key="item.title" :to="item.path">
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar :color="bg" app class="nav-section">
      <v-toolbar-title>
        <router-link :to="{name:'Home'}" tag="span" style="cursor: pointer">
          {{ appTitle }}
        </router-link>
        <span class="slogan">혼이 담긴 소프트웨어</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-xs-only">
        <v-btn v-for="(item,idx) in menuItems" :to="item.path" :key=idx>
          {{item.title}}
        </v-btn>
      </v-toolbar-items>
      <v-toolbar-items class="hidden-sm-and-up">
        <v-btn @click.stop="drawer = !drawer">
          <v-app-bar-nav-icon></v-app-bar-nav-icon>
        </v-btn>
      </v-toolbar-items>
    </v-app-bar>
    <v-main class="pa-0">
      <v-container fluid class="pa-0">
        <router-view></router-view>
        <div v-show="float">
          <v-fab-transition>
            <v-btn dark fixed bottom right fab class="fab-chatbot">
              <em></em>
            </v-btn>
          </v-fab-transition>
          <v-fab-transition>
            <v-btn :to="{name:'AddBoard'}" dark fixed bottom right fab class="fab-contact">
              문의하기
            </v-btn>
          </v-fab-transition>
        </div>
      </v-container>
    </v-main>
    <v-footer class="sw-footer">
      <p>TEL : 010-4547-4802 E-MAIL : tom@soulware.kr</p><br />
      <p>Address : 서울특별시 강남구 테헤란로 2길 8, 4층 / 경기도 부천시 경인로 522 310호 (기업부설연구소)<br />
        사업자등록번호 : 547-86-01588 대표이사 : 이상협</p>
      <p>Copyright ⓒ soulware. All Rights Reserved.</p>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      drawer: false,
      bg: 'transparent',
      appTitle: 'SOULWARE',
      menuItems: [
        { title: 'Sovit', path: '/sovit' },
        { title: '포트폴리오', path: '/portfolio' },
        { title: '회사소개', path: '/about' },
      ]
    }
  },
  computed: {
    float() {
      let to = this.$route
      if (to && to.meta && to.meta.float) {
        return true
      }
      return false
    }
  },
  mounted() {
    window.addEventListener('scroll', this.changeColor)
  },
  methods: {
    changeColor() {
      if (
        document.body.scrollTop > 578 ||
        document.documentElement.scrollTop > 578
      ) {
        this.bg = 'black';
      } else {
        this.bg = 'transparent';
      }
    },
    logout() {
      this.$store.dispatch('auth/logout')
      this.$router.push('/login')
    }
  }
};
</script>
<style>
</style>