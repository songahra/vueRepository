<!-- 질문 상세보기 : 새로고침 후 데이터 저장방법 알아보기-->
<template>
  <div>
        <form id="KAKNM0104Form" @submit.prevent="onSubmit" class="form">
            <header class="card-header" style="padding: 1.6rem 1rem;">
                <h2 class="card-title"><span class="i-rounded bg-danger"><i class="icon-file-check"></i></span>{{title}}</h2>
                <div class="btn-container">
                    <div v-if = "chkUserType()">
                       <a class="btn btn-m" @click="movePage('btnAnswer')"><span class="hide">답변하기</span></a>
                    </div>
                    <div v-else-if = "chkWriter()">
                       <a href="" class="btn btn-m" type="submit" @click.prevent="btnDelete"><span class="hide">삭제</span></a>
                       <a href="" class="btn btn-m" type="submit" @click.prevent="movePage('btnModify')"><span class="hide">수정</span></a>
                    </div>
                    <a href="" class="btn btn-primary" @click="() => this.$router.push({ name: 'KAKNM0101List' })"><span class="hide">목록보기</span></a>
                </div>
            </header>
            <div class="ct-header">
                <button type="button" class="btn-filter collapsed d-xl-none" data-toggle="collapse" data-target="#collapse-filter">검색 필터<i class="icon-down"></i></button>
                <div id="collapse-filter" class="collapse collapse-filter">
                    <div class="filter no-gutters no-btn">
                        <div class="col">
                            <label class="form-control-label" data-toggle="modal" data-target="#">
                                <b class="control-label">질문자</b>
                                <input type="text" class="form-control" v-model="reg_userName_tq" readonly>
                            </label>
                        </div>
                        <div class="col">
                            <label class="form-control-label" data-toggle="modal" data-target="#">
                                <b class="control-label">작성일시</b>
                                <input type="text" class="form-control" v-model="reg_date_tq" readonly>
                            </label>
                        </div>
                        <div class="col">
                            <label class="form-control-label" data-toggle="modal" data-target="#">
                                <b class="control-label">답변여부</b>
                                <input type="text" class="form-control" v-model="status" readonly>
                            </label>
                        </div>
                        <div class="col">
                            <label class="form-control-label" data-toggle="modal" data-target="#">
                                <b class="control-label">Score</b>
                                <input type="text" class="form-control" v-model="score" readonly>
                            </label>
                        </div>
                        <div class="col">
                            <label class="form-control-label" data-toggle="modal" data-target="#">
                                <b class="control-label">프로젝트</b>
                                <input type="text" class="form-control"  v-model="project_name" readonly>
                            </label>
                        </div>
                    </div>
                    <div class="filter no-gutters no-btn">
                        <div class="col" style="min-width: 40%;">
                            <label class="form-control-label" data-toggle="modal" data-target="#">
                                <b class="control-label">솔루션</b>
                                <input type="text" class="form-control" v-model="solution_name" readonly>
                            </label>
                        </div>
                        <div class="col">
                            <label class="form-control-label" data-toggle="modal" data-target="#">
                                <b class="control-label">태그</b>
                                <input type="text" class="form-control" v-model="tag_tag" readonly>
                            </label>
                        </div>
                        <div class="col">
                            <label class="form-control-label" data-toggle="modal" data-target="#">
                                <b class="control-label">에러코드</b>
                                <input type="text" class="form-control" v-model="tag_erc" readonly>
                            </label>
                        </div>
                        <div class="col">
                            <label class="form-control-label" data-toggle="modal" data-target="#">
                                <b class="control-label">예외종류</b>
                                <input type="text" class="form-control" v-model="tag_ert" readonly>
                            </label>
                        </div>
                    </div>
                </div>
            </div>
            <textarea class="textarea-basic-md" v-model="content_q" readonly></textarea>
           <div v-if = "chkAnswerId()">
             <KAKNM0205Form :sendData="answerData"></KAKNM0205Form>
           </div>
        </form>
        <v-app id="app">
            <KAKNM0106P1 :dialog="isDialog" :sendData="paramData" @close="close" ></KAKNM0106P1>
        </v-app>

    </div>
</template>

