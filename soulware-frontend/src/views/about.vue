<template>
  <div>
    <div class="about-top-section">
    </div>
    <div class="top-text m-top-text">
      <div>
        <h2>소울웨어는 <br />
          영혼을 담아 소프트웨어를 개발합니다!</h2>
        <p>유연하고 열린 생각으로 클라이언트와 소통합니다.<br />
          개발에 앞서 풍부한 경험으로 가장 효과적인 개발 방법과 일정을 제안합니다.<br />
          그리고, 프로젝트에 맞는 소프트웨어 개발에 있어 다양한 설계/개발 경험과 깊이 있는<br />
          전문 지식으로 최고의 소프트웨어 개발을 지향합니다.
        </p>
      </div>
    </div>
    <div class="about-service-section">
    </div>
    <div class="about-vision-section">
      <div class="img-vision"></div>
      <v-row no-gutters>
        <v-col cols="12" sm="6">
          <h3><span>S</span> DEVELOPMENT IN ACTION</h3>
          <p>혼이 담긴 소프트웨어를 개발한다!
          </p>
        </v-col>
        <v-col cols="12" sm="6">
          <h3><span>O</span> PEN INNOVATION</h3>
          <p>끊임없는 혁신을 통한 올바른 가치를 공유하고 개방한다.
          </p>
        </v-col>
        <v-col cols="12" sm="6">
          <h3><span>U</span> SER FRIENDLY</h3>
          <p>사용자에게 가장 친화적인 기업이 되는 것을 목표로 한다.
          </p>
        </v-col>
        <v-col cols="12" sm="6">
          <h3><span>L</span> EARNING & LEADER</h3>
          <p>계속되는 배움을 통해서 스스로의 가치를 높이며,
            나아가 사회에서 바른 가치를 제공하는 리더가 된다.
          </p>
        </v-col>
      </v-row>
    </div>
    <div class="sw-process">
      <h2>Soulware Work Process</h2>
      <v-row no-gutters>
        <v-col cols="12" sm="12" md="7" class="process-list">
          <v-list three-line>
            <v-list-item>
              <v-list-item-avatar>
                <em class="ic-process1"></em>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title>01 프로젝트 상담</v-list-item-title>
                <v-list-item-subtitle>아이디어를 비지니스로 만들고 싶으세요? 웹/앱부터 다양한 개발 분야를 경험한
                  IT 전문가와 함께 가능성을 높일 수 있습니다.
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-avatar>
                <em class="ic-process2"></em>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title>02 견적 및 일정</v-list-item-title>
                <v-list-item-subtitle>기본적인 상담에 이어 구체적인 기능과 일정을 함께 정의하고, 협의가 완료된 후,
                  최단 시간 안에 일정과 견적에 대해서 알려드립니다.

                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-avatar>
                <em class="ic-process3"></em>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title>03 프로젝트 계약 및 킼오프</v-list-item-title>
                <v-list-item-subtitle> 계약이 이루어지면 실무 개발자 & 디자이너와 함께 하는 미팅을 통해
                  더욱 더 신뢰할 수 있는 프로젝트를 기대하게 됩니다.

                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-avatar>
                <em class="ic-process4"></em>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title>04 프로젝트 진행</v-list-item-title>
                <v-list-item-subtitle>선도적인 개발 방법과 축적된 경험과 기술력으로 수행합니다. 영혼을 담아서!

                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-avatar>
                <em class="ic-process5"></em>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title>05 피드백</v-list-item-title>
                <v-list-item-subtitle>프로젝트 진행 중, 클라이언트와의 소통을 통한 피드백이 이루어지며 유연한 개발
                  방법과 사고를 통해 적극적으로 수행됩니다.
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-avatar>
                <em class="ic-process6"></em>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title>06 프로젝트 완료</v-list-item-title>
                <v-list-item-subtitle>계약에 따른 인수인계 뿐 만 아니라, 유지보수에 있어서도 유연한 대처와
                  빠른 피드백을 통해 향후에도 걱정없도록 도와 드립니다.
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-col>
        <v-col d-none md="5" class="mockup-section">
        </v-col>
      </v-row>
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
  name: 'About',
}
</script>
