<template>
  <v-app>
    <v-navigation-drawer right v-model="drawer" fixed temporary class="navigation-menu">
      <router-link :to="{name:'Board'}" class="top-logo" tag="div">
        <em></em>
      </router-link>
      <v-list dense>
        <v-list-item v-for="item in menuItems" :key="item.title" :to="{name:item.name}">
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar :color="bg" app class="nav-section">
      <v-toolbar-title>
        <router-link active-class="active" :to="{name:'Home'}" tag="span" style="cursor: pointer">
          {{ appTitle }}
        </router-link>
        <span class="slogan">혼이 담긴 소프트웨어</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-xs-only" v-if="!loggedIn">
        <v-btn :to="{name:'Board'}">
        </v-btn>
        <v-btn active-class="active" v-for="(item,idx) in menuItems" :to="{name:item.name}" :key="idx">
          {{item.title}}
        </v-btn>
      </v-toolbar-items>
      <v-toolbar-items class="hidden-xs-only" v-else>
        <v-btn active-class="active" :to="{name:'Board'}">
          Admin
        </v-btn>
        <v-btn @click="showDialog()">Logout</v-btn>
        <v-dialog v-model="dialog" max-width="500px">
          <v-card>
            <v-card-title>Logout</v-card-title>
            <v-card-text>로그아웃 하시겠습니까?</v-card-text>
            <v-card-actions>
              <v-btn color="warning" text @click="logout()">예</v-btn>
              <v-btn color="warning" text @click="dialog = false">아니오</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar-items>
      <v-toolbar-items class="hidden-sm-and-up menu-btn">
        <v-btn @click.stop="drawer = !drawer">
          <v-app-bar-nav-icon></v-app-bar-nav-icon>
        </v-btn>
      </v-toolbar-items>
    </v-app-bar>
    <v-main class="pa-0">
      <v-container fluid class="pa-0">
        <router-view></router-view>
        <div v-show="check">
          <!-- chatbot -->
          <!-- <v-fab-transition>
            <v-btn dark fixed bottom right fab class="fab-chatbot">
              <em></em>
            </v-btn>
          </v-fab-transition> -->
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
import { mapState, mapActions } from 'vuex'
export default {
  name: "App",
  data() {
    return {
      drawer: false,
      bg: '',
      base: '',
      appTitle: 'SOULWARE',
      dialog: false,
      menuItems: [
        { title: 'SOVIT', name: 'Sovit' },
        { title: '포트폴리오', name: 'Portfolio' },
        { title: '회사소개', name: 'About' },
        { title: '문의하기', name: 'AddBoard' },
      ]
    }
  },
  computed: {
    ...mapState({
      loggedIn: state => state.auth.loggedIn,
    }),
    check() {
      let to = this.$route
      if (to && to.meta && to.meta.bg) {
        this.base = 'realBlack'
        this.bg = this.base
      }
      else {
        this.base = 'transparent'
        this.bg = this.base
      }
      if (to && to.meta && to.meta.hide) {
        return false
      } else {
        return true
      }
    }
  },
  mounted() {
    window.addEventListener('scroll', this.changeColor)
  },
  methods: {
    changeColor() {
      if (this.base == 'transparent') {
        if (
          document.body.scrollTop > 578 ||
          document.documentElement.scrollTop > 578
        ) {
          this.bg = 'black';
        } else {
          this.bg = this.base;
        }
      }
    },
    showDialog() {
      this.dialog = true
    },
    logout() {
      this.dialog = false
      this.out().then(
        () => this.$router.push('/').catch(() => { })
      )
    },
    ...mapActions({
      out: "auth/logout"
    })
  }
};
</script>