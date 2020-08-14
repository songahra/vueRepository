<template>
  <div id="ct">
    <section class="card">
      <KAADM0201Form />
    </section>
  </div>
</template>

<script>
import KAADM0201Form from '@/components/adm/KAADM0201Form.vue'
import { expToken } from '@/api/log/Login.js'

export default {
  components: {
    KAADM0201Form
  },
  data () {
    return {

    }
  },
  created () {
    const exp = this.$store.state.exp
    expToken(exp)

    this.$store.commit('SET_DEPTH1', '설정')
    this.$store.commit('SET_DEPTH2', '사용자 권한')
  }
}
</script>

<style>

</style>
