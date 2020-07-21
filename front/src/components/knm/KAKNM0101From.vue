<template>
<div>
            <header class="card-header" style="padding: 1.6rem 1rem;">
                <h2 class="card-title"><span class="i-rounded bg-danger"><i class="icon-result"></i></span>지식 관리 (iGate)</h2>
                <div class="btn-container"><a href="/knm/quWrite" class="btn btn-m"><span class="hide">기술문의</span></a></div>
            </header>
            <div class="ct-header">
            <form id="KAKNM0101From" @submit.prevent="onSubmit" class="form">
            <button type="button" class="btn-filter collapsed d-xl-none" data-toggle="collapse" data-target="#collapse-filter">검색 필터<i class="icon-down"></i></button>
                    <div id="collapse-filter" class="collapse collapse-filter">
                    <div class="filter no-gutters">
                        <div class="col" style="min-width: 75%;">
                            <label class="form-control-label" data-toggle="modal" data-target="#modalWSDL">
                                <b class="control-label">질문제목</b>
                                <input type="text" class="form-control" placeholder="제목은 필수입력사항입니다." v-model="title">
                            </label>
                        </div>
                        <div class="col">
                            <label class="form-control-label label-select">
                                <b class="control-label" label for="status">처리상태</b>
                                <select class="form-control selectpicker" title="선택하세요" v-model="status">
                                    <option selected value="">전체</option>
                                    <option value="SS">완료</option>
                                    <option value="NN">미완료</option>
                                    <option value="RQ">재질문</option>
                                    <option value="">보류</option>
                                </select>
                            </label>
                        </div>
                        <div class="col-auto">
                            <button type="submit" @onClick="onSubmit" class="btn btn-primary"><i class="icon-srch"></i>조회</button>
                        </div>
                    </div>
                    <div class="filter no-gutters">
                        <div class="col">
                            <label class="form-control-label label-select">
                                <b class="control-label" label for="sortType">정렬기준</b>
                                <select class="form-control selectpicker" select name="sortType" id="sortType" v-model="sortType">
                                    <option selected value="">경과일</option>
                                    <option value="SS">완료</option>
                                    <option value="NN">미완료</option>
                                    <option value="RQ">재질문</option>
                                </select>
                            </label>
                        </div>
                        <div class="col">
                            <label class="form-control-label" data-toggle="modal" data-target="#modalWSDL">
                                <b class="control-label">태그</b>
                                <input type="text" class="form-control" placeholder="#01" v-model="tag_tag">
                            </label>
                        </div>
                        <div class="col">
                            <label class="form-control-label" data-toggle="modal" data-target="#modalWSDL">
                                <b class="control-label">애러코드</b>
                                <input type="text" class="form-control" placeholder="입력하세요" v-model="tag_erc">
                            </label>
                        </div>
                        <div class="col">
                            <label class="form-control-label" data-toggle="modal" data-target="#modalWSDL">
                                <b class="control-label">예외</b>
                                <input type="text" class="form-control" placeholder="예외종류를 입력하세요." v-model="tag_ert">
                            </label>
                        </div>
                    </div>
                </div>
                </form>
            </div>
    </div>
</template>

<script>
import { srchList } from '@/api/knm/Question.js'

export default {
  data: () => {
    return {
      title: '',
      status: '',
      sortType: '',
      tag_tag: '',
      tag_erc: '',
      tag_ert: '',
      solution_name: '',
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
