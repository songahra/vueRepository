import axios from 'axios'

const instance = axios.create({
  baseURL: process.env.VUE_APP_API_URL
})
// 공지사항 글 쓰기
function writeNotice (userData) {
  console.log('writeNotice 함수 실행')
  return instance.post('/notice/write', userData)
}

// 모든 공지사항 글 목록 불러오기
function selectNotice () {
  console.log('listNotice 함수 실행')
  return instance.get('/notice/list')
}

// 공지사항 상세보기
function detailNotice (formData) {
  console.log('detailNotice함수 실행')
  return instance.get('/notice/detail', { params: formData })
}
export { writeNotice, selectNotice, detailNotice }
