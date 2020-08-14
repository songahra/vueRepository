<template>
  <v-app id="app">
    <v-dialog
      v-model="dialog"
      persistent
      max-width="35%"
    >
      <v-stepper v-model="e1">
        <v-toolbar
          flat
          height="50"
          color=""
        >
          <v-spacer />
          <v-toolbar-title class="modal-title">
            <h2>회원가입</h2>
          </v-toolbar-title>
          <v-spacer />
        </v-toolbar>
        <v-stepper-header>
          <v-stepper-step
            :complete="e1 > 1"
            step="1"
          >
            회원가입 시 약관동의
          </v-stepper-step>

          <v-divider />

          <v-stepper-step
            :complete="e1 > 2"
            step="2"
          >
            회원정보 입력
          </v-stepper-step>
        </v-stepper-header>

        <v-stepper-items>
          <v-stepper-content step="1">
            <step1 /> <!-- 약관동의 step1 -->
            <div class="modal-footer">
              <button
                type="button"
                class="btn"
                data-dismiss="modal"
                @click="onClose()"
              >
                취소
              </button>
              <v-btn
                text
                color="white"
                class="btn btn-primary"
                :disabled="isDisabled"
                @click="e1 = 2"
              >
                다음
              </v-btn>
            </div>
          </v-stepper-content>
          <v-stepper-content step="2">
            <step2 @child-close="onClose" /> <!-- 회원 정보 입력 step2 -->
          </v-stepper-content>
        </v-stepper-items>
      </v-stepper>
    </v-dialog>
  </v-app>
</template>

<script>
import step1 from '@/components/log/KALOG0102.vue' // 약관동의 step1
import step2 from '@/components/log/KALOG0103.vue' // 회원정보 입력 step2
import { expToken } from '@/api/log/Login.js'

export default {
  components: {
    step1,
    step2
  },
  props: ['dialog'],
  data () {
    return {
      e1: 1
    }
  },
  computed: {
    isDisabled: function () {
      return this.$store.state.isDisabled
    }
  },
  created () {
    const exp = this.$store.state.exp
    expToken(exp)
  },
  methods: {
    onClose () {
      this.$emit('close')
    }
  }

}
</script>

<style>
.v-stepper__header{
margin: 0;
}
.header{
margin: 10px;
text-align:center;
}
</style>
