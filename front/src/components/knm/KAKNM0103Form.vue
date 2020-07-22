<!-- 프로젝트 조회 Form -->
<template>
<div id="modal5" class="modal fade show" tabindex="-1"  style="display: block;" aria-modal="true" role="dialog">
  <form id="KAKNM0103From" @submit.prevent="onSubmit" class="form">
    <input type="hidden" id="project_id"  name="project_id" v-model="project_id"/>
  <div class="modal-dialog modal-dialog-centered modal-lg modal-dialog-scrollable">
   <div class="modal-content">
      <div class="modal-header">
        <h2 class="modal-title">기술문의</h2>
        <button type="button" class="btn-icon" data-dismiss="modal" aria-label="Close" @click="close"><i class="icon-close"></i></button>
      </div>
      <div class="modal-body modal-body-ct">
        <div class="ct-header">
          <button type="button" class="btn-filter collapsed d-xl-none" data-toggle="collapse" data-target="#collapse-filter-service">검색 필터<i class="icon-down"></i></button>
          <div id="collapse-filter-service" class="collapse collapse-filter">
            <div class="filter no-gutters">
              <div class="col">
                <label class="form-control-label">
                  <b class="control-label">프로젝트명</b>
                  <input type="text" class="form-control" v-model="project_name" placeholder="프로젝트명을 입력하세요.">
              </label>
              </div>
              <div class="col">
                <label class="form-control-label">
                  <b class="control-label">최종고객</b>
                  <input type="text" class="form-control" v-model="customer" placeholder="최종고객을 입력하세요.">
                </label>
              </div>
              <div class="col-auto">
                <button type="submit" class="btn btn-primary" ><i class="icon-srch"></i>조회</button>
              </div>
            </div>
          </div>
        </div>
        <div class="ct-content">
          <div class="table-responsive">
                <div style="width: 100%; height:100%">
                    <ag-grid-vue style="width: 100%; height: 650px;"
                                 class="flex-grow-1 flex-shrink-1 ag-theme-alpine"
                                :columnDefs="columnDefs"
                                :rowData="rowData"
                                :gridOptions="gridOptions"
                                @getRowStyle="getRowStyle"
                                @gridReady="gridSizeFit"
                                @gridSizeChanged="gridSizeFit"
                                @cell-clicked="onCellClicked">
                    </ag-grid-vue>
                 </div>
          </div>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn" @click="close" data-dismiss="modal">취소</button>
        <button type="button" class="btn btn-primary" @click="close">확인</button>
      </div>
    </div>
  </div>
  </form>
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

    // 팝업 닫기
    close () {
      console.log('child-close')
      this.$emit('close')
    },

    // 그리드 셀 클릭시 이벤트
    onCellClicked (event) {
      console.log('1 onCellClicked')
      console.log('event', event)

      const params = {
        project_id: event.data.project_id,
        project_name: event.data.project_name
      }
      console.log('1 params', params)
      this.$emit('checkedbtn', params)
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
