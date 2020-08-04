<template>
<!-- 지식자료실 리스트 -->
  <div id="ct">
    <section class="card">
      <header class="card-header">
          <h2 class="card-title"><span class="i-rounded bg-danger"><i class="icon-arrange"></i></span>지식자료실</h2>
          <div class="btn-container">
              <a href="write" class="btn btn-m"><span class="hide">자료작성</span></a>
          </div>
      </header>
      <div class="ct-header">
          <button type="button" class="btn-filter collapsed d-xl-none" data-toggle="collapse" data-target="#collapse-filter">검색 필터<i class="icon-down"></i></button>
          <div id="collapse-filter" class="collapse collapse-filter">
              <div class="filter no-gutters">
                  <div class="col" style="min-width: 70%;">
                      <label class="form-control-label">
                          <b class="control-label">제목</b>
                          <input type="text" class="form-control" v-model="title" placeholder="제목을 입력하세요.">
                      </label>
                  </div>
                  <div class="col">
                      <label class="form-control-label label-select">
                          <b class="control-label">솔루션</b>
                          <select class="form-control selectpicker" v-model="solution" title="선택하세요">
                              <option v-for="(item, index) in items" :key="index" :value="item.codeId">
                                  {{ item.codeContent }}
                              </option>
                              <option value="">선택안함</option>
                          </select>
                      </label>
                  </div>
                  <div class="col-auto">
                      <button type="button" style="margin-left: 10px;" @click.prevent="getList()" class="btn btn-primary"><i class="icon-srch"></i>조회</button>
                  </div>
              </div>
          </div>
      </div>
      <div class="ct-content">
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
    </section>
  </div>
</template>

<script>
import 'ag-grid-community/dist/styles/ag-grid.css'
import 'ag-grid-community/dist/styles/ag-theme-alpine.css'

import { AgGridVue } from 'ag-grid-vue'
import { getList } from '@/api/knd/Manual.js'
import { getSolution } from '@/api/log/Login.js'

export default {
  name: 'KAKND0101Form',
  components: {
    AgGridVue
  },
  data: () => {
    return {
      title: '',
      solution: '',
      lists: '',
      items: [],
      // ag-grid
      columnDefs: null,
      rowData: [],
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
      { headerName: '제목', field: 'title', sortable: false, filter: true },
      { headerName: '솔루션', field: 'solution', sortable: false, filter: true },
      { headerName: '작성자', field: 'writer', sortable: false, filter: true },
      { headerName: '첨부파일', field: 'file', sortable: true, filter: true },
      { headerName: '작성일', field: 'reg_date', sortable: true, filter: true },
      { headerName: '조회수', field: 'hit', sortable: true, filter: true }
    ]
  },
  created () {
    this.getSolution()
    this.getList()
  },
  computed: {
    user_id () {
      return this.$store.state.userid
    }
  },
  methods: {
    async getList () {
      const da = {
        params: {
          title: this.title,
          solution: this.solution,
          user: this.$store.state.userid
        }
      }
      const { data } = await getList(da)
      this.lists = data
      this.makeData()
    },
    makeData () {
      this.rowData = []
      this.lists.forEach(e => {
        const value = {
          solution: e.solution,
          title: e.title,
          writer: e.userName,
          file: e.file,
          reg_date: e.reg_date,
          hit: e.hit,
          id: e.manual_id
        }
        this.rowData.push(value)
      })
    },
    async getSolution () {
      await getSolution()
        .then((res) => {
          this.items = res.data
        })
        .catch(console.error())
    },
    onCellClicked (event) {
      const data = {
        manual_id: event.data.id
      }
      this.$router.push({ name: 'KAKND01Detail', params: data })
    },
    gridSizeFit (params) {
      // 모니터나 브라우저 크기에 따라 반응하여 그리드 컬럼 사이즈를 조정
      if (window.innerWidth > 800) { // 화면 가로가 800 px 이 넘을 경우
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

<style>
.ag-header-cell-label{
  justify-content: center
}
</style>
