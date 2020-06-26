<template>
    <div>
        <div class="container" style="margin-top:100px">
            <form id="KAKNM0101From" @submit.prevent="onSubmit" class="form">
            <div class="card shadow">
                <div class="card-body">
                <h4 class="card-title">지식관리</h4>
                    <button type="submit">조회</button> |
                    <a href="/">기술문의</a>
                </div>
                <div class="text-left">
                    <div class="form-group" style="resize: none;width: 526.66666px;">
                      <label for="title">질문 제목</label>
                      <input type="text" id="title" value="" v-model="title" class="form-control" rows="10" style="resize:none">
                    </div>
                    <div class="form-group" style="resize: none;width: 526.66666px;">
                      <label for="status">처리상태  :  </label>
                      <select name="status" id="status" v-model="status">
                          <option selected>처리상태</option>
                          <option value="SS">완료</option>
                          <option value="NN">미완료</option>
                          <option value="RQ">재질문</option>
                      </select>
                    </div>
                    <div class="form-group" style="resize: none;width: 526.66666px;">
                      <label for="sorting">정렬기준  :  </label>
                      <select name="sortType" id="sortType"  v-model="sortType">
                          <option value="1">질문자</option>
                          <option value="2">답변자</option>
                          <option value="3" selected>경과시간</option>
                          <option value="4">처리상태</option>
                      </select>
                    </div>
                    <div class="form-group" style="resize: none;width: 526.66666px;">
                      <label for="tag_tag" >태그</label>
                      <input placeholder="태그" type="text" id="tag_tag" value="" v-model="tag_tag" class="form-control" rows="10" style="resize:none">
                    </div>
                    <div class="form-group" style="resize: none;width: 526.66666px;">
                      <label for="tag_erc" >에러코드</label>
                      <input placeholder="에러코드" type="text" id="tag_erc" value="" v-model="tag_erc" class="form-control" rows="10" style="resize:none">
                    </div>
                      <div class="form-group" style="resize: none;width: 526.66666px;">
                      <label for="tag_ert">예외</label>
                      <input placeholder="예외종류" type="text" id="tag_ert" value=""  v-model="tag_ert" class="form-control" rows="10" style="resize:none">
                    </div>
                </div>
                <table class="table table-hover" id="list">
                    <thead>
                        <tr>
                            <th>글번호</th>
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
                            <td>{{list.rowNum }}</td>
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
<!-- Bootstrap CDN -->
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.0/umd/popper.min.js"></script>
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.1.0/js/bootstrap.min.js"></script>
<script>
const axios = require('axios').default

export default {
  name: 'KAKNM0101From',
  //   components: {
  //     HelloWorld
  //   },
  data: () => {
    return {
      title: '',
      status: '',
      sortType: '',
      tag_tag: '',
      tag_erc: '',
      tag_ert: '',
      lists: ''
    }
  },
  methods: {
    onSubmit: function () {
      const url = 'http://localhost:8080/knm/getList'
      const data = {
          title: this.title,
          status: this.status,
          sortType: this.sortType,
          tag_tag: this.tag_tag,
          tag_erc: this.tag_erc,
          tag_ert: this.tag_ert
      }
      // console.log("data : "+  this.srchNames)
      axios.post(url, data)
        .then((res) => {
          this.lists = res.data
          console.log('getList')
          console.log(this.lists)
          return res
        })
        .then((res) => console.log(res))
        .catch(console.error())
    }
  },
  mounted () {
    console.log('mounted!!')
    const url = 'http://localhost:8080/knm/main'
    axios.get(url)
      // .then((res) => console.log(res)
      //                var data = res
      //                return res)
      .then((res) => {
        this.lists = res.data
        console.log(this.lists)
        return res
      })
      .then((res) => console.log(res))
      .catch(console.error())
  }
}
</script>

<style scoped>
.content-detail-content-info {
  border: 1px solid black;
  display: flex;
  justify-content: space-between;
}

.content-detail-content-info-left {
  width: 720px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
}

.content-detail-content-info-right {
  width: 300px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1rem;
}

.content-detail-content {
  border: 1px solid black;
  margin-top: 1rem;
  padding-top: 1rem;
  min-height: 720px;
}

.content-detail-button {
  border: 1px solid black;
  margin-top: 1rem;
  padding: 2rem;
}

.content-detail-comment {
  border: 1px solid black;
  margin-top: 1rem;
  padding: 2rem;
}
</style>
