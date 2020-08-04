<!--답변하기 -->
<template>
  <div id="ct">
    <section class="card">
      <header class="card-header" style="padding: 1.6rem 1rem;">
        <h2 class="card-title"><span class="i-rounded bg-danger"><i class="icon-file-text"></i></span>답변작성</h2>
        <div class="btn-container">
            <a href="" @click.prevent="show()" class="btn btn-m"><span class="hide">미리보기</span></a>
            <a href="" @click.prevent="onSubmit()" class="btn btn-primary"><span class="hide">확인</span></a>
            <a href="mainList" class="btn btn-primary"><span class="hide">닫기</span></a>
        </div>
      </header>
      <div class="ct-header">
        <button type="button" class="btn-filter collapsed d-xl-none" data-toggle="collapse" data-target="#collapse-filter">검색 필터<i class="icon-down"></i></button>
        <div id="collapse-filter" class="collapse collapse-filter">
            <div class="filter no-gutters no-btn">
                <div class="col" style="min-width: 75%;">
                    <label class="form-control-label" data-toggle="modal" data-target="#">
                        <b class="control-label">질문제목</b>
                        <input type="text" class="form-control" v-model="question_title" readonly>
                    </label>
                </div>
                <div class="col">
                    <label class="form-control-label" data-toggle="modal" data-target="#">
                        <b class="control-label">프로젝트</b>
                        <input type="text" class="form-control" v-model="project_name" readonly>
                    </label>
                </div>
            </div>
            <div class="filter no-gutters no-btn">
                <div class="col">
                    <label class="form-control-label" data-toggle="modal" data-target="#">
                        <b class="control-label">솔루션명</b>
                        <input type="text" class="form-control" v-model="solution_name" readonly>
                    </label>
                </div>
                <div class="col">
                    <label class="form-control-label" data-toggle="modal" data-target="#">
                        <b class="control-label">태그</b>
                        <input type="text" class="form-control" v-model="tag" placeholder="#02" readonly>
                    </label>
                </div>
                <div class="col">
                    <label class="form-control-label" data-toggle="modal" data-target="#">
                        <b class="control-label">에러코드</b>
                        <input type="text" class="form-control" v-model="err_c" placeholder="코드명" readonly>
                    </label>
                </div>
                <div class="col">
                    <label class="form-control-label" data-toggle="modal" data-target="#">
                        <b class="control-label">예외종류</b>
                        <input type="text" class="form-control" v-model="err_t" placeholder="예외1" readonly>
                    </label>
                </div>
            </div>
        </div>
      </div>
          <div class="ct-content">
              <div class="sub-bar">
                  <i class="icon-right text-danger"></i><p class="font-weight-bold">질문</p>
              </div>
              <textarea class="textarea-basic-md"  v-model="question_content" readonly></textarea>
              <div class="sub-bar">
                  <i class="icon-right text-danger"></i><p class="font-weight-bold">답변 내용</p>
              </div>
              <textarea class="textarea-basic-md" v-model="content_a"></textarea>
              <div class="sub-bar">
                  <i class="icon-right text-danger"></i><p class="font-weight-bold">답변 근거</p>
              </div>
              <textarea class="textarea-basic-md" v-model="content_b"></textarea>
              <div class="sub-bar">
                  <i class="icon-right text-danger"></i><p class="font-weight-bold">답변자 태그</p>
              </div>
              <textarea class="textarea-basic" v-model="content_t"></textarea>
              <alert :dialog="isDialog" :sendData="alertContent" @close="close"></alert>
          </div>
    </section>
  </div>
</template>

<script>

import { postAnswer } from '@/api/knm/Answer.js'
import { getDetail } from '@/api/knm/Question.js'
import alert from '@/components/common/CompletePOP.vue'

export default {
  name: 'KAKNM0201Form',
  components: {
    alert
  },
  data: () => {
    return {
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
      question_id: '',
      reg_userid_q: '',
      project_id: '',
      solution_id: '',
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
      question_id: this.param.question_id
    }
    getDetail(formData)
      .then((res) => {
        console.log('res => ', res.data)
        const data = res.data
        this.reg_userid_tq = data.reg_userid
        this.solution_name = data.solution_name
        this.question_title = data.title
        this.project_name = data.project_name
        this.tag = data.tag_tag
        this.err_c = data.tag_erc
        this.err_t = data.tag_ert
        this.question_content = data.content_q
        this.question_id = data.question_id
        this.project_id = data.project_id
        this.solution_id = data.solution_id
      })
  },
  methods: {
    async onSubmit () {
      const data = {
        // 질문 정보
        question_id: this.question_id,
        project_id: this.project_id,
        solution_id: this.solution_id,
        // 답변 정보
        title: this.question_title,
        content_a: this.content_a,
        content_b: this.content_b,
        content_t: this.content_t,
        reg_userid: this.$store.state.userid,
        reg_userid_tq: this.reg_userid_tq,
        do_type: 'W'
      }

      const response = await postAnswer(data)
      this.alertContent = '1개의 답변과 ' + response.data + '개의 태그가 등록되었습니다.'
      this.isDialog = true
    },
    close () {
      this.isDialog = false
      this.$router.push({ name: 'KAKNM0101List' })
    }
  }
}
</script>
