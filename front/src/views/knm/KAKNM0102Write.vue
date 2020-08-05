<!-- 기술문의 등록화면 -->
<template>
  <div id="ct">
      <section class="card">
          <KAKNM0102Form></KAKNM0102Form>
      </section>
  </div>
</template>

<script>
import KAKNM0102Form from '@/components/knm/KAKNM0102Form.vue'

export default {
  components: {
    KAKNM0102Form
  },
  data () {
    return {

    }
  },
  created () {
    this.$store.commit('SET_DEPTH1', '지식관리')
    this.$store.commit('SET_DEPTH2', ' ')
  }
}
</script>

<style>

</style>
