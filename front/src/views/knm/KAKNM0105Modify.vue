<template>
  <div id="ct">
    <section class="card">
      <KAKNM0105Form :send-data="paramData" />
    </section>
  </div>
</template>

<script>
import KAKNM0105Form from '@/components/knm/KAKNM0105Form.vue'

export default {
  name: 'KAKNM0105Modify',
  components: {
    KAKNM0105Form
  },
  props: ['sendData'],
  data () {
    return {
      userid: ''
      // paramData: []
    }
  },
  computed: {
    useri_id: function () {
      console.log(' computed userid ', this.$store.state.userid)
      return this.$store.state.userid
    },
    param_ch () {
      console.log(' computed param ', this.$route.params)
      return this.$route.params
    }
  },
  created () {
    console.log('1. created dd', this.$route.params)
    // this.userid = this.$store.state.userid
    // this.paramData = this.$route.params
    console.log('2. created dd', this.paramData)

    this.$store.commit('SET_DEPTH1', '지식관리')
    this.$store.commit('SET_DEPTH2', '수정')
  }
}
</script>

<style>

</style>
