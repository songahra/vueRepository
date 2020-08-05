<template>
<div id="ct">
  <section class="card">
    <v-dialog v-model="dialog" persistent max-width="70%">
      <v-card>
        <v-card-title>
          <div class="modal-header">
            <h2 class="modal-title">지식포인트 ( {{ this.userName }} )</h2>
          </div>
            <v-spacer></v-spacer>
            <button @click.prevent="onClose" type="button" class="btn-icon" data-dismiss="modal" aria-label="Close"><i class="icon-close"></i></button>
        </v-card-title>
        <ag-grid-vue style="width: 100%; height:550px;"
                     class="flex-grow-1 flex-shrink-1 ag-theme-alpine"
                    :columnDefs="columnDefs"
                    :rowData="rowData"
                    :gridOptions="gridOptions"
                    :get-row-style="getRowStyle"
                    @gridReady="gridSizeFit"
                    @gridSizeChanged="gridSizeFit">
        </ag-grid-vue>
      </v-card>
    </v-dialog>
  </section>
</div>
</template>
<script>
import 'ag-grid-community/dist/styles/ag-grid.css'
import 'ag-grid-community/dist/styles/ag-theme-alpine.css'
import { AgGridVue } from 'ag-grid-vue'

export default {
  name: 'KAADM0402POPForm',
  components: {
    AgGridVue
  },
  data: () => {
    return {
      lists: '',
      userName: '',
      columnDefs: null,
      rowData: [],
      gridOptions: null
    }
  },
  props: ['dialog', 'propsdata'],
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
      { headerName: '활동일시', field: 'dueDate', sortable: true, filter: true },
      { headerName: '활동', field: 'action', sortable: true, filter: true },
      { headerName: '사용자', field: 'userName', sortable: true, filter: true },
      { headerName: '지식포인트', field: 'point', sortable: true, filter: true },
      { headerName: '솔루션', field: 'solution', sortable: true, filter: true },
      { headerName: '제목', field: 'title', sortable: true, filter: true }
    ]
  },
  methods: {
    makeData () {
      this.rowData = []
      console.log('makeData << USER POP UP >>')
      this.lists.forEach(e => {
        const value = {
          dueDate: e.dueDate,
          action: e.action,
          userName: e.userName,
          point: e.point,
          solution: e.solution,
          title: e.title
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
    onClose () {
      this.$emit('close')
    },
    popupData (data) {
      console.log('popup : ', data)
      this.lists = data.data
      this.userName = this.lists[0].userName
      console.log('userName: ', this.userName)
      this.makeData()
    }
  }
}
</script>

<style scoped>

</style>
