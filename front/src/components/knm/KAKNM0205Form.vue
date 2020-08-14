<template>
  <div>
    <div class="sub-bar">
      <div>
        <i class="icon-right text-danger" />
        <template
          class="font-weight-bold"
          style="font-weight:bold"
        >
          <b>{{ this.ansName }}</b><br>
        </template>
        <p style="font-size: 12.5px; margin-left: 10px;">
          {{ this.upAnsName }}
        </p>
      </div>

      <div class="ml-auto form-inline m-full">
        <div v-if="chkUserType()">
          <a
            href=""
            class="btn btn-m"
            @click.prevent="clickDelete"
          ><span class="hide">삭제</span></a>
          <a
            href=""
            class="btn btn-m"
            @click.prevent="clickModify"
          ><span class="hide">수정</span></a>
        </div>
      </div>
    </div>
    <textarea
      v-model="ansContent"
      class="textarea-basic-md"
      readonly
    />
    <alert
      :dialog="isDialog"
      @postDelete="postDelete"
      @close="isDialog=false"
    />
    <failAlert
      :dialog="fDialog"
      :send-data="alertContent"
      @close="fDialog=false"
    />
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
  props: ['sendData'],
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
  computed: {
    user_id () {
      return this.$store.state.userid
    }
  },
  created () {
    this.answerData = this.sendData
    this.score = this.answerData.score
    this.answer_id = this.answerData.answer_id
    this.reg_userid = this.answerData.reg_userid
    this.getAnswerDetail()
  },
  methods: {
    async getAnswerDetail () {
      const params = {
        params: {
          answer_id: this.answer_id
        }
      }
      const { data } = await getAnswer(params)
      this.ansName = data[0].ansName + '(' + data[0].dept + ') 답변 ' + '(' + data[0].reg_date + ')'
      this.ansContent = data[0].content_a
      this.content_t = data[0].content_t
      this.content_b = data[0].content_b
      if (data[0].upAnsName != null) {
        this.upAnsName = ' └ ' + data[0].upAnsName + '(' + data[0].upDept + ') 수정 답변 ' + '(' + data[0].update_date + ')'
      }
    },
    chkWriter () {
      this.userid = this.$store.state.userid
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
        this.$router.push({ name: 'KAKNM02Modify', params: params })
      } else {
        this.alertContent = '평가가 완료된 답변은 수정할 수 없습니다.'
        this.fDialog = true
      }
    },
    clickDelete () {
      if (this.chkWriter()) {
        this.alertContent = '본인이 작성한 질문의 답변은 삭제할 수 없습니다.'
        this.fDialog = true
      } else if (this.score === 0) {
        this.isDialog = true
      } else {
        this.alertContent = '평가가 완료된 답변은 삭제할 수 없습니다.'
        this.fDialog = true
      }
    },
    async postDelete () {
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
