<template>
  <div id="wrap">
    <KAKND0104Form />
  </div>
</template>

<script>
import KAKND0104Form from '@/components/knd/KAKND0104Form.vue'
import { expToken } from '@/api/log/Login.js'

export default {
  components: {
    KAKND0104Form
  },
  data () {
    return {

    }
  },
  created () {
    const exp = this.$store.state.exp
    expToken(exp)
    this.$store.commit('SET_DEPTH1', '지식자료실')
    this.$store.commit('SET_DEPTH2', '상세보기')
  }
}
</script>

<style>

</style>
