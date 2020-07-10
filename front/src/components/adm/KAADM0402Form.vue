<template>
    <div>
        <div class="container" style="margin-top:100px">
            <form id="KAADM0402Form" @submit.prevent="onSubmit" class="form">
            <div class="card shadow">
                <div class="card-body">
                <h4 class="card-title">지식포인트</h4>
                  <div class="form-group" style="resize: none;width: 600px;">
                      <label for="customer">등록기간</label>
                      <v-text-field slot="activator" label="시작일" id="reg_date_start" value="" v-model="reg_date_start"></v-text-field>~
                      <!-- <v-date-picker locale="en-in" :max="maxDate" v-model="reg_date_start"></v-date-picker> -->
                      <v-text-field slot="activator" label="종료일" id="reg_date_end" value="" v-model="reg_date_end"></v-text-field>
                      <!-- <v-date-picker :max="maxDate" v-model="reg_date_end"></v-date-picker> -->
                    </div>
                    <div>
                    <v-btn small color="primary" type="submit" >조회</v-btn>
                    </div>
                </div>

                <table class="table table-hover" id="list">
                    <thead>
                        <tr>
                            <th>사용자</th>
                            <th>사용자 아이디</th>
                            <th>질문</th>
                            <th>답변</th>
                            <th>평가</th>
                            <th>평점</th>
                            <th>지식포인트</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr :key= "index" v-for= "(list, index ) in lists" >
                            <td>{{list.userName }}</td>
                            <td>{{list.user_id }}</td>
                            <a href
                            @click.prevent="searchPoint(list.user_id, 'q')"><td>{{list.question }}</td></a>
                            <a href
                            @click.prevent="searchPoint(list.user_id, 'a')"><td>{{list.answer }}</td></a>
                            <a href
                            @click.prevent="searchPoint(list.user_id, 'sc')"><td>{{list.scoreCount}}</td></a>
                            <td>{{list.avgScore }}</td>
                            <td>{{list.point }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            </form>
            <Modal2
              :dialog="isDialog"
              :propsdata="params"
              @close="isDialog=false"
            />
        </div>
    </div>
</template>

<script>
import 'url-search-params-polyfill'
import Modal2 from '@/components/adm/KAADM0402POPForm'
import { getUserList, getSearchUserList } from '@/api/adm/Point.js'

export default {
  components: {
    Modal2
  },
  name: 'KAADM0402From',
  data: () => {
    return {
      reg_date_start: '2020-06-01',
      reg_date_end: '2020-07-01',
      lists: '',
      isDialog: false,
      params: ''
    }
  },
  methods: {
    onSubmit () {
      const data = {
        params: {
          reg_date_start: this.reg_date_start,
          reg_date_end: this.reg_date_end
        }
      }
      getUserList(data)
        .then((res) => {
          this.lists = res.data
          console.log('getUserList')
          console.log(this.lists)
          return res
        })
        .then((res) => console.log(res))
        .catch(console.error())
    },
    searchPoint (user, t) {
      var u = user
      var type = t
      const data = {
        params: {
          reg_date_start: this.reg_date_start,
          reg_date_end: this.reg_date_end,
          user: u,
          type: type
        }
      }
      getSearchUserList(data)
        .then((res) => {
          this.params = res.data
          return res
        })
      console.log(this.isDialog)
      console.log(this.params)
      this.isDialog = true
    }
  },
  mounted () {
    console.log('mounted!!')
    const data = {
      params: {
        reg_date_start: '',
        reg_date_end: ''
      }
    }
    getUserList(data)
      .then((res) => {
        this.lists = res.data
        console.log('getUserList')
        console.log(this.lists)
        return res
      })
      .then((res) => console.log(res))
      .catch(console.error())
  }
}
</script>
