<template>
  <KAKNM0202Form></KAKNM0202Form>
</template>

<script>
import KAKNM0202Form from '@/components/knm/KAKNM0202Form.vue'

export default {
  components: {
    KAKNM0202Form
  },
  created () {
    this.$store.commit('SET_DEPTH1', '지식 관리')
    this.$store.commit('SET_DEPTH2', '답변 수정')
  },
  data () {
    return {

    }
  }
}
</script>

<style>

</style>
