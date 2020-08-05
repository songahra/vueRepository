<template>
  <div id="ct">
    <section class="card">
       <KADSB0101Form></KADSB0101Form>
    </section>
  </div>
</template>

<script>
import KADSB0101Form from '@/components/dsb/KADSB0101Form.vue'

export default {
  components: {
    KADSB0101Form
  },
  data () {
    return {

    }
  },
  created () {
    this.$store.commit('SET_DEPTH1', '대시보드')
    this.$store.commit('SET_DEPTH2', ' ')
  }
}
</script>

<style>

</style>
