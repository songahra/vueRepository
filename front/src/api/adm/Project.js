import axios from 'axios'

const instance = axios.create({
  baseURL: process.env.VUE_APP_API_URL
})

function getPjList () {
  return instance.get('adm/getPjList')
}

function srchPjList (srchData) {
  return instance.get('adm/srchPjList', { params: srchData })
}

export { getPjList, srchPjList }
