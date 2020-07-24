<!-- 지식관리 내가문의한 질문 -->
<template>
    <div id="ct">
    <section class="card">
    <KAKNM0107Form @srchList="srchList"></KAKNM0107Form>
    <KAKNM01ListForm ref="list" :sendData="flag"></KAKNM01ListForm>
    </section>
    </div>
</template>

<script>
import KAKNM0107Form from '@/components/knm/KAKNM0107Form.vue'
import KAKNM01ListForm from '@/components/knm/KAKNM01ListForm.vue'

export default {
  components: {
    KAKNM0107Form,
    KAKNM01ListForm
  },
  data () {
    return {
      userid: this.$store.state.userid,
      srchData: '',
      flag: 'mL'
    }
  },
  created () {
    console.log('뷰 created ')
    console.log('flag  ', this.flag)
    // this.myList()
  },
  methods: {
    /* 지식관리 리스트 조회 */
    srchList (data) {
      console.log('view srchList : ', data)
      this.srchData = data
      console.log('view srchData  : ', this.srchData)
      this.$refs.list.allListChange(this.srchData)
    },
    /* 내가 문의한 질문 리스트  */
    // myList () {
    //   console.log('내가 문의한 질문 리스트 ')
    //   this.$refs.list.myList()
    // },
    /* 내가 문의한 질문 조회 리스트 */
    srchMyList (data) {
      this.srchData = data
      this.$refs.list.srchMyList(this.srchData)
    }
  }
}
</script>

<style>

</style>
