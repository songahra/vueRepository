<template>
  <div id="ct">
    <section class="card">
      <KAADM0302Form />
    </section>
  </div>
</template>

<script>
import KAADM0302Form from '@/components/adm/KAADM0302Form.vue'
import { expToken } from '@/api/log/Login.js'

export default {
  components: {
    KAADM0302Form
  },
  data () {
    return {

    }
  },
  created () {
    const exp = this.$store.state.exp
    expToken(exp)
    this.$store.commit('SET_DEPTH1', '설정')
    this.$store.commit('SET_DEPTH2', '코드관리')
  }
}
</script>

<style>

</style>
