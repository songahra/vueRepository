<template>
  <KAADM0401Form></KAADM0401Form>
</template>

<script>
import KAADM0401Form from '@/components/adm/KAADM0401Form.vue'

export default {
  components: {
    KAADM0401Form
  },
  created () {
    this.$store.commit('SET_DEPTH1', '설정')
    this.$store.commit('SET_DEPTH2', '지식포인트')
  },
  data () {
    return {

    }
  }
}
</script>

<style>

</style>
