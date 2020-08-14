<template>
  <KAKNM02Form />
</template>

<script>
import KAKNM02Form from '@/components/knm/KAKNM0204Form.vue'
import { expToken } from '@/api/log/Login.js'

export default {
  components: {
    KAKNM02Form
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
