<template>
  <v-card>
    <div class="tmp"></div>
    <v-container>
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-text-field :error-messages="organizationErrors" v-model.trim="board.organization" @input="$v.board.organization.$touch()" @blur="$v.board.organization.$touch()" label="기관/회사명" required></v-text-field>
        <v-text-field :error-messages="managerErrors" v-model.trim="board.manager" @input="$v.board.manager.$touch()" @blur="$v.board.manager.$touch()" label="담당자" required></v-text-field>
        <v-text-field :error-messages="phoneErrors" v-model.trim="board.phone" @input="$v.board.phone.$touch()" @blur="$v.board.phone.$touch()" label="연락처" required></v-text-field>
        <v-text-field :error-messages="emailErrors" v-model.trim="board.email" @input="$v.board.email.$touch()" @blur="$v.board.email.$touch()" label="E-mail" required></v-text-field>
        <v-text-field :error-messages="titleErrors" v-model.trim="board.title" @input="$v.board.title.$touch()" @blur="$v.board.title.$touch()" label="프로젝트명" required></v-text-field>
        <v-row>
          <v-col class="d-flex" cols="6" sm="6">
            <v-select :error-messages="budgetErrors" v-model="board.budget" :items="budget_items" item-value='id' item-text='name' @blur="$v.board.budget.$touch()" label="예산" outlined></v-select>
          </v-col>
          <v-col class="d-flex" cols="6" sm="6">
            <v-select :error-messages="expectedPeriodErrors" v-model="board.expected_period" :items="period_items" item-value='id' item-text='name' @blur="$v.board.expected_period.$touch()" label="예상 일정" outlined></v-select>
          </v-col>
        </v-row>
        <sw-text-editor v-model.trim="board.explanation" />
        <v-row v-for="(file,idx) in current" :key="idx">
          <v-col v-if="visible[idx]" cols="8">
            <v-file-input :clearable="false" label="File" :value="file">
            </v-file-input>
          </v-col>
          <v-col v-if="visible[idx]">
            <v-card-actions>
              <v-btn @click="delOrigin(board.files[idx].id,idx)">
                삭제
              </v-btn>
            </v-card-actions>
          </v-col>
        </v-row>
        <v-file-input :rules="fileRules" show-size multiple v-model="new_file" label="File">
          <template v-slot:selection="{index,text}">
            <v-chip close @click:close="deleteChip(index)">{{text}}</v-chip>
          </template>
        </v-file-input>
      </v-form>
      <v-card-actions>
        <v-btn :disabled="$v.$error|| !valid || !exp_valid" text color="warning accent-4" @click="showDialog()">
          Save
        </v-btn>
        <v-btn text color="warning accent-4" @click="$router.go(-1)">
          Cancle
        </v-btn>
      </v-card-actions>
    </v-container>
    <v-dialog v-model="dialog" max-width="500px">
      <v-card>
        <v-card-title>Save</v-card-title>
        <v-card-text>저장하시겠습니까?</v-card-text>
        <v-card-actions>
          <v-btn color="warning" text @click="save()">예</v-btn>
          <v-btn color="warning" text @click="dialog = false">아니오</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
</template>
 
<script>
import http from "@/utils/http"
import SwTextEditor from "@/components/text-editor"
import { required, minLength, maxLength, numeric, email } from "vuelidate/lib/validators";

const FILE_MAX_SIZE = 50 * 1024 * 1024

