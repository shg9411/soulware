<template>
  <div class='login'>
    <div class='card card-container'>
      <form name='form' @submit.prevent='handleLogin'>
        <div class='form-group'>
          <label for='email'>email</label>
          <input
            v-model='user.email'
            type='text'
            class='form-control'
            name='email'
          />
        </div>
        <div class='form-group'>
          <label for='password'>Password</label>
          <input
            v-model='user.password'
            type='password'
            class='form-control'
            name='password'
          />
        </div>
        <div class='form-group'>
          <button class='btn btn-primary'>
            <span>Login</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import User from '../models/user'
export default {
  name: 'login',
  data () {
    return {
      user: new User('', '')
    }
  },
  methods: {
    handleLogin () {
      this.$store.dispatch('auth/login', this.user).then(
        () => {
          this.$router.push('')
        },
        error => {
          error.toString()
        }
      )
    }
  }
}
</script>
