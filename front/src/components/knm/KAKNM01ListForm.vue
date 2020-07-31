<!-- 기술문의 메인리스트 Form-->
<template>
    <div class="ct-content">
        <div style="width: 100%; height:100%">
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
    </div>
</template>

<script>
import 'ag-grid-community/dist/styles/ag-grid.css'
import 'ag-grid-community/dist/styles/ag-theme-alpine.css'
import { AgGridVue } from 'ag-grid-vue'
import { AllCommunityModules } from '@ag-grid-community/all-modules'
import { mainList, getMyList } from '@/api/knm/Question.js'

export default {
  name: 'KAKNM01ListForm',
  components: {
    AgGridVue
  },
  props: ['srchList', 'sendData'],
  data () {
    return {
      userid: this.$store.state.userid,
      flag: '',
      columnDefs: null,
      lists: [],
      rowData: [],
      gridOptions: null,
      gridApi: null,
      columnApi: null,
      defaultColDef: null,
      rowModelType: null,
      paginationPageSize: null,
      cacheBlockSize: null,
      modules: [AllCommunityModules]
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
      { headerName: '솔루션', field: 'solution_name', sortable: true, filter: true },
      { headerName: '질문제목', field: 'title', sortable: true, filter: true },
      { headerName: '질문자', field: 'reg_userName_tq', sortable: true, filter: true },
      { headerName: '질문일시', field: 'reg_date_tq', sortable: true, filter: true },
      { headerName: '답변자', field: 'reg_userName_ta', sortable: true, filter: true },
      { headerName: '답변일시', field: 'reg_date_ta', sortable: true, filter: true },
      { headerName: '경과시간', field: 'term', sortable: true, filter: true },
      { headerName: '처리상태', field: 'status', sortable: true, filter: true },
      { headerName: 'qusetion_id', field: 'question_id', sortable: true, filter: true, hide: true },
      { headerName: '질문자 id', field: 'reg_userid', sortable: true, filter: true, hide: true },
      { headerName: '답변 id', field: 'answer_id', sortable: true, filter: true, hide: true }
    ]
  },
  created () {
    console.log('created')
    const flag = this.sendData
    if (flag === 'mL') {
      this.myList()
    } else {
      this.getAllList()
    }
  },
  methods: {
    /* 초기 전체 리스트 */
    async getAllList () {
      console.log('makeData')

      const data = await mainList()
      this.lists = data.data

      console.log('this.lists', this.lists)
      this.makeData()
    },
    /* 지식관리 리스트 조회 */
    allListChange (srchData) {
      // 리스트 비움
      this.rowData = []

      // props로 받은 데이터 담기
      this.lists = srchData

      this.makeData()
    },
    /* 내가 문의한 질문 리스트 */
    myList () {
      const formData = {
        userid: this.userid
      }
      console.log('formData =>>>', formData)
      // 서버요청
      getMyList(formData) /* 에러처리 확인필요!! */
        .then((res) => {
          if (res.status === 200) {
            console.log('res => ', res)
            this.lists = res.data
            this.makeData()
          } else {
            alert('다시 시도해주세요.')
            // this.$router.go(-1)
          }
        })
      // .then((res) => console.log(res))
        .catch(console.error())
    },
    /* 내가 문의한 질문 조회 리스트 */
    srchMyList (srchData) {
      this.rowData = []
      this.lists = srchData
      this.makeData()
    },
    // getRowNode (id) {
    //   return id.rowIndex + 1
    // },
    /* rowData에 리스트 매핑 */
    makeData () {
      console.log('makeData')
      console.log('makeData.this.lists', this.lists)
      console.log('makeData.this.rowData', this.rowData)
      this.lists.forEach(e => {
        const value = {
          solution_name: e.solution_name,
          title: e.title,
          reg_userName_tq: e.reg_userName_tq,
          reg_date_tq: e.reg_date_tq,
          reg_userName_ta: e.reg_userName_ta,
          reg_date_ta: e.reg_date_ta,
          term: e.term,
          status: e.status,
          question_id: e.question_id,
          reg_userid: e.reg_userid
        }
        this.rowData.push(value)
      })
    },
    /* 그리드 반응형 사이즈 */
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
    /* 그리드 클릭 이벤트 */
    onCellClicked (event) {
      if (event.colDef.field === 'title') {
        console.log('ddd2')
        const params = {
          reg_userid: event.data.reg_userid,
          question_id: event.data.question_id,
          answer_id: event.data.answer_id
        }
        this.$router.push({ name: 'KAKNM0104Detail', params: params })
      } else {
        return event
      }
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
