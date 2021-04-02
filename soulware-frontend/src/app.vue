<template>
  <v-app>
    <v-app-bar :color="bg" app class="nav-section">
      <v-toolbar-title>
        <router-link to="/" tag="span" style="cursor: pointer">
          {{ appTitle }}
        </router-link>
        <span class="slogan">혼이 담긴 소프트웨어</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-xs-only">
        <v-btn v-for="(item,idx) in menuItems" :href="item.path" :key=idx>
          {{item.title}}
        </v-btn>
      </v-toolbar-items>
      <v-toolbar-items class="hidden-sm-and-up">
        <v-menu :close-on-content-click="false" open-on-hover bottom offset-y>
          <template v-slot:activator="{on}">
            <v-app-bar-nav-icon v-on="on"></v-app-bar-nav-icon>
          </template>
          <v-list>
            <v-list-item v-for="(item,idx) in menuItems" :href="item.path" :key=idx>
              <v-list-item-content>
                <v-list-item-title>
                  {{item.title}}
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-toolbar-items>
    </v-app-bar>
    <v-main class="pa-0">
      <v-container fluid class="pa-0">
        <router-view></router-view>
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
  computed: {
    currentUser() {
      return this.$store.state.auth.user
    },
  },
  data() {
    return {
      bg: 'transparent',
      appTitle: 'SOULWARE',
      menuItems: [
        { title: 'Sovit', path: '/sovit' },
        { title: '포트폴리오', path: '/portfolio' },
        { title: '회사소개', path: '/about' },
      ]
    }
  },
  mounted() {
    window.onscroll = () => {
      this.changeColor();
    };
  },
  methods: {
    changeColor() {
      if (
        document.body.scrollTop > 400 ||
        document.documentElement.scrollTop > 400
        //스크롤 정도
        //여기에 숫자 대신 이미지 높이로 하시면 될 것 같아요.
      ) {
        this.bg = 'black'; //여기가 스크롤 시  app-bar 색깔입니다.
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
