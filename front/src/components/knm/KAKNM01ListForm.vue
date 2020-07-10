<!-- 기술문의 메인리스트 Form-->
<template>
    <div style="width: 70%; height:100%">
      <ag-grid-vue style="width: 100%; height: 550px;"
                   class="flex-grow-1 flex-shrink-1 ag-theme-alpine"
                   :columnDefs="columnDefs"
                   :rowData="rowData"
                   :gridOptions="gridOptions"
                   @gridReady="gridSizeFit"
                   @gridSizeChanged="gridSizeFit"
                   @cell-clicked="onCellClicked">
      </ag-grid-vue>
     </div>
</template>

<script>
import { mainList } from '@/api/Question.js'
import 'ag-grid-community/dist/styles/ag-grid.css'
import 'ag-grid-community/dist/styles/ag-theme-alpine.css'
import { AllCommunityModules } from '@ag-grid-community/all-modules'
import { AgGridVue } from 'ag-grid-vue'

export default {
  name: 'KAKNM01ListForm',
  components: {
    AgGridVue
  },
  porps: ['srchList'],
  data () {
    return {
      columnDefs: null,
      lists: [],
      rowData: [],
      modules: AllCommunityModules,
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
      { headerName: '글번호', colId: 0, valueGetter: (params) => { return params.node.rowIndex + 1 } },
      { headerName: '솔루션', field: 'solution_id', sortable: true, filter: true },
      { headerName: '질문제목', field: 'title', sortable: true, filter: true },
      { headerName: '질문자', field: 'reg_userid_tq', sortable: true, filter: true },
      { headerName: '질문일시', field: 'reg_date_tq', sortable: true, filter: true },
      { headerName: '답변자', field: 'reg_userid_ta', sortable: true, filter: true },
      { headerName: '답변일시', field: 'reg_date_ta', sortable: true, filter: true },
      { headerName: '경과시간', field: 'term', sortable: true, filter: true },
      { headerName: '처리상태', field: 'status', sortable: true, filter: true }
    ]
  },
  created () {
    console.log('created')
    this.getAllList()
  },
  methods: {
    // 초기 리스트
    async getAllList () {
      console.log('makeData')

      // this.lists.data = await getList()
      const data = await mainList()
      this.lists = data.data

      console.log('this.lists', this.lists)
      this.makeData()
      // .then(rowData => this.rowData = rowData);
      // .then((res) => console.log(res))
      // .catch(console.error())
      //     return this.rowData
    },
    // rowData에 리스트 매핑
    makeData () {
      console.log('makeData')
      console.log('makeData.this.lists', this.lists)
      console.log('makeData.this.rowData', this.rowData)
      this.lists.forEach(e => {
        const value = {
          solution_id: e.solution_id,
          title: e.title,
          reg_userid_tq: e.reg_userid_tq,
          reg_date_tq: e.reg_date_tq,
          reg_userid_ta: e.reg_userid_ta,
          reg_date_ta: e.reg_date_ta,
          term: e.term,
          status: e.status
        }
        this.rowData.push(value)
      })
    },
    // 조회된 리스트로 변환
    dataChange (srchData) {
      // 리스트 비움
      this.rowData = []

      // props로 받은 데이터 담기
      this.lists = srchData

      this.makeData()
    },
    // getRowNode (id) {
    //   return id.rowIndex + 1
    // },
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
    onCellClicked (event) { // 그리드 셀 클릭시 이벤트

    }
  }
}

</script>

<style lang="scss">
.ag-header-cell-label{
  justify-content: right
}
// .text-center{
//   justify-content: right
// }
// .text-center {
//   text-align: center;
// }
</style>
