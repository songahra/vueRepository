<template>
<div id="wrap">
  <KAKND0104Form></KAKND0104Form>
</div>
</template>

<script>
import KAKND0104Form from '@/components/knd/KAKND0104Form.vue'

export default {
  components: {
    KAKND0104Form
  },
  created () {
    this.$store.commit('SET_DEPTH1', '지식자료실')
    this.$store.commit('SET_DEPTH2', '상세보기')
  },
  data () {
    return {

    }
  }
}
</script>

<style>

</style>
