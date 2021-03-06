import axios from 'axios'

const instance = axios.create({
  baseURL: process.env.VUE_APP_API_URL
})

// 1.솔루션 목록 가져오는 api 구현
function getSolution () {
  return instance.get('api/test/getSolution')
}

// 로그인 api 구현
function loginUser (userData) {
  console.log('로그인')
  return instance.post('api/test/login', userData)
}

// 토큰 유효기간 확인 api 구현
function expToken (exp) {
  const expDate = new Date(0)
  expDate.setUTCSeconds(exp) // 1970년 안나오게..
  console.log(expDate)
  const today = new Date()
  console.log(today)

  if (today <= expDate) {
    // exp 만료 안됐으면
    console.log(today <= expDate)
    console.log(today)
  } else {
    // 유효기간 만료
    alert('로그인 해주세요!')
    this.$router.push({ name: 'Login' }) // name: 라우터에서 설정해준 name으로 보낼 수도 있음
    // exp 만료 시 토큰 삭제, store삭제
    localStorage.removeItem('token')
  }
}

// user 권한
function userType (type) {
  switch (type) {
    case 'Q':
      console.log('질문자입니다.')
      return '질문자'
    case 'A':
      console.log('답변자입니다.')
      return '답변자'
    case 'O' :
      console.log('운영자입니다.')
      return '운영자'
  }
}

// user 솔루션
function userSolution (code) {
  switch (code) {
    case 'SL010000':
      console.log('iGate')
      return 'iGate'
    case 'SL020000':
      console.log('eCross.')
      return 'eCross'
    case 'SL030000':
      console.log('Xtorm.')
      return 'Xtorm'
    case 'SL040000':
      console.log('eXperDB.')
      return 'eXperDB'
    case 'SL050000':
      console.log('Libeka.')
      return 'Libeka'
    case 'SL060000':
      console.log('iWorks.')
      return 'iWorks'
    case 'SL070000':
      console.log('iXeb.')
      return 'iXeb'
    case 'SL080000':
      console.log('APIM.')
      return 'APIM'
    case 'SL090000':
      console.log('MyGuard.')
      return 'MyGuard'
    case 'SL100000':
      console.log('문서중앙화.')
      return '문서중앙화'
  }
}
// 아이디 중복 확인
function idChk (userId) {
  return instance.get('api/test/idCheck', { params: userId })
}

// 비밀번호 찾기
function searchPassword (userId) {
  return instance.get('api/test/searchPassword', { params: userId })
}

export { loginUser, expToken, userType, userSolution, getSolution, idChk, searchPassword }
