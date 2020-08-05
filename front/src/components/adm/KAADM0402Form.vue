<template>
  <div id="ct">
    <section class="card">
      <header class="card-header">
                <h2 class="card-title text-tertiary"><span class="i-rounded bg-danger"><i class="icon-set"></i></span><a href="solList">솔루션</a></h2>
                <h2 class="card-title text-pad">|</h2>
                <h2 class="card-title">사용자</h2>
            </header>
      <div class="ct-header">
          <button type="button" class="btn-filter collapsed d-xl-none" data-toggle="collapse" data-target="#collapse-filter">검색 필터<i class="icon-down"></i></button>
          <div id="collapse-filter" class="collapse collapse-filter">
              <div class="filter no-gutters">
                  <div class="col">
                      <label class="form-control-label">
                          <b class="control-label">등록기간</b>
                          <input id="datePicker" type="text" class="form-control input-daterange">
                      </label>
                  </div>
                  <div class="col-auto">
                      <button type="button" class="btn btn-primary" @click="onSubmit"><i class="icon-srch"></i>조회</button>
                  </div>
              </div>
          </div>
      </div>
      <div class="ct-content">
        <v-app id="app">
        <ag-grid-vue style="width: 100%; height:550px;"
                    class="flex-grow-1 flex-shrink-1 ag-theme-alpine"
                    :columnDefs="columnDefs"
                    :rowData="rowData"
                    :grid-options="gridOptions"
                    :get-row-style="getRowStyle"
                    :grid-size-changed="gridSizeFit"
                    :grid-ready="gridSizeFit"
                    :tooltipShowDelay="tooltipShowDelay"
                    @cell-clicked="onCellClicked"
                    @gridReady="gridSizeFit"
                    @gridSizeChanged="gridSizeFit">
        </ag-grid-vue>
        <Modal2
        :dialog="isDialog"
        :propsdata="params"
        ref="popup"
        @close="isDialog=false"
        />
        </v-app>
      </div>

    </section>

  </div>

</template>

<script>
import 'ag-grid-community/dist/styles/ag-grid.css'
import 'ag-grid-community/dist/styles/ag-theme-alpine.css'
/* daterangepicker */
import '@/assets/vendor/daterangepicker/daterangepicker.min.js'
import '@/assets/vendor/daterangepicker/daterangepicker.min.css'
import '@/assets/vendor/daterangepicker/moment.min.js'

import Modal2 from '@/components/adm/KAADM0402POPForm'
import { getUserList, getSearchUserList } from '@/api/adm/Point.js'
import { AgGridVue } from 'ag-grid-vue'

/* jQuery 사용 */
global.jQuery = require('jquery')
var $ = global.jQuery
window.$ = $

export default {
  components: {
    Modal2,
    AgGridVue
  },
  name: 'KAADM0402From',
  data: () => {
    return {
      lists: '',
      userid: '',
      // grid
      columnDefs: null,
      rowData: [],
      gridOptions: null,
      // pop up
      isDialog: false,
      maxDate: new Date(),
      params: '',
      // tooltip
      tooltipShowDelay: null,
      frameworkComponents: null,
      // date picker
      startDate: '',
      endDate: '',
      now: '',
      range: ''
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
      {
        headerName: '사용자',
        field: 'userName',
        sortable: true,
        filter: true,
        tooltipField: 'userInfo'
      },
      { headerName: '질문', field: 'question', sortable: true, filter: true },
      { headerName: '답변', field: 'answer', sortable: true, filter: true },
      { headerName: '평가', field: 'scoreCount', sortable: true, filter: true },
      { headerName: '평점(평균)', field: 'avgScore', sortable: true, filter: true },
      { headerName: '지식포인트', field: 'point', sortable: true, filter: true }
    ]
    this.tooltipShowDelay = 0
  },
  created () {
    console.log('main created!!')
    this.time()
    var moment = require('moment')
    moment.locale('ko') // 언어팩 변경
    this.now = moment().format('YYYY-MM-DD HH:mm') // 현재 시간
    this.month = moment().format('MM') // 현재 월
    this.getList()
  },
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
    async onSubmit () {
      const a = {
        params: {
          reg_date_start: this.startDate,
          reg_date_end: this.endDate
        }
      }
      const { data } = await getUserList(a)
      this.lists = data
      this.makeData()
    },
    async getList () {
      const a = {
        params: {
          reg_date_start: this.startDate,
          reg_date_end: this.endDate
        }
      }
      const { data } = await getUserList(a)
      this.lists = data
      this.makeData()
    },
    makeData () {
      this.rowData = []
      console.log('지식포인트 row Data', this.rowData)
      this.lists.forEach(e => {
        const value = {
          userName: e.userName,
          question: e.question,
          answer: e.answer,
          scoreCount: e.scoreCount,
          avgScore: e.avgScore,
          dueDate: e.dueDate,
          point: e.point,
          userid: e.user_id,
          userDept: e.userDept,
          userInfo: '아이디 : ' + e.user_id + ' / 부서 : ' + e.userDept
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
    },
    async onCellClicked (event) {
      if ((event.colDef.field === 'question') || (event.colDef.field === 'answer') || (event.colDef.field === 'scoreCount')) {
        console.log('clicked info ! : ', event.colDef.field)
        console.log('event : ', event)
        const data = {
          params: {
            user: event.data.userid,
            type: event.colDef.field,
            reg_date_start: this.startDate,
            reg_date_end: this.endDate
          }
        }
        const popData = await getSearchUserList(data)
        this.$refs.popup.popupData(popData)
        this.isDialog = true
      }
    },
    time () {
      const date = new Date()
      this.now = date.getDate
      console.log(this.now)
    }
  }
}
</script>
<style>
.ag-header-cell-label{
  justify-content: center
}
</style>
