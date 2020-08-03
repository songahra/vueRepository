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

// 조회 눌렀을 때 공지사항 글 목록 불러오기
function searchNotice (param) {
  return instance.get('/notice/searchList', { params: param })
}

// 공지사항 상세보기
function detailNotice (param) {
  console.log('detailNotice함수 실행')
  return instance.get('/notice/detail', { params: param })
}

// 공지사항 조회수 +
function plusCnt (param) {
  console.log('plusCnt 실행')
  return instance.get('/notice/plusCnt', { params: param })
}

// 공지사항 수정하기
function updateNotice (formData) {
  console.log('updateNotic실행')
  return instance.post('/notice/modify', formData)
}

// 공지사항 삭제하기
function deleteNotice (param) {
  console.log('deleteNotic실행')
  // return instance.post('/notice/delete', { params: param })
  return instance.post('/notice/delete', param)
}

export {
  writeNotice,
  selectNotice,
  detailNotice,
  updateNotice,
  searchNotice,
  plusCnt,
  deleteNotice
}
