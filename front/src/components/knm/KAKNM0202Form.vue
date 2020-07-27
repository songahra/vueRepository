<template>
  <div id="ct">
    <section class="card">
      <header class="card-header" style="padding: 1.6rem 1rem;">
        <h2 class="card-title"><span class="i-rounded bg-danger"><i class="icon-file-text"></i></span>답변수정</h2>
        <div class="btn-container">
            <!-- <a href="" class="btn btn-m"><span class="hide">미리보기</span></a> -->
            <a href="" @click.prevent="onSubmit()" class="btn btn-primary"><span class="hide">확인</span></a>
            <a href="" @click.prevent="back()" class="btn btn-primary"><span class="hide">닫기</span></a>
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
      // question_id: '',
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
    console.log('답변 수정 answer_id : ', this.param.answer_id)
    const formData = {
      // questionId: this.param.question_id,
      answer_id: this.param.answer_id
    }
    getModifyDetail(formData)
      .then((res) => {
        console.log('답변수정!! res.data', res.data)
        const data = res.data
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
      console.log('onSubmit')
      const data = {
        // 답변 정보
        answer_id: this.answer_id,
        title: this.title,
        content_a: this.content_a,
        content_b: this.content_b,
        content_t: this.content_t,
        reg_userid: this.$store.state.userid,
        do_type: 'M'
      }
      console.log('POST DATA : ', data)
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
