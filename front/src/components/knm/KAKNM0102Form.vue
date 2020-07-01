<!-- 질문하기 -->
<template>
  <v-container fluid>
    <h3>기술문의</h3>
    <form id="KAKNM0102From" @submit.prevent="onSubmit" class="form">
    <v-col class="text-center" cols="12" sm="4">
      <div class="my-2">
      <v-btn small color="primary">미리보기</v-btn>  |
      <v-btn small color="primary" type="submit">확인</v-btn>  |
      <v-btn small color="primary">목록보기</v-btn>
      </div>
    </v-col>
    <div>
      <v-text-field label="제목" placeholder="제목" id="title" type="textarea" cols="30" rows="6" v-model="title" ></v-text-field>
      <v-text-field label="프로젝트" placeholder="프로젝트" id="project_id" type="project_id" v-model="project_id" ></v-text-field>
      <v-btn small color="primary" @click="btnSearch">찾기</v-btn><modals-container />
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
import KAKNM0103P1 from '@/views/knm/KAKNM0103P1.vue'
const axios = require('axios').default

export default {
  name: 'KAKNM0102From',
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
    },
    btnSearch: function () {
      this.$modal.show(KAKNM0103P1, {
        hot_table: 'data',
        modal: this.$modal
      },
      {
        name: 'dynamic-modal',
        width: '330px',
        height: '130px',
        draggable: true
      })
    }
  },
  mounted () {
    console.log('mounted!!')
  }
}

</script>

<style scoped>
.content-detail-content-info {
  border: 1px solid black;
  display: flex;
  justify-content: space-between;
}

.content-detail-content-info-left {
  width: 720px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
}

.content-detail-content-info-right {
  width: 300px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1rem;
}

.content-detail-content {
  border: 1px solid black;
  margin-top: 1rem;
  padding-top: 1rem;
  min-height: 720px;
}

.content-detail-button {
  border: 1px solid black;
  margin-top: 1rem;
  padding: 2rem;
}

.content-detail-comment {
  border: 1px solid black;
  margin-top: 1rem;
  padding: 2rem;
}

</style>
