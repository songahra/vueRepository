<!-- 질문 삭제 -->
<template>
  <v-row justify="center">
    <v-dialog
      v-model="dialog"
      persistent
      max-width="290"
    >
      <v-card>
        <v-card-title class="headline">
          질문하신 내용을 삭제하시겠습니까?
        </v-card-title>
        <v-card-actions>
          <v-spacer />
          <v-btn
            color="green darken-1"
            text
            @click="deleteQuInfo"
          >
            확인
          </v-btn>

          <v-btn
            color="green darken-1"
            text
            @click="delClose"
          >
            취소
          </v-btn>
          <Alert
            :dialog="isDialog"
            :send-data="alertContent"
            @close="close"
          />
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import { modify } from '@/api/knm/Question.js'
import Alert from '@/components/common/CompletePOP.vue' // 완료 alert

export default {
  name: 'KAKNM0103From',
  components: {
    Alert
  },
  props: ['dialog', 'sendData'],
  data: () => {
    return {
      cDialog: false,
      falg: 'D',
      isDialog: false,
      delIsDialog: '',
      alertContent: ''
      // paramData:''
    }
  },
  methods: {
    // 팝업 종료
    delClose () {
      console.log('child-close')
      this.$emit('delClose')
    },
    close () {
      this.$emit('close')
    },
    // 삭제
    deleteQuInfo () {
      console.log('deleteQuInfo sendData =>', this.sendData)
      const formData = this.sendData
      // const formData = {
      //   falg: this.falg,
      //   userid: form.userid,
      //   question_id: form.question_id
      // }
      console.log('deleteQuInfo formData', formData)

      // 서버요청
      modify(formData)
        .then((res) => {
          console.log('result', res.data)
          const result = res.data
          this.isDialog = true
          this.alertContent = result + ' 건이 삭제되었습니다.'
          this.$emit('close')
        })
        .catch(console.error())
    }
  }
}
</script>

<style>

</style>
