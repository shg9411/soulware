<template>
  <div>
    <div class="airport-top portfolio-top">
      <v-row no-gutters class="portfolio-info-common">
        <v-col cols="8" sm="9" md="10">
          <span>인천공항 가이드앱 / Client: 인천국제공항공사 / Device : Mobile phone / Date : 2017.11 ~ 2018.02 </span>
        </v-col>
        <v-col cols="4" sm="3" md="2" class="text-right">
          <v-btn icon color="white" @click="$router.go(-1)">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-col>
      </v-row>
      <h2>Incheon Airport</h2>
      <p>인천공항 가이드앱</p>
    </div>
    <div class="airport-overview-section">
      <h2>OVERVIEW</h2>
      <p>2018년 1월 18일 인천공항 제2터미널 오픈에 맞추어 전면 리뉴얼된 인천공항 가이드 공식 앱 개발<br />
        실시간 출발/도착 항공편 조회 및 상태에 따른 개인별 Push 제공, 공항 내 쇼핑&식당, 편의 서비스, 교통&주차 안내를 통한 인천국제공항 사용자의 편의성 증진<br />
        한국어를 포함한, 영어/중국어/일본어 제공(i18n)
      </p>
    </div>
    <div class="airport-overview-img">
      <em></em>
    </div>
    <div class="airport-main-section">
      <h3>MAIN</h3>
      <em></em>
    </div>
    <div class="page-slide-section">
      <infinite-slide-bar duration="30s">
        <div class="items">
          <div v-for="(image,idx) in images" :key="idx">
            <div class="ma-10">
              <img :src="image" />
            </div>
          </div>
        </div>
      </infinite-slide-bar>
    </div>
    <div class="ionic-section">
    </div>
    <div class="way-section">
      <h3>SEEKING FOR A WAY</h3>
      <p>전국 길찾기 (Open Layer, Google 길안내 API)</p>

    </div>
    <div class="airport-internationalization-section">
      <h3>Internationalization</h3>
      <em></em>
    </div>
  </div>
</template>
<script>
import InfiniteSlideBar from "vue-infinite-slide-bar"
export default {
  name: 'IncheonAirport',
  components: {
    InfiniteSlideBar
  },
  data() {
    return {
      images: [
        require('@/assets/images/airport_slide1.png'),
        require('@/assets/images/airport_slide2.png'),
        require('@/assets/images/airport_slide3.png'),
        require('@/assets/images/airport_slide4.png'),
        require('@/assets/images/airport_slide5.png'),
        require('@/assets/images/airport_slide6.png'),
        require('@/assets/images/airport_slide7.png'),
        require('@/assets/images/airport_slide8.png'),
        require('@/assets/images/airport_slide9.png'),
        require('@/assets/images/airport_slide10.png'),
      ]
    }
  },
}
</script>

<style scoped>
.items {
  display: flex;
  justify-content: space-around;
}
img {
  height: 15rem;
}
</style>