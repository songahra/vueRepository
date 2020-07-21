<template>
  <v-dialog
    v-model="dialog"
    persistent
    max-width="35%"
  >
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
          v-if="alert"
          class="alert alert-danger"
        >
          계정 정보가 맞는지 확인해 주세요.
        </div>
      </div>
      <div class="modal-footer">
        <button
          type="button"
          class="btn btn-primary"
          @click="clickBtn"
        >
          확인
        </button>
      </div>
    </div>
  </v-dialog>
</template>

<script>
import { searchPassword } from '@/api/log/Login.js'
export default {
  props: ['dialog'],
  data () {
    return {
      alert: false,
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
      console.log(this.user_id)
      const userData = {
        user_id: this.user_id
      }
      console.log(userData)

      const { data } = await searchPassword(userData)
      console.log('data', data)
      if (data === '존재하지 않는 이메일 입니다.') {
        this.alert = true
      }
    }
  }
}
</script>

<style>

</style>
