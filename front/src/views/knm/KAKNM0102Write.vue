<!-- 기술문의 등록화면 -->
<template>
  <div id="ct">
    <section class="card">
      <KAKNM0102Form />
    </section>
  </div>
</template>

<script>
import KAKNM0102Form from '@/components/knm/KAKNM0102Form.vue'
import { expToken } from '@/api/log/Login.js'

export default {
  components: {
    KAKNM0102Form
  },
  data () {
    return {

    }
  },
  created () {
    const exp = this.$store.state.exp
    expToken(exp)
    this.$store.commit('SET_DEPTH1', '지식관리')
    this.$store.commit('SET_DEPTH2', '작성')
  }
}
</script>

<style>

</style>
