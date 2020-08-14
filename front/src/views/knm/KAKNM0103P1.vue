<!-- 기술문의 프로젝트 조회 리스트 화면 -->
<template>
  <v-dialog
    v-model="dialog"
    persistent
    max-width="50%"
  >
    <v-card>
      <KAKNM0103Form
        @pjClose="pjClose"
        @checkedbtn="checkedbtn"
      />
    </v-card>
  </v-dialog>
</template>

<script>
import KAKNM0103Form from '@/components/knm/KAKNM0103Form.vue'
import { expToken } from '@/api/log/Login.js'

export default {
  components: {
    KAKNM0103Form
  },
  props: ['dialog'],
  data () {
    return {
      pjDialog: ''
    }
  },
  created () {
    const exp = this.$store.state.exp
    expToken(exp)
  },
  methods: {
    pjClose () {
      console.log('parent-close')
      this.$emit('pjClose')
    },
    checkedbtn (params) {
      console.log('2 checkedbtn')
      console.log('2 params ', params)
      this.$emit('checkedbtn', params)
    }
  }
}
</script>

<style>

</style>
