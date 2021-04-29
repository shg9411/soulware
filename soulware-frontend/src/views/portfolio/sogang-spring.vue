<template>
  <div>
    <div class="spring-top portfolio-top">
      <v-row no-gutters class="portfolio-info-common">
        <v-col cols="8" sm="9" md="10">
          <span>서강대 상담앱(Spring) 플랫폼 개발 / Client: 서강대 / Device : Mobile / Date : 2016.12~2017.02 </span>
        </v-col>
        <v-col cols="4" sm="3" md="2" class="text-right">
          <v-btn icon color="white" @click="$router.go(-1)">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-col>
      </v-row>
      <em></em>
    </div>
    <div class="spring-overview1"></div>
    <div class="spring-overview2"></div>
    <div class="spring-overview3">
        <em></em>
        <p>일반사용자와 상담자는 앱을 이용하여 글을 포스트하고, 댓글을 통해 진행되는 프로세스입니다.<br />
          일반 사용자는 앱을 통해 상황, 생각 등을 공개/비공개로 설정해서 포스트를 올려서 상담을 하게 되고, <br />
          상담자는 공개된 포스트를 기반으로 온라인 상으로 댓글을 통해 도움을 주는 서비스입니다.</p>
    </div>
    <div class="spring-text-section">
      <em></em>
    </div>
    <div class="spring-development-section">
      <h2 class="sub-tit">DEVELOPMENT</h2>
      <em></em>
    </div>
    <div class="spring-detail-gif-section">
      <em></em>
    </div>
    <div class="spring-detail">
      <h2 class="sub-tit">DETAIL</h2>
      <em></em>
    </div>
    <div class="spring-admin-section">
      <h2 class="sub-tit">ADMIN PAGE</h2>
      <em></em>
    </div>
  </div>
</template>
<script>

export default {
  name: 'SogangSpring',
}
</script>
 