<template>
 <v-dialog
    v-model="dialog"
    persistent
    max-width="50%"
  > <a
          href=""
          class="modal-default-button"
          @close="onClose"
        >&times;</a>
        <ag-grid-vue style="width: 100%; height:550px;"
                              class="flex-grow-1 flex-shrink-1 ag-theme-alpine"
                              :columnDefs="columnDefs"
                              :rowData="rowData"
                              :gridReady="gridSizeFit"
                              :gridOptions="gridOptions"
                              :get-row-style="getRowStyle"
                              @cell-clicked="onCellClicked"
                              @gridSizeChanged="gridSizeFit">
        </ag-grid-vue>
    <!-- <table class="table table-hover" id="list">
        <thead>
            <tr>
                <th>활동일시</th>
                <th>활동</th>
                <th>사용자</th>
                <th>지식포인트</th>
                <th>솔루션</th>
                <th>제목</th>
            </tr>
        </thead>
        <tbody>
            <tr :key= "index" v-for= "(list, index ) in this.propsdata" >
                <td>{{list.dueDate }}</td>
                <td>{{list.action }}</td>
                <td>{{list.userName }}</td>
                <td>{{list.point }}</td>
                <td>{{list.solution}}</td>
                <td>{{list.title }}</td>
            </tr>
        </tbody>
    </table> -->
 </v-dialog>
</template>
<script>
import 'url-search-params-polyfill'
import 'ag-grid-community/dist/styles/ag-grid.css'
import 'ag-grid-community/dist/styles/ag-theme-alpine.css'
import { AgGridVue } from 'ag-grid-vue'

export default {
  name: 'KAADM0401POPForm',
  data: () => {
    return {
      lists: '',
      AgGridVue
    }
  },
  props: ['dialog', 'propsdata'],
  methods: {
    onClose () {
      this.$emit('close')
    }
  }
}
</script>

<style scoped>

</style>
