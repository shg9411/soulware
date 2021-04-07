<template>
  <div>
    <div class="sovit-top">
      <em></em>
      <p>Share office video meetin</p>
    </div>
    <div class="sovit-info">
      <h2>sovit</h2>
      <p>SOVIT은 쉐어오피스안 미팅룸간의 화상회의를 도와주는 플랫폼입니다.<br />
        미팅룸 안에서 보다 편리하게 화상미팅을 진행해 보세요!</p>
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
        <div v-for="(image,i) in images" :key="i">
          <div class="ma-10">
            <img :src="image" height=auto>
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
  data() {
    return {
      images: [
        'https://dummyimage.com/50x400/000/fff&text=1',
        'https://dummyimage.com/1000x1000/000/fff&text=2',
        'https://dummyimage.com/600x800/000/fff&text=3'
      ]
    }
  },
  components: {
    InfiniteSlideBar
  }
}
</script>

<style>
.items {
  display: flex;
  justify-content: space-around;
}
img {
  height: 15rem;
}
</style>