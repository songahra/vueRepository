<template>
 <v-dialog
    v-model="dialog"
    persistent
    max-width="50%"
  >
    <v-card>
      <v-card-title>
        <v-spacer></v-spacer>
      <a @click.prevent="onClose"
        class="modal-default-button"
        >&times;</a>
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
</template>
<script>
import 'ag-grid-community/dist/styles/ag-grid.css'
import 'ag-grid-community/dist/styles/ag-theme-alpine.css'
import { AgGridVue } from 'ag-grid-vue'
// import { getSearchSolList } from '@/api/adm/Point.js'

export default {
  name: 'KAADM0401POPForm',
  components: {
    AgGridVue

  },
  data: () => {
    return {
      lists: '',
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
      console.log('makeData << SOL POP UP >>')
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
      this.makeData()
    }
  }
}
</script>

<style scoped>

</style>
