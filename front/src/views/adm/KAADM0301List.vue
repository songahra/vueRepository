<template>
  <div id="ct">
    <section class="card">
      <KAADM0301Form />
    </section>
  </div>
</template>

<script>
import KAADM0301Form from '@/components/adm/KAADM0301Form.vue'
import { expToken } from '@/api/log/Login.js'

export default {
  components: {
    KAADM0301Form
  },
  data () {
    return {

    }
  },
  created () {
    const exp = this.$store.state.exp
    expToken(exp)
  }
}
</script>

<style>

</style>
