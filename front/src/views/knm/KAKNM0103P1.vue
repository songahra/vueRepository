<!-- 기술문의 프로젝트 조회 리스트 화면 -->
<template>
  <v-dialog
    v-model="dialog"
    persistent
    max-width="50%"
  >
    <!--   <KAKNM0103Form @close="() => {isDialog=false}"></KAKNM0103Form> -->
    <KAKNM0103Form @close="close" @checkedbtn="checkedbtn"></KAKNM0103Form>
    <!-- <v-btn @click.prevent="close">취소</v-btn> -->
  </v-dialog>
</template>

<script>
import KAKNM0103Form from '@/components/knm/KAKNM0103Form.vue'

export default {
  components: {
    KAKNM0103Form
  },
  data () {
    return {
      isDialog: ''
    }
  },
  props: ['dialog'],
  methods: {
    close () {
      console.log('parent-close')
      this.$emit('close')
    },
    checkedbtn (params) {
      console.log('2 checkedbtn')
      console.log('2 params ', params)
      this.$emit('checkedbtn', params)
    }
  }
}
</script>

<style>

</style>
