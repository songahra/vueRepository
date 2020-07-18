<!-- 지식관리 질문상세보기 -->
<template>
  <div>
    <div>
      <KAKNM0104Form></KAKNM0104Form>
    </div>
    <!-- <div v-if = "answer_id === ''">
      <p>answer 내용 : {{answer_id}}</p>
    </div> -->
  </div>
</template>

<script>
import KAKNM0104Form from '@/components/knm/KAKNM0104Form.vue'

export default {
  components: {
    KAKNM0104Form
  },
  data () {
    return {

    }
  },
  computed: {
    userid1: function () {
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
