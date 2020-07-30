<template>
  <v-dialog
    v-model="dialog"
    persistent
  >
    <div
      id="modal7"
      class="modal fade show"
      tabindex="-1"
      role="dialog"
      style="display: block;"
      aria-modal="true"
    >
      <div class="modal-dialog modal-dialog-centered modal-sm">
        <div class="modal-content">
          <div class="modal-header">
            <h2 class="modal-title">
              비밀번호 찾기
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
          <div class="modal-body">
            <div class="form-group">
              <label class="control-label">이메일(아이디)</label>
              <input
                v-model="user_id"
                type="text"
                class="form-control"
                placeholder="이메일(아이디)을 입력해 주세요."
                required
              >
            </div>
            <div
              v-if="failAlert"
              class="alert alert-danger"
            >
              계정 정보가 맞는지 확인해 주세요.
            </div>
          </div>
          <div class="modal-footer">
            <button
              v-show="!isLoading"
              type="button"
              class="btn btn-primary"
              @click="clickBtn"
            >
              확인
            </button>
            <v-progress-circular
              v-show="isLoading"
              indeterminate
              color="black"
            />
          </div>
        </div>
      </div>
      <Alert
        :dialog="completeAlert"
        :send-data="alertContent"
        @close="completeAlert=false"
      />
    </div>
  </v-dialog>
</template>

<script>
import { searchPassword } from '@/api/log/Login.js'
import Alert from '@/components/common/CompletePOP.vue' // 완료 alert

export default {
  components: {
    Alert
  },
  props: ['dialog'],
  data () {
    return {
      isLoading: false,
      alertContent: '',
      failAlert: false,
      completeAlert: false,
      emailRules: [
        v => /.+@.+\..+/.test(v) || '이메일 형식이 올바르지 않습니다.'
      ],
      user_id: ''
    }
  },
  methods: {
    onClose () {
      this.$emit('close')
    },

    async clickBtn () {
      this.isLoading = !this.isLoading
      const userData = {
        user_id: this.user_id
      }
      await searchPassword(userData).then((res) => {
        console.log('데이터', res.data)
        if (res.data === '존재하지 않는 이메일 입니다.') {
          this.failAlert = true
        } else {
          this.completeAlert = true
          this.alertContent = '이메일이 발송되었습니다.'
          this.isLoading = !this.isLoading
        }
      })
    }
  }
}
</script>

<style>

</style>
