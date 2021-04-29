<template>
  <div>
    <div class="portfolio-top-section">
      <h2>전문적인 개발실력과 유연한 의사소통을 갖춘 <br />
        ICT 파트너를 만나보세요!</h2>
    </div>
    <div class="portfolio-section">
      <v-row no-gutters>
        <v-col cols="12" sm="4" class="col-cover">
          <v-card elevation="0" :to="{name:'ChungdahmLearning'}">
            <sw-filp-card>
              <template v-slot:front> <em class="chungdahm-learning" /></template>
              <template v-slot:back> <em class="chungdahm-learning back" /> </template>
            </sw-filp-card>
            <v-card-title>Learning portal 4.0</v-card-title>
            <v-card-text>
              <p>(주)청담러닝포털 4.0</p>
              <span># Fullstack # Responsive web # BootstrapVue</span>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" sm="4" class="col-cover">
          <v-card elevation="0" :to="{name:'YujinIclebo'}">
            <sw-filp-card>
              <template v-slot:front> <em class="iclebo" /> </template>
              <template v-slot:back> <em class="iclebo back" /> </template>
            </sw-filp-card>
            <v-card-title>iClebo O5</v-card-title>
            <v-card-text>
              <p>로봇청소기 원격제어 플랫폼</p>
              <span># Cross-platform # Ionic Framework # AWS </span>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" sm="4" class="col-cover">
          <v-card elevation="0" :to="{name:'ChungdahmAllim'}">
            <sw-filp-card>
              <template v-slot:front> <em class="allim" /></template>
              <template v-slot:back> <em class="allim back" /> </template>
            </sw-filp-card>
            <v-card-title>Allim app</v-card-title>
            <v-card-text>
              <p>(주)청담러닝 학부모앱</p>
              <span># Cross-platform # Veutify Framework # Cordova plugin</span>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" sm="4" class="col-cover">
          <v-card elevation="0" :to="{name:'IncheonAirport'}">
            <sw-filp-card>
              <template v-slot:front> <em class="incheon-airport" /> </template>
              <template v-slot:back> <em class="incheon-airport back" /> </template>
            </sw-filp-card>
            <v-card-title>인천공항앱</v-card-title>
            <v-card-text>
              <p>인천공항 가이드 앱</p>
              <span># Cross-platform # Ionic Framework # Cordova plugin</span>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" sm="4" class="col-cover">
          <v-card elevation="0" :to="{name:'ChungdahmLoudclass'}">
            <sw-filp-card>
              <template v-slot:front> <em class="loud-class" /> </template>
              <template v-slot:back> <em class="loud-class back" /> </template>
            </sw-filp-card>
            <v-card-title>Loudclass</v-card-title>
            <v-card-text>
              <p>(주)청담러닝 방과후학교 솔루션</p>
              <span># Fullstack # Veutify Framework # GORM</span>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" sm="4" class="col-cover">
          <v-card elevation="0" :to="{name:'MobileGroupware'}">
            <sw-filp-card>
              <template v-slot:front> <em class="itcrew-app" /> </template>
              <template v-slot:back> <em class="itcrew-app back" /> </template>
            </sw-filp-card>
            <v-card-title>Mobile groupware</v-card-title>
            <v-card-text>
              <p>아이티크루 모바일 그룹웨어 디자인</p>
              <span># Design # Publishing # Bootgrap</span>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" sm="4" class="col-cover">
          <v-card elevation="0" :to="{name:'OfficeCore'}">
            <sw-filp-card>
              <template v-slot:front> <em class="itcrew-web" /> </template>
              <template v-slot:back> <em class="itcrew-web back" /> </template>
            </sw-filp-card>
            <v-card-title>Officecore website</v-card-title>
            <v-card-text>
              <p>오피스코어 웹사이트 디자인</p>
              <span># Design # Publishing # Bootgrap</span>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" sm="4" class="col-cover">
          <v-card elevation="0" :to="{name:'SogangSpring'}">
            <sw-filp-card>
              <template v-slot:front> <em class="spring" /> </template>
              <template v-slot:back> <em class="spring back" /> </template>
            </sw-filp-card>
            <v-card-title>Spring App</v-card-title>
            <v-card-text>
              <p>서강대 상담앱</p>
              <span># Cross-platform # Ionic Framework # Cordova plugin</span>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
import SwFilpCard from '@/components/filp-card.vue'

export default {
  name: 'Portfolio',
  components: {
    SwFilpCard
  }
}
</script>