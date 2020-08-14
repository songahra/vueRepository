<!-- 코드관리 리스트 Form -->
<template>
  <div>
    <div class="form-group">
      <header
        class="card-header"
        style="padding: 1.6rem 1rem;"
      >
        <h2 class="card-title">
          <span class="i-rounded bg-danger"><i class="icon-std-code" /></span>코드관리
        </h2>
        <div class="btn-container">
          <a
            href=""
            class="btn btn-primary"
            type="submit"
            @click.prevent="writeUserInfo"
          ><span class="hide">등록</span></a>
          <a
            href=""
            class="btn btn-primary"
            type="submit"
            @click.prevent="modifyCodeInfo"
          ><span class="hide">수정</span></a>
          <a
            href=""
            class="btn btn-primary"
            type="submit"
            @click.prevent="deleteCodeInfo"
          ><span class="hide">삭제</span></a>
          <a
            href=""
            class="btn"
            @click="() => this.$router.push({ name: 'KAADM0301List' })"
          ><span class="hide">목록보기</span></a>
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
                <b class="control-label">CODE명</b>
                <input
                  v-model="code_name"
                  type="text"
                  class="form-control"
                  placeholder="Code명을 입력해주세요."
                >
              </label>
            </div>
            <div class="col">
              <label class="form-control-label">
                <b class="control-label">코드ID</b>
                <input
                  v-model="code_id"
                  type="text"
                  class="form-control"
                  placeholder="코드ID를 입력해주세요."
                >
              </label>
            </div>
            <div class="col">
              <label class="form-control-label">
                <b class="control-label">코드값</b>
                <input
                  v-model="code_content"
                  type="text"
                  class="form-control"
                  placeholder="코드값을 입력해주세요."
                >
              </label>
            </div>
            <div class="col-auto">
              <button
                type="button"
                class="btn"
                @click.prevent="onSearch"
              >
                <i class="icon-srch" />전체조회
              </button>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div class="col-lg-3">
          <div class="form-group">
            <v-treeview
              v-model="selection"
              :items="items"
              item-key="id"
              selectable
              selected-color="red"
              selection-type="leaf"
              return-object
              open-all
              open-on-click
              @input="selectCode"
            />
          </div>
        </div>
        <div style="float:left;">
          <div class="table-line" />
          <div class="table-responsive">
            <div class="ct-content">
              <div class="table-responsive">
                <table class="table">
                  <ag-grid-vue
                    style="width: 100%; height: 520px;"
                    class="flex-grow-1 flex-shrink-1 ag-theme-alpine"
                    :column-defs="columnDefs"
                    :column-types="columnTypes"
                    :row-data="rowData"
                    :grid-options="gridOptions"
                    :get-row-height="getRowHeight"
                    :modules="modules"
                    @cellEditorSelector="cellEditorSelector"
                    @onCellEditingStarted="onCellEditingStarted"
                    @onCellEditingStopped="onCellEditingStopped"
                    @getRowStyle="getRowStyle"
                    @gridReady="gridSizeFit"
                    @gridSizeChanged="gridSizeFit"
                    @cellValueChanged="cellValueChanged"
                    @paginationChanged="paginationChanged"
                  />
                </table>
              </div>
              <alert
                :dialog="isDialog"
                :send-data="alertContent"
                @close="close"
              />
              <failAlert
                :dialog="fDialog"
                :send-data="alertContent"
                @close="fDialog=false"
              />
            </div>
          </div>
        </div>
      </div>
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
import failAlert from '@/components/common/FailPOP.vue'
import { codeList, srchCodeList, modifyCodeInfo } from '@/api/adm/Code.js'
// import { extractValuestest } from './util'

