import axios from 'axios'

const instance = axios.create({
  baseURL: process.env.VUE_APP_API_URL
})

// 기술문의 메인 리스트 조회
function mainList () {
  return instance.get('knm/mainList')
}

// 기술문의 리스트 조건 조회
function srchList (srchData) {
  return instance.post('knm/srchList', srchData)
}

// 기술문의 등록/삭제/수정
function modify (formData) {
  return instance.post('knm/modify', formData)
}

// 기술문의 등록시 프로젝트 조회 메인화면
function getPrList () {
  return instance.get('knm/getPrList')
}

// 기술문의 등록시 프로젝트 조건조회 화면
function srchPrList (srchData) {
  return instance.get('knm/srchPrList', srchData)
}

export { mainList, srchList, modify, getPrList, srchPrList }
