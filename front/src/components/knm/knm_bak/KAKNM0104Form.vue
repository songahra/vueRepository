<!-- 질문 상세보기 -->
<template>
  <v-container fluid>
    <h3>{{param.title}}</h3>
    <form id="KAKNM0104Form" @submit.prevent="onSubmit" class="form">
    <input type="hidden" name="question_id"  id="question_id" value="question_id"/>
    <v-col class="text-center" cols="12" sm="4">
      <div class="my-2">
      <!-- 수정필요 -->
      <v-btn v-if = "userid === 'reg_userid_ta'" small color="primary" @click="() => this.$router.push({ name: 'KAKNM0101List' })">답변하기</v-btn>
      <v-btn small color="primary" type="submit" @click.prevent="btnDelete">삭제</v-btn>
      <v-btn small color="primary" type="submit" @click.prevent="btnModify">수정</v-btn>  |
      <v-btn small color="primary" @click="() => this.$router.push({ name: '/knm/mainList' })">목록보기</v-btn>
      </div>
    </v-col>
    <div>
      <v-text-field label="제목" id="title" readonly cols="30" rows="6" v-model="param.title" ></v-text-field>
      <v-text-field label="작성자" id="reg_userName_tq" readonly cols="30" rows="6" v-model="param.reg_userName_tq" ></v-text-field>
      <v-text-field label="작성일시" id="reg_date_tq" readonly  v-model="param.reg_date_tq"></v-text-field>
      <v-text-field label="답변여부" id="status" readonly v-model="param.status"></v-text-field>
      <v-text-field label="score" id="score" readonly v-model="param.score"></v-text-field>
      <v-text-field label="프로젝트" id="project_name" readonly v-model="param.project_name"> </v-text-field>
      <v-text-field label="솔루션" id="solution_name" readonly v-model="param.solution_name" ></v-text-field>
      <v-text-field label="태그"  id="tag_tag" readonly v-model="param.tag_tag"></v-text-field>
      <v-text-field label="에러코드" id="tag_erc" readonly v-model="param.tag_erc"></v-text-field>
      <v-text-field label="예외종류" id="tag_ert" readonly v-model="param.tag_ert"></v-text-field>
    </div>
    <v-row>
      <v-col cols="2">
        <v-subheader>질문</v-subheader>
      </v-col>
      <v-col cols="10">
        <v-text-field  type="textarea" id="content_q" readonly v-model="param.content_q"></v-text-field>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="2">
        <v-subheader>환경 및 상황</v-subheader>
      </v-col>
      <v-col cols="10">
        <v-text-field type="textarea" id="content_s" readonly v-model="param.content_s"></v-text-field>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="2">
        <v-subheader>오류 로그</v-subheader>
      </v-col>
      <v-col cols="10">
        <v-text-field type="textarea" id="err_log" readonly v-model="param.err_log" ></v-text-field>
      </v-col>
    </v-row>
    </form>
    <KAKNM0106P1 :dialog="isDialog" :sendData="paramData" @close="close" ></KAKNM0106P1>
  </v-container>

</template>

<script>
import KAKNM0106P1 from '@/views/knm/KAKNM0106P1.vue'

export default {
  name: 'KAKNM0104Form',
  components: {
    KAKNM0106P1
  },
  icons: {
    iconfont: 'faSvg'
  },
  data: () => {
    return {
      param: [],
      userid: '',
      reg_uerid: '',
      question_id: '',
      project_id: '',
      project_name: '',
      score: '',
      answer_id: '',
      solution_name: '',
      title: '',
      content_q: '',
      content_s: '',
      err_log: '',
      reg_userName_tq: '',
      reg_date_tq: '',
      status: '',
      tag_tag: '',
      tag_erc: '',
      tag_ert: '',
      paramData: '',
      isDialog: false
    }
  },
  // porps: [
  //   'paramData'
  // ],
  mounted () {
    // 추후 삭제
    console.log('KAKNM0104Form mounted!!', this.$route.params)
    this.param = this.paramData
    console.log('mounted!!this.param', this.param)

    this.userid = this.user_id
    this.param = this.param_ch

    // console.log('here')
    // console.log(this.userid)
    // console.log(this.param)
  },
  computed: {
    user_id () {
      console.log(' computed userid components ', this.$store.state.userid)
      return this.$store.state.userid
    },
    param_ch () {
      console.log(' computed param components ', this.$route.params)
      return this.$route.params
    }
  },
  watch: {
    userid () {
      console.log('here')
      console.log(this.$store.state.userid)
    }
  },
  created () {

  },
  methods: {
    // 수정 페이지 이동
    btnModify () {
      console.log('userid ', this.userid)
      console.log('params ', this.param)
      const params = {
        userid: this.userid,
        reg_uerid: this.param.reg_uerid,
        question_id: this.param.question_id,
        project_id: this.param.project_id,
        project_name: this.param.project_name,
        score: this.param.score,
        answer_id: this.param.answer_id,
        solution_name: this.param.solution_name,
        title: this.param.title,
        content_q: this.param.content_q,
        content_s: this.param.content_s,
        err_log: this.param.err_log,
        reg_userName_tq: this.param.reg_userName_tq,
        reg_date_tq: this.param.reg_date_tq,
        status: this.param.status,
        tag_tag: this.param.tag_tag,
        tag_erc: this.param.tag_erc,
        tag_ert: this.param.tag_ert
      }

      console.log('넘길 값 KAKNM0105Modify parmas', params)
      this.$router.push({ name: 'KAKNM0105Modify', params: params })
    },
    // 삭제 팝업 호출
    btnDelete () {
      console.log('btndelete실행')
      this.paramData = {
        userid: this.userid,
        question_id: this.param.question_id,
        flag: 'D'
      }
      console.log('paramData ', this.paramData)
      this.isDialog = true
    },
    // 삭제 팝업 닫기
    close () {
      console.log('parent-close')
      this.isDialog = !this.isDialog
    }
  }

}

</script>

<style scoped>

</style>
