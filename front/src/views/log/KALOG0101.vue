<template>
  <v-container
    fill-height
    style="max-width:450px;"
  >
    <v-layout
      align-center
      row
      wrap
    >
      <v-flex xs12>
        <v-form
          class="form"
          @submit.prevent="submitForm"
        >
          <v-card>
            <v-toolbar
              flat
              height="50"
              color="#FFFFF"
            >
              <v-spacer />
              <v-toolbar-title><img src="@/assets/header_logo.png"></v-toolbar-title>
              <v-spacer />
            </v-toolbar>
            <v-container pa-1>
              <v-divider light />
            </v-container>
            <h3
              class="text--secondary text-center"
              style="padding-bottom: 20px; padding-top: 20px;"
            >
              솔루션 지식자산화 시스템
            </h3>
            <div class="pa-3">
              <v-text-field
                v-model="user_id"
                solo
                outlined
                label="아이디 입력"
              />
              <v-text-field
                v-model="user_pw"
                solo
                outlined
                type="password"
                label="비밀번호 입력"
              />
              <div class="text-center">
                <v-btn
                  block
                  large
                  depressed
                  type="submit"
                >
                  로그인
                </v-btn>
                <v-checkbox
                  v-model="idSaveCheck"
                  label="아이디 저장"
                />
              </div>
              <div class="text-center">
                <a
                  class="new-board-btn"
                  href
                  @click.prevent="addBoard"
                >회원가입</a>
              </div>
            </div>
          </v-card>
        </v-form>
        <Modal3
          :dialog="isAddBoard"
          @close="isAddBoard=false"
        />
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { loginUser } from '@/api/Login.js'
import Modal3 from '@/views/log/KALOG0104MODAL.vue'

export default {
  components: {
    Modal3
  },
  data: () => {
    return {
      user_id: '',
      user_pw: '',
      isAddBoard: false,
      data: '',
      idSaveCheck: ''
    }
  },
  created: function () {
    // 1. 화면 진입 시 쿠키에 아이디가 저장되어 있는지 확인을 한다.
    if (this.$cookie.get('idSave')) { // To get the value of a cookie use
      this.user_id = this.$cookie.get('idSave') // 2. 저장 되어 있다면 화면에 저장된 아이디를 보여준다.
      this.idSaveCheck = true
    }
  },
  methods: {
    async submitForm () {
      try {
        // 3. 로그인 버튼 클릭 시 아이디저장 체크박스가 체크되어 있다면 입력된 아이디를 쿠키에 Set한다.
        if (this.idSaveCheck) {
          console.log('idSaveCheck실행')
          this.$cookie.set('idSave', this.user_id)
        } else {
          // 4. 로그인 버튼 클릭 시 아이디저장 체크박스가 체크가 해제되어 있다면 쿠키의 값을 Delete한다.
          this.$cookie.delete('idSave') // To delete a cookie use
        }

        // 비즈니스 로직
        const userData = {
          user_id: this.user_id,
          user_pw: this.user_pw
        }
        const { data } = await loginUser(userData)
        if (data.msg) {
          alert(data.msg)
        } else {
          console.log(data.token)

          var base64Url = data.token.split('.')[1]
          var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
          var jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
          }).join(''))

          const jwt = JSON.parse(jsonPayload)
          console.log(jwt)
          console.log(jwt.user_name)
          console.log(jwt.user_id)
          console.log(jwt.user_type)
          console.log(jwt.company)
          console.log(jwt.exp)
          console.log(jwt.solution)
          console.log(jwt.dept)

          this.$store.commit('SET_TOKEN', data.token)
          this.$store.commit('SET_USERNAME', jwt.user_name)
          this.$store.commit('SET_USERID', jwt.user_id)
          this.$store.commit('SET_USERTYPE', jwt.user_type)
          this.$store.commit('SET_COMPANY', jwt.company)
          this.$store.commit('SET_SOLUTION', jwt.solution)
          this.$store.commit('SET_DEPT', jwt.dept)
          this.$store.commit('SET_EXP', jwt.exp)

          localStorage.setItem('token', data.token)
          console.log(this.$store.state.token)
        }
      } catch (error) {
        // 에러 핸들링할 코드
        console.log(error.response.data)
      } finally {
      }
    },
    addBoard () {
      console.log('addBoard 실행')
      this.isAddBoard = true
    }

  }//
}
</script>

<style>
.container{
  width: 90%;
}
.v-divider{
 background-color: black;
}
</style>
