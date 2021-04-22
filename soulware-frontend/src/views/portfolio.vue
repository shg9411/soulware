<template>
  <div>
    <div class="portfolio-top-section">
      <h2>전문적인 개발실력과 유연한 의사소통을 갖춘 <br />
        IT파트너를 만나보세요!</h2>
    </div>
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
            <!-- flip-card -->
            <div class="flip-card">
              <div class="flip-card-inner">
                <div class="flip-card-front">
                  <v-img :src="require('@/assets/images/main_iclebo05.png')" />
                </div>
                <div class="flip-card-back">
                  <v-img :src="require('@/assets/images/icleco_hover.png')" />
                </div>
              </div>
            </div>
            <!-- <em class="iclebo"></em> -->
            <v-card-title>iClebo O5</v-card-title>
            <v-card-text>
              <p>로봇청소기 원격제어 플랫폼</p>
              <span># Cross-platform # Ionic Framework # AWS </span>
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
        <v-col cols="12" sm="4" class="col-cover">
          <v-card elevation="0" :to="{name:'IncheonAirport'}">
            <em class="incheon-airport"></em>
            <v-card-title>인천공항앱</v-card-title>
            <v-card-text>
              <p>인천공항 가이드 앱</p>
              <span># Cross-platform # Ionic Framework # Cordova plugin</span>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" sm="4" class="col-cover">
          <v-card elevation="0" :to="{name:'ChungdahmLoudclass'}">
            <em class="loud-class"></em>
            <v-card-title>Loudclass</v-card-title>
            <v-card-text>
              <p>(주)청담러닝 방과후학교 솔루션</p>
              <span># Fullstack # Veutify Framework # GORM</span>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" sm="4" class="col-cover">
          <v-card elevation="0" :to="{name:'MobileGroupware'}">
            <em class="itcrew-app"></em>
            <v-card-title>Mobile groupware</v-card-title>
            <v-card-text>
              <p>아이티크루 모바일 그룹웨어 디자인</p>
              <span># Design # Publishing # Bootgrap</span>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" sm="4" class="col-cover">
          <v-card elevation="0" :to="{name:'OfficeCore'}">
            <em class="itcrew-web"></em>
            <v-card-title>Officecore website</v-card-title>
            <v-card-text>
              <p>오피스코어 웹사이트 디자인</p>
              <span># Design # Publishing # Bootgrap</span>
            </v-card-text>
          </v-card>
        </v-col>

        <v-col cols="12" sm="4" class="col-cover">
          <v-card elevation="0" :to="{name:'SogangSpring'}">
            <em class="spring"></em>
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
export default {
  name: 'Portfolio',
}
</script>
<style scoped>
.flip-card {
  background-color: transparent;
  max-width: 16.09rem;
  width: 100%;
  height: 16.09rem;
  perspective: 1000px;
}
.flip-card-inner {
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
  transition: transform 0.6s;
  transform-style: preserve-3d;
}
.flip-card:hover .flip-card-inner {
  transform: rotateY(180deg);
}
.flip-card-front,
.flip-card-back {
  position: absolute;
  width: 100%;
  height: 100%;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
}
.flip-card-back {
  transform: rotateY(180deg);
}
</style>