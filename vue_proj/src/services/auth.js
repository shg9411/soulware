import axios from 'axios'

let url = 'http://localhost:8000/accounts/'

class AuthService {
  login (user) {
    return axios
      .post(url + 'login', {
        email: user.email,
        password: user.password
      })
      .then(response => {
        if (response.data.token) {
          localStorage.setItem('user', JSON.stringify(response.data))
        }
        return response.data
      })
  }
  logout () {
    localStorage.removeItem('user')
  }
}
export default new AuthService()
