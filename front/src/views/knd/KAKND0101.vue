<template>
  <div id="wrap">
    <KAKND0101Form />
  </div>
</template>

<script>
import KAKND0101Form from '@/components/knd/KAKND0101Form.vue'
import { expToken } from '@/api/log/Login.js'

export default {
  components: {
    KAKND0101Form
  },
  data () {
    return {

    }
  },
  created () {
    const exp = this.$store.state.exp
    expToken(exp)

    this.$store.commit('SET_DEPTH1', '지식자료실')
    this.$store.commit('SET_DEPTH2', ' ')
  }
}
</script>

<style>

</style>
