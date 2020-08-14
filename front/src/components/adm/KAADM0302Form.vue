<!-- 코드관리 등록 -->
<template>
  <div>
    <form
      id="KAADM0302Form"
      class="form"
      @submit.prevent="onSubmit"
    >
      <header
        class="card-header"
        style="padding: 1.6rem 1rem;"
      >
        <h2 class="card-title">
          <span class="i-rounded bg-danger"><i class="icon-std-code" /></span>코드 관리
        </h2>
        <div class="btn-container">
          <a
            href=""
            class="btn btn-primary"
            type="submit"
            @click.prevent="onSubmit"
          ><span class="hide">확인</span></a>
          <a
            href=""
            class="btn"
            @click="movePage()"
          ><span class="hide">목록보기</span></a>
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
                <b class="control-label">코드 ID</b>
                <input
                  v-model="code_id"
                  type="text"
                  class="form-control"
                  placeholder="코드 ID은 필수입력사항입니다."
                  maxlength="8"
                >
              </label>
            </div>
            <div class="col">
              <label
                class="form-control-label"
                data-toggle="modal"
              >
                <b class="control-label">상위코드 ID</b>
                <input
                  v-model="code_up_id"
                  type="text"
                  class="form-control"
                  placeholder="상위코드 ID은 필수입력사항입니다."
                  maxlength="8"
                  disabled
                >
              </label>
            </div>
            <button
              type="submit"
              class="btn btn-m"
              @click.prevent="btnSearch"
              @close="codeDialog=false"
            >
              <i class="icon-srch" />찾기
            </button>
          </div>
          <div class="filter no-gutters no-btn">
            <div class="col">
              <label
                class="form-control-label"
                data-toggle="modal"
              >
                <b class="control-label">코드 명</b>
                <input
                  v-model="code_name"
                  type="text"
                  class="form-control"
                  placeholder="코드 명"
                  maxlength="50"
                >
              </label>
            </div>
            <div class="col">
              <label
                class="form-control-label"
                data-toggle="modal"
                data-target="#"
              >
                <b class="control-label">코드 값</b>
                <input
                  v-model="code_value"
                  type="text"
                  class="form-control"
                  placeholder="코드 값 (대문자 영문 2자리)"
                  maxlength="2"
                >
              </label>
            </div>
            <div class="col">
              <label
                class="form-control-label"
                data-toggle="modal"
                data-target="#"
              >
                <b class="control-label">유형</b>
                <input
                  v-model="code_type"
                  type="text"
                  class="form-control"
                  placeholder="유형"
                  maxlength="50"
                >
              </label>
            </div>
            <div class="col">
              <label
                class="form-control-label"
                data-toggle="modal"
                data-target="#"
              >
                <b class="control-label">코드 정렬</b>
                <input
                  v-model="code_order"
                  type="number"
                  min="0"
                  max="10"
                  class="form-control"
                  placeholder="코드 정렬"
                  maxlength="10"
                >
              </label>
            </div>
          </div>
        </div>
      </div>
      <div class="ct-content">
        <div class="sub-bar">
          <i class="icon-right text-danger" /><p class="font-weight-bold">
            코드값 내용
          </p>
        </div>
        <textarea
          v-model="code_content"
          class="textarea-basic-md"
          maxlength="50"
        />
        <div class="sub-bar">
          <i class="icon-right text-danger" /><p class="font-weight-bold">
            코드 설명
          </p>
        </div>
        <textarea
          v-model="code_explain"
          class="textarea-basic-md"
          maxlength="50"
        />
      </div>
      <KAADM0302P1
        :dialog="codeDialog"
        @codeClose="codeClose"
        @checkedbtn="checkedbtn"
      />
      <failAlert
        :dialog="fDialog"
        :send-data="alertContent"
        @close="fDialog=false"
      />
    </form>
  </div>
</template>

<script>
import KAADM0302P1 from '@/views/adm/KAADM0302P1.vue'
import failAlert from '@/components/common/FailPOP.vue'
import { writeCodeInfo } from '@/api/adm/Code.js'

export default {
  name: 'KAKNM0105From',
  components: {
    KAADM0302P1,
    failAlert
  },
  icons: {
    iconfont: 'faSvg'
  },
  data: () => {
    return {
      title: '',
      param: [],
      userid: '',
      reg_uerid: '',
      code_id: '',
      code_name: '',
      code_value: '',
      code_up_id: '',
      code_type: '',
      code_order: null,
      code_content: '',
      code_explain: '',
      errors: [],
      items: [],
      alertContent: '',
      codeDialog: false,
      fDialog: false,
      dialog: false,
      paramData: ''
    }
  },
  porps: [

  ],
  computed: {
    chg_user_id () {
      return this.$store.state.userid
    }
  },
  created () {

  },
  methods: {
    // 수정
    onSubmit: function () {
      console.log('넘어왓니', FormData)
      console.log('typeof this.code_order', typeof this.code_order)

      if (!this.code_id) {
        this.alertContent = '코드 ID 입력은 필수입니다.'
        this.fDialog = true
        return
      }
      if (!this.code_name) {
        this.alertContent = '코드 명 입력은 필수입니다.'
        this.fDialog = true
        return
      }
      if (!this.code_up_id) {
        this.alertContent = '상위 코드 ID 입력은 필수입니다.'
        this.fDialog = true
        return
      }
      if (!this.code_value) {
        this.alertContent = '코드 값 작성은 필수 입니다. 영문 두자리를 입력해주세요.'
        this.fDialog = true
      } else {
        const FormData = {
          userid: this.$store.state.userid,
          code_id: this.code_id,
          code_up_id: this.code_up_id,
          code_name: this.code_name,
          code_value: this.code_value,
          code_type: this.code_type,
          code_order: this.code_order,
          code_content: this.code_content,
          code_explain: this.code_explain,
          flag: 'W'
        }
        console.log('FormData : ', FormData)
        // 서버요청
        writeCodeInfo(FormData)
          .then((res) => {
            console.log('result', res.data)
            const result = res.data
            if (res.status === 200) {
              if (result === 0) {
                this.alertContent = result + ' 건이 등록되었습니다.'
                this.$router.push({ name: 'KAADM0301List' })
                this.fDialog = true
              } else {
                this.alertContent = result + ' 건이 등록되었습니다.'
                this.fDialog = true
                this.$router.push({ name: 'KAADM0301List' })
              }
            } else {
              this.alertContent = '실패하였습니다'
              this.fDialog = true
              this.$router.go(-1)
            }
          })
      }
    },
    // 상위코드 찾기
    btnSearch: function () {
      console.log('btnSearch실행')
      this.codeDialog = true
    },
    codeClose () {
      console.log('grand-parent-close')
      this.codeDialog = !this.codeDialog
    },
    checkedbtn (params) {
      console.log('3 checkedbtn')
      console.log('3 params', params)

      this.code_up_id = params.code_id
      this.codeClose()
    },
    movePage () {
      this.$router.push({ name: 'KAADM0301List' })
    }
  }
}
</script>

<style>

</style>
