import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: '',
    username: '',
    userid: '',
    usertype: '',
    company: '',
    solution: '',
    exp: '',
    dept: '',
    // 나중에 분리
    isDisabled: '',
    // header Navigation
    depth1: '',
    depth2: '',
    fullPath: ''
  },
  mutations: {
    SET_TOKEN (state, token) {
      state.token = token
    },
    SET_USERNAME (state, username) {
      state.username = username
      console.log(state.username)
    },
    SET_USERID (state, userid) {
      state.userid = userid
      console.log(state.userid)
    },
    SET_USERTYPE (state, usertype) {
      state.usertype = usertype
      console.log(state.usertype)
    },
    SET_COMPANY (state, company) {
      state.company = company
      console.log(state.company)
    },
    SET_SOLUTION (state, solution) {
      state.solution = solution
      console.log(state.solution)
    },
    SET_DEPT (state, dept) {
      state.dept = dept
      console.log(state.dept)
    },
    //
    SET_ISDIS (state, data) {
      state.isDisabled = data
      console.log(state.data)
    },
    //
    SET_EXP (state, exp) {
      state.exp = exp
      console.log(state.exp)
    },
    SET_DEPTH1 (state, depth1) {
      state.depth1 = depth1
    },
    SET_DEPTH2 (state, depth2) {
      state.depth2 = depth2
    }

  },
  actions: {},
  modules: {},
  // 새로고침해도 store에 담긴 값이 안날아가는 플러그인
  plugins: [createPersistedState()]
})
