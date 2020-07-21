<template>
    <div id="ct">
        <section class="card">
            <KAKNM0101Form @srchList="srchList"></KAKNM0101Form>
            <KAKNM01ListForm ref="list"></KAKNM01ListForm>
            <!-- <KAKNM01ListForm ></KAKNM01ListForm> -->
        </section>
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
      this.$refs.list.allListChange(this.srchData)
    }
  }
}
</script>

<style>

</style>
