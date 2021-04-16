<template>
  <div>
    <div class="allim-top portfolio-top">
      <v-row no-gutters class="portfolio-info-common">
        <v-col cols="8" sm="9" md="10">
          <span>청담러닝 올림앱(학보모앱) 개발 / Client: Chungdahm Learning / Device : Mobile phone / Date : 2020.05 ~ 2021.01 </span>
        </v-col>
        <v-col cols="4" sm="3" md="2" class="text-right">
          <v-btn icon color="white" @click="$router.go(-1)">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-col>
      </v-row>
      <em></em>
    </div>
    <div class="allim-overview-section">
      <h2>OVERVIEW</h2>
      <p>Allim 앱은 (주)청담러닝이 운영하고 있는 학부모 전용 서비스로 학생들의 학습관리 정보와 출석현황, 학원소식, 교육정보 교육비 결제 등을 빠르고 간편하게 할 수 있도록 제작.<br />
        Allim 앱을 통한 웹과 학원에서 결제되던 패턴이 모바일에서 편리하게 결제되고, 학부모와의 원활한 커뮤니케이션이 이루어지게 됨.</p>
    </div>
    <div class="allim-overview-img">
      <em></em>
    </div>
    <div class="allim-main-section">
      <em></em>
    </div>
    <div class="bg-sky-blue"></div>
    <div class="allim-detail-section">
      <h3 class="allim-sub-title">DETAIL</h3>
      <p class="allim-sub-text">학원일정, 마일리지, 앨범, 채널청담</p>

    </div>
    <div class="allim-payment-section">
      <h3 class="allim-sub-title">PAYMENT</h3>
      <p class="allim-sub-text">기술적 설명을 넣을 것입니다.</p>

      <infinite-slide-bar duration="30s">
        <div class="items">
          <div v-for="(image,i) in images" :key="i">
            <div class="ma-10">
              <img :src="image" height=auto>
            </div>
          </div>
        </div>
      </infinite-slide-bar>
    </div>
  </div>
</template>
<script>

import InfiniteSlideBar from "vue-infinite-slide-bar"
export default {
  name: 'ChungdahmAllim',
  data() {
    return {
      images: [
        'http://localhost:8080/img/payment1.40ec1cb7.png',
        'http://localhost:8080/img/payment2.eea0d5ed.png',
        'http://localhost:8080/img/payment3.d3a3d450.png',
        'http://localhost:8080/img/payment4.c89106c3.png',
        'http://localhost:8080/img/payment5.4bae7f64.png'
      ]
    }
  },
  components: {
    InfiniteSlideBar
  }
}
</script>
