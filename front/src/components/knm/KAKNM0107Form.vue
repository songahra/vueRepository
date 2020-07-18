<template>
    <div>
        <div class="container" style="margin-top:100px">
            <form id="KAKNM0101From" @submit.prevent="onSubmit" class="form">
            <div class="card shadow">
                <div class="card-body">
                <h4 class="card-title">내가 문의한 질문</h4>
                    <button type="submit" @onClick="onSubmit">조회</button> |
                </div>
                <div class="text-left">
                    <div class="form-group" style="resize: none;width: 526.66666px;">
                      <label for="title">질문 제목</label>
                      <input type="text" id="title" value="" v-model="title" class="form-control" rows="10" style="resize:none">
                    </div>
                    <div class="form-group" style="resize: none;width: 526.66666px;">
                      <label for="status">처리상태  :  </label>
                      <select name="status" id="status" v-model="status">
                          <option selected value="">선택하세요</option>
                          <option value="SS">완료</option>
                          <option value="NN">미완료</option>
                          <option value="RQ">재질문</option>
                      </select>
                    </div>
                </div>
            </div>
            </form>
        </div>
    </div>
</template>

<script>
import { srchMyList } from '@/api/Question.js'

export default {
  data: () => {
    return {
      title: '',
      status: '',
      sortType: '',
      lists: ''
    }
  },
  props: ['srchData'],
  methods: {
    async onSubmit () {
      console.log('onSubmit')
      const srchData = {
        userid: this.$store.state.userid,
        title: this.title,
        status: this.status
      }
      console.log('srchData', srchData)
      const { data } = await srchMyList(srchData)
      console.log('data : ', data)
      this.$emit('srchList', data)
    }

  }, // methods
  mounted () {
    console.log('mounted!!')
  }
}
</script>

<style>

</style>
