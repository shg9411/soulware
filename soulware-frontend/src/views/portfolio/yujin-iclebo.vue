<template>
  <div>
    <div class="iclebo-top portfolio-top">
      <v-row no-gutters class="portfolio-info-common">
        <v-col cols="8" sm="9" md="10">
          <span>iCLEBO 05 로봇 청소기 원격 제어 플랫폼 / Client: YUJIN ROBOT / Device : Mobile phone / Date : 2018.3 ~ 2020.5 </span>
        </v-col>
        <v-col cols="4" sm="3" md="2" class="text-right">
          <v-btn icon color="white" @click="$router.go(-1)">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-col>
      </v-row>
      <em></em>
      <p>로봇 청소기 원격 제어 플랫폼</p>

    </div>
    <div class="iclebo-product">
      <em></em>
    </div>
    <div class="iclebo-overview-section">
      <h2>OVERVIEW</h2>
      <p>YujinRobot 로봇청소기 iClebo O5의 클라우드 원격제어 플랫폼 개발<br />
        로봇청소기 페어링부터 WIFI 연결 및 클라우드 컴퓨팅 환경에서 언제, 어디서나 로봇청소기의 상태정보조회/지도/제어 등을 위한 원격제어 소프트웨어 개발하다<br />
        iOS/Android Cross-platform 앱</p>
    </div>
    <div class="overview-img">
      <em></em>
    </div>
    <div class="pairing-bg-section">
      <h3>PAIRING</h3>
    </div>
    <div class="pairing-section">
      <em></em>
    </div>
    <div class=" sub-title pt-0">
      <h3>MAIN</h3>
      <p> 언제 어디서든 청소 시작 정지 등 청소기를 제어 할수 있으며 청소상황을 실시간으로 확인 가능</p>
    </div>
    <div class="main-section ">
      <em></em>
    </div>
    <div class="iclebo-main-gray-bg"></div>
    <div class="remote-control-section">
      <h3>REMOTE CONTROL</h3>
      <em></em>
    </div>
    <div class=" sub-title">
      <h3>SCHEDULE</h3>
      <p>원하는 요일/시간별 예약청소 가능</p>
    </div>
    <div class="schedule-img">
      <em></em>
    </div>
    <div class="map-section">
      <div class=" sub-title">
        <h3>MAP</h3>
        <p>로봇청소기가 이동하는 동선을 지도로 확인하고 우리집 지도를 저장합니다.<br />
          실시간으로 로봇청소기의 지도를 외부에서도 확인 가능 <br />
          앱내 UI를 이용하여 청소 영역 설정/청소 제외 영역 설정을 지원합니다.</p>
      </div>
      <em></em>
    </div>
    <div class=" sub-title">
      <h3>Internationalization(i18n)</h3>
      <p>전세계에 수출되고 있는 iClebo O5의 특성을 고려하여 한국, 영어, 러시아 지원을 위한 Internationalization(i18n) 적용</p>
    </div>
    <div class="internationalization-section">
      <em></em>
    </div>
  </div>
</template>
<script>

export default {
  name: 'YujinIclebo',
}
</script>
