<template>
  <div id="ct">
    <section class="card">
       <KAADM0101Form></KAADM0101Form>
    </section>
  </div>
</template>

<script>
import KAADM0101Form from '@/components/adm/KAADM0101Form.vue'

export default {
  components: {
    KAADM0101Form
  },
  data () {
    return {

    }
  },
  created () {
    this.$store.commit('SET_DEPTH1', '설정')
    this.$store.commit('SET_DEPTH2', '프로젝트')
  }
}
</script>

<style>

</style>
