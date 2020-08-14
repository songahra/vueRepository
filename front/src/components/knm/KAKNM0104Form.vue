<!-- 질문 상세보기 -->
<template>
  <div>
    <form
      id="KAKNM0104Form"
      class="form"
      @submit.prevent="onSubmit"
    >
      <input
        v-model="term"
        type="hidden"
      >
      <header
        class="card-header"
        style="padding: 1.6rem 1rem;"
      >
        <h2 class="card-title">
          <span class="i-rounded bg-danger"><i class="icon-file-check" /></span>{{ title }}
        </h2>
        <div
          class="btn-container"
          style="width:300px;"
        >
          <div v-if="chkUserType()&&!chkWriter()">
            <a
              class="btn btn-m"
              style="float:right;"
              @click="movePage('btnAnswer')"
            ><span class="hide">답변하기</span></a>
          </div>
          <div>
            <a
              href=""
              class="btn btn-primary"
              style="float:right; "
              @click.prevent="goList"
            ><span class="hide">목록보기</span></a>
          </div>
          <div v-if="chkWriter()">
            <a
              class="btn btn-m"
              type="submit"
              style="float:right;"
              @click.prevent="btnDelete"
            ><span class="hide">삭제</span></a>
            <a
              class="btn btn-m"
              type="submit"
              style="float:right;"
              @click.prevent="movePage('btnModify')"
            ><span class="hide">수정</span></a>
          </div>
        </div>
      </header>
      <div class="ct-header">
        <button
          type="button"
          class="btn-filter collapsed d-xl-none"
          data-toggle="collapse"
          data-target="#collapse-filter"
        >
          검색 필터<i class="icon-down" />
        </button>
        <div
          id="collapse-filter"
          class="collapse collapse-filter"
        >
          <div class="filter no-gutters no-btn">
            <div class="col">
              <label
                class="form-control-label"
                data-toggle="modal"
                data-target="#"
              >
                <b class="control-label">질문자</b>
                <input
                  v-model="reg_userName_tq"
                  type="text"
                  class="form-control"
                  readonly
                >
              </label>
            </div>
            <div class="col">
              <label
                class="form-control-label"
                data-toggle="modal"
                data-target="#"
              >
                <b class="control-label">작성 일시</b>
                <input
                  v-model="reg_date_tq"
                  type="text"
                  class="form-control"
                  readonly
                >
              </label>
            </div>
            <div class="col">
              <label
                class="form-control-label"
                data-toggle="modal"
                data-target="#"
              >
                <b class="control-label">답변 여부</b>
                <input
                  v-model="status"
                  type="text"
                  class="form-control"
                  readonly
                >
              </label>
            </div>
            <div class="col">
              <label
                class="form-control-label"
                data-toggle="modal"
                data-target="#"
              >
                <b class="control-label">평가점수</b>
                <input
                  v-model="score"
                  type="text"
                  class="form-control"
                  readonly
                >
              </label>
            </div>
            <div class="col">
              <label
                class="form-control-label"
                data-toggle="modal"
                data-target="#"
              >
                <b class="control-label">프로젝트</b>
                <input
                  v-model="project_name"
                  type="text"
                  class="form-control"
                  readonly
                >
              </label>
            </div>
          </div>
          <div class="filter no-gutters no-btn">
            <div
              class="col"
              style="min-width: 40%;"
            >
              <label
                class="form-control-label"
                data-toggle="modal"
                data-target="#"
              >
                <b class="control-label">솔루션 명</b>
                <input
                  v-model="solution_name"
                  type="text"
                  class="form-control"
                  readonly
                >
              </label>
            </div>
            <div class="col">
              <label
                class="form-control-label"
                data-toggle="modal"
                data-target="#"
              >
                <b class="control-label">태그</b>
                <input
                  v-model="tag_tag"
                  type="text"
                  class="form-control"
                  readonly
                >
              </label>
            </div>
            <div class="col">
              <label
                class="form-control-label"
                data-toggle="modal"
                data-target="#"
              >
                <b class="control-label">에러 코드</b>
                <input
                  v-model="tag_erc"
                  type="text"
                  class="form-control"
                  readonly
                >
              </label>
            </div>
            <div class="col">
              <label
                class="form-control-label"
                data-toggle="modal"
                data-target="#"
              >
                <b class="control-label">예외 종류</b>
                <input
                  v-model="tag_ert"
                  type="text"
                  class="form-control"
                  readonly
                >
              </label>
            </div>
          </div>
        </div>
      </div>
      <div class="ct-content">
        <div class="sub-bar">
          <i
            class="icon-right text-danger"
            style="
    margin-right: 0px;
