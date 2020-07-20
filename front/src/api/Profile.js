import axios from 'axios'

const instance = axios.create({
  baseURL: process.env.VUE_APP_API_URL
})

// 비밀번호 변경 api 구현
function updatePassword (userData) {
  return instance.post('/api/prm/updatePassword', userData)
}

// 프로필 수정 api 구현
function updateProfile (userData) {
  return instance.post('/api/prm/updateProfile', userData)
}

// 프로필 이미지 확인 api 구현
function selectProfile (userData) {
  console.log('이미지 확인 함수 실행')
  return instance.get('/api/prm/selectProfile', { params: userData })
}

// 프로필 -> 지식포인트
function selectMonthPoint (Data) {
  console.log('selectMonthPoint함수 실행')
  return instance.get('/api/prm/selectMonthPoint', { params: Data })
}

// 사용자 총 누적 지식포인트 조회
function selectTotalPoint (userData) {
  console.log('selectTotalPoint 실행')
  return instance.get('/api/prm/selectTotalPoint', { params: userData })
}

// 이 달 누적 지식 포인트
function selectMonthTotalPoint (userData) {
  console.log('selectMonthTotalPoint 함수 실행')
  return instance.get('/api/prm/selectMonthTotalPoint', { params: userData })
}

export { updatePassword, updateProfile, selectProfile, selectMonthPoint, selectTotalPoint, selectMonthTotalPoint }
