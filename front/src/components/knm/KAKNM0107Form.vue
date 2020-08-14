<!-- 프로젝트 조회 From -->
<template>
  <section class="card">
    <header
      class="card-header"
      style="padding: 1.6rem 1rem;"
    >
      <h2 class="card-title">
        <span class="i-rounded bg-danger"><i class="icon-msg-text" /></span>내가 문의한 질문
      </h2>
    </header>
    <div class="ct-header">
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
            style="min-width: 80%;"
          >
            <label class="form-control-label">
              <b class="control-label">질문제목</b>
              <input
                v-model="title"
                type="text"
                class="form-control"
                placeholder="제목을 입력하세요"
              >
            </label>
          </div>
          <div class="col">
            <label class="form-control-label label-select">
              <b class="control-label">처리상태</b>
              <select
                v-model="status"
                class="form-control"
                placeholder="선택하세요"
              >
                <option value="">선택안함</option>
                <option value="SS">완료</option>
                <option value="NN">미완료</option>
                <option value="RQ">재질문</option>
              </select>
            </label>
          </div>
          <div class="col-auto">
            <button
              type="button"
              class="btn btn-primary"
              style="margin-left: 10px"
              @click.prevent="onSubmit()"
            >
              <i class="icon-srch" />조회
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { srchMyList } from '@/api/knm/Question.js'

export default {
  props: ['srchData'],
  data: () => {
    return {
      userid: '',
      title: '',
      status: '',
      sortType: '',
      lists: ''
    }
  },
  computed: {
    user_id: function () {
      return this.$store.state.userid
    }
  }, // methods
  mounted () {
    console.log('mounted!!')
  },
  methods: {
    async onSubmit () {
      console.log('onSubmit')
      const srchData = {
        userid: this.user_id,
        title: this.title,
        status: this.status
      }
      console.log('srchData', srchData)
      const { data } = await srchMyList(srchData)
      console.log('data : ', data)
      this.$emit('srchList', data)
    }

  }
}
</script>

<style>

</style>
