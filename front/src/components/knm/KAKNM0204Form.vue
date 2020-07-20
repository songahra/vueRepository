<template>
    <div>
        <div class="container" style="margin-top:100px">
            <form id="KAKNM0204Form" @submit.prevent="onSubmit" class="form">
            <div class="card shadow">
                <div class="card-body">
                <h4 class="card-title">내가 답변한 질문</h4>
                </div>
                <div class="text-left">
                    <div class="form-group" style="resize: none;width: 526.66666px;">
                      <label for="title">질문 제목</label>
                      <input type="text" id="title" value="" v-model="title" class="form-control" rows="10" style="resize:none">

                    </div>
                    <div class="form-group" style="resize: none;width: 526.66666px;">
                      <label for="status">처리상태  :  </label>
                      <select name="status" id="status" v-model="status">
                          <option selected value="">처리상태</option>
                          <option value="SS">완료</option>
                          <option value="NN">미완료</option>
                          <option value="RQ">재질문</option>
                      </select>
                    </div>
                    <div>
                      <v-btn small color="primary" type="submit" >조회</v-btn>
                    </div>
                </div>
                <div>
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
            </div>
            </form>
        </div>
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
  methods: {
    async onSubmit () {
      const da = {
        params: {
          title: this.title,
          status: this.status,
          // user: this.$store.state.state.userid
          user: 'Auser4@inzent.com'
        }
      }
      const { data } = await getAnsList(da)
      this.lists = data
      this.makeData()
    },
    async getList () {
      const da = {
        params: {
          title: this.title,
          status: this.status,
          // user: this.$store.state.state.userid
          user: 'Auser4@inzent.com'
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
