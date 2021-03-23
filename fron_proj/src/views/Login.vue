<template>
  <v-container>
    <v-form v-model="valid" lazy-validation>
      <v-text-field v-model="user.email" :rules="emailRules" label="E-mail" required></v-text-field>
      <v-text-field v-model="user.password" :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'" :rules="[rules.required, rules.min]" :type="show ? 'text' : 'password'" label="Password" counter @click:append="show = !show"></v-text-field>
      <v-btn :disabled="!valid" color="warning" @click="login">
        Login
      </v-btn>
    </v-form>
    {{message}}
  </v-container>
</template>

<script>
import User from '../models/user'
export default {
  name: 'Login',
  data() {
    return {
      message: '',
      valid: true,
      user: new User('', ''),
      show: false,
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],
      rules: {
        required: value => !!value || 'Required.',
        min: v => v.length >= 8 || 'Min 8 characters',
        emailMatch: () => (`The email and password you entered don't match`),
      },
    }
  },
  mounted() {
    if (this.$store.state.auth.status.loggedIn) {
      this.$router.push('/board')
    }
  },
  methods: {
    login() {
      this.$store.dispatch('auth/login', this.user).then(
        () => {
          this.$router.push('/')
        },
        error => {
          this.message = "check your email or password"
          console.log(error)
        }
      )
    }
  },
  components: {

  }
}
</script>
