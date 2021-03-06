<template>
  <div class="contact-section">
    <div class="contact-container">
      <div class="contact-top-section">
        <h2>프로젝트 문의나 의뢰가 있나요?<br />
          소울웨어가 도와드리겠습니다!</h2>
        <p>함께 소통하며 프로젝트를 제작합니다. 문의를 남겨 주시면 1~2일 이내에 담당자가 연락드릴 예정입니다.</p>
      </div>
      <v-form ref="form" lazy-validation>
        <h3 class="form-title">01. 기본정보</h3>
        <v-row>
          <v-col class="d-flex field-pd" cols="12" sm="6">
            <v-text-field :error-messages="organizationErrors" v-model.trim="board.organization" label="기관/회사명"></v-text-field>
          </v-col>
          <v-col class="d-flex field-pd" cols="12" sm="6">
            <v-text-field :error-messages="managerErrors" v-model.trim="board.manager" label="담당자"></v-text-field>
          </v-col>
          <v-col class="d-flex field-pd" cols="12" sm="6">
            <v-text-field :error-messages="phoneErrors" v-model.trim="board.phone" label="연락처"></v-text-field>
          </v-col>
          <v-col class="d-flex field-pd" cols="12" sm="6">
            <v-text-field :error-messages="emailErrors" v-model.trim="board.email" label="E-mail"></v-text-field>
          </v-col>
        </v-row>
        <h3 class="form-title">02. 프로젝트 정보</h3>
        <v-row>
          <v-col class="d-flex field-pd" cols="12">
            <v-text-field :error-messages="titleErrors" v-model.trim="board.title" label="프로젝트명"></v-text-field>
          </v-col>
          <v-col class="d-flex field-pd pt-5" cols="12" sm="6">
            <v-select :error-messages="budgetErrors" v-model.trim="board.budget" :items="budget_items" item-value='id' item-text='name' label="예산" content-class="select-list" outlined></v-select>
          </v-col>
          <v-col class="d-flex field-pd pt-5" cols="12" sm="6">
            <v-select :error-messages="expectedPeriodErrors" v-model.trim="board.expected_period" :items="period_items" item-value='id' item-text='name' label="예상 일정" outlined></v-select>
          </v-col>
          <v-col class=" field-pd" cols="12">
            <sw-textEditor v-model.trim="board.explanation" @input="$v.board.explanation.$touch()" />
            <div class="v-text-field__details pt-5" v-if="$v.board.explanation.$error">
              <div class="v-messages theme--light error--text" role="alert">
                <div class="v-messages__wrapper">
                  <div class="v-messages__message">프로젝트 설명을 작성해주세요.</div>
                </div>
              </div>
            </div>
          </v-col>
        </v-row>
        <v-col class="d-flex field-pd pt-5" cols="12">
          <v-file-input ref="inputFile" outlined @change="fileChanged" :rules="fileRules" v-model="currFile" label="첨부파일" multiple dense :clearable="false">
            <template v-slot:selection="{text}">
              <v-chip outlined>{{text}}</v-chip>
            </template>
          </v-file-input>
        </v-col>
        <v-col v-if="files.length>0" class="d-flex field-pd" cols="12">
          <v-chip-group column :style='{width:"100%"}'>
            <v-chip :style='{width:"100%"}' outlined v-for="(file,idx) in files" :key="idx">
              <v-icon small @click="deleteChip(idx)">mdi-delete</v-icon>
              <span>{{ file.name }}</span>
            </v-chip>
          </v-chip-group>
        </v-col>
        <v-col class="d-flex checkbox-field-pd">
          <div class="input inline">
            <input type="checkbox" id="checkbox" v-model="agree">
            <label @click="dialog=true">개인정보수집이용 동의</label>
            <div v-if="$v.agree.$error">
              <div class="v-messages theme--light error--text" role="alert">
                <div class="v-messages__wrapper">
                  <div class="v-messages__message">개인정보수집이용에 동의해주세요.</div>
                </div>
              </div>
            </div>
          </div>
        </v-col>
        <v-dialog v-model="dialog" max-width="500px">
          <v-card class="dialog-content">
            <v-card-title>
              <v-icon small>mdi-check-bold</v-icon>개인정보의 수집 및 이용 동의
            </v-card-title>
            <v-card-text>
              <p>
                - 이용자가 제공한 모든 정보는 다음의 목적을 위해 활용하며, 하기 목적 이외의 용도로는 사용되지 않습니다.<br />
                ① 개인정보 수집 항목 및 수집·이용 목적<br />
                가) 수집 항목 (필수항목)<br />
                - 성명(국문), 전화번호(자택, 휴대전화), 사진, 이메일 등 신청서에 기재된 정보 또는 신청자가 제공한 정보<br />
                나) 수집 및 이용 목적<br />
                - 소울웨어 프로젝트 의뢰 및 문의<br />
                ② 개인정보 보유 및 이용기간<br />
                - 수집·이용 동의일로부터 개인정보의 수집·이용목적을 달성할 때까지<br />
                ③ 동의거부관리<br />
                - 귀하께서는 본 안내에 따른 개인정보 수집, 이용에 대하여 동의를 거부하실 권리가 있습니다. 다만,
                귀하가 개인정보의 수집/이용에 동의를 거부하시는 경우에 프로젝트 의뢰및 문의가 불가능 할 수 있음을 알려드립니다.
              </p>
            </v-card-text>
            <v-card-actions>
              <v-btn @click="doCheck()">확인</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-col class="d-flex field-pd align-center justify-center" cols="12">
          <v-btn :disabled="$v.$error || !valid" rounded @click="saveBoard()" class="btn-contect">
            프로젝트 의뢰
          </v-btn>
        </v-col>
      </v-form>
    </div>
  </div>
