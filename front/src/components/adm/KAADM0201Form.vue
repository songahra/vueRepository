<!-- 권한관리 리스트 Form -->
<template>
  <div>
    <header class="card-header">
      <h2 class="card-title">
        <span class="i-rounded bg-danger"><i class="icon-set" /></span>사용자 정보
      </h2>
      <div class="btn-container">
        <a
          class="btn btn-m"
          @click.prevent="deleteUserInfo()"
        ><span class="hide">삭제</span></a>
        <a
          href=""
          class="btn btn-primary"
          @click.prevent="saveUserInfo()"
        ><span class="hide">저장</span></a>
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
          <div class="col">
            <label class="form-control-label">
              <b class="control-label">사용자ID</b>
              <input
                v-model="user_id"
                type="text"
                class="form-control"
                placeholder="사용자ID를 입력해주세요."
              >
            </label>
          </div>
          <div class="col">
            <label class="form-control-label">
              <b class="control-label">사용자명</b>
              <input
                v-model="user_name"
                type="text"
                class="form-control"
                placeholder="사용자명를 입력해주세요."
              >
            </label>
          </div>
          <div class="col">
            <label class="form-control-label">
              <b class="control-label">소속회사명</b>
              <input
                v-model="company"
                type="text"
                class="form-control"
                placeholder="소속회사명을 입력해주세요."
              >
            </label>
          </div>
          <div class="col-auto">
            <button
              type="button"
              class="btn btn-primary"
              @click="onSubmit"
            >
              <i class="icon-srch" />조회
            </button>
          </div>
        </div>
      </div>
    </div>
    <button
      type="button"
      class="cc"
      @click="onSubmit"
    />
    <button class="test" />
    <div class="ct-content">
      <div class="table-responsive">
        <ag-grid-vue
          style="width: 100%; height: 650px;"
          class="flex-grow-1 flex-shrink-1 ag-theme-alpine"
          :column-defs="columnDefs"
          :row-data="rowData"
          :grid-options="gridOptions"
          @cellEditorSelector="cellEditorSelector"
          @onCellEditingStarted="onCellEditingStarted"
          @onCellEditingStopped="onCellEditingStopped"
          @getRowStyle="getRowStyle"
          @gridReady="gridSizeFit"
          @gridSizeChanged="gridSizeFit"
          @cellValueChanged="cellValueChanged"
          @paginationChanged="paginationChanged"
        />
      </div>
      <alert
        :dialog="isDialog"
        :send-data="alertContent"
        @close="close()"
      />
    </div>
  </div>
</template>

<script>
import 'ag-grid-community/dist/styles/ag-grid.css'
import 'ag-grid-community/dist/styles/ag-theme-alpine.css'

