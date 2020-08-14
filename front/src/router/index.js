import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store/index'

Vue.use(VueRouter)

// token없으면 login 페이지로 이동
const requireAuth = (to, from, next) => {
  const isAuth = localStorage.getItem('token')
  const loginPath = '/login'
  isAuth ? next() : next(loginPath)
}

const requireAuthHome = (to, from, next) => {
  const isAuth = localStorage.getItem('token')
  const loginPath = '/login'
  if (isAuth) {
    if (store.state.usertype !== 'O') {
      // 토큰이 있고 유저 타입이 운영자가 아니라면
      next('/mypage')
    } else {
      // 토큰이 있고 유저 타입이 운영자면
      next('/dsb/main')
    }
  } else {
    next(loginPath)
  }
}

const routes = [
  {
    path: '/',
    name: 'Home',
    beforeEnter: requireAuthHome
  },
  { // 대시보드
    path: '/dsb/main',
    name: 'KADSB0101Main',
    component: () => import('@/views/dsb/KADSB0101Main.vue')
    // beforeEnter: requireAuth // token이 없으면 login 페이지로 이동
  },
  {
    // 로그인 페이지
    path: '/mypage',
    name: 'Mypage',
    component: () => import('@/views/myp/KAMYP0101.vue')
  },
  {
    // 로그인 페이지
    path: '/login',
    name: 'Login',
    component: () => import('@/views/log/KALOG0101.vue')
  },
  {
    // 회원가입
    path: '/signup',
    name: 'Signup',
    component: () => import('@/views/log/KALOG0104MODAL.vue')
  },
  {
    // 프로필
    path: '/profile',
    name: 'profile',
    component: () => import('@/views/prm/KAPRM0101.vue'),
    beforeEnter: requireAuth // token이 없으면 login 페이지로 이동
  },
  {
    // 프로필 편집
    path: '/profileUpdate',
    name: 'profileupdate',
    component: () => import('@/views/prm/KAPRM0102.vue'),
    beforeEnter: requireAuth // token이 없으면 login 페이지로 이동
  },
  {
    // 프로필 -> 포인트 조회
    path: '/point',
    name: 'point',
    component: () => import('@/views/prm/KAPRM0104.vue'),
    beforeEnter: requireAuth // token이 없으면 login 페이지로 이동
  },
  {
    // 공지사항 목록
    path: '/noticeList',
    name: 'noticeList',
    component: () => import('@/views/nti/KANTI0101.vue')
  },
  {
    // 공지사항  > 상세조회
    path: '/noticeDetail/:notice_id',
    name: 'noticeDetail',
    component: () => import('@/views/nti/KANTI0103.vue')
  },
  {
    // 공지사항 등록
    path: '/noticeWrite',
    name: 'noticeWrite',
    component: () => import('@/views/nti/KANTI0102.vue')
  },
  {
    // 공지사항 수정
    path: '/noticeModify/:notice_id',
    name: 'noticeModify',
    component: () => import('@/views/nti/KANTI0104.vue')
  },
  {
    // 지식관리 메인페이지
    path: '/knm/mainList',
    name: 'KAKNM0101List',
    component: () => import('@/views/knm/KAKNM0101List.vue'),
    beforeEnter: requireAuth // token이 없으면 login 페이지로 이동
  },
  {
    // 지식관리 > 상세보기
    path: '/knm/quDetail/:question_id',
    name: 'KAKNM0104Detail',
    component: () => import('@/views/knm/KAKNM0104Detail.vue'),
    beforeEnter: requireAuth // token이 없으면 login 페이지로 이동
  },
  {
    // 지식관리 > 수정
    path: '/knm/quModify/:question_id',
    name: 'KAKNM0105Modify',
    component: () => import('@/views/knm/KAKNM0105Modify.vue')
    // beforeEnter: requireAuth // token이 없으면 login 페이지로 이동
  },
  {
    // 지식관리 > 내가 문의한 질문
    path: '/knm/myList',
    name: 'KAKNM0107List',
    component: () => import('@/views/knm/KAKNM0107List.vue')
    // beforeEnter: requireAuth // token이 없으면 login 페이지로 이동
  },
  {
    // 지식관리 등록>미리보기
    path: '/knm/quPreviewP1',
    name: 'KAKNM0102P1',
    component: () => import('@/views/knm/KAKNM0102P1.vue'),
    beforeEnter: requireAuth // token이 없으면 login 페이지로 이동
  },
  {
    // 지식관리 등록 > 프로젝트 조회
    path: '/knm/quSrchP1',
    name: 'KAKNM0103P1',
    component: () => import('@/views/knm/KAKNM0103P1.vue'),
    beforeEnter: requireAuth // token이 없으면 login 페이지로 이동
  },
  {
    // 지식관리 등록
    path: '/knm/quWrite',
    name: 'KAKNM0102Write',
    component: () => import('@/views/knm/KAKNM0102Write.vue'),
    beforeEnter: requireAuth // token이 없으면 login 페이지로 이동
  },
  {
    // 설정 > 프로젝트 조회
    path: '/adm/PJList',
    name: 'KAADM0101List',
    component: () => import('@/views/adm/KAADM0101List.vue')
    // beforeEnter: requireAuth // token이 없으면 login 페이지로 이동
  },
  {
    // 내가 답변한 리스트
    path: '/knm/anList',
    name: 'KAKNM02LIST',
    component: () => import('@/views/knm/KAKNM02LIST.vue'),
    beforeEnter: requireAuth // token이 없으면 login 페이지로 이동
  },
  { // 설정 > 사용자권한 관리
    path: '/adm/authList',
    name: 'KAADM0201List',
    component: () => import('@/views/adm/KAADM0201List.vue'),
    beforeEnter: requireAuth // token이 없으면 login 페이지로 이동
  },
  { // 설정 > 코드 관리
    path: '/adm/codeList',
    name: 'KAADM0301List',
    component: () => import('@/views/adm/KAADM0301List.vue'),
    beforeEnter: requireAuth // token이 없으면 login 페이지로 이동
  },
  { // 설정 > 코드 관리 수정
    path: '/adm/codeWirte',
    name: 'KAADM0302Wirte',
    component: () => import('@/views/adm/KAADM0302Wirte.vue'),
    beforeEnter: requireAuth // token이 없으면 login 페이지로 이동
  },

  {
    // 답변 수정
    path: '/knm/ansModify/:answer_id',
    name: 'KAKNM02Modify',
    component: () => import('@/views/knm/KAKNM0202Modify.vue'),
    beforeEnter: requireAuth // token이 없으면 login 페이지로 이동
  },
  {
    // 솔루션별 지식포인트 조회
    path: '/adm/solList',
    name: 'KAADM0401LIST',
    component: () => import('@/views/adm/KAADM0401LIST.vue'),
    beforeEnter: requireAuth
  },
  {
    // 사용자별 지식포인트 조회
    path: '/adm/userList',
    name: 'KAADM0402LIST',
    component: () => import('@/views/adm/KAADM0402LIST.vue'),
    beforeEnter: requireAuth
  },
  {
    // 답변하기
    path: '/knm/anWrite/:question_id',
    name: 'KAKNM02Write',
    component: () => import('@/views/knm/KAKNM0201Write.vue'),
    beforeEnter: requireAuth
  },
  {
    // 파일 업로드
    path: '/file/upload',
    name: 'FILEUPLOAD',
    component: () => import('@/views/knd/FILEUPLOAD.vue'),
    beforeEnter: requireAuth
  },
  { // 지식자료실 리스트
    path: '/knd/manual',
    name: 'KAKND01List',
    component: () => import('@/views/knd/KAKND0101.vue'),
    beforeEnter: requireAuth
  },
  { // 지식자료실 글쓰기
    path: '/knd/write',
    name: 'KAKND01Write',
    component: () => import('@/views/knd/KAKND0102.vue'),
    beforeEnter: requireAuth
  },
  { // 지식자료실 글보기
    path: '/knd/maDetail/:manual_id',
    name: 'KAKND01Detail',
    component: () => import('@/views/knd/KAKND0104.vue'),
    beforeEnter: requireAuth
  },
  { // 지식자료실 글수정
    path: '/knd/modify/:manual_id',
    name: 'KAKND01Modify',
    component: () => import('@/views/knd/KAKND0103.vue'),
    beforeEnter: requireAuth
  },
  { // 404에러
    path: '/404Error',
    name: '404Error',
    component: () => import('@/views/error/404Error.vue')
  },
  { // 500에러
    path: '/500Error',
    name: '500Error',
    component: () => import('@/views/error/500Error.vue')
  },
  { // Exception
    path: '/Exception',
    name: 'Exception',
    component: () => import('@/views/error/Exception.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
