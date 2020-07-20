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
      <v-dialog
        v-model="dialog"
        hide-overlay
        persistent
        max-width="35%"
      >
        <v-card>
          <a
            href=""
            class="modal-default-button"
            @close="onClose"
          >&times;</a> <!-- @수정해야함@  -->
          <v-toolbar
            flat
            height="50"
            color="#FFFFF"
          >
            <v-spacer />
            <v-toolbar-title>
              <h3
                class="text--secondary text-center"
                style="padding-bottom: 20px; padding-top: 20px;"
              >
                비밀번호 찾기
              </h3>
            </v-toolbar-title>
            <v-spacer />
          </v-toolbar>

          <h4>이메일(아이디)</h4>
          <div class="pa-3">
            <v-text-field
              v-model="user_id"
              solo
              outlined
              :rules="emailRules"
              required
              label="아이디 입력"
            />
          </div>
          <div class="text-center">
            <v-btn
              block
              large
              depressed
              type="submit"
              @click="clickBtn"
            >
              전송
            </v-btn>
          </div>
        </v-card>
      </v-dialog>
    </v-layout>
  </v-container>
</template>

<script>
import { searchPassword } from '@/api/Login.js'
export default {
  props: ['dialog'],
  data () {
    return {
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
    }
  }
}
</script>

<style>

</style>
