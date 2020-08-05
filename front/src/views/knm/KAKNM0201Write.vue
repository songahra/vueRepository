<template>
  <KAKNM0201Form></KAKNM0201Form>
</template>

<script>
import KAKNM0201Form from '@/components/knm/KAKNM0201Form.vue'

export default {
  components: {
    KAKNM0201Form
  },
  created () {
    this.$store.commit('SET_DEPTH1', '지식 관리')
    this.$store.commit('SET_DEPTH2', '답변 작성')
  },
  data () {
    return {

    }
  }
}
</script>

<style>

</style>
