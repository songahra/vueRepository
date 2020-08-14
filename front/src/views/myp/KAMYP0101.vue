<template>
  <div id="wrap">
    <div id="ct">
      <section class="card">
        <header class="card-header">
          <h2 class="card-title">
            <span class="i-rounded bg-danger"><i class="icon-home" /></span>My page
          </h2>
        </header>
        <div
          id="base-info"
          class="tab-pane active"
        >
          <div class="row frm-row">
            <div class="col-lg-6">
              <div class="form-group">
                <div class="sub-bar">
                  <i
                    class="icon-plus text-dark"
                    @click="()=> {this.$router.push('/knm/myList')}"
                  /><p class="font-weight-bold">
                    내 질문
                  </p>
                </div>
                <div class="table-line" />
                <div class="table-responsive">
                  <table class="table">
                    <colgroup>
                      <col style="width: 5%">
                      <col style="width: 75%">
                      <col style="width: 20%">
                    </colgroup>
                    <tbody>
                      <tr
                        v-for="(questionList, index) in questionLists"
                        :key="index"
                        @click="clickQU(questionList.id)"
                      >
                        <td>
                          <!-- <img
                            src="img/danger.svg"
                            alt=""
                          > -->
                        </td>
                        <td>{{ questionList.title }}</td>
                        <td>{{ questionList.reg_date }}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div class="col-lg-6">
              <div class="form-group">
                <div class="sub-bar">
                  <i
                    class="icon-plus text-dark"
                    @click="()=> {this.$router.push('/knm/anList')}"
                  /><p class="font-weight-bold">
                    내가 한 답변
                  </p>
                </div>
                <div class="table-line" />
                <div class="table-responsive">
                  <table class="table">
                    <colgroup>
                      <col style="width: 5%">
                      <col style="width: 75%">
                      <col style="width: 20%">
                    </colgroup>
                    <tbody>
                      <tr
                        v-for="(answerList, index) in answerLists"
                        :key="index"
                        @click="clickAN(answerList.id)"
                      >
                        <td>
                          <!-- <img
                            src="img/complete.svg"
                            alt=""
                          > -->
                        </td>
                        <td>{{ answerList.title }}</td>
                        <td>{{ answerList.reg_date }}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <div class="row frm-row">
            <div class="col-lg-6">
              <div class="form-group">
                <div class="sub-bar">
                  <i
                    class="icon-plus text-dark"
                    @click="()=> {this.$router.push('/knm/myList')}"
                  /><p class="font-weight-bold">
                    미해결 질문
                  </p>
                </div>
                <div class="table-line" />
                <div class="table-responsive">
                  <table class="table">
                    <colgroup>
                      <col style="width: 5%">
                      <col style="width: 75%">
                      <col style="width: 20%">
                    </colgroup>
                    <tbody>
                      <tr
                        v-for="(questionListNN, index) in questionListsNN"
                        :key="index"
                        @click="clickNN(questionListNN.id)"
                      >
                        <td><i class="icon-three-dot" /></td>
                        <td>{{ questionListNN.title }}</td>
                        <td>{{ questionListNN.reg_date }}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div class="col-lg-6">
              <div class="form-group">
                <div class="sub-bar">
                  <i
                    class="icon-plus text-dark"
                    @click="()=> {this.$router.push('/noticeList')}"
                  /><p class="font-weight-bold">
                    공지사항
                  </p>
                </div>
                <div class="table-line" />
                <div class="table-responsive">
                  <table class="table">
                    <colgroup>
                      <col style="width: 5%">
                      <col style="width: 75%">
                      <col style="width: 20%">
                    </colgroup>
                    <tbody>
                      <tr
                        v-for="(noticeList, index) in noticeLists"
                        :key="index"
                        @click="clickNT(noticeList.id)"
                      >
                        <td><i class="icon-three-dot" /></td>
                        <td>{{ noticeList.title }}</td>
                        <td>{{ noticeList.reg_date }}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import { selectMypage, getId } from '@/api/myp/Mypage.js'

export default {
  data: () => {
    return {
      noticeLists: [], // 공지사항
      questionLists: [], // 내 질문
      answerLists: [], // 내가 한 답변
      questionListsNN: [] // 미해결 질문, 내 질문 중에서도 status가 NN인 경우

    }
  },
  async created () {
    this.$store.commit('SET_DEPTH1', 'My Page')
    this.$store.commit('SET_DEPTH2', ' ')

    const param = {
      user_id: this.$store.state.userid
    }
    console.log(param)

    const { data } = await selectMypage(param)
    console.log('data??', data)

    for (var i = 0; i < data.length; i++) {
      if ((data[i].id.substring(0, 2)) === 'NT') {
        this.noticeLists.push(data[i])
      } else if ((data[i].id.substring(0, 2)) === 'QU' && data[i].status !== 'NN') {
        this.questionLists.push(data[i])
      } else if ((data[i].id.substring(0, 2)) === 'QU' && data[i].status === 'NN') {
        this.questionListsNN.push(data[i])
      } else if ((data[i].id.substring(0, 2)) === 'AN') {
        this.answerLists.push(data[i])
      }
    }
  },
  methods: {
    // 미해결 질문 상세보기 함수
    clickNN (e) {
      console.log('이벤트', e)
      const param = {
        question_id: e
      }
      console.log(param)
      this.$router.push({ name: 'KAKNM0104Detail', params: param })
    },
    // 내 질문 상세보기 함수
    clickQU (e) {
      const param = {
        question_id: e
      }
      console.log(param)
      this.$router.push({ name: 'KAKNM0104Detail', params: param })
    },
    // 내가 한 답변 상세보기 함수
    async clickAN (e) {
      console.log(e)
      const params = {
        answer_id: e
      }
      const { data } = await getId(params)

      console.log(data)

      const param = {
        question_id: data
      }
      this.$router.push({ name: 'KAKNM0104Detail', params: param })
    },
    // 공지사항 상세보기 함수
    clickNT (e) {
      console.log(e)
      const param = {
        notice_id: e
      }
      this.$router.push({ name: 'noticeDetail', params: param })
    }
  }

}
</script>

<style>

</style>