"
          />
          <b>질문 내용</b>
        </div>
        <textarea
          v-model="content_q"
          class="textarea-basic-md"
          readonly
        />
        <div v-if="chkAnswerId()">
          <KAKNM0205Form :send-data="answerData" />
        </div>
        <div v-if="chkWriter()&&chkAnswerId()">
          <div class="sub-bar">
            <div class="ml-auto form-inline m-full">
              <div v-show="chkScore()">
                <div style="float:left;">
                  <v-rating
                    :id="rating"
                    :value="rating"
                    background-color="orange lighten-3"
                    color="orange"
                    :dense="true"
                    :hover="true"
                    size="20"
                    @input="addRating($event, rating)"
                  />
                </div>
                <div style="float:right;">
                  <a
                    href=""
                    class="btn btn-m"
                    style="float:right;"
                    @click.prevent="estimateAn()"
                  ><span class="hide">평가하기</span></a>
                </div>
              </div>
              <a
                href=""
                class="btn btn-primary"
                @click.prevent="writeFrom()"
              ><i class="icon-message text-light" /><span class="hide">질문하기</span></a>
            </div>
          </div>
        </div>
      </div>
    </form>
    <KAKNM0104P1
      :dialog="reQuDialog"
      @reQuClose="reQuClose"
    />
    <KAKNM0106P1
      :dialog="delIsDialog"
      :send-data="paramData"
      @close="delClose()"
    />
    <alert
      :dialog="isDialog"
      :send-data="alertContent"
      @close="close()"
    />
    <failAlert
      :dialog="fDialog"
      :send-data="alertContent"
      @close="fDialog=false"
    />
  </div>
</template>

<script>
import KAKNM0205Form from '@/components/knm/KAKNM0205Form.vue'
import KAKNM0104P1 from '@/views/knm/KAKNM0104P1.vue'
import KAKNM0106P1 from '@/views/knm/KAKNM0106P1.vue'
import failAlert from '@/components/common/FailPOP.vue'
import alert from '@/components/common/CompletePOP.vue'
import { getDetail, estimateAn } from '@/api/knm/Question.js'
import { userSolution } from '@/api/log/Login.js'

