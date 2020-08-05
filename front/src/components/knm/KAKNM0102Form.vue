<!-- 질문하기 Form -->
<template>
      <div>
        <form id="KAKNM0102From" @submit.prevent="onSubmit" class="form">
            <header class="card-header" style="padding: 1.6rem 1rem;">
                <h2 class="card-title"><span class="i-rounded bg-danger"><i class="icon-std-code"></i></span>기술문의</h2>
                <div class="btn-container">
                    <a href="" class="btn btn-m" @click.prevent="previewOpen"  @previewClose="dialog=false"><span class="hide">미리보기</span></a>
                    <a href="" class="btn btn-primary" type="submit" @click.prevent="onSubmit"><span class="hide">확인</span></a>
                    <a href="" class="btn btn-primary"  @click="() => this.$router.go(-1)" ><span class="hide">목록보기</span></a>
                </div>
            </header>
            <div class="ct-header">
                <button type="button" class="btn-filter collapsed d-xl-none" data-toggle="collapse" data-target="#collapse-filter">검색 필터<i class="icon-down"></i></button>
                <div id="collapse-filter" class="collapse collapse-filter">
                    <div class="filter no-gutters no-btn">
                        <div class="col" style="min-width: 75%;">
                          <p>{{this.requestion_id}}</p>
                            <label class="form-control-label" data-toggle="modal" data-target="#">
                                <b class="control-label">질문제목</b>
                              <input type="text" class="form-control" placeholder="제목은 필수입력사항입니다." v-model="title">
                            </label>
                        </div>
                        <div class="col">
                            <label class="form-control-label" data-toggle="modal">
                                <b class="control-label" >프로젝트</b>
                                <input type="text" class="form-control" placeholder="프로젝트명을 입력하세요" v-model="project_name" disabled>
                            </label>
                        </div>
                         <button type="submit" class="btn btn-m" @click.prevent="btnSearch" @close="pjDialog=false"><i class="icon-srch"></i>찾기</button>
                    </div>
                    <div class="filter no-gutters no-btn">
                        <div class="col">
                          <label class="form-control-label">
                            <b class="control-label">솔루션명</b>
                              <select v-model="solution_id" class="form-control selectpicker" title="선택하세요">
                               <option
                                 v-for="(item,index) in items"
                                 :key="index"
                                 :value="item.codeId"
                                >
                                {{ item.codeContent }}
                                </option>
                              </select>
                            </label>
                        </div>
                        <div class="col">
                            <label class="form-control-label" data-toggle="modal" data-target="#">
                                <b class="control-label">태그</b>
                                <input type="text" class="form-control" placeholder="#02"  id="tag_tag" v-model="tag_tag">
                            </label>
                        </div>
                        <div class="col">
                            <label class="form-control-label" data-toggle="modal" data-target="#">
                                <b class="control-label">에러코드</b>
                                <input type="text" class="form-control" placeholder="코드명" id="tag_erc" v-model="tag_erc">
                            </label>
                        </div>
                        <div class="col">
                            <label class="form-control-label" data-toggle="modal" data-target="#">
                                <b class="control-label">예외종류</b>
                                <input type="text" class="form-control" placeholder="예외1" id="tag_ert" v-model="tag_ert">
                            </label>
                        </div>
                    </div>
                </div>
            </div>
            <div class="ct-content">
                <div class="sub-bar">
                    <i class="icon-right text-danger"></i><p class="font-weight-bold">질문</p>
                </div>
                <textarea class="textarea-basic-md"  id="content_q" v-model="content_q" ></textarea>
                <div class="sub-bar">
                    <i class="icon-right text-danger"></i><p class="font-weight-bold">환경 및 상황</p>
                </div>
                <textarea class="textarea-basic-md"  id="content_s"  v-model="content_s"></textarea>
                <div class="sub-bar">
                    <i class="icon-right text-danger"></i><p class="font-weight-bold">오류 로그</p>
                </div>
            </div>
            <div class="ct-content">
                <textarea class="textarea-basic-lg" v-model="err_log"></textarea>
            </div>
                <alert :dialog="isDialog" :sendData="alertContent" @close="close"></alert>
                <failAlert :dialog="fDialog" :sendData="alertContent" @close="fDialog=false"></failAlert>
                <KAKNM0102P1 :dialog="pvdialog" :sendData="paramData" @previewClose="previewClose"></KAKNM0102P1>
                <KAKNM0103P1 :dialog="pjDialog" @pjClose="pjClose" @checkedbtn="checkedbtn"></KAKNM0103P1>
        </form>
      </div>
</template>

<script>
import KAKNM0102P1 from '@/views/knm/KAKNM0102P1.vue'
import KAKNM0103P1 from '@/views/knm/KAKNM0103P1.vue'
import failAlert from '@/components/common/FailPOP.vue'
import alert from '@/components/common/CompletePOP.vue'
import { modify, srchQuId } from '@/api/knm/Question.js'
import { getSolution, userSolution } from '@/api/log/Login.js'

