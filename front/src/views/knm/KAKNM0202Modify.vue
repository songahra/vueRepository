<template>
  <KAKNM0202Form />
</template>

<script>
import KAKNM0202Form from '@/components/knm/KAKNM0202Form.vue'
import { expToken } from '@/api/log/Login.js'

export default {
  components: {
    KAKNM0202Form
  },
  data () {
    return {

    }
  },
  created () {
    const exp = this.$store.state.exp
    expToken(exp)
    this.$store.commit('SET_DEPTH1', '지식 관리')
    this.$store.commit('SET_DEPTH2', '답변 수정')
  }
}
</script>

<style>

</style>
