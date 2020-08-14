<template>
  <KAKNM0201Form />
</template>

<script>
import KAKNM0201Form from '@/components/knm/KAKNM0201Form.vue'
import { expToken } from '@/api/log/Login.js'

export default {
  components: {
    KAKNM0201Form
  },
  data () {
    return {

    }
  },
  created () {
    const exp = this.$store.state.exp
    expToken(exp)
    this.$store.commit('SET_DEPTH1', '지식 관리')
    this.$store.commit('SET_DEPTH2', '답변 작성')
  }
}
</script>

<style>

</style>
