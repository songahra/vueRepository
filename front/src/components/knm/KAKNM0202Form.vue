<template>
  <div id="ct">
    <section class="card">
      <header
        class="card-header"
        style="padding: 1.6rem 1rem;"
      >
        <h2 class="card-title">
          <span class="i-rounded bg-danger"><i class="icon-file-text" /></span>답변수정
        </h2>
        <div class="btn-container">
          <!-- <a href="" class="btn btn-m"><span class="hide">미리보기</span></a> -->
          <a
            href=""
            class="btn btn-primary"
            @click.prevent="onSubmit()"
          ><span class="hide">확인</span></a>
          <a
            href=""
            class="btn btn-primary"
            @click.prevent="back()"
          ><span class="hide">닫기</span></a>
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
            <div
              class="col"
              style="min-width: 75%;"
            >
              <label
                class="form-control-label"
                data-toggle="modal"
                data-target="#"
              >
                <b class="control-label">질문제목</b>
                <input
                  v-model="question_title"
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
            <div class="col">
              <label
                class="form-control-label"
                data-toggle="modal"
                data-target="#"
              >
                <b class="control-label">솔루션명</b>
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
                  v-model="tag"
                  type="text"
                  class="form-control"
                  placeholder="#02"
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
                <b class="control-label">에러코드</b>
                <input
                  v-model="err_c"
                  type="text"
                  class="form-control"
                  placeholder="코드명"
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
                <b class="control-label">예외종류</b>
                <input
                  v-model="err_t"
                  type="text"
                  class="form-control"
                  placeholder="예외1"
                  readonly
                >
              </label>
            </div>
          </div>
        </div>
      </div>
      <div class="ct-content">
        <div class="sub-bar">
          <i class="icon-right text-danger" /><p class="font-weight-bold">
            질문
          </p>
        </div>
        <textarea
          v-model="question_content"
          class="textarea-basic-md"
          readonly
        />
        <div class="sub-bar">
          <i class="icon-right text-danger" /><p class="font-weight-bold">
            답변 내용
          </p>
        </div>
        <textarea
          v-model="content_a"
          class="textarea-basic-md"
        />
        <div class="sub-bar">
          <i class="icon-right text-danger" /><p class="font-weight-bold">
            답변 근거
          </p>
        </div>
        <textarea
          v-model="content_b"
          class="textarea-basic-md"
        />
        <div class="sub-bar">
          <i class="icon-right text-danger" /><p class="font-weight-bold">
            답변자 태그
          </p>
        </div>
        <textarea
          v-model="content_t"
          class="textarea-basic"
        />
        <alert
          :dialog="isDialog"
          :send-data="alertContent"
          @close="close"
        />
      </div>
    </section>
  </div>
</template>

<script>
import { postAnswer, getModifyDetail } from '@/api/knm/Answer.js'
import alert from '@/components/common/CompletePOP.vue'
export default {
  name: 'KAKNM0202Form',
  components: {
    alert
  },
  data: () => {
    return {
      answer_id: '',
      userid: '',
      title: '',
      content_a: '',
      content_b: '',
      content_t: '',
      // 질문 정보
      solution_name: '',
      question_title: '',
      project_name: '',
      tag: '',
      err_c: '',
      err_t: '',
      question_content: '',
      // 답변 insert 할때 보내줘야할 질문 정보
      reg_userid_tq: '',
      // project_id: '',
      // solution_id: '',
      param: '',
      // alert
      isDialog: false,
      alertContent: ''
    }
  },
  computed: {
    user_id () {
      return this.$store.state.userid
    }
  },
  mounted () {
    this.param = this.$route.params
    const formData = {
      // questionId: this.param.question_id,
      answer_id: this.param.answer_id
    }
    getModifyDetail(formData)
      .then((res) => {
        const data = res.data
        this.reg_userid_tq = data.reg_userid_tq
        this.answer_id = data.answer_id
        this.solution_name = data.solution_name
        this.question_title = data.title
        this.project_name = data.project_name
        this.tag = data.tag_tag
        this.err_c = data.tag_erc
        this.err_t = data.tag_ert
        this.question_content = data.content_q
        this.content_a = data.content_a
        this.content_b = data.content_b
        this.content_t = data.content_t
      })
  },
  methods: {
    async onSubmit () {
      const data = {
        // 답변 정보
        answer_id: this.answer_id,
        title: this.question_title,
        content_a: this.content_a,
        content_b: this.content_b,
        content_t: this.content_t,
        reg_userid: this.$store.state.userid,
        reg_userid_tq: this.reg_userid_tq,
        do_type: 'M'
      }
      await postAnswer(data)
      this.alertContent = '답변이 수정되었습니다.'
      this.isDialog = true
    },
    close () {
      this.isDialog = false
      this.$router.push({ name: 'KAKNM0101List' })
    },
    back () {
      this.$router.push({ name: 'KAKNM0101List' })
    }
  }

}
</script>

<style>

</style>