import { AllCommunityModules } from '@ag-grid-community/all-modules'
import { AgGridVue } from 'ag-grid-vue'
import alert from '@/components/common/CompletePOP.vue'
import { allUserList, srchUserList, modifyUserInfo, deleteUserInfo } from '@/api/adm/Auth.js'
import { getSolution } from '@/api/log/Login.js'

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
      modules: AllCommunityModules,
      gridOptions: null,
      gridSelectKeys: [],
      settings: {},

      // form id
      userid: '', // 로그인 유저
      update_userid: '',
      user_id: '',
      user_name: '',
      user_pw: '',
      company: '',
      user_type: '',
      solution: '',
      dept: '',
      use_yn: '',
      login_lock: '',
      login_cnt: '',
      update_date: '',
      userSolutions: '',
      flag: '',
      rows: [],
      reg_date: '', // 임시
      alertContent: '',
      isDialog: false,
      items: []

    }
  },
  computed: {
    chg_userid () {
      return this.$store.state.userid
    }
  },
  beforeMount () {
    this.gridOptions = {
      // enableColResize: true,
      // enableSorting: true,
      // enableFilter: true,
      // animateRows: false,
      rowSelection: 'multiple',
      editable: true,
      pagination: true,
      paginationPageSize: 10
    }
    this.columnDefs = [
      { headerName: '선택', checkboxSelection: true },
      { headerName: '이메일', id: 'user_id', field: 'user_id', sortable: true, filter: true },
      { headerName: '사용자명', field: 'user_name', sortable: true, filter: true },
      { headerName: '소속회사', field: 'company', sortable: true, filter: true, editable: true },
      { headerName: '부서명', field: 'dept', sortable: true, filter: true, editable: true },
      {
        headerName: '담당솔루션',
        field: 'solution',
        sortable: true,
        filter: true,
        editable: true,
        cellEditor: 'select',
        cellEditorParams: { values: this.gridSelectKeys },
        refData: this.settings
      },
      {
        headerName: '권한그룹',
        id: 'user_type',
        field: 'user_type',
        sortable: true,
        filter: true,
        editable: true,
        cellEditor: 'select',
        cellEditorParams: { values: ['Q', 'A', 'O'] },
        refData: { Q: 'Q', A: 'A', O: 'O' }
      },
      { headerName: '비밀번호', field: 'user_pw', sortable: true, filter: true, editable: true, cellRenderer: this.passwordFormat },
      { headerName: '수정일', field: 'update_date', sortable: true, filter: true },
      { headerName: '로그인실패', field: 'login_cnt', sortable: true, filter: true, editable: true },
      {
        headerName: '사용여부',
        field: 'use_yn',
        sortable: true,
        filter: true,
        editable: true,
        cellEditor: 'select',
        cellEditorParams: { values: ['Y', 'N'] },
        refData: { Y: 'Y', N: 'N' }
      },
      { headerName: '솔루션 id', field: 'soultion', sortable: true, filter: true, hide: true }
    ]
  },
  created () {

  },
  mounted () {
    console.log('mounted!!')
    const test = this.gridOptions.api.getModel()
    console.log('tewsttttt', test)
    // 서버요청
    allUserList()
      .then((res) => {
        this.lists = res.data
        this.makeData()
        return res
      })
      .then((res) => console.log(res))
      .catch(console.error())
    this.getSolution()
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
    onSubmit () {
      this.lists = []
      this.rowData = []
      const srchData = {
        user_id: this.user_id,
        user_name: this.user_name,
        company: this.company
      }
      console.log('srchData', srchData)
      // 서버요청
      srchUserList(srchData)
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
          user_id: e.user_id,
          user_name: e.user_name,
          user_pw: e.user_pw,
          company: e.company,
          user_type: e.user_type,
          solution: e.solution,
          dept: e.dept,
          use_yn: e.use_yn,
          login_cnt: e.login_cnt,
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
    passwordFormat (params) {
      console.log('passwordFormat', params)
      const formatValue = '*****'
      return formatValue
    },
    // 공통코드 솔루션 값
    getSolution () {
      getSolution()
        .then((res) => {
          console.log('res=>>', res)
          this.items = res.data
          // var something = {}
          this.items.forEach((element) => {
            this.gridSelectKeys.push(element.codeId)
            this.settings[element.codeId] = element.codeContent
          })
          console.log('gridSelectKeys', this.gridSelectKeys)
          //  { key: value , key: value ...}
          // console.log('settingsaaaaaaaaa', this.settings)
          console.log('this.settings', this.settings)
          console.log('solution_id ', this.items)
        })
        .catch(console.error())
    },
    // 수정
    saveUserInfo () {
      console.log('setdata', this.rowData)
      console.log('saveUserInfo...')
      // const dept = this.gridOptions.api.getRowNode('dept')
      // const rowNode = this.gridOptions.api.getRowNodeId('dept')
      // console.log('this.gridApi.getRowNode()...', rowNode)
      // dept.setDataValue('dept', newValue)
      // console.log('this.gridApi.getRowNode()...', newValue)

      // const updateData = data => {
      //   params.api.setRowData(data.slice(0, 50))
      // }
      // console.log('updateData', updateData)

      var formData = []
      this.rows = this.gridOptions.api.getSelectedRows()
      console.log('rows', this.rows)
      if (!this.rows) {
        this.alertContent = '체크박스를 선택해주세요.'
        this.isDialog = true
      }

      for (let i = 0; i < this.rows.length; i++) {
        const e = this.rows[i]
        const value = {
          update_userid: this.$store.state.userid,
          user_id: e.user_id,
          company: e.company,
          dept: e.dept,
          solution: e.solution,
          user_type: e.user_type,
          user_pw: e.user_pw,
          login_cnt: e.login_cnt,
          login_lock: e.login_lock,
          use_yn: e.use_yn
        }
        formData.push(value)
      }
      console.log('formData', formData)

      // 서버요청
      modifyUserInfo(formData)
        .then((res) => {
          console.log('res=>>', res)
          this.isDialog = true
          this.alertContent = this.rows.length + '건이 수정되었습니다.'
        })
        .catch(console.error())
    },
    deleteUserInfo () {
      var formData = []
      this.rows = this.gridOptions.api.getSelectedRows()
      console.log('rows', this.rows)

      for (let i = 0; i < this.rows.length; i++) {
        const e = this.rows[i]
        const value = {
          update_userid: this.$store.state.userid,
          user_id: e.user_id
        }
        formData.push(value)
      }
      deleteUserInfo(formData)
        .then((res) => {
          console.log('res=>>', res)
          this.alertContent = this.rows.length + '건이 삭제되었습니다.'
          this.isDialog = true
        })
        .catch(console.error())
    },
    close () {
      this.isDialog = !this.isDialog
      this.onSubmit()
      // this.$router.go(this.$router.currentRoute)
    }
  }
}
</script>

<style>

.material-icons {
  font-family: 'Material Icons';
  font-weight: normal;
  font-style: normal;
  font-size: 24px;
  line-height: 1;
  letter-spacing: normal;
  text-transform: none;
  display: inline-block;
  white-space: nowrap;
  word-wrap: normal;
  direction: ltr;
  font-feature-settings: 'liga';
  -webkit-font-feature-settings: 'liga';
  -webkit-font-smoothing: antialiased;
}

/* .pagination a {
  color: black;
  float: left;
  padding: 8px 16px;
  text-decoration: none;
} */
</style>
