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
    <div class="sovit-section4">
    </div>
    <v-fab-transition>
      <v-btn v-show="!hidden" dark fixed bottom right fab class="fab-chatbot">
        <em></em>
      </v-btn>
    </v-fab-transition>
    <v-fab-transition>
      <v-btn v-show="!hidden" dark fixed bottom right fab class="fab-contact">
        문의하기
      </v-btn>
    </v-fab-transition>
  </div>
</template>
<script>

export default {
  name: 'Sovit',
}
</script>