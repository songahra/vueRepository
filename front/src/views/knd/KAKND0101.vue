<template>
<div id="wrap">
  <KAKND0101Form></KAKND0101Form>
</div>
</template>

<script>
import KAKND0101Form from '@/components/knd/KAKND0101Form.vue'

export default {
  components: {
    KAKND0101Form
  },
  created () {
    this.$store.commit('SET_DEPTH1', '지식자료실')
    this.$store.commit('SET_DEPTH2', ' ')
  },
  data () {
    return {

    }
  }
}
</script>

<style>

</style>
