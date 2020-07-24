<template lang="html">
  <v-app id="app">
    <form
      @submit.prevent="submitForm"
    >
      <div class="modal-content">
        <div class="modal-body modal-body-ct">
          <div
            id="base-info"
            class="tab-pane active"
          >
            <div class="row frm-row">
              <div class="col-lg-6">
                <div class="form-group">
                  <label
                    class="control-label"
                  >이메일
                    <!-- <span class="text-notice-1">*이메일 형식이 올바르지 않습니다.</span> -->
                  </label>
                  <div style="position: relative">
                    <v-text-field
                      v-model="user_id"
                      :rules="emailRules"
                      class="form-control compact-form"
                      dense
                      solo
                    />

                    <!-- <img
                  src="@/assets/img/danger.svg"
                  alt=""
                > -->
                  </div>
                </div>
                <div class="form-group">
                  <label
                    class="control-label"
                    style="
    padding-top: 30px;
"
                  >소속회사</label>
                  <v-text-field
                    class="form-control compact-form"
                    dense
                    solo
                  />
                </div>
                <div>
                  <label
                    class="control-label"
                    style="
    padding-top: 30px;
"
                  >솔루션명</label>
                  <v-select
                    v-model="solution"
                    class="form-control compact-form"
                    :items="items"
                    :rules="[v => !!v || '솔루션을 선택하세요']"
                    clearable
                    dense
                    solo
                    required
                    item-text="codeContent"
                    item-value="codeId"
                  />
                </div>
                <div class="form-group">
                  <label
                    class="control-label"
                    style="
    padding-top: 30px;
"
                  >비밀번호
                    <!-- <span class="text-notice-2">영문대문자 포함 | 영문소문자 포함 | 숫자포함 | 10자 이상</span> -->
                  </label>
                  <div style="position: relative">
                    <!-- <img
                  src="@/assets/img/complete.svg"
                  alt=""
                > -->
                    <v-text-field
                      class="form-control compact-form"
                      dense
                      solo
                    />
                  </div>
                </div>
              </div>
              <div class="col-lg-6">
                <div class="form-group">
                  <label
                    class="control-label"
                  >이름</label>
                  <v-text-field
                    class="form-control compact-form"
                    dense
                    solo
                  />
                </div>
                <div class="form-group">
                  <label
                    class="control-label"
                    style="
    padding-top: 30px;
"
                  >부서</label>
                  <v-text-field
                    class="form-control compact-form"
                    dense
                    solo
                  />
                </div>
                <div>
                  <label
                    class="control-label"
                    style="
    padding-top: 30px;
"
                  >담당</label>
                  <v-combobox
                    v-model="user_type"
                    class="form-control compact-form"
                    :items="items2"
                    :rules="[v => !!v || '담당을 선택하세요']"
                    clearable
                    dense
                    solo
                    required
                    item-text="name"
                    item-value="code"
                  />
                </div>
                <div class="form-group">
                  <label
                    class="control-label"
                    style="
    padding-top: 30px;
"
                  >비밀번호 확인
                  <!-- <span class="text-notice-1">*비밀번호가 서로 일치하지 않습니다.</span> -->
                  </label>
                  <div style="position: relative">
                    <v-text-field
                      class="form-control compact-form"
                      dense
                      solo
                    />
                    <i class="icon-lock" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="modal-footer">
        <button
          type="button"
          class="btn"
          data-dismiss="modal"
          @click.prevent="onClose"
        >
          취소
        </button>
        <button
          text
          color="white"
          class="btn btn-primary"
          type="submit"
        >
          회원가입
        </button>
      </div>
    </form>
  </v-app>
</template>

<script>
import { signupUser } from '@/api/log/Signup.js'
import { getSolution, idChk } from '@/api/log/Login.js'

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
    console.log('emailRules', this.emailRules[0].value)
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
    },
    onClose () {
      console.log('test1')
      this.$emit('child-close')
    }

  }
}
</script>

<style>
.v-input__control{
  min-height: 30px !important;
}
</style>