export default {
  name: 'KAKNM0103From',
  components: {
    AgGridVue,
    alert,
    failAlert
  },
  data: () => {
    return {
      // gridOptions
      columnDefs: null,
      columnTypes: null,
      getRowHeight: null,
      lists: [],
      rowData: [],
      modules: [ClientSideRowModelModule, AllCommunityModules],
      gridOptions: null,

      // form id
      userid: '', // 로그인 유저
      code_name: '',
      code_id: '',
      code_type: '',
      code_content: '',
      code_explain: '',
      code_up_id: '',
      code_order: '',
      code_display_yn: '',
      update_date: '',
      rows: [],
      selection: [],
      isDialog: false,
      fDialog: false,
      selectedCodes: '',
      alertContent: '',
      coList: [],
      codeList: [],
      items: [],
      item: []
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
      //   editable: true,
      autoHeight: true,
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
      { headerName: '유형', field: 'code_type', sortable: true, filter: true, editable: true },
      { headerName: '코드값', field: 'code_content', sortable: true, filter: true, editable: true },
      { headerName: '코드값 내용', field: 'code_explain', sortable: true, filter: true, editable: true },
      { headerName: '상위코드 ID', field: 'code_up_id', sortable: true, filter: true },
      {
        headerName: '정렬순서',
        field: 'code_order',
        sortable: true,
        type: 'numberColumn',
        filter: true,
        editable: true
      },
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
      { headerName: '수정일시', field: 'update_date', sortable: true, filter: true, type: ['dateColumn', 'nonEditableColumn'] }
    ]
    this.columnTypes = {
      numberColumn: {
        width: 130,
        filter: 'agNumberColumnFilter'
      },
      medalColumn: {
        width: 100,
        columnGroupShow: 'open',
        filter: false
      },
      nonEditableColumn: { editable: false },
      dateColumn: {
        filter: 'agDateColumnFilter',
        filterParams: {
          comparator: (filterLocalDateAtMidnight, cellValue) => {
            var dateParts = cellValue.split('/')
            var day = Number(dateParts[0])
            var month = Number(dateParts[1]) - 1
            var year = Number(dateParts[2])
            var cellDate = new Date(year, month, day)
            if (cellDate < filterLocalDateAtMidnight) {
              return -1
            } else if (cellDate > filterLocalDateAtMidnight) {
              return 1
            } else {
              return 0
            }
          }
        }
      }
    }
  },
  created () {
  },
  mounted () {
    console.log('mounted!!')

    // 서버요청
    codeList()
      .then((res) => {
        console.log('ddd', res.data)
        this.lists = res.data
        const list = this.lists
        // const codeList = this.convert_codeId(list)

        list.forEach(item => {
          for (let i = 0; i < list.length; i++) {
            if (item.code_up_id === list[i].code_id) {
              item.code_up_id = list[i].code_id
              break
            }
          }
        })
        console.log('foreach list', list)

        let myTree = null
        list.forEach(item => {
          if (myTree === null) {
            myTree = { id: item.code_id, name: item.code_type }
            console.log(';', myTree)
          } else {
            this.Recursive(item, myTree)
          }
        })

        const treeArr = []
        treeArr.push(myTree)
        this.items = treeArr
        this.myTree = myTree
      })
  },
  methods: {
    // 조회
    Recursive (item, tree) {
      // tree Id 와 item parentId가 같다면
      if (tree.id === item.code_up_id) {
        if (typeof tree.children === 'undefined') { // tree에 children이 없다면
          tree.children = []
          tree.children.push({ id: item.code_id, name: item.code_type })
        } else { // tree에 children이 있다.
          tree.children.push({ id: item.code_id, name: item.code_type })
        }
      } else { // tree Id와 item parentId가 다름
        if (typeof tree.children === 'undefined') { // tree에 children이 없다면

        } else { // tree에 children이 있다면
          tree.children.forEach(child => {
            this.Recursive(item, child)
          })
        }
      }
    },
    selectCode () {
      // console.log('들어왓니..', items)
      this.selectedCodes = [] // 배열생성
      for (let i = 0; i < this.selection.length; i++) {
        const codes = this.lists.find(item => {
          return item.code_id === this.selection[i].id
        })
        this.selectedCodes.push(codes)
      }

      this.makeData()

      // this.FATCH_USERLIST(selectedDept)
    },
    onSearch () {
      const srchData = {
        code_name: this.code_name,
        code_id: this.code_id,
        code_content: this.code_content
      }
      console.log('srchData', srchData)
      // 서버요청
      srchCodeList(srchData)
        .then((res) => {
          this.selectedCodes = res.data
          this.makeData()
          return res
        })
        .then((res) => console.log(res))
        .catch(console.error())
    },
    paginationChanged () {
      console.log('paginationChanged')
      console.log('search option ')
    },
    cellValueChanged () {
      console.log('gggg', this.rowData)
    },
    cellEditorSelector: function (params) {
      console.log(params)
      const data = params.data
      console.log('data=>', data)
      const fieldName = params.colDef.field
      if (fieldName === 'code_name') {
        console.log("fieldName === 'code_name'")
        return {
          params: {
            values: data.code_name
          }
        }
      }
      if (fieldName === 'code_id') {
        return {
          params: {
            values: data.code_id
          }
        }
      }
      if (fieldName === 'code_type') {
        console.log("fieldName === 'code_type'")
        return {
          params: {
            values: data.code_type
          }
        }
      }
      if (fieldName === 'code_content') {
        console.log("fieldName === 'code_content'")
        return {
          params: {
            values: data.code_content
          }
        }
      }
      if (fieldName === 'code_explain') {
        console.log("fieldName === 'code_explain'")
        return {
          params: {
            values: data.code_explain
          }
        }
      }
      if (fieldName === 'code_order') {
        console.log("fieldName === 'code_order'")
        return {
          params: {
            values: data.code_order
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
      this.rowData = []
      this.selectedCodes.forEach(e => {
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
    setGroupHeight (height) {
      this.groupHeight = height
      this.gridApi.resetRowHeights()
    },
    getRowStyle: function (param) {
      return { 'text-align': 'center' }
    },
    // 수정
    modifyCodeInfo () {
      console.log('modifyCodeInfo...')
      const formData = []
      this.rows = this.gridOptions.api.getSelectedRows()

      console.log('rows', this.rows)
      if (this.rows.length === 0) {
        this.alertContent = '체크박스를 선택해주세요.'
        this.fDialog = true
      }

      for (let i = 0; i < this.rows.length; i++) {
        const e = this.rows[i]
        const value = {
          userid: this.$store.state.userid,
          code_name: e.code_name,
          code_id: e.code_id,
          code_up_id: e.code_up_id,
          code_type: e.code_type,
          code_order: e.code_order,
          code_content: e.code_content,
          code_explain: e.code_explain,
          code_display_yn: e.code_display_yn,
          flag: 'M'
        }
        formData.push(value)
      }
      console.log('formData', formData)

      // 서버요청
      modifyCodeInfo(formData)
        .then((res) => {
          console.log('res=>>', res)
          this.alertContent = this.rows.length + '건이 수정되었습니다.'
          this.isDialog = true
        })
        .catch(console.error())
    },
    // 삭제
    deleteCodeInfo () {
      console.log('modifyCodeInfo...')
      if (this.rows.length === 0) {
        this.alertContent = '체크박스를 선택해주세요.'
        this.fDialog = true
      }
      const formData = []
      this.rows = this.gridOptions.api.getSelectedRows()
      console.log('rows', this.rows)

      for (let i = 0; i < this.rows.length; i++) {
        const e = this.rows[i]
        const value = {
          code_id: e.code_id,
          flag: 'D'
        }
        formData.push(value)
      }
      modifyCodeInfo(formData)
        .then((res) => {
          console.log('res=>>', res)
          this.alertContent = this.rows.length + '건이 삭제되었습니다.'
          this.isDialog = true
        })
        .catch(console.error())
    },
    // 등록
    writeUserInfo () {
      this.$router.push({ name: 'KAADM0302Wirte' })
    },
    // 팝업창 닫기
    close () {
      this.$router.go(this.$router.currentRoute)
    }
  }
}
</script>

<style lang="scss" scoped>
.col-lg-3 {
  width: 300px;
  float: left;
}
.table-responsive {
  width: 1320px;
}
</style>>
