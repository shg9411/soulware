<template>
  <div>
    <div class="officecore-top portfolio-top">
      <v-row no-gutters class="portfolio-info-common">
        <v-col cols="8" sm="9" md="10">
          <span>Mobile Groupware (officecore ) Design & Publishing / Client: Itcrew / Device : Mobile / Date : 2018.04~2018.05
          </span>
        </v-col>
        <v-col cols="4" sm="3" md="2" class="text-right">
          <v-btn icon color="white" @click="$router.go(-1)">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-col>
      </v-row>
      <em></em>
      <p>모바일 그룹웨어 디자인 및 퍼블리싱</p>
    </div>
    <div class="officecore-concept-section">
      <h2>CONCEPT</h2>
      <p>그룹웨어의 특성상 사무적인 느낌의 차분한 디자인, 테마컬러가 바뀌어도 문안하게 어울릴 수 있도록
        그래픽적 효과를 배제하고 단순한 색상과 구성을 통하여 직관적 인식이 가능하도록 한다.
      </p>
      <em></em>
    </div>
    <div class="officecore-color-text">
      <div class="text-content">
        <h2 class="sub-tit">COLOR & TEXT</h2>
        <p class="sub-p">클라이언트의 기존 theme color를 변경이 불가능하여
          theme color와 어울어 질수 있는 무체색의 gray를
          sub color 로 사용하여 이질감이 들지 않도록 작업
        </p>
        <h3>Noto Sans KR</h3>
        <p class="sub-p">그룹웨어의 특성상 업무의 효율적인 사용을 위해 서체는 간결하고 가독성 높은
          웹폰트 Noto Sans KR을 적용하였습니다.
        </p>
        <em></em>
      </div>
    </div>
    <div class="officecore-detail-section">

    </div>
    <div class="officecore-icon-section">
      <h2 class="sub-tit">ICON</h2>
      <p class="sub-p">라인형태의 심플한 아이콘으로 디자인하여 간결하고 깔끔하게 작업
      </p>
      <em></em>
    </div>
  </div>
</template>
<script>

export default {
  name: 'MobileGroupware',
}
</script>
