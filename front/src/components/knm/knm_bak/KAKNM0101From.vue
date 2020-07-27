<template>
    <div>
        <div class="container" style="margin-top:100px">
            <form id="KAKNM0101From" @submit.prevent="onSubmit" class="form">
            <div class="card shadow">
                <div class="card-body">
                <h4 class="card-title">지식관리</h4>
                    <button type="submit" @onClick="onSubmit">조회</button> |
                        <v-btn @click="() =>  this.$router.push({ name: 'KAKNM0102Write' })">기술문의</v-btn>
                </div>
                <div class="text-left">
                    <div class="form-group" style="resize: none;width: 526.66666px;">
                      <label for="title">질문 제목</label>
                      <input type="text" id="title" value="" v-model="title" class="form-control" rows="10" style="resize:none">
                    </div>
                    <div class="form-group" style="resize: none;width: 526.66666px;">
                      <label for="status">처리상태  :  </label>
                      <select name="status" id="status" v-model="status">
                          <option selected value="">전체</option>
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
            </div>
            </form>
        </div>
    </div>
</template>

<script>
import { srchList } from '@/api/Question.js'

export default {
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
  props: ['srchData'],
  methods: {
    async onSubmit () {
      console.log('onSubmit')
      const srchData = {
        title: this.title,
        status: this.status,
        sortType: this.sortType,
        tag_tag: this.tag_tag,
        tag_erc: this.tag_erc,
        tag_ert: this.tag_ert
      }
      console.log('srchData', srchData)
      const { data } = await srchList(srchData)
      console.log('data : ', data)
      this.$emit('srchList', data)
    // promise 방식
    //   axios.post(url, data)
    //     .then((res) => {
    //       this.lists = res.data
    //       console.log('getList')
    //       console.log(this.lists)
    //       return res
    //     })
    //     .then((res) => console.log(res))
    //     .catch(console.error())
    }

  }, // methods
  mounted () {
    console.log('mounted!!')
  }
}
</script>

<style>

</style>
