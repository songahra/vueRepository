<template>
 <v-dialog
    v-model="dialog"
    persistent
    max-width="70%"
  > <a
          href=""
          class="modal-default-button"
          @close="onClose"
        >&times;</a>
    <table class="table table-hover" id="list">
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
    </table>
 </v-dialog>
</template>
<script>
import 'url-search-params-polyfill'
// const axios = require('axios').default

export default {
  name: 'KAADM0402POPForm',
  data: () => {
    return {
      lists: ''
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