export default {
  name: 'KAKNM0104Form',
  components: {
    KAKNM0104P1,
    KAKNM0106P1,
    KAKNM0205Form,
    failAlert,
    alert
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
      reg_userid_ta: '',
      question_id: '',
      project_id: '',
      project_name: '',
      term: '',
      score: '',
      star: null,
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
      time: '',
      rating: null,
      paramData: '',
      answerData: '',
      alertContent: '',
      delIsDialog: false,
      isDialog: false,
      fDialog: false,
      reQuDialog: false,
      test: true
    }
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
    chk_param () {
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
    this.param = this.$route.params
    console.log('created=>', this.param)
    const formData = {
      reg_userid: this.param.reg_userid,
      question_id: this.param.question_id,
      answer_id: this.param.answer_id
    }

    getDetail(formData) /* 에러처리 확인필요!! */
      .then((res) => {
        if (res.status === 200) {
          console.log('res => ', res)
          const data = res.data
          this.answerData = res.data
          this.reg_userid = data.reg_userid
          this.reg_userName_tq = data.reg_userName_tq
          this.reg_userid_ta = data.reg_userid_ta
          this.reg_date_tq = data.reg_date_tq
          this.question_id = data.question_id
          this.project_id = data.project_id
          this.project_name = data.project_name
          this.score = data.score
          this.answer_id = data.answer_id
          this.solution_id = data.solution_id
          this.solution_name = data.solution_name
          this.title = data.title
          this.content_q = data.content_q
          this.content_s = data.content_s
          this.err_log = data.err_log
          this.term = data.term
          this.status = data.status
          this.tag_tag = data.tag_tag
          this.tag_erc = data.tag_erc
          this.tag_ert = data.tag_ert
        }
        console.log('this.answerData ', this.answerData)
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
  mounted () {
  },
  methods: {
    // 초기화
    getData (formData) {
      // 서버요청
      console.log('formData=>>', formData)
    },
    // 수정/답변 페이지 이동
    movePage (action) {
      console.log('userid ', this.userid)
      console.log('params ', this.param)
      if (this.answer_id) {
        this.alertContent = '답변완료 상태이므로 수정할 수 없습니다.'
        this.isDialog = true
      } else {
        const params = {
          userid: this.userid,
          reg_userid: this.reg_userid,
          question_id: this.question_id,
          project_id: this.project_id,
          project_name: this.project_name,
          score: this.score,
          star: this.star,
          solution_name: this.solution_name,
          solution_id: this.userSolution(),
          title: this.title,
          content_q: this.content_q,
          content_s: this.content_s,
          err_log: this.err_log,
          reg_userName_tq: this.reg_userName_tq,
          reg_date_tq: this.reg_date_tq,
          status: this.status,
          tag_tag: this.tag_tag,
          tag_erc: this.tag_erc,
          tag_ert: this.tag_ert
        }
        console.log('params', params)
        if (action === 'btnModify') {
          this.$router.push({ name: 'KAKNM0105Modify', params: params })
        } else if (action === 'btnAnswer') {
          this.$router.push({ name: 'KAKNM02Write', params: params })
        }
      }
    },
    // 유저 권한 체크
    chkUserType () {
      this.usertype = this.$store.state.usertype
      console.log('this.userType?', this.usertype)
      console.log(this.usertype === 'A' || this.usertype === 'O')
      if (this.usertype === 'A' || this.usertype === 'O') {
        if (this.answer_id) {
          return false
        }
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
    chkAnswer () {
      if (this.userid === this.reg_userid_ta) {
        return true
      }
    },
    // 답변id 여부 체크
    chkAnswerId () {
      if (this.answer_id) {
        return true
      }
    },
    // 스코어 체크
    chkScore () {
      console.log('스코어 체크', this.score)
      if (this.score === 0 || this.score === '') {
        return true
      }
      // return true
    },
    // 삭제 팝업 호출
    btnDelete () {
      console.log('btndelete실행')
      if (this.answer_id) {
        this.alertContent = '답변완료 상태이므로 삭제할 수 없습니다.'
        this.fDialog = true
      } else {
        this.paramData = {
          userid: this.userid,
          question_id: this.param.question_id,
          flag: 'D'
        }
        console.log('paramData ', this.paramData)
        this.delIsDialog = true
      }
    },
    // 알림팝업 닫기
    close () {
      console.log('parent-close')
      this.isDialog = !this.isDialog
    },
    // 삭제 팝업 닫기
    delClose () {
      console.log('parent-close')
      this.$router.push({ name: 'KAKNM0101List' })
    },
    // 별점
    addRating (value, id) {
      console.log(value, id)
      this.star = value
      console.log('dd0', typeof this.star)
      console.log('score', this.star)
    },
    // 평가하기
    estimateAn () {
      console.log('평가하기 term', this.term)

      if (this.star === null) {
        this.alertContent = '별점을 선택해주세요'
        this.fDialog = true
        return
      }

      if (this.term <= 0) {
        this.time = 'within'
      } else {
        this.time = 'more'
      }
      const formData = {
        term: this.term,
        score: this.star,
        question_id: this.question_id,
        solution_id: this.solution_id
      }
      console.log('평가하기 formData', formData)
      // 서버요청
      estimateAn(formData)
        .then((res) => {
          if (res.status === 200) {
          // alert('평가가 완료 되었습니다')
            this.alertContent = '평가가 완료되었습니다.'
            this.isDialog = true
            this.score = this.star
            console('평가하기 수정건=>', res.data)
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

      // 평점이 2이하일때
      if (this.star <= 2) {
        // 재질문 팝업
        this.reQuDialog = true
      }
    },
    // 질문하기
    writeFrom () {
      this.$router.push({ name: 'KAKNM01Write' })
    },
    // 솔루션 id
    userSolution () {
      const code = this.solution_id
      this.solution_name = userSolution(code)
      return this.solution_name
    },
    reQuClose () {
      console.log('parent-close')
      // this.score = this.star
      this.reQuDialog = !this.reQuDialog
    },
    goList () {
      this.$router.push({ name: 'KAKNM0101List' })
    }
  }
}

</script>

<style scoped>

</style>
