<template>
  <div id="ct">
    <section class="card">
      <KAKNM0101Form @srchList="srchList" />
      <KAKNM01ListForm ref="list" />
      <!-- <KAKNM01ListForm ></KAKNM01ListForm> -->
    </section>
  </div>
</template>

<script>
import KAKNM0101Form from '@/components/knm/KAKNM0101From.vue'
import KAKNM01ListForm from '@/components/knm/KAKNM01ListForm.vue'
import { expToken } from '@/api/log/Login.js'

export default {
  components: {
    KAKNM0101Form,
    KAKNM01ListForm
  },
  data () {
    return {
      srchData: ''
    }
  },
  created () {
    const exp = this.$store.state.exp
    expToken(exp)
    this.$store.commit('SET_DEPTH1', '지식관리')
    this.$store.commit('SET_DEPTH2', '지식관리')
  },
  methods: {
    srchList (data) {
      console.log('view srchList : ', data)
      this.srchData = data
      console.log('view srchData  : ', this.srchData)
      this.$refs.list.allListChange(this.srchData)
    }
  }
}
</script>

<style>

</style>
