import axios from 'axios'

const instance = axios.create({
  baseURL: process.env.VUE_APP_API_URL
})

function getList (Data) {
  return instance.get('KAKND01/getList', Data)
}
function postManual (formData) {
  return instance.post('KAKND01/postManual', formData)
}
function getDetail (data) {
  return instance.get('KAKND01/getDetail', data)
}
export { getList, postManual, getDetail }
