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
          <v-card elevation="0">
            <em class="chungdahm-learning"></em>
            <v-card-title>Chungdahm Learning</v-card-title>
            <v-card-text>
              <p>청담러닝 사이트</p>
              <span># Responsive web # mobile webapp support </span>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" sm="4" class="col-cover">
          <v-card elevation="0">
            <em class="iclebo"></em>
            <v-card-title>iClebo O5</v-card-title>
            <v-card-text>
              <p>방과후 학교 솔루션</p>
              <span># STB Viewer # Veutify Framework # Libray </span>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" sm="4" class="col-cover">
          <v-card elevation="0">
            <em class="allim"></em>
            <v-card-title>allim</v-card-title>
            <v-card-text>
              <p>(주)청담러닝 학부모앱</p>
              <span># Hybrid APP # Veutify Framework # Cordova plugin</span>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
      <v-btn rounded class="more-btn">
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
    <div class="blog-section">
      <v-row no-gutters>
        <v-col v-for="(blog,i) in current" :key=i cols="12" sm="6" md="4" lg="3" class="col-pd">
          <v-card :href=blog.link>
            <v-img v-bind:src="blog.thumbnail"></v-img>
            <v-card-title v-html="blog.title"></v-card-title>
            <v-card-text v-html="blog.subtitle+'<span>'+blog.date+'</span>'">
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
      <div class="text-center">
        <v-pagination v-model="page" :length="length" prev-icon="mdi-menu-left" next-icon="mdi-menu-right"></v-pagination>
      </div>
    </div>
    <v-fab-transition>
      <v-btn v-show="!hidden" dark fixed bottom right fab class="fab-chatbot">
        <em></em>
      </v-btn>
    </v-fab-transition>
    <v-fab-transition>
      <v-btn v-show="!hidden" dark fixed bottom right fab class="fab-contact">
        문의하기
      </v-btn>
    </v-fab-transition>
  </div>

</template>

<script>
import axios from 'axios'
const url = 'http://localhost:8000'
const size = 8

export default {
  name: 'Home',
  data() {
    return {
      page: 0,
      hidden: false,
      tmpBlogs: '',
      blogs: [],
      length: null,
      current: [],
    }
  },
  watch: {
    page: function (val) {
      this.setPage(val)
    }
  },
  mounted() {
    axios({
      method: 'GET',
      url: url + '/blogs/',
    })
      .then((response) => {
        if (response.data["blogs"]) {
          this.tmpBlogs = response.data["blogs"]
          this.length = Math.ceil(this.tmpBlogs.length / size)
          if (this.length > 0)
            this.page = 1
          for (var i = 0; i < this.tmpBlogs.length; i++) {
            this.blogs.push({ link: this.tmpBlogs[i]["link"], date: new Date(this.tmpBlogs[i]["date"]).toDateString(), title: this.tmpBlogs[i]["title"]["rendered"], subtitle: decodeURIComponent(this.tmpBlogs[i]["excerpt"]["rendered"]), thumbnail: this.tmpBlogs[i]['_embedded']['wp:featuredmedia'][0]['source_url'] })
          }
        }
      })
      .catch((error) => {
        console.log(error)
      })
  },
  methods: {
    setPage(val) {
      this.current = []
      for (var i = (val - 1) * size; i < this.blogs.length && i < (val) * size; i++)
        this.current.push(this.blogs[i])
    },
  }
}
</script>
