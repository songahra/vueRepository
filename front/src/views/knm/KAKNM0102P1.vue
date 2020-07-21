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
    <h3>기술문의</h3>
    <input type="hidden" id="project_id" readonly name="project_id" v-model="this.sendData.project_id">
    <div>
      <v-text-field label="제목" id="title" readonly type="textarea" cols="30" rows="6" v-model="this.sendData.title" ></v-text-field>
      <v-text-field label="프로젝트" id="project_name" readonly type="textarea" v-model="this.sendData.project_name" ></v-text-field>
      <div class="form-group" style="resize: none;width: 526.66666px;">
        <label for="param.solution_id">솔루션명  :  </label>
        <select name="solution_id" id="solution_id" disabled v-model="this.sendData.solution_id">
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
      <v-text-field label="태그#01" id="tag_tag" readonly v-model="this.sendData.tag_tag" ></v-text-field>
      <v-text-field label="에러코드" id="tag_erc" readonly v-model="this.sendData.tag_erc" ></v-text-field>
      <v-text-field label="예외종류" id="tag_ert" readonly v-model="this.sendData.tag_ert" ></v-text-field>
    </div>
    <v-row>
      <v-col cols="2">
        <v-subheader>질문</v-subheader>
      </v-col>
      <v-col cols="10">
        <v-text-field type="textarea" id="content_q" readonly v-model="this.sendData.content_q" ></v-text-field>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="2">
        <v-subheader>환경 및 상황</v-subheader>
      </v-col>
      <v-col cols="10">
        <v-text-field type="textarea" id="content_s" readonly v-model="this.sendData.content_s"></v-text-field>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="2">
        <v-subheader>오류 로그</v-subheader>
      </v-col>
      <v-col cols="10">
        <v-text-field type="textarea" id="err_log" readonly v-model="this.sendData.err_log" ></v-text-field>
      </v-col>
    </v-row>
      <div class="row col-md-6">
        <input class="btn btn-default col-md-3" @click="previewClose" type="button" value="닫기">
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
      tag_ert: ''
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
