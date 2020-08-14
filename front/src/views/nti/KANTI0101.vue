<template>
  <div id="wrap">
    <div id="ct">
      <section class="card">
        <header class="card-header">
          <h2 class="card-title">
            <span class="i-rounded bg-danger"><i class="icon-alarm" /></span>공지사항
          </h2>
          <div class="btn-container">
            <a
              href="/noticeWrite"
              class="btn btn-m"
            ><span class="hide">글쓰기</span></a>
          </div>
        </header>

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
              <div
                class="col"
                style="min-width: 70%;"
              >
                <label class="form-control-label">
                  <b class="control-label">제목</b>
                  <input
                    v-model="search_title"
                    type="text"
                    class="form-control"
                    placeholder="제목을 입력하세요."
                  >
                </label>
              </div>
              <div class="col">
                <label class="form-control-label label-select">
                  <b class="control-label">정렬</b>
                  <select
                    v-model="sortType"
                    class="form-control"
                    title="선택하세요"
                    readonly
                  >
                    <option value="1">최신순</option>
                    <option value="2">조회수순</option>
                    <option value="3">날짜순</option>
                  </select>
                </label>
              </div>
              <div class="col-auto">
                <button
                  type="button"
                  style="margin-left: 10px;"
                  class="btn btn-primary"
                  @click="onSubmit()"
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
                style="width: 100%; height: 520px;"
                class="flex-grow-1 flex-shrink-1 ag-theme-alpine"
                :column-defs="columnDefs"
                :row-data="rowData"
                :grid-ready="gridSizeFit"
                :grid-size-changed="gridSizeFit"
                :grid-options="gridOptions"
                :get-row-style="getRowStyle"
                @gridSizeChanged="gridSizeFit"
                @cell-clicked="onCellClicked"
              />
            </table>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
/* ag-grid */
import 'ag-grid-community/dist/styles/ag-grid.css'
import 'ag-grid-community/dist/styles/ag-theme-alpine.css'
import { AllCommunityModules } from '@ag-grid-community/all-modules'
import { AgGridVue } from 'ag-grid-vue'

import { selectNotice, searchNotice, plusCnt } from '@/api/nti/Notice.js'
import { userSolution } from '@/api/log/Login.js'

export default {
  components: {
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

      // 정렬 기준
      sortType: '',
      search_title: ''

    }
  },
  async created () {
    this.$store.commit('SET_DEPTH1', '공지사항')
    this.$store.commit('SET_DEPTH2', ' ')
    // console.log(param)
    const { data } = await selectNotice()
    console.log('리스트는?', data)
    this.lists = data
    this.lists.forEach(e => {
      const value = {
        title: e.title,
        solution_code: userSolution(e.solution_code), // solution code -> value 변환하는 함수
        user_name: e.user_name,
        hit: e.hit,
        file_count: e.file_count,
        reg_date: e.reg_date,
        notice_id: e.notice_id
      }
      this.rowData.push(value)
    })
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
      { headerName: '제목', field: 'title', sortable: true, filter: true },
      { headerName: '솔루션', field: 'solution_code', sortable: true, filter: true },
      { headerName: '작성자', field: 'user_name', sortable: true, filter: true },
      {
        headerName: '첨부',
        field: 'file_count',
        sortable: true,
        filter: true,
        cellRenderer: function (params) { // 첨부파일 아이콘 ( 첨부파일 수 ) 표시
          console.log('params', params.data.file_count)
          return '<span><i class="icon-link"></i>(' + (params.data.file_count) + ')</span>'
        }
      },
      { headerName: '작성일', field: 'reg_date', sortable: true, filter: true },
      { headerName: '조회수', field: 'hit', sortable: true, filter: true }
    ]
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

    // 가운데정렬
    getRowStyle: function (param) {
      return { 'text-align': 'center' }
    },
    onCellClicked (event) {
      console.log('제목을 클릭')
      console.log('제목을 클릭2', event)
      const param = {
        notice_id: event.data.notice_id
      }

      plusCnt(param) // 조회수 증가 함수

      this.$router.push({ name: 'noticeDetail', params: param })
    },

    async onSubmit () {
      const param = {
        search_title: this.search_title,
        sortType: this.sortType
      }

      // 리스트 비움
      this.rowData = []

      const { data } = await searchNotice(param)
      this.lists = data

      this.lists.forEach(e => {
        const value = {
          title: e.title,
          solution_code: userSolution(e.solution_code), // solution code -> value 변환하는 함수
          user_name: e.user_name,
          hit: e.hit,
          file_count: e.file_count,
          reg_date: e.reg_date,
          notice_id: e.notice_id
        }
        this.rowData.push(value)
      })
    }
  }

}
</script>

<style>
.ag-header-cell-label{
  justify-content: center
}
</style>
