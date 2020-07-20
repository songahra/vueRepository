<template>
 <v-container fluid>
     <h3>답변 작성</h3>
     <form id="KAKNM0201Form" @submit.prevent="onSubmit" class="form">
         <v-col class="text-center" cols="12" sm="4">
             <div class="aaa">
                 <v-btn>미리보기</v-btn>
                  <v-btn type="submit" v-bind:href="link">확인</v-btn>
                 <v-btn v-bind:href="link">목록</v-btn>
             </div>
         </v-col>
         <div>
             <v-text-field label="제목" placeholder="제목" id="title" type="textarea" cols="30" rows="6" v-model="title" ></v-text-field>
             <v-text-field label="답변 내용" placeholder="답변 내용" type="textarea" id="content_a" v-model="content_a" ></v-text-field>
             <v-text-field label="답변 근거" placeholder="답변 근거" type="textarea" id="content_b" v-model="content_b" ></v-text-field>
             <v-text-field label="답변 태그" placeholder="답변 태그" type="textarea" id="content_t" v-model="content_t" ></v-text-field>
         </div>
     </form>
 </v-container>
</template>

<script>

import { postAnswer } from '@/api/knm/Answer.js'

export default {
  name: 'KAKNM0201Form',
  data: () => {
    return {
      userid: 'Auser4@inzent.com',
      title: '',
      content_a: '',
      content_b: '',
      content_t: '',
      // 질문 정보
      question_id: 'QU20200716101300555',
      project_id: 'PR20200619203046279',
      solution_id: 'SL020000',
      tag: '',
      err_c: '',
      err_t: '',
      // 다음 화면 (리스트)
      link: 'http://localhost:8081/knm/anList'
    }
  },
  created () {
    // this.userid = this.$store.state.userid
  },
  methods: {
    async onSubmit () {
      console.log('onSubmit')
      const data = {
        // 질문 정보
        question_id: this.question_id,
        project_id: this.project_id,
        solution_id: this.solution_id,
        // 답변 정보
        title: this.title,
        content_a: this.content_a,
        content_b: this.content_b,
        content_t: this.content_t,
        reg_userid: this.userid,
        do_type: 'W'
        // reg_userid: this.$store.state.userid

      }
      console.log('POST DATA : ', data)
      const response = await postAnswer(data)
      alert('1개의 답변과 ' + response.data + '개의 태그가 등록되었습니다.')
    }
  }
}
</script>
