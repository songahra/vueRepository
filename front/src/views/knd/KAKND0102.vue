<template>
  <!-- <div id="wrap"> -->
  <KAKND0102Form />
<!-- </div> -->
</template>

<script>
import KAKND0102Form from '@/components/knd/KAKND0102Form.vue'
import { expToken } from '@/api/log/Login.js'

export default {
  components: {
    KAKND0102Form
  },
  data () {
    return {

    }
  },
  created () {
    const exp = this.$store.state.exp
    expToken(exp)
    this.$store.commit('SET_DEPTH1', '지식자료실')
    this.$store.commit('SET_DEPTH2', '자료작성')
  }
}
</script>

<style>

</style>
