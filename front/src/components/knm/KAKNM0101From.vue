<template>
  <div>
    <header
      class="card-header"
      style="padding: 1.6rem 1rem;"
    >
      <h2 class="card-title">
        <span class="i-rounded bg-danger"><i class="icon-result" /></span>지식 관리
      </h2>
      <div class="btn-container">
        <a
          href="/knm/quWrite"
          class="btn btn-m"
        ><span class="hide">기술문의</span></a>
      </div>
    </header>
    <div class="ct-header">
      <form
        id="KAKNM0101From"
        class="form"
        @submit.prevent="onSubmit"
      >
        <button
          type="button"
          class="btn-filter collapsed d-xl-none"
          data-toggle="collapse"
          data-target="#collapse-filter"
        >
          검색 필터<i class="icon-down" />
        </button>
        <div
          id="collapse-filter"
          class="collapse collapse-filter"
        >
          <div class="filter no-gutters">
            <div
              class="col"
              style="min-width: 75%;"
            >
              <label
                class="form-control-label"
                data-toggle="modal"
                data-target="#modalWSDL"
              >
                <b class="control-label">질문제목</b>
                <input
                  v-model="title"
                  type="text"
                  class="form-control"
                  placeholder="제목은 필수입력사항입니다."
                >
              </label>
            </div>
            <div class="col">
              <label class="form-control-label label-select">
                <b
                  class="control-label"
                  label
                  for="status"
                >처리상태</b>
                <select
                  v-model="status"
                  class="form-control"
                  title="선택하세요"
                >
                  <option
                    selected
                    value=""
                  >전체</option>
                  <option value="SS">완료</option>
                  <option value="NN">미완료</option>
                  <option value="RQ">재질문</option>
                  <option value="">보류</option>
                </select>
              </label>
            </div>
            <div class="col-auto">
              <button
                type="submit"
                style=" margin-left: 10px;"
                class="btn btn-primary"
                @onClick="onSubmit"
              >
                <i class="icon-srch" />조회
              </button>
            </div>
          </div>
          <div class="filter no-gutters">
            <div class="col">
              <label class="form-control-label label-select">
                <b
                  class="control-label"
                  label
                  for="sortType"
                >정렬기준</b>
                <select
                  id="sortType"
                  v-model="sortType"
                  class="form-control"
                  select
                  name="sortType"
                >
                  <option
                    selected
                    value=""
                  >선택</option>
                  <option value="1">경과일</option>
                  <option value="2">질문자</option>
                  <option value="3">답변자</option>
                  <option value="4">상태</option>
                </select>
              </label>
            </div>
            <div class="col">
              <label
                class="form-control-label"
                data-toggle="modal"
                data-target="#modalWSDL"
              >
                <b class="control-label">태그</b>
                <input
                  v-model="tag_tag"
                  type="text"
                  class="form-control"
                  placeholder="tag"
                >
              </label>
            </div>
            <div class="col">
              <label
                class="form-control-label"
                data-toggle="modal"
                data-target="#modalWSDL"
              >
                <b class="control-label">애러코드</b>
                <input
                  v-model="tag_erc"
                  type="text"
                  class="form-control"
                  placeholder="입력하세요"
                >
              </label>
            </div>
            <div class="col">
              <label
                class="form-control-label"
                data-toggle="modal"
                data-target="#modalWSDL"
              >
                <b class="control-label">예외</b>
                <input
                  v-model="tag_ert"
                  type="text"
                  class="form-control"
                  placeholder="예외종류를 입력하세요."
                >
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
  props: ['srchData'],
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
  mounted () {
    console.log('mounted!!')
  },
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
  }
}
</script>

<style>

</style>
