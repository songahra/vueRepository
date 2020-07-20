<template>
  <v-container
    fill-height
    style="max-width:450px;"
  >
    <div class="modal-content">
      <div class="modal-header">
        <h2 class="modal-title">
          회원정보 입력
        </h2>
        <!-- <button
          type="button"
          class="btn-icon"
          data-dismiss="modal"
          aria-label="Close"
        >
          <i class="icon-close" />
        </button> -->
      </div>
      <div class="modal-body modal-body-ct">
        <div
          id="base-info"
          class="tab-pane active"
        >
          <div class="row frm-row">
            <div class="col-lg-6">
              <div class="form-group">
                <label class="control-label">이메일<span class="text-notice-1">*이메일 형식이 올바르지 않습니다.</span></label>
                <div style="position: relative">
                  <input
                    type="text"
                    class="form-control form-input"
                    placeholder="아이디로 사용할 이메일 입력"
                  >
                  <img
                    src="@/assets/img/danger.svg"
                    alt=""
                  >
                </div>
              </div>
              <div class="form-group">
                <label class="control-label">소속회사</label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="소속회사명"
                >
              </div>
              <div class="form-group">
                <label class="control-label">솔루션명</label>
                <select class="form-control">
                  <option value="">
                    iGate
                  </option>
                </select>
              </div>
              <div class="form-group">
                <label class="control-label">비밀번호<span class="text-notice-2">영문대문자 포함 | 영문소문자 포함 | 숫자포함 | 10자 이상</span>
                </label>
                <div style="position: relative">
                  <img
                    src="@/assets/img/complete.svg"
                    alt=""
                  >
                  <input
                    type="text"
                    class="form-control"
                    placeholder="**********"
                  >
                </div>
              </div>
            </div>
            <div class="col-lg-6">
              <div class="form-group">
                <label class="control-label">이름</label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="가입자 이름"
                >
              </div>
              <div class="form-group">
                <label class="control-label">부서</label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="부서명"
                >
              </div>
              <div class="form-group">
                <label class="control-label">담당</label>
                <select class="form-control">
                  <option value="">
                    기획자
                  </option>
                </select>
              </div>
              <div class="form-group">
                <label class="control-label">비밀번호 확인 <span class="text-notice-1">*비밀번호가 서로 일치하지 않습니다.</span>
                </label>
                <div style="position: relative">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="**********"
                  >
                  <i class="icon-lock" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </v-container>
</template>

<script>
import { signupUser } from '@/api/Signup.js'
import { getSolution, idChk } from '@/api/Login.js'

export default {
  components: {

  },
  data () {
    return {
      emailRulestext: [],
      errorAlert: false, // alert창은 처음에 안보이게 설정
      successAlert: false,
      isFormValid: false, // :rules 가 모두 ture여야 버튼 활성화v
      name: '',
      nameRules: [
        v => !!v || '이름을 입력하세요!',
        v => (v && v.length <= 10) || 'Name must be less than 10 characters'
      ],
      user_id: '',
      emailRules: [
        v => !!v || '이메일을 입력하세요!.',
        v => /.+@.+\..+/.test(v) || '이메일 형식이 올바르지 않습니다.'
      ],
      pwdConfirm: [v => !!v || '비밀번호를 확인해 주세요.', v => v === this.user_pw || '비밀번호가 서로 일치하지 않습니다.'],
      user_pw2: '',
      show1: false,
      show2: false,
      user_pw: '',
      rules: {
        required: value => !!value || '비밀번호를 입력하세요!',
        min: v => v.length >= 10 || '10자 이상',
        chk1: v => /[A-Z]/.test(v) || ' 영어 대문자 포함',
        chk2: v => /[a-z]/.test(v) || '영어 소문자 포함',
        chk3: v => /[0-9]/.test(v) || '숫자 포함'
      },
      minRules: {
        min: v => v.length >= 10 || '10자 이상'
      },
      dept: null,
      user_type: null,
      items2: [
        {
          name: '답변자',
          code: 'A'
        },
        {
          name: '질문자',
          code: 'Q'
        }
      ],
      solution: null,
      items: [
      ],
      user_name: '',
      company: ''
    }
  }, // data
  async created () {
    const { data } = await getSolution()

    console.log('data뭐있지?', data)
    this.items = data
    console.log('emailRules', this.emailRules)
  },
  methods: {
    // 회원가입
    async submitForm () {
      try {
        // 비즈니스 로직
        const userData = {

          user_id: this.user_id,
          user_name: this.user_name,
          user_pw: this.user_pw,
          company: this.company,
          user_type: this.user_type.code,
          solution: this.solution.codeId,
          dept: this.dept

        }
        console.log(userData)
        const res = await signupUser(userData)
        if (res.status === 200) {
          alert(res.data)
          this.$router.push('/home').catch(() => {})
        } else {
          alert('회원가입 실패')
          this.$router.push('login')
        }
      } catch (error) {

      } finally {

      }
    },
    async chkBtn () {
      const id = { user_id: this.user_id }
      console.log(id)
      const { data } = await idChk(id)
      console.log(data)
      if (data === 1) {
        // 1 : 아이디가 중복되는 문구 보여주기
        this.errorAlert = true
        this.successAlert = false
      } else {
        this.successAlert = true
        this.errorAlert = false
      }
    }

  }
}
</script>

<style>

</style>
