<template>
  <div id="ct">
    <section class="card">
      <header
        class="card-header"
        style="padding: 1.6rem 1rem;"
      >
        <h2 class="card-title">
          <span class="i-rounded bg-danger"><i class="icon-user" /></span>지식 포인트
        </h2>
      </header>
      <div class="card-body">
        <v-row
          style="
        padding-left: 10px;"
        >
          <h6>{{ this.$store.state.username }}</h6> 님께서 <h6> {{ now }} </h6>  까지 누적한 지식 포인트 입니다.
        </v-row>
        <v-row
          style="
        padding-left: 10px;"
        >
          이 달 누적 지식 포인트 : {{ month_total_point }}

          총 누적 지식 포인트 : {{ total_point }}
        </v-row>
        <v-spacer /><v-spacer />
        <h5>월별 지식 포인트</h5>
        <v-row>
          <v-subheader
            style="
    padding-left: 20px;
    padding-top: 5px;"
          >
            기간선택
          </v-subheader>
          <date-picker
            v-model="range"
            style="
    padding-top: 10px;
"
            :lang="lang"
            range
            type="date"
            format="YYYY-MM-DD"
            width="500"
            confirm
            @change="updateDate"
          />
          <v-btn
            dark
            tile
            class=" btn btn-primary ma-2"
            style="
    margin-top: 8px;
    margin-left: 5px;
"
            @click="formSubmit"
          >
            <i class="icon-srch" />
            조회
          </v-btn>
        </v-row>

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
      </div>
    </section>
  </div>
</template>

<script>
import DatePicker from 'vue2-datepicker'
import moment from 'moment'
import 'vue2-datepicker/index.css'
import { selectMonthPoint, selectTotalPoint } from '@/api/Profile.js'
/* ag-grid */
import 'ag-grid-community/dist/styles/ag-grid.css'
import 'ag-grid-community/dist/styles/ag-theme-alpine.css'
import { AllCommunityModules } from '@ag-grid-community/all-modules'
import { AgGridVue } from 'ag-grid-vue'

// confirm 있어야 ok버튼
export default {
  components: {
    DatePicker,
    AgGridVue
  },
  data: () => {
    return {
      // ag-grid
      modules: AllCommunityModules,
      lists: [],
      columnDefs: null,
      rowData: [],
      gridOptions: null,

      total_point: '',
      month_total_point: '',
      range: '',
      endDate: '',
      startDate: '',
      now: '',
      month: '',
      // custom :lang="lang"
      lang: {
        days: ['일', '월', '화', '수', '목', '금', '토', '일'],
        daysMin: ['일', '월', '화', '수', '목', '금', '토', '일'],
        months: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
        monthsShort: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
        monthNamesShort: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
        monthNames: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월']
      },
      DatePickerFormat: 'YYYY-MM-DD hh:mm'
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
    this.time()
    var moment = require('moment')
    moment.locale('ko') // 언어팩 변경
    this.now = moment().format('YYYY-MM-DD HH:mm')
    this.month = moment().format('MM')

    // "1 시간 전"
    const userId = {
      user_id: this.$store.state.userid,
      month: this.month
    }
    console.log(userId)
    const { data } = await selectTotalPoint(userId)
    console.log('data', data)
    this.total_point = data.total_point
    this.month_total_point = data.month_total_point
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

    updateDate () {
      console.log('updateDate함수실행')
      console.log(moment(new Date(this.date)).format('YYYY-MM-DD'))

      console.log(this.startDate = moment(this.range[0]).format('YYYY-MM-DD'))
      this.startDate = moment(this.range[0]).format('YYYY-MM-DD')
      console.log(typeof (this.startDate = moment(this.range[0]).format('YYYY-MM-DD'))) // string
      this.endDate = moment(this.range[1]).format('YYYY-MM-DD')
      console.log('this.endDate' + this.endDate)
      console.log(this.endDate = moment(this.range[1]).format('YYYY-MM-DD'))
    },
    async formSubmit () {
      this.rowData = []
      console.log('formSubmit함수 실행')
      const userData = {
        user_id: this.$store.state.userid,
        start_date: this.startDate,
        end_date: this.endDate
      }

      console.log(userData)

      const { data } = await selectMonthPoint(userData)
      console.log(data)
      this.lists = data
      console.log(this.lists)
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
