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
                    class="form-control selectpicker"
                    title="선택하세요"
                    readonly
                  >
                    <option value="">최신순</option>
                    <option value="">조회수순</option>
                    <option value="">날짜순</option>
                  </select>
                </label>
              </div>
              <div class="col-auto">
                <button
                  type="button"
                  class="btn btn-primary"
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
          <ul class="pagination">
            <li class="page-item">
              <a
                class="page-link page-link-prev"
                href="#"
              ><i class="icon-left" /></a>
            </li>
            <li class="page-item">
              <a
                class="page-link active"
                href="#"
              >1</a>
            </li>
            <li class="page-item">
              <a
                class="page-link"
                href="#"
              >2</a>
            </li>
            <li class="page-item">
              <a
                class="page-link"
                href="#"
              >3</a>
            </li>
            <li class="page-item">
              <a
                class="page-link page-link-next"
                href="#"
              ><span class="icon-right" /></a>
            </li>
          </ul>
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

import { selectNotice } from '@/api/nti/Notice.js'
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
      gridOptions: null

    }
  },
  async created () {
    const { data } = await selectNotice()
    console.log('리스트는?', data)
    this.lists = data
    this.lists.forEach(e => {
      const value = {
        title: e.title,
        solution_code: userSolution(e.solution_code), // solution code -> value 변환하는 함수
        reg_userid: e.reg_userid,
        hit: e.hit,
        file_count: e.file_count,
        reg_date: e.reg_date

      }
      this.rowData.push(value)
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

    // 가운데정렬
    getRowStyle: function (param) {
      return { 'text-align': 'center' }
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
      { headerName: '제목', field: 'title', sortable: true, filter: true },
      { headerName: '솔루션', field: 'solution_code', sortable: true, filter: true },
      { headerName: '작성자', field: 'reg_userid', sortable: true, filter: true },
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
  }

}
</script>

<style>

</style>
