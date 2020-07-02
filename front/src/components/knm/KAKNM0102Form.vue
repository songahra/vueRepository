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
      <v-btn small color="primary" @click.prevent="btnSearch" @close="isDialog=false">찾기</v-btn>
      <div class="form-group" style="resize: none;width: 526.66666px;">
        <label for="solution_id">솔루션명  :  </label>
        <select name="solution_id" id="solution_id" v-model="soluation_id">
        <option selected>--선택--</option>
        <option value="SL010000">iGate</option>
        <option value="SL020000">eCross</option>
        <option value="SL030000">Xtorm</option>
        <option value="SL040000">eXperDB</option>
        <option value="SL050000">Libeka</option>
        <option value="SL060000">iWorks</option>
        <option value="SL070000">iXeb</option>
        <option value="SL080000">APIM</option>
        <option value="SL090000">MyGuard</option>
        <option value="SL100000">문서중앙화</option>
        </select>
      </div>
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
    <KAKNM0103P1 :dialog="isDialog" @close="close"></KAKNM0103P1>
  </v-container>
</template>

<script>
import KAKNM0103P1 from '@/views/knm/KAKNM0103P1.vue'
const axios = require('axios').default

export default {
  name: 'KAKNM0102From',
  components: {
    KAKNM0103P1
  },
  icons: {
    iconfont: 'faSvg'
  },
  data: () => {
    return {
      question_id: '',
      project_id: '',
      solution_id: '',
      tag_tag: '',
      tag_tag_add: '',
      tag_erc: '',
      tag_ert: '',
      title: '',
      content_q: '',
      content_s: '',
      err_log: '',
      userid: '',
      errors: [],
      isDialog: false

    }
  },
  porps: [
    'project_id'
  ],
  methods: {
    onSubmit: function () {
      const url = 'http://localhost:8080/knm/writeForm'
      const data = {
        title: this.title,
        project_id: this.project_id,
        solution_id: this.solution_id,
        tag_tag: this.tag_tag,
        tag_tag_add: this.tag_tag_add,
        tag_erc: this.tag_erc,
        tag_ert: this.tag_ert,
        content_q: this.content_q,
        content_s: this.content_s,
        err_log: this.err_log,
        userid: function () {
          return this.$store.state.userid
        }
      }

      this.errors = []
      if (!this.title) {
        alert('제목 작성은 필수입니다.')
        return
      }
      if (!this.project_id) {
        alert('프로젝트명 입력은 필수입니다.')
        return
      }
      if (!this.solution_code) {
        alert('솔루션명 선택은 필수입니다.')
        return
      }
      if (!this.tag_tag) {
        alert('태크#01 입력은 필수입니다.')
        return
      }
      if (!this.content_q) {
        alert('질문 내용 작성은 필수입니다.')
        return
      }
      if (!this.content_s) {
        alert('환경 및 상황 작성은 필수입니다.')
      } else {
        console.log('data : ' + this.$store.state.userid)
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
    btnSearch: function () {
      console.log('btnSearch실행')
      this.isDialog = true
    },
    close () {
      console.log('grand-parent-close')
      this.isDialog = !this.isDialog
    }
  },
  mounted () {
    console.log('mounted!!')
  }
}

</script>

<style scoped>

</style>
