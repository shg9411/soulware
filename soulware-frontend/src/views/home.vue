<template>
  <div>
    <v-carousel class="main-carousel" :show-arrows="false" cycle hide-delimiter-background>
      <v-carousel-item class="carousel1">
        <v-sheet height="100%">
          <v-row class="fill-height ma-0" align="center" justify="center">
            <h1> 웹/앱/IoT/화상회의/딥러닝<br />
              “ 전문 소프트웨어 개발사 ”</h1>
          </v-row>
        </v-sheet>
      </v-carousel-item>
      <v-carousel-item class="carousel2">
        <v-sheet height="100%">
          <v-row class="fill-height ma-0 flex-column" align="center" justify="center">
            <h1> “ Idea to Business ” </h1>
            <p>아이디어를 넘어 비지니스로 향하는 길에 소울웨어와 함께하세요!</p>
          </v-row>
        </v-sheet>
      </v-carousel-item>
    </v-carousel>
    <div class="portfolio-section">
      <v-row no-gutters>
        <v-col cols="12" sm="4" class="col-cover">
          <v-card elevation="0" :to="{name:'ChungdahmLearning'}">
            <em class="chungdahm-learning"></em>
            <v-card-title>Learning portal 4.0</v-card-title>
            <v-card-text>
              <p>(주)청담러닝포털 4.0</p>
              <span># Fullstack # Responsive web # BootstrapVue</span>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" sm="4" class="col-cover">
          <v-card elevation="0" :to="{name:'YujinIclebo'}">
            <em class="iclebo"></em>
            <v-card-title>iClebo O5</v-card-title>
            <v-card-text>
              <p>로봇청소기 원격제어 플랫폼</p>
              <span># Cross-platform # Ionic Framework # AWS</span>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" sm="4" class="col-cover">
          <v-card elevation="0" :to="{name:'ChungdahmAllim'}">
            <em class="allim"></em>
            <v-card-title>Allim app</v-card-title>
            <v-card-text>
              <p>(주)청담러닝 학부모앱</p>
              <span># Cross-platform # Veutify Framework # Cordova plugin</span>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
      <v-btn :to="'/portfolio'" rounded class="more-btn">
        포트폴리오 더보기
      </v-btn>
    </div>
    <div class="service-section">
    </div>
    <div class="client-section">
      <v-row no-gutters>
        <v-col>
          <em class="logo1"></em>
        </v-col>
        <v-col>
          <em class="logo2"></em>
        </v-col>
        <v-col>
          <em class="logo3"></em>
        </v-col>
        <v-col>
          <em class="logo4"></em>
        </v-col>
        <v-col>
          <em class="logo5"></em>
        </v-col>
      </v-row>
    </div>
    <div class="auth-section">
      <v-row no-gutters>
        <v-col cols="12" sm="4" class="col-xs-pd">
          <em class="auth1"></em>
          <div class="text-info">
            <h3>01</h3>
            <h2>기업부설연구소<br />
              인정서
            </h2>
            <p>한국산업기술진흥협회</p>
          </div>
        </v-col>
        <v-col cols="12" sm="4" class="col-xs-pd">
          <em class="auth2"></em>
          <div class="text-info">
            <h3>02</h3>
            <h2>벤처기업확인서
            </h2>
            <p>KIBO 기술보증기금</p>
          </div>
        </v-col>
        <v-col cols="12" sm="4" class="col-xs-pd">
          <em class="auth3"></em>
          <div class="text-info">
            <h3>03</h3>
            <h2>상표등록증
            </h2>
            <p>특허청</p>
          </div>
        </v-col>
      </v-row>
    </div>
    <div class="text-center" v-if="loading">
      <v-progress-circular indeterminate color="primary" :size="50"></v-progress-circular>
    </div>
    <div class="blog-section" v-else>
      <v-row no-gutters>
        <v-col v-for="blog in current" :key=blog.id cols="12" sm="6" md="4" lg="3" class="col-pd">
          <v-card :href=blog.link>
            <v-img v-bind:src="blog.thumbnail"></v-img>
            <v-card-title>{{blog.title}}</v-card-title>
            <v-card-text>
              {{blog.subtitle}}
              <span v-text=convertUtoL(blog.date)></span>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
      <div class="text-center" v-if="length">
        <v-pagination v-model="page" :length="length" prev-icon="mdi-menu-left" next-icon="mdi-menu-right"></v-pagination>
      </div>
    </div>
  </div>

</template>

<script>
import http from '@/utils/http'

export default {
  name: 'Home',
  data() {
    return {
      page: 1,
      hidden: false,
      length: null,
      current: [],
      loading: '',
    }
  },
  watch: {
    page: function (val) {
      this.getPage(val)
    }
  },
  created() {
    this.init()
  },
  methods: {
    async init() {
      this.getPage(1)
    },
    convertUtoL(date) {
      return new Date(date * 1000).toLocaleDateString("ko-KR")
    },
    async getPage(page) {
      this.loading = true
      try {
        const data = await http.get('/blogs', { page: page })
        if (!this.length) {
          if (data["pages"])
            this.length = data["pages"]
          else {
            this.length = 0
            return
          }
        }
        this.current = data["blogs"]
      } catch (err) {
        console.log(err)
      }
      this.loading = false
    }
  },
}
</script>
