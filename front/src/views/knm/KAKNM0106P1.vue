<!-- 질문 삭제 -->
<template>
  <v-row justify="center">
    <v-dialog
      v-model="dialog"
      persistent
      max-width="290"
    >
      <v-card>
        <v-card-title class="headline">질문하신 내용을 삭제하시겠습니까?</v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
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
           @click="close"
          >
            취소
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import { modify } from '@/api/knm/Question.js'

export default {
  name: 'KAKNM0103From',
  props: ['dialog', 'sendData'],
  data: () => {
    return {
      falg: 'D',
      isDialog: ''
      // paramData:''
    }
  },
  methods: {
    // 팝업 종료
    close () {
      console.log('child-close')
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
          alert(result + ' 건이 삭제되었습니다.')
          this.$emit('close')
        })
        .catch(console.error())
    }
  }
}
</script>

<style>

</style>
