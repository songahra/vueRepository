<template>
 <KAKNM0105Form :sendData='paramData'></KAKNM0105Form>
</template>

<script>
import KAKNM0105Form from '@/components/knm/KAKNM0105Form.vue'

export default {
  name: 'KAKNM0105Modify',
  components: {
    KAKNM0105Form
  },
  data () {
    return {
      userid: ''
      // paramData: []
    }
  },
  created () {
    console.log('1. created dd', this.$route.params)
    // this.userid = this.$store.state.userid
    // this.paramData = this.$route.params
    console.log('2. created dd', this.paramData)
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
  }
}
</script>

<style>

</style>
