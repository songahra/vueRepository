<template>
  <KAKND0103Form />
</template>

<script>
import KAKND0103Form from '@/components/knd/KAKND0103Form.vue'
import { expToken } from '@/api/log/Login.js'

export default {
  components: {
    KAKND0103Form
  },
  data () {
    return {

    }
  },
  created () {
    const exp = this.$store.state.exp
    expToken(exp)
    this.$store.commit('SET_DEPTH1', '지식자료실')
    this.$store.commit('SET_DEPTH2', '자료수정')
  }
}
</script>

<style>

</style>
