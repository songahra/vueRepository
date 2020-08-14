<template lang="html">
  <v-app id="app">
    <v-dialog
      v-model="dialog"
      persistent
    >
      <form
        @submit.prevent="submitForm"
      >
        <div
          id="modal_membership"
          class="modal fade show"
          tabindex="-1"
          style="display: block;"
          role="dialog"
          aria-modal="true"
        >
          <div class="modal-dialog modal-dialog-centered modal-lg modal-dialog-scrollable">
            <div class="modal-content">
              <div class="modal-header">
                <h2 class="modal-title">
                  회원정보 입력
                </h2>
                <button
                  type="button"
                  class="btn-icon"
                  data-dismiss="modal"
                  aria-label="Close"
                  @click.prevent="onClose"
                >
                  <i class="icon-close" />
                </button>
              </div>
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
                          <span
                            v-if="emailValid === 'notValid'"
                            class="text-notice-1"
                          >*이메일 형식이 올바르지 않습니다.</span>
                          <span
                            v-if="emailValid === 'space'"
                            class="text-notice-1"
                          >*이메일을 입력하세요 </span>
                        </label>
                        <div style="width: 352px;">
                          <span>
                            <v-text-field
                              v-model="user_id"
                              style="display: inline-block"
                              class="form-control compact-form"
                              dense
                              solo
                              @keyup="emailValidate($event.target.value)"
                            />
                            <button
                              id="idChkbtn"
                              type="button"
                              color="white"
                              class="btn btn-primary"
                              data-dismiss="modal"
                              style="position:absolute; margin-top: 0px; margin-left: 5px;"
                              :disabled="emailDisabled"
                              @click.prevent="chkBtn"
                            >
                              아이디 중복 확인
                            </button>
                          </span>
                        </div>
                      </div>
                      <div class="form-group">
                        <label class="control-label">소속회사</label>
                        <v-text-field
                          v-model="company"
                          class="form-control compact-form"
                          dense
                          solo
                        />
                      </div>
                      <div class="form-group">
                        <label class="control-label">솔루션명</label>
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
                        <label class="control-label">비밀번호
                          <div class="dodo">
                            <span
                              v-for="(data,index) in passValid"
                              :key="index"
                              class="text-notice-1"
                              style="position:relative; margin-right: 5px;"
                            >{{ data }} </span></div>
                        </label>

                        <div style="position: relative">
                          <img
                            class="input-img"
                            src="img/complete.svg"
                            alt=""
                          >
                          <v-text-field
                            v-model="user_pw"
                            class="form-control compact-form"
                            dense
                            solo
                            :type="show1 ? 'text' : 'password'"
                            @keyup="passValidation($event.target.value)"
                          />
                          <template v-if="show1 === false">
                            <img
                              class="input-icon"
                              src="@/assets/img/eye-closed.png"
                              @click="()=>{show1 = true }"
                            >
                          </template>
                          <template v-else>
                            <i
                              class="icon-eye input-icon"
                              @click="()=>{show1 = false }"
                            />
                          </template>
                        </div>
                      </div>
                    </div>
                    <div class="col-lg-6">
                      <div class="form-group">
                        <label class="control-label">이름</label>
                        <v-text-field
                          v-model="user_name"
                          class="form-control compact-form"
                          dense
                          solo
                        />
                      </div>
                      <div class="form-group">
                        <label class="control-label">부서</label>
                        <v-text-field
                          v-model="dept"
                          class="form-control compact-form"
                          dense
                          solo
                        />
                      </div>
                      <div class="form-group">
                        <label class="control-label">담당</label>
                        <v-select
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
                        <label class="control-label">비밀번호 확인
                          <span
                            v-if="chkPwd === true"
                            class="text-notice-1"
                          >*비밀번호가 서로 일치하지 않습니다.</span>
                        </label>
                        <div style="position: relative">
                          <v-text-field
                            v-model="user_pw2"
                            class="form-control compact-form"
                            dense
                            solo
                            :type="show2 ? 'text' : 'password'"
                            @keyup="pwdConfirm($event.target.value)"
                          />
                          <div v-if="show2 === false">
                            <img
                              class="input-icon"
                              src="@/assets/img/eye-closed.png"
                              @click="()=>{show2 = true }"
                            >
                          </div>
                          <div v-else>
                            <i
                              class="icon-eye input-icon"
                              @click="()=>{show2 = false }"
                            />
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
            </div>
          </div>
          <Alert
            :dialog="isDialog"
            :send-data="alertContent"
            @close="close"
          />
          <failAlert
            :dialog="failDialog"
            :send-data="alertContent"
            @close="close"
          />
        </div>
      </form>
    </v-dialog>
  </v-app>
