<template>
    <v-container fluid>
        <div class="aDetail-top">
            <v-text-field v-model="ansName"/>
            <v-btn @click.prevent="btnDelete">삭제</v-btn>
            <v-btn @click.prevent="btnModify">수정</v-btn>
        </div>
        <div class="aDtail-content">
            <v-text-field v-model="ansContent"/>
        </div>

    </v-container>
</template>

<script>
import { getAnswer } from '@/api/knm/Answer.js'

export default {
  name: 'KAKNM0205Form',
  data: () => {
    return {
      ansName: '',
      ansContent: '',
      ansId: 'AN20200619203215980',
      lists: ''
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
    }
  }
}
</script>

<style>

</style>
