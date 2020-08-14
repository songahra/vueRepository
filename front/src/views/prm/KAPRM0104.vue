<template>
  <div id="ct">
    <section class="card">
      <header class="card-header">
        <a href="/profile">
          <h2 class="card-title text-tertiary">
            <span class="i-rounded bg-danger"><i class="icon-user" /></span>프로필관리
          </h2>
        </a>
        <h2 class="card-title text-tertiary text-pad">
          |
        </h2>
        <h2 class="card-title">
          지식포인트
        </h2>
      </header>
      <div class="card-info">
        <span><span class="alert-text"> {{ this.$store.state.username }} </span> 님께서 {{ now }} 까지 누적한 포인트입니다.</span>
        <div class="card-title">
          <span>이달의 누적 지식포인트 <span class="text-danger alert-text">{{ month_total_point }}</span></span>
          <span class="text-pad alert-text">|</span>
          <span>총 누적 지식포인트 <span class="text-danger alert-text">{{ total_point }}</span></span>
        </div>
      </div>
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
            <div class="col">
              <label class="form-control-label">
                <b class="control-label">등록기간</b>
                <input
                  id="datePicker"

                  type="text"
                  class="form-control input-daterange"
                >
              </label>
            </div>
            <div class="col-auto">
              <button
                type="button"
                class="btn btn-primary"
                @click="formSubmit"
              >
                <i class="icon-srch" />조회
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="ct-content">
        <div class="table-responsive">
          <table class="table">
            <ag-grid-vue
              style="width: 100%; height: 550px;"
              class="flex-grow-1 flex-shrink-1 ag-theme-alpine"
              :column-defs="columnDefs"
              :row-data="rowData"
              :grid-ready="gridSizeFit"
              :grid-size-changed="gridSizeFit"
              :grid-options="gridOptions"
              :get-row-style="getRowStyle"
              @gridSizeChanged="gridSizeFit"
            />
          </table>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { selectMonthPoint, selectTotalPoint } from '@/api/prm/Profile.js' // 사용자 총 누적 지식포인트 조회
import { expToken } from '@/api/log/Login.js'

/* ag-grid */
import 'ag-grid-community/dist/styles/ag-grid.css'
import 'ag-grid-community/dist/styles/ag-theme-alpine.css'
import { AllCommunityModules } from '@ag-grid-community/all-modules'
import { AgGridVue } from 'ag-grid-vue'

/* daterangepicker */
import '@/assets/vendor/daterangepicker/daterangepicker.min.js'
import '@/assets/vendor/daterangepicker/daterangepicker.min.css'
import '@/assets/vendor/daterangepicker/moment.min.js'

/* jQuery 사용 */
global.jQuery = require('jquery')
var $ = global.jQuery
window.$ = $

// confirm 있어야 ok버튼
export default {
  components: {
    AgGridVue
  },
  data: () => {
    return {
      // DatePicker
      startDate: '',
      endDate: '',

      // ag-grid
      modules: AllCommunityModules,
      lists: [],
      columnDefs: null,
      rowData: [],
      gridOptions: null,

      total_point: '',
      month_total_point: '',
      now: '',
      month: ''
    }
  },
  beforeMount () {
    this.gridOptions = {
      enableColResize: true,
      enableSorting: true,
      enableFilter: true,
      animateRows: false,
      pagination: true,
      paginationPageSize: 10,
      cellClass: 'grid-cell-centered'
    }
    this.columnDefs = [
      { headerName: '글번호', colId: 0, valueGetter: (params) => { return params.node.rowIndex + 1 } },
      { headerName: '일자', field: 'reg_date', sortable: true, filter: true },
      { headerName: '활동', field: 'code_value', sortable: true, filter: true },
      { headerName: '지식 포인트', field: 'point_value', sortable: true, filter: true },
      { headerName: '제목', field: 'title', sortable: true, filter: true }
    ]
  },
  async created () {
    const exp = this.$store.state.exp
    expToken(exp)

    this.$store.commit('SET_DEPTH1', '프로필관리')
    this.$store.commit('SET_DEPTH2', '지식포인트')

    this.time()
    var moment = require('moment')
    moment.locale('ko') // 언어팩 변경
    this.now = moment().format('YYYY-MM-DD HH:mm') // 현재 시간
    this.month = moment().format('MM') // 현재 월

    //
    const userId = {
      user_id: this.$store.state.userid,
      month: this.month
    }
    const { data } = await selectTotalPoint(userId) // // 사용자 총 누적 지식포인트 조회 함수
    this.total_point = data.total_point // 총 누적 지식포인트
    this.month_total_point = data.month_total_point // 이달의 누적 지식포인트
  },

  // ** daterangepicker jquery **
  mounted () {
    $('#demo').daterangepicker({
      locale: {
        format: 'MM/DD/YYYY',
        separator: ' - ',
        applyLabel: 'Apply',
        cancelLabel: 'Cancel',
        fromLabel: 'From',
        toLabel: 'To',
        customRangeLabel: 'Custom',
        weekLabel: 'W',
        daysOfWeek: [
          'Su',
          'Mo',
          'Tu',
          'We',
          'Th',
          'Fr',
          'Sa'
        ],
        monthNames: [
          'January',
          'February',
          'March',
          'April',
          'May',
          'June',
          'July',
          'August',
          'September',
          'October',
          'November',
          'December'
        ],
        firstDay: 1
      },
      startDate: '12/01/2016',
      endDate: '12/07/2016'
    }, function (start, end, label) {
    })
    $(() => {
      $('#datePicker').daterangepicker({
        timePicker: true,
        timePicker24Hour: true,
        timePickerSeconds: true,
        autoApply: true,
        locale: {
          format: 'YYYY.MM.DD HH:mm:ss',
          separator: ' ~ ',
          daysOfWeek: ['일', '월', '화', '수', '목', '금', '토'],
          monthNames: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월']
        }
      }, (start, end) => {
        this.startDate = start.format('YYYY-MM-DD')
        this.endDate = end.format('YYYY-MM-DD')
        console.log('this.startDate', this.startDate) // datePicker시작 날짜
        console.log('this.endDate', this.endDate) //  datePicker끝 날짜
      })
    })
  },
  methods: {
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
    // 지식 포인트 조회 클릭 했을 때 실행되는 함수
    async formSubmit () {
      this.rowData = []
      console.log('formSubmit함수 실행')
      const userData = {
        user_id: this.$store.state.userid,
        start_date: this.startDate,
        end_date: this.endDate
      }
      const { data } = await selectMonthPoint(userData)
      this.lists = data
      this.lists.forEach(e => {
        const value = {
          reg_date: e.reg_date,
          code_value: e.code_value,
          point_value: e.point_value,
          title: e.title
        }
        this.rowData.push(value)
      })
    },

    // 가운데정렬
    getRowStyle: function (param) {
      return { 'text-align': 'center' }
    },
    time () { // 현재 시각 구하는 함수
      const date = new Date()
      this.now = date.getDate
    }
  }
}
</script>
<style>
.ag-header-cell-label{
  justify-content: center
}
</style>
