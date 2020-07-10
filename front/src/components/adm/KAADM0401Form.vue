<template>
    <div>
        <div class="container" style="margin-top:100px">
            <form id="KAADM0401Form" @submit.prevent="onSubmit" class="form">
            <div class="card shadow">
                <div class="card-body">
                <h4 class="card-title">지식포인트</h4>
                    <div class="form-group" style="resize: none;width: 600px;">
                      <label for="customer">등록기간</label>
                      <v-text-field slot="activator" label="시작일" id="reg_date_start" value="" v-model="reg_date_start"></v-text-field>~

                      <v-text-field slot="activator" label="종료일" id="reg_date_end" value="" v-model="reg_date_end"></v-text-field>

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
                              :gridReady="gridSizeFit"
                              :gridOptions="gridOptions"
                              :get-row-style="getRowStyle"
                              @cell-clicked="onCellClicked"
                              @gridSizeChanged="gridSizeFit">
                  </ag-grid-vue>
                </div>
            </div>
            </form>
            <Modal
             :dialog="isDialog"
             :propsdata="params"
             @close="isDialog=false"
            />
        </div>
    </div>
</template>

<script>
import 'url-search-params-polyfill'
import 'ag-grid-community/dist/styles/ag-grid.css'
import 'ag-grid-community/dist/styles/ag-theme-alpine.css'

import Modal from '@/components/adm/KAADM0401POPForm'
// import { AgGridVue } from 'ag-grid-community'
import { getSolList, getSearchSolList } from '@/api/adm/Point.js'
import { AgGridVue } from 'ag-grid-vue'

export default {
  components: {
    Modal,
    AgGridVue
  },
  name: 'KAADM0401From',
  data: () => {
    return {
      reg_date_start: '',
      reg_date_end: '',
      lists: '',
      // grid
      columnDefs: null,
      rowData: [],
      gridOptions: null,
      // pop up
      isDialog: false,
      maxDate: new Date(),
      params: ''
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
      { headerName: '솔루션명', field: 'solution', sortable: true, filter: true },
      { headerName: '질문', field: 'question', sortable: false, filter: true },
      { headerName: '답변', field: 'answer', sortable: false, filter: true },
      { headerName: '미해결', field: 'notSuccess', sortable: false, filter: true },
      { headerName: '평가', field: 'scoreCount', sortable: true, filter: true },
      { headerName: '평점', field: 'avgScore', sortable: true, filter: true },
      { headerName: '경과일', field: 'dueDate', sortable: true, filter: true },
      { headerName: '지식포인트', field: 'point', sortable: true, filter: true }
    ]
  },
  methods: {
    async onSubmit () {
      const a = {
        params: {
          reg_date_start: this.reg_date_start,
          reg_date_end: this.reg_date_end
        }
      }
      const { data } = await getSolList(a)
      this.lists = data
      this.makeData()
    },
    searchPoint (solution, t) {
      var s = solution
      var type = t
      const da = {
        params: {
          reg_date_start: this.reg_date_start,
          reg_date_end: this.reg_date_end,
          solution: s,
          type: type
        }
      }
      const data = getSearchSolList(da)
      this.params = data.data
      this.makeData()
      console.log(this.isDialog)
      console.log(this.params)
      this.isDialog = true
    },
    // Ag-Grid를 만들어보자
    async getList () {
      console.log('getList')
      const a = {
        params: {
          reg_date_start: this.reg_date_start,
          reg_date_end: this.reg_date_start
        }
      }

      const data = await getSolList(a)
      console.log('data.data', data.data)
      this.lists = data.data
      console.log('this.lists', this.lists)
      this.makeData()
    },
    makeData () {
      this.rowData = []
      console.log('makeData << SOL >>')
      this.lists.forEach(e => {
        const value = {
          solution: e.solution,
          question: e.question,
          answer: e.answer,
          notSuccess: e.notSuccess,
          scoreCount: e.scoreCount,
          avgScore: e.avgScore,
          dueDate: e.dueDate,
          point: e.point
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
    onCellClicked (event) { // 그리드 셀 클릭시 이벤트

    },
    getRowStyle: function (param) {
      return { 'text-align': 'center' }
    }
  },
  created () {
    console.log('main created!!')
    this.getList()
  }
}
</script>

<style>
.ag-header-cell-label{
  justify-content: center
}
</style>
