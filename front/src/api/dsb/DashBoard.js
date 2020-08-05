import axios from 'axios'

const instance = axios.create({
  baseURL: process.env.VUE_APP_API_URL
})

function main () {
  return instance.get('dsb/main')
}

function noticeList () {
  return instance.get('dsb/noticeList')
}

export { main, noticeList }
