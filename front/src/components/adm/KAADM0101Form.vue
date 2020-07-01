<template>
    <div>
        <div class="container" style="margin-top:100px">
            <form id="KAADM0101Form" @submit.prevent="onSubmit" class="form">
            <input type="hidden" name="flag"  id="flag" value="param.flag"/><!-- ${view.flag} -->
            <div class="card shadow">
                <div class="card-body">
                <h4 class="card-title">지식관리</h4>
                </div>
                <div class="text-left">
                    <div class="form-group" style="resize: none;width: 526.66666px;">
                      <v-text-field label="프로젝트ID" id="project_id" value="" v-model="project_id"></v-text-field>
                    </div>
                    <div class="form-group" style="resize: none;width: 526.66666px;">
                      <v-text-field label="프로젝트명" id="project_name" value="" v-model="project_name"></v-text-field>
                    </div>
                    <div class="form-group" style="resize: none;width: 526.66666px;">
                      <v-text-field label="최종고객" id="customer" value="" v-model="customer"></v-text-field>
                    </div>
                     <div class="form-group" style="resize: none;width: 526.66666px;">
                      <label for="customer">등록기간</label>
                      <v-row justify="center">
                      <v-text-field slot="activator" label="시작일" id="reg_date_st" value="" v-model="reg_date_st"></v-text-field>~
                      <v-date-picker locale="en-in" :max="maxDate" v-model="reg_date_st"></v-date-picker>
                      <v-text-field slot="activator" label="종료일" id="reg_date_ed" value="" v-model="reg_date_ed"></v-text-field>
                      <v-date-picker :max="maxDate" v-model="reg_date_ed"></v-date-picker>
                      </v-row>
                    </div>
                    <div>
                    <v-btn small color="primary" type="submit">조회</v-btn>
                    </div>
                </div>
                <v-simple-table id="list">
                  <template v-slot:default>
                    <thead>
                        <tr>
                            <th class="text-left">프로젝트ID</th>
                            <th class="text-left">프로젝트명</th>
                            <th class="text-left">최종고객</th>
                            <th class="text-left">프로젝트 기간</th>
                            <th class="text-left">등록일</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr :key= "index" v-for= "(list, index ) in lists" >
                            <td>{{list.project_id }}</td>
                            <td>{{list.project_name }}</td>
                            <td>{{list.customer }}</td>
                            <td>{{list.term }}</td>
                            <td>{{list.reg_date }}</td>
                        </tr>
                    </tbody>
                  </template>
                </v-simple-table>
            </div>
            </form>
        </div>
    </div>
</template>
<!-- Bootstrap CDN -->
<script>
const axios = require('axios').default

export default {
  name: 'KAADM0101Form',
  //   components: {
  //     HelloWorld
  //   },
  data: () => {
    return {
      checked_id: '',
      project_id: '',
      project_name: '',
      customer: '',
      term: '',
      reg_date: '',
      reg_date_st: '',
      reg_date_ed: '',
      lists: '',
      maxDate: new Date() // 데이트피커 날짜 max
    }
  },
  methods: {
    onSubmit: function () {
      const url = 'http://localhost:8080/knm/srchPrList'
      const data = {
        params: {
          project_id: this.project_id,
          project_name: this.project_name,
          customer: this.customer,
          reg_date_st: this.reg_date_st,
          reg_date_ed: this.reg_date_ed
        }
      }
      console.log('data : ' + this.prams)
      axios.get(url, data)
        .then((res) => {
          this.lists = res.data
          console.log('getList')
          console.log(this.lists)
          return res
        })
        .then((res) => console.log(res))
        .catch(console.error())
    },
    del_data () {
      this.$emit('close')
    }
  },
  mounted () {
    console.log('mounted!!')
    const url = 'http://localhost:8080/knm/getPrList'
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

</style>
