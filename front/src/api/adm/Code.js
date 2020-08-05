import axios from 'axios'

const instance = axios.create({
  baseURL: process.env.VUE_APP_API_URL
})

function codeList () {
  return instance.get('adm/codeList')
}

function srchCodeList (srchData) {
  return instance.get('adm/srchCodeList', { params: srchData })
}

function writeCodeInfo (fromData) {
  return instance.post('adm/writeCodeInfo', fromData)
}

function modifyCodeInfo (fromData) {
  return instance.post('adm/modifyCodeInfo', fromData)
}

export { codeList, srchCodeList, writeCodeInfo, modifyCodeInfo }
