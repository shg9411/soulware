<template>
  <div>
    <div class="sovit-top">
      <em></em>
      <p>Small Office Video conferencing Technology</p>
    </div>
    <div class="sovit-info">
      <h2>sovit</h2>
      <p>소형 회의실 화상회의 솔루션<br />
        소형 회의실, 공유오피스 내 회의실 간의 화상회의 솔루션을 지금 바로 경험해 보실 수 있습니다!</p>
    </div>
    <div class="sovit-section1">
    </div>
    <div class="sovit-section2">
      <em></em>
    </div>
    <div class="sovit-gray-section d-none d-sm-flex"></div>
    <div class="sovit-section3">
      <em></em>
    </div>
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
</template>
<script>
import InfiniteSlideBar from "vue-infinite-slide-bar"
export default {
  name: 'Sovit',
  components: {
    InfiniteSlideBar
  },
  data() {
    return {
      images: [
        require('@/assets/images/sovit_slide1.png'),
        require('@/assets/images/sovit_slide2.png'),
        require('@/assets/images/sovit_slide3.png'),
        require('@/assets/images/sovit_slide4.png'),
        require('@/assets/images/sovit_slide5.png'),
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