<template>
<div id="ct">
  <section class="card">
    <div>
        <!-- <div class="container" style="margin-top:100px"> -->
            <form id="KAADM0402Form" @submit.prevent="onSubmit" class="form">
                <div class="card-body">
                <h4 class="card-title">지식포인트</h4>
                      <v-row>
                        <v-subheader style="padding-left: 20px; padding-top: 5px;">
                          기간선택
                        </v-subheader>
                        <date-picker
                          v-model="range"
                          style="padding-top: 10px;"
                          :lang="lang"
                          range
                          type="date"
                          format="YYYY-MM-DD"
                          width="500"
                          confirm
                          @change="updateDate"
                        />
                        <V-btn
                          color="indigo"
                          dark
                          tile
                          class="ma-2"
                          @click="onSubmit"
                          style="border-top-width: 10px;
                                    margin-top: 9px;
                                    margin-left: 5px;"
                        >
                          조회
                        </V-btn>
                      </v-row>
                </div>
                <div>
                  <v-app id="app">
                  <ag-grid-vue style="width: 100%; height:550px;"
                              class="flex-grow-1 flex-shrink-1 ag-theme-alpine"
                              :columnDefs="columnDefs"
                              :rowData="rowData"
                              :gridOptions="gridOptions"
                              :get-row-style="getRowStyle"
                              :tooltipShowDelay="tooltipShowDelay"
                              @cell-clicked="onCellClicked"
                              @gridReady="gridSizeFit"
                              @gridSizeChanged="gridSizeFit">
                  </ag-grid-vue>
                </v-app>
                </div>
            </form>
            <Modal2
              :dialog="isDialog"
              :propsdata="params"
              ref="popup"
              @close="isDialog=false"
            />
        <!-- </div> -->
    </div>
  </section>
</div>

</template>

<script>
import 'ag-grid-community/dist/styles/ag-grid.css'
import 'ag-grid-community/dist/styles/ag-theme-alpine.css'
import DatePicker from 'vue2-datepicker'
import moment from 'moment'
import 'vue2-datepicker/index.css'
import Modal2 from '@/components/adm/KAADM0402POPForm'
import { getUserList, getSearchUserList } from '@/api/adm/Point.js'
import { AgGridVue } from 'ag-grid-vue'

export default {
  components: {
    Modal2,
    DatePicker,
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
      range: '',
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
    moment.locale('ko')
    this.now = moment().format('YYYY-MM-DD HH:mm')
    // const userId = {
    //   user_id: this.$store.state.userid
    // }
    this.getList()
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
    },
    updateDate () {
      this.startDate = moment(this.range[0]).format('YYYY-MM-DD')
      this.endDate = moment(this.range[1]).format('YYYY-MM-DD')
    }
  }
}
</script>
<style>
.ag-header-cell-label{
  justify-content: center
}
</style>
