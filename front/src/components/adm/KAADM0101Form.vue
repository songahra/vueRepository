<!-- 프로젝트 관리 Form -->
<template>
    <div>
           <header class="card-header">
                <h2 class="card-title"><span class="i-rounded bg-danger"><i class="icon-set"></i></span>프로젝트</h2>
            </header>
            <div class="ct-header">
                <button type="button" class="btn-filter collapsed d-xl-none" data-toggle="collapse" data-target="#collapse-filter">검색 필터<i class="icon-down"></i></button>
                <div id="collapse-filter" class="collapse collapse-filter">
                    <div class="filter no-gutters">
                        <div class="col">
                            <label class="form-control-label">
                                <b class="control-label">프로젝트 명</b>
                                <input type="text" class="form-control" v-model="project_name" placeholder="프로젝트 명을 입력하세요.">
                            </label>
                        </div>
                        <div class="col">
                            <label class="form-control-label label-select">
                                <b class="control-label">최종고객</b>
                                <input type="text" class="form-control" v-model="customer" placeholder="최종고객을 입력하세요.">
                            </label>
                        </div>
                        <div class="col">
                            <label class="form-control-label">
                                <b class="control-label">기간</b>
                                <input id="datePicker" type="text" class="form-control input-daterange">
                            </label>
                        </div>
                        <div class="col-auto">
                            <button type="submit" class="btn btn-primary"><i class="icon-srch"></i>조회</button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="ct-content">
                <ag-grid-vue style="width: 100%; height: 650px;"
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
</template>
<script>
/* AgGridVue */
import 'ag-grid-community/dist/styles/ag-grid.css'
import 'ag-grid-community/dist/styles/ag-theme-alpine.css'
import { AgGridVue } from 'ag-grid-vue'

/* daterangepicker */
import '@/assets/vendor/daterangepicker/daterangepicker.min.js'
import '@/assets/vendor/daterangepicker/daterangepicker.min.css'
import '@/assets/vendor/daterangepicker/moment.min.js'

import { getPjList, srchPjList } from '@/api/adm/Project.js'
import { AllCommunityModules } from '@ag-grid-community/all-modules'

/* jQuery 사용 */
global.jQuery = require('jquery')
var $ = global.jQuery
window.$ = $

export default {
  name: 'KAKNM0103From',
  components: {
    AgGridVue
  },
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

      // date picker
      startDate: '',
      endDate: '',
      range: '',
      now: ''
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
  created () {
    this.time()
    var moment = require('moment')
    moment.locale('ko') // 언어팩 변경
    this.now = moment().format('YYYY-MM-DD HH:mm') // 현재 시간
    this.month = moment().format('MM') // 현재 월
  },
  mounted () {
    console.log('mounted!!')

    // 서버요청
    getPjList()
      .then((res) => {
        this.lists = res.data
        this.makeData()
        return res
      })
      .then((res) => console.log(res))
      .catch(console.error())
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
    // 조회
    onSubmit () {
      this.lists = []
      this.rowData = []
      const srchData = {
        project_id: this.project_id,
        project_name: this.project_name,
        customer: this.customer,
        startDate: this.startDate,
        endDate: this.endDate
      }
      console.log('srchData', srchData)

      // 서버요청
      srchPjList(srchData)
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
    // 그리드 사이즈
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
