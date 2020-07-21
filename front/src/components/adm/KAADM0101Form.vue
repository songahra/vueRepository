<!-- 프로젝트 관리 Form -->
<template>
    <div style="width: 100%; height:100%">
        <div class="container" style="margin-top:100px">
            <form id="KAKNM0103From" @submit.prevent="onSubmit" class="form">
            <div class="card shadow">
                <div class="card-body">
                <h4 class="card-title">프로젝트</h4>
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
                    <div>
                    <v-btn small color="primary" type="submit">조회</v-btn>
                    </div>
                </div>
                <div style="width: 100%; height:100%">
                    <ag-grid-vue style="width: 80%; height: 650px;"
                                 class="flex-grow-1 flex-shrink-1 ag-theme-alpine"
                                :columnDefs="columnDefs"
                                :rowData="rowData"
                                :gridOptions="gridOptions"
                                @getRowStyle="getRowStyle"
                                @gridReady="gridSizeFit"
                                @gridSizeChanged="gridSizeFit">
                    </ag-grid-vue>
                 </div>
            </div>
            </form>
        </div>
    </div>
</template>
<!-- Bootstrap CDN -->
<script>
import { getPrList, srchPrList } from '@/api/knm/Question.js'
import 'ag-grid-community/dist/styles/ag-grid.css'
import 'ag-grid-community/dist/styles/ag-theme-alpine.css'
import { AllCommunityModules } from '@ag-grid-community/all-modules'
import { AgGridVue } from 'ag-grid-vue'

export default {
  name: 'KAKNM0103From',
  components: {
    AgGridVue
  },
  props: ['dialog'],
  data: () => {
    return {
      // gridOptions
      columnDefs: null,
      lists: [],
      rowData: [],
      modules: AllCommunityModules,
      gridOptions: null,

      // form id
      checked_id: '',
      project_id: '',
      project_name: '',
      customer: '',
      term: '',
      reg_date: '',
      reg_date_st: '',
      reg_date_ed: '',
      checked: false, // 체크박스
      maxDate: new Date() // 데이트피커 날짜 max
    }
  },
  beforeMount () {
    this.gridOptions = {
      // enableColResize: true,
      // enableSorting: true,
      // enableFilter: true,
      // animateRows: false,
      pagination: true,
      paginationPageSize: 10
    }
    this.columnDefs = [
      { headerName: '프로젝트 ID', field: 'project_id', sortable: true, filter: true },
      { headerName: '프로젝트 명', field: 'project_name', sortable: true, filter: true },
      { headerName: '고객사', field: 'customer', sortable: true, filter: true },
      { headerName: '프로젝트 기간', field: 'term', sortable: true, filter: true }
    ]
  },
  mounted () {
    console.log('mounted!!')

    // 서버요청
    getPrList()
      .then((res) => {
        this.lists = res.data
        this.makeData()
        return res
      })
      .then((res) => console.log(res))
      .catch(console.error())
  },
  methods: {
    // 조회
    onSubmit () {
      this.lists = []
      this.rowData = []
      const srchData = {
        project_id: this.project_id,
        project_name: this.project_name,
        customer: this.customer
      }
      console.log('srchData', srchData)

      // 서버요청
      srchPrList(srchData)
        .then((res) => {
          console.log('2. rowData : ', this.rowData)
          this.lists = res.data
          console.log('2. this.lists : ', this.lists)
          this.makeData()
          return res
        })
        .then((res) => console.log(res))
        .catch(console.error())
    },

    // rowData에 리스트 매핑
    makeData () {
      console.log('makeData')
      console.log('makeData.this.lists', this.lists)
      console.log('makeData.this.rowData', this.rowData)
      this.lists.forEach(e => {
        const value = {
          project_id: e.project_id,
          project_name: e.project_name,
          customer: e.customer,
          term: e.term
        }
        this.rowData.push(value)
      })
    },
    gridSizeFit (params) {
      console.log('gridSizeFit')
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

  }
}
</script>

<style scoped>
</style>
