<template lang="html">
  <div
    id="wrap"
    class="login"
  >
    <!-- header -->
    <header id="hd">
      <h1 class="logo text-hide">
        <a href="">
          <img
            src="@/assets/img/logo_wh.svg"
            alt="INZENT"
          >INZENT</a>
      </h1>
    </header>
    <!-- //header -->
    <div id="ct">
      <form
        class="form-login"
        @submit.prevent="submitForm"
      >
        <img
          src="@/assets/img/product-name.svg"
          alt="ESB"
        >
        <div class="form-group">
          <i
            class="icon-user"
            style="
    height: 0px;
"
          />
          <input
            v-model="user_id"
            type="text"
            class="form-control form-control-lg"
            placeholder="아이디"
          >
        </div>
        <div class="form-group">
          <i
            class="icon-lock"
            style="
    height: 0px;
"
          />
          <input
            v-model="user_pw"
            type="password"
            class="form-control form-control-lg"
            placeholder="비밀번호"
          >
        </div>
        <label class="custom-control custom-checkbox">
          <input
            v-model="idSaveCheck"
            type="checkbox"
            class="custom-control-input"
          >
          <span class="custom-control-label">아이디 저장</span>
        </label>
        <div
          v-if="alert"
          class="alert alert-danger"
        >
          계정 정보가 맞는지 확인해 주세요.
        </div>
        <button
          type="submit"
          class="btn btn-block btn-danger btn-lg"
        >
          로그인
        </button>
        <div style="text-align: center; margin-top: 15px;">
          <a
            href="#modal_membership"
            class="btn-login"
            @click.prevent="addBoard"
          >회원가입</a>
          <a>|</a>
          <a
            href="#modal_membership"
            class="btn-login"
            @click.prevent="addModal"
          >비밀번호 찾기</a>
        </div>
      </form>

      <p class="copy">
        &copy; 2020 IZENT. All rights reserved
      </p>
    </div>
    <Modal3
      :dialog="isAddBoard"
      @close="isAddBoard=false"
    />
    <Modal
      :dialog="isAddModal"
      @close="isAddModal=false"
    />
  </div>
</template>

<script>
import { loginUser } from '@/api/log/Login.js'
import Modal3 from '@/components/log/KALOG0103.vue'
import Modal from '@/components/log/KALOGPOP2.vue'

import '@/assets/css/common.css'
import '@/assets/vendor/bootstrap/css/bootstrap.min.css'
import '@/assets/vendor/bootstrap-select/bootstrap-select.min.css'
import '@/assets/vendor/bootstrap/js/bootstrap.bundle.min.js'

global.jQuery = require('jquery')
var $ = global.jQuery
window.$ = $

export default {
  components: {
    Modal3,
    Modal
  },
  data: () => {
    return {
      user_id: '',
      user_pw: '',
      isAddBoard: false,
      isAddModal: false,
      data: '',
      idSaveCheck: '',
      alert: false
    }
  },
  mounted () {
    $(document).on('click', '[data-toggle="toggle"]', function () {
      var $t = $(this)
      var txt = $t.data('class')
      var target = $t.data('target') || $t.attr('href')
      $(target).toggleClass(txt)
    })
    console.log(this.user_id)
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
          // alert(data.msg)
          this.alert = true
        } else {
          console.log(data.token)

          var base64Url = data.token.split('.')[1]
          var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
          var jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
          }).join(''))

          const jwt = JSON.parse(jsonPayload)
          this.$store.commit('SET_TOKEN', data.token)
          this.$store.commit('SET_USERNAME', jwt.user_name)
          this.$store.commit('SET_USERID', jwt.user_id)
          this.$store.commit('SET_USERTYPE', jwt.user_type)
          this.$store.commit('SET_COMPANY', jwt.company)
          this.$store.commit('SET_SOLUTION', jwt.solution)
          this.$store.commit('SET_DEPT', jwt.dept)
          this.$store.commit('SET_EXP', jwt.exp)

          localStorage.setItem('token', data.token)

          this.$router.push({ name: 'Home' }).catch((e) => {
          })
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
    },
    addModal () {
      console.log('addModal 실행')
      this.isAddModal = true
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
