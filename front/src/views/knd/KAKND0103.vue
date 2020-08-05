<template>

  <KAKND0103Form></KAKND0103Form>

</template>

<script>
import KAKND0103Form from '@/components/knd/KAKND0103Form.vue'

export default {
  components: {
    KAKND0103Form
  },
  created () {
    this.$store.commit('SET_DEPTH1', '지식자료실')
    this.$store.commit('SET_DEPTH2', '자료수정')
  },
  data () {
    return {

    }
  }
}
</script>

<style>

</style>
