<template>
    <div>
        <div class="container" style="margin-top:100px">
            <form id="KAADM0401Form" @submit.prevent="onSubmit" class="form">
            <div class="card shadow">
                <div class="card-body">
                <h4 class="card-title">지식포인트</h4>
                    <div class="form-group" style="resize: none;width: 600px;">
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
                        >
                          조회
                        </V-btn>
                      </v-row>
                    </div>

                </div>
                <div>
                  <ag-grid-vue style="width: 100%; height:550px;"
                              class="flex-grow-1 flex-shrink-1 ag-theme-alpine"
                              :columnDefs="columnDefs"
                              :rowData="rowData"
                              :gridOptions="gridOptions"
                              :get-row-style="getRowStyle"
                              @cell-clicked="onCellClicked"
                              @gridReady="gridSizeFit"
                              @gridSizeChanged="gridSizeFit">
                  </ag-grid-vue>
                </div>
            </div>
            </form>
            <Modal
             :dialog="isDialog"
             :propsdata="params"
             ref="popup"
             @close="isDialog=false"
            />
        </div>
    </div>
</template>

<script>
import 'url-search-params-polyfill'
import 'ag-grid-community/dist/styles/ag-grid.css'
import 'ag-grid-community/dist/styles/ag-theme-alpine.css'
import DatePicker from 'vue2-datepicker'
import 'vue2-datepicker/index.css'
import moment from 'moment'

import Modal from '@/components/adm/KAADM0401POPForm'
import { getSolList, getSearchSolList } from '@/api/adm/Point.js'
import { AgGridVue } from 'ag-grid-vue'

export default {
  components: {
    Modal,
    DatePicker,
    AgGridVue
  },
  name: 'KAADM0401From',
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
      // date picker
      startDate: '',
      endDate: '',
      range: '',
      now: '',
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
      const { data } = await getSolList(a)
      this.lists = data
      this.makeData()
    },
    // Ag-Grid를 만들어보자
    async getList () {
      console.log('getList')
      const a = {
        params: {
          reg_date_start: this.startDate,
          reg_date_end: this.endDate
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
    updateDate () {
      this.startDate = moment(this.range[0]).format('YYYY-MM-DD')
      this.endDate = moment(this.range[1]).format('YYYY-MM-DD')
    },
    async onCellClicked (event) { // 그리드 셀 클릭시 이벤트
      // 그리드 셀 클릭시 이벤트
      if ((event.colDef.field === 'question') || (event.colDef.field === 'answer') || (event.colDef.field === 'notSuccess')) {
        console.log('1 onCellClicked')
        console.log('event', event)
        console.log('제발', event.colDef.field)
        const data = {
          params: {
            solution: event.data.solution,
            type: event.colDef.field,
            reg_date_start: this.startDate,
            reg_date_end: this.endDate
          }
        }
        console.log('main data : ', data)
        const popData = await getSearchSolList(data)
        console.log('main popData : ', popData)
        this.$refs.popup.popupData(popData)
        this.isDialog = true
      }
    },
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
