<template>
  <div>
    <KAKNM0101Form @srchList="srchList"></KAKNM0101Form>
    <KAKNM01ListForm ref="list"></KAKNM01ListForm>
    <!-- <KAKNM01ListForm ></KAKNM01ListForm> -->
  </div>
</template>

<script>
import KAKNM0101Form from '@/components/knm/KAKNM0101From.vue'
import KAKNM01ListForm from '@/components/knm/KAKNM01ListForm.vue'

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
  methods: {
    srchList (data) {
      console.log('view srchList : ', data)
      this.srchData = data
      console.log('view srchData  : ', this.srchData)
      this.$refs.list.dataChange(this.srchData)
    }
  }
}
</script>

<style>

</style>
