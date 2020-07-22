<template>
<div>
      <div class="ct-content">
        <div class="sub-bar">
          <p class="font-weight-bold">{{ this.ansName }}</p>
          <div class="ml-auto form-inline m-full">
            <div v-if = "chkUserType()">
              <a href="" @click.prevent="clickDelete" class="btn btn-m"><span class="hide">삭제</span></a>
              <a href="" @click.prevent="clickModify" class="btn btn-primary"><span class="hide">수정</span></a>
            </div>
          </div>
        </div>
        <textarea class="textarea-basic-md" v-model="ansContent" readonly></textarea>

      </div>
      <v-app>
        <KAKNM0203DelPopup :dialog="isDialog" :sendData="paramData" ref="popup" @close="close" @ansDelete="ansDelete"></KAKNM0203DelPopup>
      </v-app>
</div>
</template>

<script>
import { getAnswer, delAnswer } from '@/api/knm/Answer.js'
import KAKNM0203DelPopup from '@/components/knm/KAKNM0203Form.vue'

export default {
  name: 'KAKNM0205Form',
  components: {
    KAKNM0203DelPopup
  },
  data: () => {
    return {
      ansName: '',
      userType: '',
      ansContent: '',
      ansId: '',
      question_id: '',
      lists: '',
      paramData: '',
      answerData: '',
      isDialog: false
    }
  },
  props: ['sendData'],
  created () {
    console.log('created!!')
    this.answerData = this.sendData
    this.ansId = this.answerData.answer_id
    console.log('답변하기 ans Id : ', this.ansId)
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
          ansId: this.ansId
        }
      }
      const { data } = await getAnswer(params)
      console.log(data)
      //   this.lists = data
      console.log('data!!', data)
      this.ansName = data[0].ansName + '(' + data[0].dept + ') 답변 ' + '(' + data[0].reg_date + ')'
      this.ansContent = data[0].content_a
      console.log(this.ansName)
      console.log(this.ansContent)
    },
    chkUserType () {
      this.userType = this.$store.state.usertype
      if (this.userType === 'A' || this.userType === 'O') {
        return true
      }
    },
    clickModify () {
      const params = {
        params: {
          project_name: this.answerData.project_name,
          answer_id: this.answerData.answer_id,
          solution_name: this.answerData.solution_name,
          content_q: this.answerData.content_q,
          title: this.answerData.title,
          tag_tag: this.answerData.tag_tag,
          tag_erc: this.answerData.tag_erc,
          tag_ert: this.answerData.tag_ert
        }
      }
      console.log('modify!!', params)
      this.$router.push({ name: 'KAKNM02Modify', params: params })
    },
    clickDelete () {
      console.log('click Delete 실행!')
      this.isDialog = true
      console.log('this.isDialog!', this.isDialog)
    },
    close () {
      this.isDialog = false
    },
    async ansDelete () {
      console.log('ansDelete 호출')
      const params = {
        params: {
          ansId: this.ansId
        }
      }
      const { data } = await delAnswer(params)
      alert(data + ' 개의 답변이 삭제되었습니다.')
      this.close()
      this.$router.push({ name: 'KAKNM0101List' })
    }
  }
}
</script>

<style>

</style>
