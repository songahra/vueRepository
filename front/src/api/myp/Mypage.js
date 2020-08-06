import axios from 'axios'

const instance = axios.create({
  baseURL: process.env.VUE_APP_API_URL
})
// mypage 목록보기
function selectMypage (param) {
  console.log('selectMypage함수 실행')
  return instance.get('/mypage/list', { params: param })
}

// mypage에서 내가 한 답변 질문 id
function getId (param) {
  console.log('selectQuestionId함수 실행')
  return instance.get('/mypage/getId', { params: param })
}
export { selectMypage, getId }
