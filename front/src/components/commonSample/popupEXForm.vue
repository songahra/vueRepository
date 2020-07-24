<!-- 완료 팝업 component sample form vue-->
<!-- 확인 버튼을 눌렀을 때 팝업이 나온다 -->
<template>
  <div id="ct">
    <section class="card">
        <a  @click.prevent="onSubmit()" class="btn btn-primary"><span class="hide">확인</span></a>
        <alert :dialog="isDialog" :sendData="alertContent" @close="isDialog=false"></alert>
    </section>
  </div>
</template>

<script>
import alert from '@/components/common/CompletePOP.vue'
export default {
  name: 'popupEXForm',
  components: {
    alert
  },
  data: () => {
    return {
      isDialog: false,
      // 알림 보낼 내용 넣어주는 변수
      alertContent: ''
    }
  },
  methods: {
    onSubmit () {
      console.log('popoup onsubmit')
      // 알림창에 띄워줄 데이터를 alertContent에 넣어주면 된다.
      this.alertContent = 'aaaa'
      console.log('1. alertContent', this.alertContent)
      this.isDialog = true
    }
  }
}
</script>

<style>

</style>
