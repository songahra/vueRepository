<!-- 질문하기 Form -->
<template>
  <v-container fluid>
    <h3>기술문의</h3>
    <form id="KAKNM0102From" @submit.prevent="onSubmit" class="form">
    <input type="hidden" id="project_id"  name="project_id" v-model="project_id"/>
    <v-col class="text-center" cols="12" sm="4">
      <div class="my-2">
      <v-btn small color="primary" @click.prevent="previewOpen"  @previewClose="dialog=false">미리보기</v-btn>  |
      <v-btn small color="primary" type="submit">확인</v-btn>  |
      <v-btn small color="primary" @click="() => this.$router.push({ name: 'KAKNM0101List' })" >목록보기</v-btn>
      </div>
    </v-col>
    <div>
      <v-text-field label="제목" placeholder="제목은 필수 입력입니다" id="title" type="textarea" cols="30" rows="6" v-model="title" ></v-text-field>
      <v-text-field label="프로젝트" placeholder="프로젝트" id="project_name" type="textarea" v-model="project_name" ></v-text-field>
      <v-btn small color="primary" @click.prevent="btnSearch" @close="isDialog=false">찾기</v-btn>
      <div class="form-group" style="resize: none;width: 526.66666px;">
        <label for="solution_id">솔루션명  :  </label>
        <select name="solution_id" id="solution_id" v-model="solution_id">
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
      <v-text-field label="에러코드" placeholder="에러코드" id="tag_erc" type="tag_erc" v-model="tag_erc" ></v-text-field>
      <v-text-field label="예외종류" placeholder="예외종류" id="tag_ert" type="tag_ert" v-model="tag_ert" ></v-text-field>
    </div>
    <v-row>
      <v-col cols="2">
        <v-subheader>질문</v-subheader>
      </v-col>
      <v-col cols="10">
        <v-text-field  placeholder="질문 내용 작성" type="textarea" id="content_q" v-model="content_q" ></v-text-field>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="2">
        <v-subheader>환경 및 상황</v-subheader>
      </v-col>
      <v-col cols="10">
        <v-text-field placeholder="시스템 개발환경 및 상황 작성" type="textarea" id="content_s"  v-model="content_s" value=""></v-text-field>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="2">
        <v-subheader>오류 로그</v-subheader>
      </v-col>
      <v-col cols="10">
        <v-text-field placeholder="오류로그작성" type="textarea" id="err_log" v-model="err_log"  value=""></v-text-field>
      </v-col>
    </v-row>
    </form>
    <KAKNM0102P1 :dialog="dialog" :sendData="paramData" @previewClose="previewClose"></KAKNM0102P1>
    <KAKNM0103P1 :dialog="isDialog" @close="close" @checkedbtn="checkedbtn"></KAKNM0103P1>
  </v-container>
</template>

<script>
import KAKNM0102P1 from '@/views/knm/KAKNM0102P1.vue'
import KAKNM0103P1 from '@/views/knm/KAKNM0103P1.vue'
import { modify } from '@/api/Question.js'

export default {
  name: 'KAKNM0102From',
  components: {
    KAKNM0102P1,
    KAKNM0103P1
  },
  icons: {
    iconfont: 'faSvg'
  },
  data: () => {
    return {
      userid: '',
      question_id: '',
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
      errors: [],
      isDialog: false,
      dialog: false,
      paramData: ''
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
        project_name: this.project_name,
        solution_id: this.solution_id,
        tag_tag: this.tag_tag,
        tag_erc: this.tag_erc,
        tag_ert: this.tag_ert,
        content_q: this.content_q,
        content_s: this.content_s,
        err_log: this.err_log,
        userid: this.$store.state.userid,
        flag: 'W'
      }

      this.errors = []
      if (!this.title) {
        alert('제목 작성은 필수입니다.')
        return
      }
      if (!this.project_name) {
        alert('프로젝트명 입력은 필수입니다.')
        return
      }
      if (!this.solution_id) {
        alert('솔루션명 선택은 필수입니다.')
        return
      }
      if (!this.tag_tag) {
        alert('태그#01 입력은 필수입니다.')
        return
      }
      if (!this.content_q) {
        alert('질문 내용 작성은 필수입니다.')
        return
      }
      if (!this.content_s) {
        alert('환경 및 상황 작성은 필수입니다.')
      } else {
        console.log('FormData : ', FormData)

        // 서버요청
        modify(FormData)
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
          .catch(console.error())
      }
    },
    // 프로젝트 id 조회 팝업오픈
    btnSearch: function () {
      console.log('btnSearch실행')
      this.isDialog = true
    },
    // 프로젝트 id 가져오기
    checkedbtn (params) {
      console.log('3 checkedbtn')
      console.log('3 params', params)

      this.project_id = params.project_id
      this.project_name = params.project_name
      this.close()
    },
    // 프로젝트 조회 팝업닫기
    close () {
      console.log('grand-parent-close')
      this.isDialog = !this.isDialog
    },
    // 미리보기 팝업오픈
    previewOpen: function () {
      console.log('btnSearch실행')
      this.paramData = {
        title: this.title,
        project_id: this.project_id,
        project_name: this.project_name,
        solution_id: this.solution_id,
        tag_tag: this.tag_tag,
        tag_erc: this.tag_erc,
        tag_ert: this.tag_ert,
        content_q: this.content_q,
        content_s: this.content_s,
        err_log: this.err_log,
        userid: this.$store.state.userid
      }
      this.dialog = true
    },
    // 미리보기 팝업닫기
    previewClose () {
      console.log('previewClose')
      this.dialog = !this.dialog
    }
  }

}

</script>

<style scoped>

</style>
