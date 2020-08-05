<template>
  <div id="ct">
    <section class="card">
       <KAADM0201Form></KAADM0201Form>
    </section>
  </div>
</template>

<script>
import KAADM0201Form from '@/components/adm/KAADM0201Form.vue'

export default {
  components: {
    KAADM0201Form
  },
  data () {
    return {

    }
  },
  created () {
    this.$store.commit('SET_DEPTH1', '설정')
    this.$store.commit('SET_DEPTH2', '사용자 권한')
  }
}
</script>

<style>

</style>
