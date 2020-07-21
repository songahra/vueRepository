<template>
<div id="ct">
    <section class="card">
      <div class="ct-content">
        <div class="sub-bar">
          <i class="icon-right text-danger"></i><p class="font-weight-bold">{{ this.ansName }}</p>
          <a href="" @click.prevent="clickDelete" class="btn btn-m"><span class="hide">삭제</span></a>
          <a href="" class="btn btn-primary"><span class="hide">수정</span></a>
        </div>
        <textarea class="textarea-basic" v-model="ansContent"></textarea>

      </div>
      <v-app>
        <KAKNM0203DelPopup :dialog="isDialog" :sendData="paramData" ref="popup" @close="close" @ansDelete="ansDelete"></KAKNM0203DelPopup>
      </v-app>
    </section>
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
      ansContent: '',
      ansId: 'AN20200619203215980',
      lists: '',
      paramData: '',
      isDialog: false
    }
  },
  created () {
    console.log('created!!')
    this.getAnswerDetail()
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
    clickDelete () {
      console.log('click Delete 실행!')
      this.isDialog = true
      console.log('this.isDialog!', this.isDialog)
    },
    close () {
      this.isDialog = false
    },
    ansDelete () {
      console.log('ansDelete 호출')
      this.close()
      const params = {
        params: {
          ansId: this.ansId
        }
      }
      const { data } = delAnswer(params)
      alert(data, ' 개의 답변이 삭제되었습니다.')
    }
  }
}
</script>

<style>

</style>
