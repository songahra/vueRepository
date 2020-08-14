<template>
  <KAADM0402Form />
</template>

<script>
import KAADM0402Form from '@/components/adm/KAADM0402Form.vue'
import { expToken } from '@/api/log/Login.js'

export default {
  components: {
    KAADM0402Form
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
