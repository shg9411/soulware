<template>
  <div>
    <div class="loud-top portfolio-top">
      <v-row no-gutters class="portfolio-info-common">
        <v-col cols="8" sm="9" md="10">
          <span>Loudclass / Client: Chungdahm Learning / Device : Web / Date : 2019.10~2020.03 </span>
        </v-col>
        <v-col cols="4" sm="3" md="2" class="text-right">
          <v-btn icon color="white" @click="$router.go(-1)">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-col>
      </v-row>
      <em></em>
      <p>청담러닝 방과후 학교 솔루션</p>
    </div>
    <div class="main-img-section">
      <em></em>

    </div>
    <div class="loud-overview-section">
      <h2 class="sub-tit">OVERVIEW</h2>
      <p class="sub-p">웹을 기반으로 한 (주)청담러닝 방과후 학교 솔루션 개발<br />
        솔루션을 웹으로의 전환에 맞추어 오픈소스를 기반으로 한 데이터베이스, 백엔드/프론트엔드까지 프로젝트 전체 설계와 개발을 담당<br />
        코로나19로 인해 (주)청담러닝 내 다양한 플랫폼에 적용됨</p>
    </div>
    <div class="loud-overview-img">
      <em></em>
    </div>
    <div class="loud-user-detail">
      <h2 class="sub-tit">USER DETAIL</h2>
      <p class="sub-p">Loudclass내에서 기관에 속한 선생님은 수업을 만들어 학생을 초대하고,
        수업을 진행하며 커뮤니케이션을 진행한다.<br />
        커뮤니케이션을 돕기 위한 기본적인 도구 외에 Library(저장소), 수업 교재(HTML5 Viewer) 등을
        웹을 이용하여 다양하게 제공한다.<br />
      </p>
      <em></em>
    </div>
    <div class="orange-bg"></div>
    <div class="cms-lms-section">
      <em></em>
      <h2 class="sub-tit">CMS/LMS</h2>
      <p class="sub-p">기관(회사 단위 등), 그룹, 매니저 관리<br />
        기관 내 선생님, 학생 관리<br />
        교재 등록 및 관리를 지원하기 위한 완벽한 CMS/LMS 시스템 개발
      </p>
    </div>
    <div class="viewer-slide-section">
      <h2 class="sub-tit">HTML5 VIEWER</h2>
      <p class="sub-p">별도의 설치없이 상호작용 가능한 HTML5 Viewer<br />
        온/오프라인 수업 중 교재 형태로 되어 있는 컨텐츠를 HTML5 형태로 랜더링한다.<br />
        화이트보드, 브러시, 지우개, 블럭, 타이머, 정답/오답 선택 등 다양한 상호작용 기능 적용
      </p>
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
  </div>
</template>
<script>

import InfiniteSlideBar from "vue-infinite-slide-bar"
export default {
  name: 'ChungdahmLoudclass',
  components: {
    InfiniteSlideBar
  },
  data() {
    return {
      images: [
        require('@/assets/images/loud_viewer_semple.png'),
        require('@/assets/images/loud_viewer_semple.png'),
        require('@/assets/images/loud_viewer_semple.png'),
        require('@/assets/images/loud_viewer_semple.png'),
        require('@/assets/images/loud_viewer_semple.png'),
      ]
    }
  },
}
</script>
