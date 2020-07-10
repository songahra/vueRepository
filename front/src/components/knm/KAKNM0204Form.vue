<template>
    <div>
        <div class="container" style="margin-top:100px">
            <form id="KAKNM0204Form" @submit.prevent="onSubmit" class="form">
            <div class="card shadow">
                <div class="card-body">
                <h4 class="card-title">내가 답변한 질문</h4>

                </div>
                <div class="text-left">
                    <div class="form-group" style="resize: none;width: 526.66666px;">
                      <label for="title">질문 제목</label>
                      <input type="text" id="title" value="" v-model="title" class="form-control" rows="10" style="resize:none">

                    </div>
                    <div class="form-group" style="resize: none;width: 526.66666px;">
                      <label for="status">처리상태  :  </label>
                      <select name="status" id="status" v-model="status">
                          <option selected value="">처리상태</option>
                          <option value="SS">완료</option>
                          <option value="NN">미완료</option>
                          <option value="RQ">재질문</option>
                      </select>
                    </div>
                    <div>
                      <v-btn small color="primary" type="submit" >조회</v-btn>
                    </div>
                </div>
                <table class="table table-hover" id="list">
                    <thead>
                        <tr>
                            <!-- <th>글번호</th> -->
                            <th>솔루션 </th>
                            <th>질문제목</th>
                            <th>질문자</th>
                            <th>질문일시</th>
                            <th>답변자</th>
                            <th>답변일시</th>
                            <th>경과시간</th>
                            <th>처리상태</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr :key= "index" v-for= "(list, index ) in lists" >
                            <!-- <td>{{list.rowNum }}</td> -->
                            <td>{{list.solution_code }}</td>
                            <td>{{list.title }}</td>
                            <td>{{list.reg_userid_tq }}</td>
                            <td>{{list.reg_date_tq }}</td>
                            <td>{{list.reg_userid_ta }}</td>
                            <td>{{list.reg_date_ta }}</td>
                            <td>{{list.term }}</td>
                            <td>{{list.status }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            </form>
        </div>
    </div>
</template>
<script>
import 'url-search-params-polyfill'
import { getAnsList } from '@/api/knm/Answer.js'

export default {
  name: 'KAKNM0204From',
  data: () => {
    return {
      title: '',
      status: '',
      user: 'Auser2@inzent.com',
      lists: ''
    }
  },
  methods: {
    onSubmit: function () {
      const data = {
        params: {
          title: this.title,
          status: this.status,
          user: this.user
        }
      }
      getAnsList(data)
        .then((res) => {
          this.lists = res.data
          return res
        })
        .catch(console.err())
    }
  },
  mounted () {
    console.log('mounted!!')
    const data = {
      params: {
        title: this.title,
        status: this.status,
        user: this.user
      }
    }
    getAnsList(data)
      .then((res) => {
        this.lists = res.data
        return res
      })
      .catch(console.err())
  }
}
</script>
