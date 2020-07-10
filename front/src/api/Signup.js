import axios from 'axios'

const instance = axios.create({
  baseURL: process.env.VUE_APP_API_URL
})

// 회원가입 api 구현
function signupUser (userData) {
  return instance.post('api/test/signUp', userData)
}
function formData (userData) {
  return instance.post('api/prm/upload', userData)
}

export { signupUser, formData }