<script>
import KAKNM0106P1 from '@/views/knm/KAKNM0106P1.vue'
import KAKNM0205Form from '@/components/knm/KAKNM0205Form.vue'
import { getDetail } from '@/api/knm/Question.js'
export default {
  name: 'KAKNM0104Form',
  components: {
    KAKNM0106P1,
    KAKNM0205Form
  },
  icons: {
    iconfont: 'faSvg'
  },
  data: () => {
    return {
      param: [],
      userid: '',
      usertype: '',
      reg_userid: '',
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
      answerData: '',
      isDialog: false
    }
  },
  created () {
    this.param = this.$route.params
    this.answerData = this.param
    this.getData()
  },
  mounted () {
    this.init()
  },
  computed: {
    user_id () {
      console.log(' computed userid components ', this.$store.state.userid)
      return this.$store.state.userid
    },
    user_type () {
      console.log(' computed param components ', this.$store.state.usertype)
      return this.$store.state.usertype
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
  methods: {
    // 초기화
    init () {
      this.param = this.$route.params
      this.userid = this.param.userid
      this.reg_userid = this.param.reg_userid
      this.title = this.param.title
      this.question_id = this.param.question_id
      this.project_id = this.param.project_id
      this.project_name = this.param.project_name
      this.solution_id = this.param.solution_id
      this.solution_name = this.param.solution_name
      this.score = this.param.score
      this.answer_id = this.param.answer_id
      this.content_q = this.param.content_q
      this.content_s = this.param.content_s
      this.err_log = this.param.err_log
      this.reg_userName_tq = this.param.reg_userName_tq
      this.reg_date_tq = this.param.reg_date_tq
      this.status = this.param.status
      this.tag_tag = this.param.tag_tag
      this.tag_erc = this.param.tag_erc
      this.tag_ert = this.param.tag_ert
      this.userid = this.user_id
      this.param = this.param_ch
    },
    getData () {
      // 서버요청
      const formData = {
        reg_userid: this.reg_userid,
        question_id: this.question_id,
        answer_id: this.answer_id
      }

      getDetail(formData) /* 에러처리 확인필요!! */
        .then((res) => {
          if (res.status === 200) {
            console.log('res => ', res)
            const params = res.data
            console.log('params => ', params)
            this.$router.push({ name: 'KAKNM0104Detail', params: params })
          }
          return res
        })
      // .then((res) => console.log(res))
        .catch(function (e) {
          const result = e.message
          if (e.message.indexOf('500')) {
            this.$router.push({ name: '500Error' })
          } else if (result.indexOf('404')) {
            this.$router.push({ name: '404Error' })
          } else {
            this.$router.push({ name: 'Exception' })
          }
        })
    },
    // 수정/답변 페이지 이동
    movePage (action) {
      console.log('userid ', this.userid)
      console.log('params ', this.param)

      const params = {
        userid: this.userid,
        reg_userid: this.param.reg_userid,
        question_id: this.param.question_id,
        project_id: this.param.project_id,
        project_name: this.param.project_name,
        score: this.param.score,
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

      if (action === 'btnModify') {
        this.$router.push({ name: 'KAKNM0105Modify', params: params })
      } else if (action === 'btnAnswer') {
        this.$router.push({ name: 'KAKNM02Write', params: params })
      }
    },
    // 유저 권한 체크
    chkUserType () {
      this.usertype = this.$store.state.usertype
      console.log('this.userType?', this.usertype)
      console.log(this.usertype === 'A' || this.usertype === 'O')
      if (this.usertype === 'A' || this.usertype === 'O') {
        return true
      }
    },
    // 질문자 id 체크
    chkWriter () {
      this.userid = this.$store.state.userid
      console.log(this.userid === this.reg_userid)
      if (this.userid === this.reg_userid) {
        return true
      }
    },
    // 답변자 id 체크
    chkAnswerId () {
      if (this.answer_id) {
        return true
      }
    },
    // 삭제 팝업 호출
    btnDelete () {
      console.log('btndelete실행')
      if (this.answer_id) {
        alert('답변완료 상태이므로 삭제할 수 없습니다.')
      } else {
        this.paramData = {
          userid: this.userid,
          question_id: this.param.question_id,
          flag: 'D'
        }
        console.log('paramData ', this.paramData)
        this.isDialog = true
      }
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