export default {
  name: 'edit',
  props: ['id'],
  components: {
    SwTextEditor
  },
  data() {
    return {
      content: '',
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
      exp_valid: false,
      dialog: false,
      deleted_files: [],
      current: [],
      visible: [],
      new_file: [],
      budget_items: [{ id: 'UD', name: '미정' }, { id: 'U1', name: '500만원~1000만원' }, { id: 'U3', name: '1000만원~3000만원' }, { id: 'U5', name: '3000만원~5000만원' }, { id: 'U10', name: '5000만원~1억원' }, { id: 'O10', name: '1억원 이상' }],
      period_items: [{ id: 'U2', name: '1~2개월' }, { id: 'U5', name: '3~5개월' }, { id: 'U9', name: '6~9개월' }, { id: 'O9', name: '9개월 이상' }],
      size: 0,
      fileRules: [v => !v.length || v.reduce((size, file) => size + file.size, this.size) < FILE_MAX_SIZE || "File size can't exceed 50MB"],
    }
  },
  watch: {
    'board.explanation': {
      handler: function (after) {
        if (after == "<p></p>") {
          this.exp_valid = false
        } else {
          this.exp_valid = true
        }
      },
      deep: true
    }
  },
  created() {
    this.init()
  },
  computed: {
    budgetErrors() {
      const errors = []
      if (!this.$v.board.budget.$dirty) return errors
      !this.$v.board.budget.required && errors.push('Budget is required.')
      return errors
    },
    expectedPeriodErrors() {
      const errors = []
      if (!this.$v.board.expected_period.$dirty) return errors
      !this.$v.board.expected_period.required && errors.push('Period is required.')
      return errors

    },
    titleErrors() {
      const errors = []
      if (!this.$v.board.title.$dirty) return errors
      !this.$v.board.title.required && errors.push('Title is required.')
      !this.$v.board.title.maxLength && errors.push('Title must be at most 32 characters long')
      return errors
    },
    managerErrors() {
      const errors = []
      if (!this.$v.board.manager.$dirty) return errors
      !this.$v.board.manager.required && errors.push('Manager is required')
      !this.$v.board.manager.maxLength && errors.push('Manager must be at most 8 characters long')
      return errors
    },
    organizationErrors() {
      const errors = []
      if (!this.$v.board.organization.$dirty) return errors
      !this.$v.board.organization.required && errors.push('Organization is required')
      !this.$v.board.organization.maxLength && errors.push('Title must be at most 32 characters long')
      return errors
    },
    phoneErrors() {
      const errors = []
      if (!this.$v.board.phone.$dirty) return errors
      !this.$v.board.phone.required && errors.push('Phone number is required.')
      !this.$v.board.phone.numeric && errors.push('Phone number only numeric')
      !this.$v.board.phone.minLength && errors.push('Phone number must be at least 8 numeric')
      !this.$v.board.phone.maxLength && errors.push('Phone number must be at most 16 numeric')
      return errors
    },
    emailErrors() {
      const errors = []
      if (!this.$v.board.email.$dirty) return errors
      !this.$v.board.email.email && errors.push('Must be valid e-mail')
      !this.$v.board.email.required && errors.push('E-mail is required')
      return errors
    }
  },
  validations: {
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
    }
  },
  methods: {
    async init() {
      this.getBoard()
    },
    async getBoard() {
      const data = await http.process('board', 'detail', { id: this.id })
      this.board = data
      for (var i = 0; i < this.board.files.length; i++) {
        this.size += this.board.files[i].size
        this.tmp = new File([], this.board.files[i].originName, { type: "text/plain" })
        this.current.push(this.tmp)
        this.visible.push(true)
      }
    },
    deleteChip(index) {
      this.new_file.splice(index, 1)
    },
    delOrigin(x, idx) {
      this.deleted_files.push(x)
      this.size -= this.board.files[idx].size
      this.$set(this.visible, idx, false)
    },
    showDialog() {
      if (this.$refs.form.validate()) {
        this.dialog = !this.dialog
      }
    },
    async save() {
      this.$v.$touch()
      this.$refs.form.validate()
      if (!this.$v.$error) {
        this.dialog = false
        let fd = new FormData();
        fd.append("organization", this.board.organization);
        fd.append("manager", this.board.manager);
        fd.append("phone", this.board.phone);
        fd.append("title", this.board.title);
        fd.append("email", this.board.email);
        fd.append("budget", this.board.budget);
        fd.append("expected_period", this.board.expected_period);
        fd.append("explanation", this.board.explanation)
        for (let i = 0; i < this.deleted_files.length; i++) {
          fd.append("deleted_files[]", this.deleted_files[i])
        }
        for (let i = 0; i < this.new_file.length; i++) {
          fd.append("files", this.new_file[i])
        }
        let { id } = this.$route.params
        try {
          const data = await http.process('board', 'edit', { id: id, data: fd })
          this.$router.push({ name: 'BoardDetail', params: { id: data.id } })
        } catch (err) {
          console.log(err)
        }
      }
    }
  }
}
</script>
<style scoped>
.tmp {
  height: 4.09rem;
}
</style>