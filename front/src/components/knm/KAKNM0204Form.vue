<template>
  <div id="ct">
    <section class="card">
    <header class="card-header" style="padding: 1.6rem 1rem;">
      <h2 class="card-title"><span class="i-rounded bg-danger"><i class="icon-msg-text"></i></span>내가 답변한 질문</h2>
    </header>
    <div class="ct-header">
                <button type="button" class="btn-filter collapsed d-xl-none" data-toggle="collapse" data-target="#collapse-filter">검색 필터<i class="icon-down"></i></button>
                <div id="collapse-filter" class="collapse collapse-filter">
                    <div class="filter no-gutters">
                        <div class="col" style="min-width: 70%;">
                            <label class="form-control-label">
                                <b class="control-label">질문제목</b>
                                <input type="text" class="form-control" v-model="title" placeholder="제목을 입력하세요">
                            </label>
                        </div>
                        <div class="col">
                            <label class="form-control-label label-select">
                                <b class="control-label">처리상태</b>
                                <select class="form-control selectpicker" v-model="status" title="선택하세요">
                                    <option value="">선택안함</option>
                                    <option value="SS">완료</option>
                                    <option value="NN">미완료</option>
                                    <option value="RQ">재질문</option>
                                </select>
                            </label>
                        </div>
                        <div class="col-auto">
                            <button type="button" class="btn btn-primary" @click.prevent="onSubmit()"><i class="icon-srch"></i>조회</button>
                        </div>
                    </div>
                </div>
            </div>
      <div class="ct-content">
        <ag-grid-vue style="width: 100%; height:550px;"
                    class="flex-grow-1 flex-shrink-1 ag-theme-alpine"
                    :columnDefs="columnDefs"
                    :rowData="rowData"
                    :gridOptions="gridOptions"
                    :get-row-style="getRowStyle"
                    @gridReady="gridSizeFit"
                    @gridSizeChanged="gridSizeFit">
        </ag-grid-vue>
      </div>
    </section>
  </div>
</template>
<script>
import 'ag-grid-community/dist/styles/ag-grid.css'
import 'ag-grid-community/dist/styles/ag-theme-alpine.css'
import { getAnsList } from '@/api/knm/Answer.js'
import { AgGridVue } from 'ag-grid-vue'

export default {
  name: 'KAKNM0204From',
  components: {
    AgGridVue
  },
  data: () => {
    return {
      title: '',
      status: '',
      user: '',
      lists: '',
      // grid
      columnDefs: null,
      rowData: [],
      gridOptions: null
    }
  },
  beforeMount () {
    this.gridOptions = {
      enableColResize: true,
      enableSorting: true,
      enableFilter: true,
      animateRows: false,
      pagination: true,
      paginationPageSize: 10
    }
    this.columnDefs = [
      { headerName: '솔루션', field: 'solution', sortable: true, filter: true },
      { headerName: '질문제목', field: 'title', sortable: false, filter: true },
      { headerName: '질문자', field: 'quser', sortable: false, filter: true },
      { headerName: '질문일시', field: 'qdate', sortable: false, filter: true },
      { headerName: '답변자', field: 'auser', sortable: true, filter: true },
      { headerName: '답변일시', field: 'adate', sortable: true, filter: true },
      { headerName: '경과일', field: 'term', sortable: true, filter: true },
      { headerName: '처리상태', field: 'status', sortable: true, filter: true }
    ]
  },
  computed: {
    user_id () {
      return this.$store.state.userid
    }
  },
  methods: {
    async onSubmit () {
      const da = {
        params: {
          title: this.title,
          status: this.status,
          user: this.$store.state.userid
        }
      }
      const { data } = await getAnsList(da)
      this.lists = data
      this.makeData()
    },
    async getList () {
      console.log('get Answer List')
      console.log('store ', this.$store)
      console.log('user : ', this.$store.state.userid)
      const da = {
        params: {
          title: this.title,
          status: this.status,
          user: this.$store.state.userid
        }
      }
      const { data } = await getAnsList(da)
      this.lists = data
      this.makeData()
    },
    makeData () {
      this.rowData = []
      console.log('makeData << My Answer List >>')
      this.lists.forEach(e => {
        const value = {
          solution: e.solution_code,
          title: e.title,
          quser: e.reg_userid_tq,
          qdate: e.reg_date_tq,
          auser: e.reg_userid_ta,
          adate: e.reg_date_ta,
          term: e.term,
          status: e.status
        }
        this.rowData.push(value)
      })
    },
    gridSizeFit (params) {
      // 모니터나 브라우저 크기에 따라 반응하여 그리드 컬럼 사이즈를 조정
      if (window.innerWidth > 800) { // 화면 가로가 800 px 이 넘을 경우
        console.log('innerWidth')
        params.api.sizeColumnsToFit() // 가로 스크롤바가 생기지 않도록 컬럼 사이즈를 그리드에 꼭 맞게 조정
      } else {
      // 컬럼의 데이터값이 잘리지 않도록 조정
        const allColumnIds = []
        this.gridOptions.columnApi.getAllColumns().forEach(function (column) {
          allColumnIds.push(column.colId)
        })
        this.gridOptions.columnApi.autoSizeColumns(allColumnIds)
      }
    },
    getRowStyle: function (param) {
      return { 'text-align': 'center' }
    }
  },
  created () {
    this.getList()
  }

}
</script>
<style>
.ag-header-cell-label{
  justify-content: center
}
</style>
