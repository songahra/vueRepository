import axios from 'axios'

const instance = axios.create({
  baseURL: process.env.VUE_APP_API_URL
})

function postAnswer (Data) {
  return instance.post('KAKNM02/write', Data)
}

function getAnsList (Data) {
  return instance.get('KAKNM02/getList', Data)
}

function getAnsSearchList (Data) {
  return instance.get('KAKNM02/searchList')
}

export { postAnswer, getAnsList, getAnsSearchList }
