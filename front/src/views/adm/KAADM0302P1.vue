<!-- 프로젝트 조회 Form -->
<template>
  <v-dialog
    v-model="dialog"
    persistent
    max-width="50%"
  >
    <div
      id="modal5"
      class="modal fade show"
      tabindex="-1"
      style="display: block;"
      aria-modal="true"
      role="dialog"
    >
      <form
        id="KAKNM0103From"
        class="form"
        @submit.prevent="onSubmit"
      >
        <div class="modal-dialog modal-dialog-centered modal-lg modal-dialog-scrollable">
          <div class="modal-content">
            <div class="modal-header">
              <h2 class="modal-title">
                기술문의
              </h2>
              <button
                type="button"
                class="btn-icon"
                data-dismiss="modal"
                aria-label="Close"
                @click="codeClose"
              >
                <i class="icon-close" />
              </button>
            </div>
            <div class="modal-body modal-body-ct">
              <div class="ct-header">
                <button
                  type="button"
                  class="btn-filter collapsed d-xl-none"
                  data-toggle="collapse"
                  data-target="#collapse-filter-service"
                >
                  검색 필터<i class="icon-down" />
                </button>
                <div
                  id="collapse-filter-service"
                  class="collapse collapse-filter"
                >
                  <div class="filter no-gutters">
                    <div class="col">
                      <label class="form-control-label">
                        <b class="control-label">코드 값</b>
                        <input
                          v-model="code_content"
                          type="text"
                          class="form-control"
                          placeholder="프로젝트명을 입력하세요."
                        >
                      </label>
                    </div>
                    <div class="col">
                      <label class="form-control-label">
                        <b class="control-label">코드 ID</b>
                        <input
                          v-model="code_id"
                          type="text"
                          class="form-control"
                          placeholder="최종고객을 입력하세요."
                        >
                      </label>
                    </div>
                    <div class="col-auto">
                      <button
                        type="submit"
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
                  <div style="width: 100%; height:100%">
                    <ag-grid-vue
                      style="width: 100%; height: 650px;"
                      class="flex-grow-1 flex-shrink-1 ag-theme-alpine"
                      :column-defs="columnDefs"
                      :row-data="rowData"
                      :grid-options="gridOptions"
                      @getRowStyle="getRowStyle"
                      @gridReady="gridSizeFit"
                      @gridSizeChanged="gridSizeFit"
                      @cell-clicked="onCellClicked"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn"
                data-dismiss="modal"
                @click="codeClose"
              >
                취소
              </button>
              <button
                type="button"
                class="btn btn-primary"
                @click="codeClose"
              >
                확인
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  </v-dialog>
</template>
<!-- Bootstrap CDN -->
<script>
import { codeList, srchCodeList } from '@/api/adm/Code.js'
import 'ag-grid-community/dist/styles/ag-grid.css'
import 'ag-grid-community/dist/styles/ag-theme-alpine.css'
import { AllCommunityModules } from '@ag-grid-community/all-modules'
import { AgGridVue } from 'ag-grid-vue'

export default {
  name: 'KAKNM0103From',
  components: {
    AgGridVue
  },
  props: ['dialog'],
  data: () => {
    return {
      // gridOptions
      columnDefs: null,
      lists: [],
      rowData: [],
      modules: AllCommunityModules,
      gridOptions: null,

      // form id
      code_content: '',
      code_id: ''
    }
  },
  beforeMount () {
    this.gridOptions = {
      pagination: true,
      paginationPageSize: 10
    }
    this.columnDefs = [
      { headerName: '코드 ID', field: 'code_id', sortable: true, filter: true },
      { headerName: '코드 명', field: 'code_name', sortable: true, filter: true },
      { headerName: '코드 값', field: 'code_value', sortable: true, filter: true },
      { headerName: '코드 타입', field: 'code_type', sortable: true, filter: true },
      { headerName: '코드 컨텐트', field: 'code_content', sortable: true, filter: true }
    ]
  },
  mounted () {
    console.log('mounted!!')

    // 서버요청
    codeList()
      .then((res) => {
        this.lists = res.data
        this.makeData()
        return res
      })
      .then((res) => console.log(res))
      .catch(console.error())
  },
  methods: {
    // 조회
    onSubmit () {
      this.lists = []
      this.rowData = []
      const srchData = {
        code_id: this.code_id,
        code_content: this.code_content
      }
      console.log('srchData', srchData)

      // 서버요청
      srchCodeList(srchData)
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
          code_id: e.code_id,
          code_name: e.code_name,
          code_value: e.code_value,
          code_type: e.code_type,
          code_content: e.code_content
        }
        this.rowData.push(value)
      })
    },

    // 팝업 닫기
    codeClose () {
      console.log('child-close')
      this.$emit('codeClose')
    },

    // 그리드 셀 클릭시 이벤트
    onCellClicked (event) {
      console.log('1 onCellClicked')
      console.log('event', event)

      const params = {
        code_id: event.data.code_id,
        code_name: event.data.code_name
      }
      console.log('1 params', params)
      this.$emit('checkedbtn', params)
    },
    // 그리드사이즈
    gridSizeFit (params) {
      console.log('gridSizeFit')
      if (window.innerWidth > 800) {
        console.log('innerWidth')
        params.api.sizeColumnsToFit()
      } else {
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
