import axios from 'axios'

const instance = axios.create({
  baseURL: process.env.VUE_APP_API_URL
})
// 답변 쓰기
function postAnswer (Data) {
  return instance.post('KAKNM02/write', Data)
}
// 내가 쓴 답변 리스트
function getAnsList (Data) {
  return instance.get('KAKNM02/getList', Data)
}
// 타이틀, 상태로 답변 조회
function getAnsSearchList (Data) {
  return instance.get('KAKNM02/searchList')
}

// 답변 보기
function getAnswer (Data) {
  return instance.get('KAKNM02/getAnswer', Data)
}
// 답변 지우기
function delAnswer (Data) {
  return instance.get('KAKNM02/ansDelete', Data)
}

export { postAnswer, getAnsList, getAnsSearchList, getAnswer, delAnswer }
