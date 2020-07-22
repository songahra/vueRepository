<template>
  <v-app>
    <v-dialog
      v-model="dialog"
      persistent
    >
      <!-- 비밀번호 변경 -->
      <div
        id="modal7"
        class="modal fade show"
        tabindex="-1"
        role="dialog"
        style="display: block;"
        aria-modal="true"
      >
        <v-form
          v-model="isFormValid"
          class="form"
          @submit.prevent="submitForm"
        >
          <div class="modal-dialog modal-dialog-centered modal-sm">
            <div class="modal-content">
              <div class="modal-header">
                <h2 class="modal-title">
                  비밀번호 변경
                </h2>
                <button
                  type="button"
                  class="btn-icon"
                  data-dismiss="modal"
                  @click.prevent="onClose"
                >
                  <i class="icon-close" />
                </button>
              </div>
              <div class="modal-body">
                <div class="form-group">
                  <label class="control-label">이전 비밀번호</label>
                  <v-text-field
                    v-model="user_pw"
                    :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                    :type="show1 ? 'text' : 'password'"
                    solo
                    dense
                    outline
                    class="form-control compact-form"
                    placeholder="이전 비밀번호를 입력해 주세요."
                    required
                    @click:append="show1 = !show1"
                  />
                </div>
                <div class="form-group">
                  <label class="control-label">비밀번호</label>
                  <v-text-field
                    v-model="update_pw"
                    :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                    :type="show2 ? 'text' : 'password'"
                    class="form-control"
                    placeholder="비밀번호를 입력해 주세요."
                    required
                    solo
                    dense
                    outline
                    @click:append="show2 = !show2"
                  />
                </div>
                <div class="form-group">
                  <label class="control-label">비밀번호 확인</label>
                  <v-text-field
                    v-model="check_pw"
                    :append-icon="show3 ? 'mdi-eye' : 'mdi-eye-off'"
                    :type="show3 ? 'text' : 'password'"
                    class="form-control"
                    placeholder="동일한 비밀번호를 입력해 주세요."
                    :rules="[v => !!v || '비밀번호를 확인해 주세요', v => v === this.update_pw || '비밀번호가 서로 일치하지 않습니다.']"
                    required
                    solo
                    dense
                    outline
                    @click:append="show3 = !show3"
                  />
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
                  type="submit"
                  class="btn btn-primary"
                >
                  확인
                </button>
              </div>
            </div>
          </div>
        </v-form>
      </div>
    </v-dialog>
  </v-app>
</template>

<script>
import { updatePassword } from '@/api/Profile.js'

export default {
  props: ['dialog'],
  data: () => {
    return {
      isFormValid: false, // :rules 가 모두 ture여야 버튼 활성화

      show1: false,
      show2: false,
      show3: false,
      check_pw: '', // 비밀번호 확인
      update_pw: '', // 변경될 비밀번호
      user_pw: '' // 현재 비밀번호
    }
  },
  computed: {
    user_id: function () {
      return this.$store.state.userid
    }
  },
  methods: {
    onClose () {
      this.$emit('close')
    },
    async submitForm () {
      console.log('실행')
      // 비즈니스 로직
      const userData = {
        user_pw: this.user_pw, // 현재 비밀번호
        update_pw: this.update_pw, // 변경될 비밀번호
        user_id: this.user_id // user 아이디
      }
      console.log(userData)
      const { data } = await updatePassword(userData)
      alert(data)
      console.log(data)
      if (data === '비밀번호 변경 성공') { this.$router.push('/login') }
    }

  }
}
</script>

<style>
.v-input__control{
  min-height: 30px !important;
}
</style>
