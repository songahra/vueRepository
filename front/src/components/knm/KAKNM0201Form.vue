<template>
 <v-container fluid>
     <h3>답변 작성</h3>
     <form id="KAKNM0201Form" @submit.prevent="onSubmit" class="form">
         <v-col class="text-center" cols="12" sm="4">
             <div class="aaa">
                 <v-btn>미리보기</v-btn>
                 <v-btn type="submit">확인</v-btn>
                 <v-btn>목록</v-btn>
             </div>
         </v-col>
         <div>
             <v-text-field label="제목" placeholder="제목" id="title" type="textarea" cols="30" rows="6" v-model="title" ></v-text-field>
             <v-text-field  placeholder="답변 내용" type="textarea" id="content_a" v-model="content_a" ></v-text-field>
             <v-text-field  placeholder="답변 근거" type="textarea" id="content_b" v-model="content_b" ></v-text-field>
             <v-text-field  placeholder="답변 태그" type="textarea" id="content_t" v-model="content_t" ></v-text-field>
         </div>
     </form>
 </v-container>
</template>

<script>
import 'url-search-params-polyfill'

import { postAnswer } from '@/api/knm/Answer.js'

export default {
  name: 'KAKNM0201Form',
  data: () => {
    return {
      reg_userid: '',
      title: '',
      content_a: '',
      content_b: '',
      content_t: '',
      // 질문 정보
      question_id: '',
      project_id: '',
      solution_id: '',
      tag: '',
      err_c: '',
      err_t: ''

    }
  },
  methods: {
    onSubmit () {
      const data = {
        params: {
          question_id: this.question_id,
          reg_userid: this.reg_userid,
          title: this.title,
          content_a: this.content_a,
          content_b: this.content_b,
          content_t: this.content_t
        }
      }
      postAnswer(data)
        .then((response) => {
          return response
        })
        .catch(console.err())
    }
  }
}
</script>
