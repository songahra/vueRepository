<template>
  <div id="ct">
    <section class="card">
      <KAADM0101Form />
    </section>
  </div>
</template>

<script>
import KAADM0101Form from '@/components/adm/KAADM0101Form.vue'
import { expToken } from '@/api/log/Login.js'

export default {
  components: {
    KAADM0101Form
  },
  data () {
    return {

    }
  },
  created () {
    const exp = this.$store.state.exp
    expToken(exp)
    this.$store.commit('SET_DEPTH1', '설정')
    this.$store.commit('SET_DEPTH2', '프로젝트')
  }
}
</script>

<style>

</style>
