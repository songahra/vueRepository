<!-- 질문상세조회 -->
<template>
  <v-container fluid>
    <h3>{{title}}</h3>
    <form id="KAKNM0104Form" @submit.prevent="onSubmit" class="form">
    <v-col class="text-center" cols="12" sm="4">
      <div class="my-2">
      <v-btn small color="primary" type="submit">수정</v-btn>  |
      <v-btn small color="primary" >삭제</v-btn>  |
      <v-btn small color="primary">목록보기</v-btn>
      </div>
    </v-col>
    <div>
      <v-text-field label="질문자" id="reg_uerid" cols="30" rows="6" v-model="reg_uerid" ></v-text-field>
      <v-text-field label="작성일시" id="reg_date" v-model="reg_date" ></v-text-field>
      <v-text-field label="답변여부" id="status" v-model="status" ></v-text-field>
      <v-text-field label="솔루션 명" placeholder="솔루션명" id="solution_code" type="solution_code" v-model="solution_code" ></v-text-field>
      <v-text-field label="태그#01" placeholder="태그 #01" id="tag_tag" type="tag_tag" v-model="tag_tag" ></v-text-field>
      <v-text-field label="태그#02" placeholder="태그 #02" id="tag_tag_add" type="tag_tag_add" v-model="tag_tag_add" ></v-text-field>
      <v-text-field label="에러코드" placeholder="에러코드" id="tag_erc" type="tag_erc" v-model="tag_erc" ></v-text-field>
      <v-text-field label="예외종류" placeholder="예외종류" id="tag_ert" type="tag_ert" v-model="tag_ert" ></v-text-field>
    </div>
    <v-row>
      <v-col cols="2">
        <v-subheader>질문</v-subheader>
      </v-col>
      <v-col cols="10">
        <v-text-field  type="textarea" id="content_q" v-model="content_q" ></v-text-field>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="2">
        <v-subheader>환경 및 상황</v-subheader>
      </v-col>
      <v-col cols="10">
        <v-text-field type="textarea" id="content_s"  v-model="content_s" value=""></v-text-field>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="2">
        <v-subheader>오류 로그</v-subheader>
      </v-col>
      <v-col cols="10">
        <v-text-field type="textarea" id="err_log" v-model="err_log"  value=""></v-text-field>
      </v-col>
    </v-row>
    </form>
  </v-container>
</template>

<script>
const axios = require('axios').default

export default {
  name: 'KAKNM0104Form',
  //   components: {
  //     HelloWorld
  //   },
  icons: {
    iconfont: 'faSvg'
  },
  data: () => {
    return {
      question_id: '',
      project_id: '',
      solution_code: '',
      tag_tag: '',
      tag_tag_add: '',
      tag_erc: '',
      tag_ert: '',
      title: '',
      content_q: '',
      content_s: '',
      err_log: ''
    }
  },
  porps: [
    'project_id'
  ],
  methods: {
    onSubmit: function () {
      const url = 'http://localhost:8080/knm/writeForm'
      const data = {
        question_id: this.question_id,
        solution_code: this.solution_code,
        tag_tag: this.tag_tag,
        tag_tag_02: this.tag_tag_02,
        tag_erc: this.tag_erc,
        tag_ert: this.tag_ert,
        title: this.title,
        content_q: this.content_q,
        content_s: this.content_s,
        err_log: this.err_log
      }
      // console.log("data : "+  this.srchNames)
      axios.post(url, data)
        // .then((res) => {
        //   this.lists = res.data
        //   console.log('getList')
        //   console.log(this.lists)
        //   return res
        // })
        .then((res) => console.log(res))
        .catch(console.error())
    }
  },
  mounted () {
    console.log('mounted!!')
  }
}

</script>

<style scoped>

</style>
