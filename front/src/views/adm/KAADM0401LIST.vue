<template>
  <KAADM0401Form />
</template>

<script>
import KAADM0401Form from '@/components/adm/KAADM0401Form.vue'
import { expToken } from '@/api/log/Login.js'

export default {
  components: {
    KAADM0401Form
  },
  data () {
    return {

    }
  },
  created () {
    const exp = this.$store.state.exp
    expToken(exp)
    this.$store.commit('SET_DEPTH1', '설정')
    this.$store.commit('SET_DEPTH2', '지식포인트')
  }
}
</script>

<style>

</style>
