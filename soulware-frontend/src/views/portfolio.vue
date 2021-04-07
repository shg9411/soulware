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
            <em class=" chungdahm-learning"></em>
            <v-card-title>Chungdahm Learning</v-card-title>
            <v-card-text>
              <p>청담러닝 사이트</p>
              <span># Responsive web # mobile webapp support </span>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" sm="4" class="col-cover">
          <v-card elevation="0" :to="{name:'YujinIclebo'}">
            <em class="iclebo"></em>
            <v-card-title>iClebo O5</v-card-title>

            <v-card-text>
              <p>방과후 학교 솔루션</p>
              <span># STB Viewer # Veutify Framework # Libray </span>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" sm="4" class="col-cover">
          <v-card elevation="0" :to="{name:'ChungdahmAllim'}">
            <em class="allim"></em>
            <v-card-title>allim</v-card-title>

            <v-card-text>
              <p>(주)청담러닝 학부모앱</p>
              <span># Hybrid APP # Veutify Framework # Cordova plugin</span>
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
    </div>
  </div>
</template>

<script>
export default {
  name: 'Portfolio',
}
</script>
