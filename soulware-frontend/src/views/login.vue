<template>
  <div>
    <div class="tmp"></div>
    <v-form ref="form" lazy-validation>
      <v-text-field :error-messages="emailErrors" v-model.trim="user.email" @input="$v.user.email.$touch()" @blur="$v.user.email.$touch()" label="E-mail" required></v-text-field>
      <v-text-field :error-messages="passwordErrors " v-model.trim="user.password" @input="$v.user.password.$touch()" @blur="$v.user.password.$touch()" :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'" :type="show ? 'text' : 'password'" label="Password" counter @click:append="show = !show" required></v-text-field>
      <v-btn :disabled="$v.user.$error" color="warning" @click="submit">
        Login
      </v-btn>
    </v-form>
  </div>
</template>

<script>
import { required, email, maxLength, minLength } from "vuelidate/lib/validators";
import { mapState, mapActions } from 'vuex'
export default {
  name: 'Login',
  data() {
    return {
      message: '',
      user: {
        email: null,
        password: null
      },
      show: false,
    }
  },
  computed: {
    ...mapState({
      loggedIn: state => state.auth.loggedIn,
    }),
    passwordErrors() {
      const errors = []
      if (!this.$v.user.password.$dirty) return errors
      !this.$v.user.password.minLength && errors.push('Password must be at least 6 characters long')
      !this.$v.user.password.maxLength && errors.push('Password must be at most 20 characters long')
      !this.$v.user.password.required && errors.push('Password is required.')
      return errors
    },
    emailErrors() {
      const errors = []
      if (!this.$v.user.email.$dirty) return errors
      !this.$v.user.email.email && errors.push('Must be valid e-mail')
      !this.$v.user.email.required && errors.push('E-mail is required')
      return errors
    }
  },
  mounted() {
    this.init();
  },
  validations: {
    user: {
      email: {
        required,
        email
      },
      password: {
        required,
        minLength: minLength(6),
        maxLength: maxLength(20)
      }
    }
  },
  methods: {
    init() {
      if (this.loggedIn == true) {
        this.$router.push('/board')
      }
    },
    async submit() {
      this.$v.$touch()
      this.$refs.form.validate()
      if (!this.$v.$error) {
        this.login(this.user).then(
          () => {
            this.$router.push('/')
          },
          (error) => {
            console.log("login fail", error)
            alert("로그인에 실패했습니다. E-mail과 비밀번호를 확인해 주세요.")
          }
        )
      }
    },
    ...mapActions({
      login: "auth/login"
    })
  },
}
</script>
<style scoped>
.tmp {
  height: 4.09rem;
}
</style>