<template>
  <v-dialog
    v-model="dialog"
    persistent
    max-width="100%"
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
    checkedbtn (data1, data2) {
      console.log('data', data1, data2)
    }
  }
}
</script>

<style>

</style>
