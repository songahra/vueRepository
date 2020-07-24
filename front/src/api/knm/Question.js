import axios from 'axios'

const instance = axios.create({
  baseURL: process.env.VUE_APP_API_URL
})

// 지식관리 메인 리스트 조회
function mainList () {
  return instance.get('knm/mainList')
}

// 지식관리 리스트 조건 조회
function srchList (srchData) {
  return instance.post('knm/srchList', srchData)
}

// 지식관리 상세조회
function getDetail (formData) {
  console.log(formData)
  return instance.get('knm/getDetail', { params: formData })
}

// 지식관리 등록/삭제/수정
function modify (formData) {
  return instance.post('knm/modify', formData)
}

// 지식관리 등록시 프로젝트 조회 메인화면
function getPjList () {
  return instance.get('knm/getPjList')
}

// 지식관리 등록시 프로젝트 조건조회 화면
function srchPjList (srchData) {
  return instance.get('knm/srchPjList', { params: srchData })
}

// 지식관리 내가문의한 질문
function getMyList (formData) {
  return instance.get('knm/getMyList', { params: formData })
}

// 지식관리 내가문의한 질문 조회
function srchMyList (formData) {
  return instance.get('knm/srchMyList', { params: formData })
}

export { mainList, srchList, getDetail, modify, getPjList, srchPjList, getMyList, srchMyList }
