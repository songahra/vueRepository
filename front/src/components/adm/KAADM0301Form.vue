<template>
<div>
<header class="card-header">
                <h2 class="card-title"><span class="i-rounded bg-danger"><i class="icon-set"></i></span>코드관리</h2>
                <div class="btn-container">
                    <a href="" class="btn btn-m"  @click.prevent="deleteUserInfo()"><span class="hide">삭제</span></a>
                    <a href="" class="btn btn-m"  @click.prevent="writeUserInfo()"><span class="hide">등록</span></a>
                    <a href="" class="btn btn-primary" @click.prevent="modifyCodeInfo()"><span class="hide">저장</span></a>
                </div>
            </header>
            <div class="ct-header">
                <button type="button" class="btn-filter collapsed d-xl-none" data-toggle="collapse" data-target="#collapse-filter">검색 필터<i class="icon-down"></i></button>
                <div id="collapse-filter" class="collapse collapse-filter">
                    <div class="filter no-gutters">
                        <div class="col">
                            <label class="form-control-label">
                                <b class="control-label">CODE명</b>
                                <input type="text" class="form-control" placeholder="Code명을 입력해주세요." v-model="code_name">
                            </label>
                        </div>
                        <div class="col">
                            <label class="form-control-label">
                                <b class="control-label">코드ID</b>
                                <input type="text" class="form-control" placeholder="코드ID를 입력해주세요." v-model="code_id">
                            </label>
                        </div>
                        <div class="col">
                            <label class="form-control-label">
                                <b class="control-label">코드값</b>
                                <input type="text" class="form-control" placeholder="코드값을 입력해주세요." v-model="code_cotent">
                            </label>
                        </div>
                        <div class="col-auto">
                            <button type="submit" class="btn btn-primary" @click.prevent="onSearch" ><i class="icon-srch"></i>조회</button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="ct-content">
                <div class="table-responsive">
                    <table class="table">
                        <ag-grid-vue style="width: 100%; height: 650px;"
                                      class="flex-grow-1 flex-shrink-1 ag-theme-alpine"
                                      :columnDefs="columnDefs"
                                      :rowData="rowData"
                                      :gridOptions="gridOptions"
                                      @cellEditorSelector="cellEditorSelector"
                                      @onCellEditingStarted="onCellEditingStarted"
                                      @onCellEditingStopped="onCellEditingStopped"
                                      @getRowStyle="getRowStyle"
                                      @gridReady="gridSizeFit"
                                      @gridSizeChanged="gridSizeFit"
                                      @cellValueChanged="cellValueChanged"
                                      @paginationChanged="paginationChanged"
                                      >
                        </ag-grid-vue>
                    </table>
                </div>
                 <alert :dialog="isDialog" :sendData="alertContent" @close="close"></alert>
            </div>
</div>
</template>

<script>
import 'ag-grid-community/dist/styles/ag-grid.css'
import 'ag-grid-community/dist/styles/ag-theme-alpine.css'
import { AllCommunityModules } from '@ag-grid-community/all-modules'
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model'
import { AgGridVue } from 'ag-grid-vue'
import alert from '@/components/common/CompletePOP.vue'
import { codeList, srchCodeList, modifyCodeInfo, deleteCodeInfo, writeCodeInfo } from '@/api/adm/Code.js'
// import { extractValuestest } from './util'

