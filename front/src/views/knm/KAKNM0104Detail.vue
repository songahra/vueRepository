<!-- 지식관리 질문상세보기 -->
<template>
  <div id="ct">
    <section class="card">
      <div>
        <KAKNM0104Form />
      </div>
    </section>
  </div>
</template>

<script>
import KAKNM0104Form from '@/components/knm/KAKNM0104Form.vue'
import { expToken } from '@/api/log/Login.js'
export default {
  components: {
    KAKNM0104Form
  },
  data () {
    return {

    }
  },
  computed: {
    user_id: function () {
      console.log(' computed userid ', this.$store.state.userid)
      return this.$store.state.userid
    },
    param_chk () {
      console.log(' computed param ', this.$route.params)
      return this.$route.params
    },
    answer_id_chk () {
      return this.$route.params.answer_id
    }

  },
  created () {
    const exp = this.$store.state.exp
    expToken(exp)
    this.$store.commit('SET_DEPTH1', '지식관리')
    this.$store.commit('SET_DEPTH2', '상세보기')
  }

}
</script>

<style>

</style>