</template>
<script>
import http from "@/utils/http"
import SwTextEditor from "@/components/text-editor"
import { sameAs, required, minLength, maxLength, numeric, email } from "vuelidate/lib/validators";

const FILE_MAX_SIZE = 2 * 1024 * 1024

export default {
  name: 'AddBoard',
  components: {
    SwTextEditor,
  },
  data() {
    return {
      board: {
        organization: "",
        manager: "",
        phone: "",
        title: "",
        email: "",
        budget: "",
        expected_period: "",
        explanation: "",
      },
      valid: true,
      budget_items: [{ id: 'UD', name: '미정' }, { id: 'U1', name: '500만원~1000만원' }, { id: 'U3', name: '1000만원~3000만원' }, { id: 'U5', name: '3000만원~5000만원' }, { id: 'U10', name: '5000만원~1억원' }, { id: 'O10', name: '1억원 이상' }],
      period_items: [{ id: 'U2', name: '1~2개월' }, { id: 'U5', name: '3~5개월' }, { id: 'U9', name: '6~9개월' }, { id: 'O9', name: '9개월 이상' }],
      files: [],
      currFile: [],
      agree: false,
      dialog: false,
      fileRules: [files => !files || !files.some(file => file.size > FILE_MAX_SIZE) || '첨부파일은 2MB를 넘을 수 없습니다.']
    }
  },
  computed: {
    agreeErrors() {
      const errors = []
      if (!this.$v.agree.$dirty) return errors
      !this.$v.agree.sameAs && errors.push('개인정보수집이용에 동의해주세요.')
      return errors
    },
    budgetErrors() {
      const errors = []
      if (!this.$v.board.budget.$dirty) return errors
      !this.$v.board.budget.required && errors.push('예산을 입력해주세요.')
      return errors
    },
    expectedPeriodErrors() {
      const errors = []
      if (!this.$v.board.expected_period.$dirty) return errors
      !this.$v.board.expected_period.required && errors.push('예상 일정을 입력해주세요.')
      return errors
    },
    titleErrors() {
      const errors = []
      if (!this.$v.board.title.$dirty) return errors
      !this.$v.board.title.required && errors.push('프로젝트명을 입력해주세요.')
      !this.$v.board.title.maxLength && errors.push('프로젝트명은 최대 32글자까지 가능합니다.')
      return errors
    },
    managerErrors() {
      const errors = []
      if (!this.$v.board.manager.$dirty) return errors
      !this.$v.board.manager.required && errors.push('담당자를 입력해주세요.')
      !this.$v.board.manager.maxLength && errors.push('담당자 이름은 최대 8글자까지 가능합니다.')
      return errors
    },
    organizationErrors() {
      const errors = []
      if (!this.$v.board.organization.$dirty) return errors
      !this.$v.board.organization.required && errors.push('기관/회사명을 입력해주세요.')
      !this.$v.board.organization.maxLength && errors.push('기관/회사명은 최대 32글자까지 가능합니다.')
      return errors
    },
    phoneErrors() {
      const errors = []
      if (!this.$v.board.phone.$dirty) return errors
      !this.$v.board.phone.required && errors.push('연락처를 입력해주세요.')
      !this.$v.board.phone.numeric && errors.push('숫자만 입력해주세요.')
      !this.$v.board.phone.minLength && errors.push('8글자 이상으로 입력해주세요.')
      !this.$v.board.phone.maxLength && errors.push('16글자 이하로 입력해주세요.')
      return errors
    },
    emailErrors() {
      const errors = []
      if (!this.$v.board.email.$dirty) return errors
      !this.$v.board.email.email && errors.push('유효하지 않은 이메일 주소입니다.')
      !this.$v.board.email.required && errors.push('이메일을 입력해주세요.')
      return errors
    }
  },
  validations: {
    agree: {
      sameAs: sameAs(() => true)
    },
    board: {
      budget: {
        required
      },
      expected_period: {
        required
      },
      title: {
        required,
        maxLength: maxLength(32)
      },
      manager: {
        required,
        maxLength: maxLength(8)
      },
      email: {
        required,
        email
      },
      phone: {
        required,
        numeric,
        minLength: minLength(8),
        maxLength: maxLength(16)
      },
      organization: {
        required,
        maxLength: maxLength(32)
      },
      explanation: {
        required,
        minLength: minLength(8)
      }
    }
  },
  methods: {
    doCheck() {
      this.agree = true
      this.dialog = false
    },
    fileChanged() {
      if (this.currFile.length == 0) {
        return
      }
      for (var i = 0; i < this.currFile.length; i++) {
        if (this.currFile[i].size > FILE_MAX_SIZE)
          return
      }
      this.files = [
        ...this.files,
        ...this.currFile
      ]
      this.currFile = []
      this.$refs.inputFile.reset()
      this.$refs.inputFile.blur()
    },
    deleteChip(index) {
      this.files.splice(index, 1)
    },
    async saveBoard() {
      this.$v.$touch()
      this.$refs.form.validate()
      if (!this.$v.$error) {
        let data = null
        if (this.files && this.files.length > 0) {
          data = new FormData();
          data.append("organization", this.board.organization);
          data.append("manager", this.board.manager);
          data.append("phone", this.board.phone);
          data.append("title", this.board.title);
          data.append("email", this.board.email);
          data.append("budget", this.board.budget);
          data.append("expected_period", this.board.expected_period);
          data.append("explanation", this.board.explanation)
          for (let i = 0; i < this.files.length; i++) {
            data.append("files", this.files[i])
          }
        }
        else {
          data = this.board
        }
        try {
          const res = await http.process('board', 'add', { data: data })
          this.$router.push({ name: 'Success' })
        } catch (err) {
          console.log(err)
        }
      }
    },
  },
}
</script>