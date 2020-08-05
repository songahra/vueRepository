<template>
  <div id="ct">
    <section class="card">
       <KAADM0302Form></KAADM0302Form>
    </section>
  </div>
</template>

<script>
import KAADM0302Form from '@/components/adm/KAADM0302Form.vue'

export default {
  components: {
    KAADM0302Form
  },
  data () {
    return {

    }
  },
  created () {
    this.$store.commit('SET_DEPTH1', '설정')
    this.$store.commit('SET_DEPTH2', '코드관리')
  }
}
</script>

<style>

</style>
