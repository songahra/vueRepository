<template>
    <div>
        <div class="container" style="margin-top:100px">
            <form id="KAADM0402Form" @submit.prevent="onSubmit" class="form">
            <div class="card shadow">
                <div class="card-body">
                <h4 class="card-title">지식포인트</h4>
                    <button type="/">조회</button> |
                    <a href="/">기술문의</a>
                </div>

                <table class="table table-hover" id="list">
                    <thead>
                        <tr>
                            <th>사용자</th>
                            <th>질문</th>
                            <th>답변</th>
                            <th>평가</th>
                            <!-- <th>평점</th> -->
                            <th>지식포인트</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr :key= "index" v-for= "(list, index ) in lists" >
                            <td>{{list.userName }}</td>
                            <td>{{list.question }}</td>
                            <td>{{list.answer }}</td>
                            <td>{{list.score_count}}</td>
                            <!-- <td>{{list. }}</td> -->
                            <td>{{list.point }}</td>
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

const axios = require('axios').default

export default {
  name: 'KAADM0402From',
  //   components: {
  //     HelloWorld
  //   },
  data: () => {
    return {
    //   title: '',
    //   status: '',
      lists: ''
    }
  },
  methods: {
    onSubmit: function () {
      const url = 'http://localhost:8080/KAADM04/user'
      // var params = new URLSearchParams()
      // params.append('title', this.title)
      // params.append('status', this.status)
      //   const data = {
      //     params: {
      //       title: this.title,
      //       status: this.status
      //     }
      //   }

      console.log(url)
      axios.get(url)
        .then((res) => {
          this.lists = res.data
          console.log('getUserList')
          console.log(this.lists)
          return res
        })
        .then((res) => console.log(res))
        .catch(console.error())
    }
  },
  mounted () {
    console.log('mounted!!')
    const url = 'http://localhost:8080/KAADM04/user'

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