export default {
  name: 'KAKNM0102From',
  components: {
    KAKNM0102P1,
    KAKNM0103P1,
    failAlert,
    alert
  },
  data: () => {
    return {
      userid: '',
      reg_userid_ta: '',
      question_id: '',
      up_question_id: '',
      requestion_id: '',
      project_id: '',
      project_name: '',
      solution_id: '',
      tag_tag: '',
      tag_erc: '',
      tag_ert: '',
      title: '',
      content_q: '',
      content_s: '',
      err_log: '',
      flag: '',
      params: null,
      items: [],
      value: 0,
      alertContent: '',
      isDialog: false,
      dialog: false,
      fDialog: false,
      pvdialog: false,
      pjDialog: false,
      paramData: ''
    }
  },
  created () {
    this.getSolution()
    console.log('this.params 은?', this.params)

    // 재질문 등록시
    if (typeof this.$route.params.question_id !== 'undefined') {
      this.params = this.$route.params
      console.log('2this.params=>', this.params)
      const formData = {
        question_id: this.params.question_id,
        userid: this.params.userid
      }

      // 서버요청
      srchQuId(formData)
        .then((res) => {
          this.reg_userid_ta = res.data.reg_userid_ta
          this.up_question_id = res.data.question_id
          this.solution_id = res.data.solution_id
          this.solution_name = res.data.solution_name
          this.project_id = res.data.project_id
          this.project_name = res.data.project_name
          this.title = '[재질문] ' + res.data.title
          return res
        })
        .catch(function (e) {
          const result = e.message
          if (result.indexOf('500')) {
            this.$router.push({ name: '500Error' })
          } else if (result.indexOf('404')) {
            this.$router.push({ name: '404Error' })
          } else {
            this.$router.push({ name: 'Exception' })
          }
        })
    }
  },
  mounted () {
    console.log('mounted!!')
  },
  computed: {
    user_id () {
      return this.$store.state.userid
    }
  },
  methods: {
    // 등록
    onSubmit: function () {
      const FormData = {
        title: this.title,
        project_id: this.project_id,
        requestion_id: this.requestion_id,
        up_question_id: this.up_question_id,
        project_name: this.project_name,
        solution_id: this.solution_id,
        tag_tag: this.tag_tag,
        tag_erc: this.tag_erc,
        tag_ert: this.tag_ert,
        content_q: this.content_q,
        content_s: this.content_s,
        err_log: this.err_log,
        userid: this.$store.state.userid,
        reg_userid_ta: this.reg_userid_ta,
        flag: 'W'
      }
      console.log(this.tag_erc === '')
      this.errors = []
      if (!this.title) {
        this.alertContent = '제목 작성은 필수입니다.'
        this.fDialog = true
        return
      }
      if (!this.project_name) {
        this.alertContent = '프로젝트명 입력은 필수입니다.'
        this.fDialog = true
        return
      }
      if (!this.solution_id) {
        this.alertContent = '솔루션명 선택은 필수입니다.'
        this.fDialog = true
        return
      }
      if (!this.tag_tag) {
        this.alertContent = '태그#01 입력은 필수입니다.'
        this.fDialog = true
        return
      }
      if (!this.content_q) {
        this.alertContent = '질문 내용 작성은 필수입니다.'
        this.fDialog = true
        return
      }
      if (!this.content_s) {
        this.alertContent = '환경 및 상황 작성은 필수입니다.'
        this.fDialog = true
      } else {
        console.log('FormData : ', FormData)
        console.log('FormData : ', this.solution_id)

        // 서버요청
        modify(FormData)
        this.alertContent = '등록되었습니다. 메일을 확인해주세요'
        this.isDialog = true
        this.$router.push('/knm/mainList')
        /* modify(FormData)
          .then((res) => {
            console.log('result', res.data)
            const result = res.data
            if (res.status === 200) {
              if (result === 0) {
                alert('등록을 실패하였습니다.')
                // this.$router.go(-1)
              } else {
                alert(result + ' 건이 등록되었습니다.')
                this.$router.push('/knm/mainList')
              }
            } else {
              alert('등록을 실패하였습니다.')
              this.$router.go(-1)
            }
          })
          .catch(console.error()) */
      }
    },
    // 공통코드 솔루션 값
    getSolution () {
      getSolution()
        .then((res) => {
          console.log('res=>>', res)
          this.items = res.data
          console.log('solution_id ', this.items)
        })
        .catch(console.error())
    },
    userSolution () {
      const code = this.solution_id
      this.solution_name = userSolution(code)
      return this.solution_name
    },
    // 프로젝트 id 조회 팝업오픈
    btnSearch: function () {
      console.log('btnSearch실행')
      this.pjDialog = true
    },
    // 프로젝트 id 가져오기
    checkedbtn (params) {
      console.log('3 checkedbtn')
      console.log('3 params', params)

      this.project_id = params.project_id
      this.project_name = params.project_name
      this.pjClose()
    },
    close () {
      this.isDialog = !this.isDialog
    },
    // 프로젝트 조회 팝업닫기
    pjClose () {
      console.log('grand-parent-close')
      this.pjDialog = !this.pjDialog
    },
    // 미리보기 팝업오픈
    previewOpen: function () {
      console.log('btnSearch실행')
      this.paramData = {
        title: this.title,
        project_id: this.project_id,
        project_name: this.project_name,
        solution_name: this.userSolution(), // 확인필요
        tag_tag: this.tag_tag,
        tag_erc: this.tag_erc,
        tag_ert: this.tag_ert,
        content_q: this.content_q,
        content_s: this.content_s,
        err_log: this.err_log,
        userid: this.$store.state.userid
      }
      this.pvdialog = true
    },
    // 미리보기 팝업닫기
    previewClose () {
      console.log('previewClose')
      this.pvdialog = !this.pvdialog
    }
  }

}

</script>

<style scoped>

</style>