</template>

<script>
import { signupUser } from '@/api/log/Signup.js'
import { getSolution, idChk } from '@/api/log/Login.js'
import Alert from '@/components/common/CompletePOP.vue'
import failAlert from '@/components/common/FailPOP.vue'

export default {
  components: {
    Alert,
    failAlert
  },
  props: ['dialog'],
  data () {
    return {
      emailDisabled: true,
      isDialog: false,
      failDialog: false,
      alertContent: '',
      show: true,
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

      emailValid: '',
      passValid: ['영문대문자 포함 ', '영문소문자 포함 ', '숫자포함 ', '10자 이상 '],
      user_pw2: '',
      show1: false,
      show2: false,
      user_pw: '',

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
      company: '',
      type: '',
      chkPwd: true
    }
  }, // data
  async created () {
    const { data } = await getSolution()

    console.log('data뭐있지?', data)
    this.items = data
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
          user_type: this.user_type,
          solution: this.solution,
          dept: this.dept

        }
        console.log(userData)
        const res = await signupUser(userData)
        if (res.status === 200) {
          this.type = 'move'
          this.isDialog = true
          this.alertContent = '회원가입 성공'
        } else {
          this.failDialog = true
          this.alertContent = '회원가입 실패'
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
        this.failDialog = true
        this.alertContent = '중복되는 아이디 입니다.'
        // close() => {'          this.$router.push()'}
      } else { // 1이 아니면 중복되는게 아님
        this.isDialog = true
        this.alertContent = '가입 가능한 아이디 입니다'
      }
    },
    onClose () {
      this.$emit('close')
    },
    emailValidate (e) {
      if (e.length === 0) {
        console.log('1')
        this.emailDisabled = true
        this.emailValid = 'space'
      } else if (!/.+@.+\..+/.test(e)) {
        console.log('2')
        this.emailDisabled = true
        this.emailValid = 'notValid'
      } else if (/.+@.+\..+/.test(e)) {
        console.log('3')
        this.emailDisabled = false
        // var x = document.getElementById('idChkbtn')
        // x.style.color = 'green'
        this.emailValid = 'valid'
      }
    },
    passValidation (e) {
      this.passValid = ['영문대문자 포함', '영문소문자 포함', '숫자포함', '10자 이상']

      if (/[A-Z]/.test(e)) {
        this.passValid.splice(this.passValid.indexOf('영문대문자 포함'), 1)
      }

      if (/[a-z]/.test(e)) {
        this.passValid.splice(this.passValid.indexOf('영문소문자 포함'), 1)
      }

      if (/[0-9]/.test(e)) {
        this.passValid.splice(this.passValid.indexOf('숫자포함'), 1)
      }

      if (e.length >= 10) {
        this.passValid.splice(this.passValid.indexOf('10자 이상'), 1)
      }
    },
    pwdConfirm (v) { // 비밀번호 확인 함수
      if (v === this.user_pw) {
        this.chkPwd = false
      } else {
        this.chkPwd = true
      }
    },
    close () {
      if (this.type === 'move') {
        this.$router.go(this.$router.currentRoute)
      }
      this.isDialog = false
      this.failDialog = false
    }

  }
}
</script>

<style>
.v-input__control{
  min-height: 30px !important;
}
.dodo{
    margin-left: 150px;
}
</style>
