<template>
  <v-dialog
    v-model="dialog"
    persistent
    max-width="35%"
  >
    <v-card>
      <v-card-title>
        <span class="headline">비밀번호 변경</span>
        <a
          href=""
          class="modal-default-button"
          @close="onClose"
        >&times;</a> <!-- @수정해야함@  -->
      </v-card-title>
      <v-form
        class="form"
        @submit.prevent="submitForm"
      >
        <v-card-text>
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
            @click:append="show3 = !show3"
          />
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
            large
            depressed
            type="submit"
          >
            확인
          </v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-dialog>
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
      // pwdConfirm: [v => !!v || 'Confirm password', v => v === this.update_pw || '비밀번호가 서로 일치하지 않습니다.']
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
    }

  }
}
</script>

<style>

</style>
