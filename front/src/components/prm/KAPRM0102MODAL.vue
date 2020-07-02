<template>
  <v-dialog
    v-model="dialog"
    persistent
    max-width="35%"
  >
    <v-card>
      <v-card-title>
        <span class="headline">비밀번호 변경</span>
      </v-card-title>
      <v-card-text>
        <v-form
          v-model="isFormValid"
          class="form"
        >
          <v-text-field
            v-model="user_pw"
            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
            :type="show1 ? 'text' : 'password'"
            solo
            outline
            required
            label="이전 비밀번호"
            @click:append="show1 = !show1"
          />
          <v-text-field
            v-model="update_pw"
            :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
            :type="show2 ? 'text' : 'password'"
            solo
            outline
            required
            label="비밀번호"
            @click:append="show2 = !show2"
          />
          <v-text-field
            v-model="check_pw"
            :append-icon="show3 ? 'mdi-eye' : 'mdi-eye-off'"
            :type="show3 ? 'text' : 'password'"
            solo
            outline
            required
            label="비밀번호 확인"
            :rules="pwdConfirm"
            @click:append="show3 = !show3"
          />
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn
          color="blue darken-1"
          text
          @click.prevent="onClose"
        >
          Close
        </v-btn>
        <v-btn
          :disabled="!isFormValid"
          large
          depressed
          type="submit"
        >
          확인
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: ['dialog'],
  data () {
    return {
      isFormValid: false, // :rules 가 모두 ture여야 버튼 활성화

      show1: false,
      show2: false,
      show3: false,
      check_pw: '',
      update_pw: '',
      user_pw: '',
      pwdConfirm: [v => !!v || 'Confirm password', v => v === this.update_pw || '비밀번호가 서로 일치하지 않습니다.']

    }
  },
  methods: {
    onClose () {
      this.$emit('close')
    }
  }
}
</script>

<style>

</style>
