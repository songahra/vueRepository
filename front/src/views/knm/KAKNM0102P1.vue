<!-- 질문하기 미리보기 -->
<template>
 <div id="ct">
    <section class="card">
      <v-dialog
        v-model="dialog"
        persistent
        max-width="50%"
      >
        <v-card>
          <v-container fluid>
            <form id="KAKNM0102From" @submit.prevent="onSubmit" class="form">
            <header class="modal-header" style="padding: 1.6rem 1rem;">
                <h2 class="modal-title"><span class="i-rounded bg-danger"><i class="icon-std-code"></i></span>기술문의</h2>
                <button type="button" class="btn-icon" data-dismiss="modal" aria-label="Close" @click="previewClose"><i class="icon-close"></i></button>
            </header>
            <div class="ct-header">
                <button type="button" class="btn-filter collapsed d-xl-none" data-toggle="collapse" data-target="#collapse-filter">검색 필터<i class="icon-down"></i></button>
                <div id="collapse-filter" class="collapse collapse-filter">
                    <div class="filter no-gutters no-btn">
                        <div class="col" style="min-width: 75%;">
                            <label class="form-control-label" data-toggle="modal" data-target="#" >
                                <b class="control-label">질문 제목</b>
                              <input type="text" class="form-control" v-model="this.sendData.title" readonly>
                            </label>
                        </div>
                        <div class="col">
                            <label class="form-control-label" data-toggle="modal" data-target="#">
                                <b class="control-label">프로젝트</b>
                                <input type="text" class="form-control" v-model="this.sendData.project_name" disabled>
                            </label>
                        </div>
                    </div>
                    <div class="filter no-gutters no-btn">
                        <div class="col">
                            <label class="form-control-label" data-toggle="modal" data-target="#">
                                <b class="control-label">솔루션 명</b>
                                <input type="text" class="form-control"  v-model="this.sendData.solution_name" disabled>
                            </label>
                        </div>
                        <div class="col">
                            <label class="form-control-label" data-toggle="modal" data-target="#">
                                <b class="control-label">태그</b>
                                <input type="text" class="form-control" v-model="this.sendData.tag_tag" readonly>
                            </label>
                        </div>
                        <div class="col">
                            <label class="form-control-label" data-toggle="modal" data-target="#">
                                <b class="control-label">에러 코드</b>
                                <input type="text" class="form-control" v-model="this.sendData.tag_erc" readonly>
                            </label>
                        </div>
                        <div class="col">
                            <label class="form-control-label" data-toggle="modal" data-target="#">
                                <b class="control-label">예외 종류</b>
                                <input type="text" class="form-control" v-model="this.sendData.tag_ert" readonly>
                            </label>
                        </div>
                    </div>
                </div>
            </div>
            <div class="ct-content">
                <div class="sub-bar">
                    <i class="icon-right text-danger"></i><p class="font-weight-bold">질문</p>
                </div>
                <textarea class="textarea-basic-md" v-model="this.sendData.content_q" readonly></textarea>
                <div class="sub-bar">
                    <i class="icon-right text-danger"></i><p class="font-weight-bold">환경 및 상황</p>
                </div>
                <textarea class="textarea-basic-md" v-model="this.sendData.content_s" readonly></textarea>
                <div class="sub-bar">
                    <i class="icon-right text-danger"></i><p class="font-weight-bold">오류 로그</p>
                </div>
            </div>
            <div class="ct-content">
                <textarea class="textarea-basic-lg" v-model="this.sendData.err_log" readonly></textarea>
            </div>
          </form>
          <div class="modal-footer">
            <button type="button" class="btn" @click="previewClose" data-dismiss="modal">취소</button>
            <button type="button" class="btn btn-primary" @click="previewClose">확인</button>
          </div>
          </v-container>
        </v-card>
      </v-dialog>
    </section>
  </div>
</template>

<script>
export default {
  name: 'KAKNM0102P1',
  components: {
  },
  icons: {
    iconfont: 'faSvg'
  },
  props: ['dialog', 'sendData'],
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
      solution_id: '',
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
      items: ''
    }
  },
  mounted () {
    // 추후 삭제
    this.userid = this.user_id
    this.params = this.sendData
    console.log('sendData =>>> ', this.sendData)
    console.log('params =>>> ', this.params)
  },
  computed: {
    user_id () {
      console.log(' computed userid components ', this.$store.state.userid)
      return this.$store.state.userid
    }
  },
  watch: {
    userid () {
      console.log('watch!')
      console.log(this.$store.state.userid)
    }
  },
  methods: {
    // 팝업 닫기
    previewClose () {
      console.log('child-close')
      this.$emit('previewClose')
    }
  }

}

</script>

<style scoped>

</style>