export default {
  name: 'KAKNM0103From',
  components: {
    AgGridVue,
    alert
  },
  data: () => {
    return {
      // gridOptions
      columnDefs: null,
      lists: [],
      rowData: [],
      modules: [ClientSideRowModelModule, AllCommunityModules],
      gridOptions: null,

      // form id
      userid: '', // 로그인 유저
      code_name: '',
      code_id: '',
      code_type: '',
      company: '',
      user_type: '',
      code_cotent: '',
      code_explain: '',
      ode_up_id: '',
      code_order: '',
      code_display_yn: '',
      update_date: '',
      rows: [],
      isDialog: false,
      alertContent: '',
      items: [],
      gridSelectKeys: [],
      settings: {}
    }
  },
  beforeMount () {
    this.gridOptions = {
      // enableColResize: true,
      // enableSorting: true,
      // enableFilter: true,
      // animateRows: false,
      rowSelection: 'multiple',
      //   editable: true,
      treeData: true,
      pagination: true,
      paginationPageSize: 10,
      rowClassRules: null,
      excludeChildrenWhenTreeDataFiltering: true,
      suppressRowClickSelection: true,
      // have checkbox on the group column
      autoGroupColumnDef: {
        cellRendererParams: {
          checkbox: true
        }
      }
    }
    this.columnDefs = [
      { headerName: '선택', checkboxSelection: true },
      { headerName: '코드명', field: 'code_name', sortable: true, filter: true },
      { headerName: '코드ID', field: 'code_id', sortable: true, filter: true },
      { headerName: '유형', field: 'code_type', sortable: true, filter: true },
      { headerName: '코드값', field: 'code_content', sortable: true, filter: true, editable: true },
      { headerName: '코드값 내용', field: 'code_explain', sortable: true, filter: true, editable: true },
      { headerName: '상위코드 ID', field: 'code_up_id', sortable: true, filter: true, editable: true },
      { headerName: '정렬순서', field: 'code_order', sortable: true, filter: true, editable: true },
      {
        headerName: '사용여부',
        field: 'code_display_yn',
        sortable: true,
        filter: true,
        editable: true,
        cellEditor: 'select',
        cellEditorParams: { values: ['Y', 'N'] },
        refData: { Y: 'Y', N: 'N' }
      },
      { headerName: '수정일시', field: 'update_date', sortable: true, filter: true }
    ]
  },
  created () {
  },
  mounted () {
    console.log('mounted!!')
    const test = this.gridOptions.api.getModel()
    console.log('tewsttttt', test)
    // 서버요청
    codeList()
      .then((res) => {
        console.log('ddd', res.data)
        this.lists = res.data
        this.makeData()
        return res
      })
      .then((res) => console.log(res))
      .catch(console.error())
  },
  computed: {
    chg_userid () {
      return this.$store.state.userid
    }
  },
  methods: {
    // sortChanged () {
    //   console.log('sortChanged')
    // },
    paginationChanged () {
      console.log('paginationChanged')
      console.log('search option ')
      // console.log(this.gridOptions.api.paginationSetPageSize(Number(15)))
      // this.gridOptions.api.
    },
    cellValueChanged () {
      console.log('gggg', this.rowData)
    },
    // 조회
    onSearch () {
      this.lists = []
      this.rowData = []
      const srchData = {
        code_name: this.code_name,
        code_id: this.code_id,
        code_cotent: this.code_cotent
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
    cellEditorSelector: function (params) {
      console.log(params)
      const data = params.data
      console.log('data=>', data)
      const fieldName = params.colDef.field
      if (fieldName === 'company') {
        console.log("fieldName === 'company'")
        return {
          params: {
            values: data.company
          }
        }
      }
      if (fieldName === 'solution') {
        return {
          component: 'agSelectCellEditor',
          params: {
            values: data.solution
          }
        }
      }
      if (fieldName === 'dept') {
        console.log("fieldName === 'dept'")
        return {
          params: {
            values: data.dept
          }
        }
      }
      if (fieldName === 'user_type') {
        console.log("fieldName === 'user_type'")
        return {
          params: {
            values: data.user_type
          }
        }
      }
      if (fieldName === 'login_cnt') {
        console.log("fieldName === 'login_cnt'")
        return {
          params: {
            values: data.login_cnt
          }
        }
      }
    },
    onRowEditingStarted: function (event) {
      console.log('never called - not doing row editing')
    },
    onRowEditingStopped: function (event) {
      console.log('never called - not doing row editing')
    },
    onCellEditingStarted: function (event) {
      console.log('cellEditingStarted')
    },
    onCellEditingStopped: function (event) {
      console.log('cellEditingStopped')
    },
    // rowData에 리스트 매핑
    makeData () {
      console.log('makeData')
      console.log('makeData.this.lists', this.lists)
      console.log('makeData.this.rowData', this.rowData)
      this.lists.forEach(e => {
        const value = {
          code_name: e.code_name,
          code_id: e.code_id, // 트리구조
          code_type: e.code_type,
          code_content: e.code_content,
          code_explain: e.code_explain,
          code_up_id: e.code_up_id,
          code_order: e.code_order,
          code_display_yn: e.code_display_yn,
          update_date: e.update_date
        }
        this.rowData.push(value)
      })
    },
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
    },
    // 수정
    modifyCodeInfo () {
      console.log('setdata', this.rowData)
      console.log('saveUserInfo...')

      var formData = []
      this.rows = this.gridOptions.api.getSelectedRows()
      console.log('rows', this.rows)

      for (let i = 0; i < this.rows.length; i++) {
        const e = this.rows[i]
        const value = {
          code_name: e.code_name,
          code_id: e.code_id,
          code_type: e.code_type,
          code_up_id: e.code_up_id,
          code_order: e.code_order,
          code_display_yn: e.code_display_yn,
          userid: this.userid
        }
        formData.push(value)
      }
      console.log('formData', formData)

      // 서버요청
      modifyCodeInfo(formData)
        .then((res) => {
          console.log('res=>>', res)
          this.alertContent = this.rows + '수정되었습니다.'
          this.isDialog = true
          this.$router.push('/adm/codeList')
        })
        .catch(console.error())
    },
    deleteCodeInfo () {
      var formData = []
      this.rows = this.gridOptions.api.getSelectedRows()
      console.log('rows', this.rows)

      for (let i = 0; i < this.rows.length; i++) {
        const e = this.rows[i]
        const value = {
          update_userid: this.userid,
          code_id: e.code_id
        }
        formData.push(value)
      }
      // 서버요청
      deleteCodeInfo(formData)
        .then((res) => {
          console.log('res=>>', res)
          this.alertContent = this.rows + '삭제되었습니다.'
          this.isDialog = true
          this.$router.push('/adm/codeList')
        })
        .catch(console.error())
    },
    writeUserInfo () {
      var formData = []
      this.rows = this.gridOptions.api.getSelectedRows()
      console.log('rows', this.rows)

      for (let i = 0; i < this.rows.length; i++) {
        const e = this.rows[i]
        const value = {
          code_name: e.code_name,
          code_id: e.code_id,
          code_type: e.code_type,
          code_cotent: e.code_cotent,
          code_explain: e.code_explain,
          code_up_id: e.code_up_id,
          code_order: e.code_order,
          code_display_yn: e.code_display_yn,
          userid: this.userid
        }
        formData.push(value)
      }
      // 서버요청
      writeCodeInfo(formData)
        .then((res) => {
          console.log('res=>>', res)
          this.alertContent = '등록되었습니다.'
          this.isDialog = true
          this.$router.push('/adm/codeList')
        })
        .catch(console.error())
    },
    // 팝업창 닫기
    close () {
      this.isDialog = !this.isDialog
    }
  }
}
</script>

<style>

</style>
