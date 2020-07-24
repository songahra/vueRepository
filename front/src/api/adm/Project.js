import axios from 'axios'

const instance = axios.create({
  baseURL: process.env.VUE_APP_API_URL
})

function getPjList () {
  return instance.get('knm/getPjList')
}

function srchPjList (srchData) {
  return instance.get('knm/srchPjList', srchData)
}

export { getPjList, srchPjList }
