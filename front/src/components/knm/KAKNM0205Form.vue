<template>
  <div>
      <div class="sub-bar">
        <div>
          <p class="font-weight-bold">{{ this.ansName }}<br></p>
          <p style="font-size: 12.5px">{{ this.upAnsName }}</p>
        </div>
        <div class="ml-auto form-inline m-full">
          <div v-if = "chkUserType()">
            <a href="" @click.prevent="clickDelete" class="btn btn-m"><span class="hide">삭제</span></a>
            <a href="" @click.prevent="clickModify" class="btn btn-m"><span class="hide">수정</span></a>
          </div>
        </div>
      </div>
      <textarea class="textarea-basic-md" v-model="ansContent" readonly></textarea>
      <alert :dialog="isDialog" @postDelete = "postDelete" @close="isDialog=false"></alert>
      <failAlert :dialog="fDialog" :sendData="alertContent" @close="fDialog=false"></failAlert>
  </div>
</template>

<script>
import { getAnswer, delAnswer } from '@/api/knm/Answer.js'
import alert from '@/components/common/DeletePOP.vue'
import failAlert from '@/components/common/FailPOP.vue'

export default {
  name: 'KAKNM0205Form',
  components: {
    alert,
    failAlert
  },
  data: () => {
    return {
      ansName: '',
      upAnsName: '',
      userType: '',
      userid: '',
      reg_userid: '',
      ansContent: '',
      answer_id: '',
      content_b: '',
      content_t: '',
      question_id: '',
      score: '',
      lists: '',
      param: '',
      answerData: '',
      isDialog: false,
      fDialog: false,
      alertContent: ''
    }
  },
  props: ['sendData'],
  created () {
    console.log('0205 created!!', this.sendData)
    this.answerData = this.sendData
    this.score = this.answerData.score
    this.answer_id = this.answerData.answer_id
    this.reg_userid = this.answerData.reg_userid
    this.getAnswerDetail()
  },
  computed: {
    user_id () {
      return this.$store.state.userid
    }
  },
  methods: {
    async getAnswerDetail () {
      console.log('getAnswer function')
      const params = {
        params: {
          answer_id: this.answer_id
        }
      }
      const { data } = await getAnswer(params)
      console.log(data)
      //   this.lists = data
      console.log('data!!', data)
      this.ansName = data[0].ansName + '(' + data[0].dept + ') 답변 ' + '(' + data[0].reg_date + ')'
      this.ansContent = data[0].content_a
      this.content_t = data[0].content_t
      this.content_b = data[0].content_b
      if (data[0].upAnsName != null) {
        this.upAnsName = '└ ' + data[0].upAnsName + '(' + data[0].upDept + ') 수정 답변 ' + '(' + data[0].update_date + ')'
      }
      console.log(this.ansName)
      console.log(this.ansContent)
    },
    chkWriter () {
      this.userid = this.$store.state.userid
      console.log(this.userid === this.reg_userid)
      if (this.userid === this.reg_userid) {
        return true
      } else {
        return false
      }
    },
    chkUserType () {
      this.userType = this.$store.state.usertype
      if (this.userType === 'A' || this.userType === 'O') {
        return true
      }
    },
    clickModify () {
      if (this.chkWriter()) {
        this.alertContent = '본인이 작성한 질문의 답변은 수정할 수 없습니다.'
        this.fDialog = true
      } else if (this.score === 0) {
        const params = {
          answer_id: this.answerData.answer_id,
          question_id: this.answerData.question_id
        }
        console.log('modify!!', params)
        this.$router.push({ name: 'KAKNM02Modify', params: params })
      } else {
        console.log('modify score check ', this.score === 0)
        this.alertContent = '평가가 완료된 답변은 수정할 수 없습니다.'
        this.fDialog = true
      }
    },
    clickDelete () {
      if (this.chkWriter()) {
        this.alertContent = '본인이 작성한 질문의 답변은 삭제할 수 없습니다.'
        this.fDialog = true
      } else if (this.score === 0) {
        console.log('click Delete 실행!')
        this.isDialog = true
        console.log('this.isDialog!', this.isDialog)
      } else {
        console.log('delete score check ', this.score === 0)
        this.alertContent = '평가가 완료된 답변은 삭제할 수 없습니다.'
        this.fDialog = true
      }
    },
    async postDelete () {
      console.log('postDelete 호출')
      const params = {
        params: {
          answer_id: this.answer_id
        }
      }
      await delAnswer(params)
      this.isDialog = false
      this.$router.push({ name: 'KAKNM0101List' })
    }
  }
}
</script>

<style>

</style>
