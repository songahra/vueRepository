<!-- 삭제 팝업 delete sample form vue-->
<!-- 확인 버튼을 눌렀을 때 팝업이 나온다 -->
<template>
  <div id="ct">
    <section class="card">
        <a  @click.prevent="onSubmit()" class="btn btn-primary"><span class="hide">삭제</span></a>
        <alert :dialog="isDialog" @postDelete = "postDelete" @close="isDialog=false"></alert>
    </section>
  </div>
</template>

<script>
import alert from '@/components/common/DeletePOP.vue'
export default {
  name: 'deletePOPForm',
  components: {
    alert
  },
  data: () => {
    return {
      isDialog: false
    }
  },
  methods: {
    onSubmit () {
      // 삭제 버튼을 눌렀을 때 (팝업 띄우기)
      this.isDialog = true
    },
    postDelete () {
      // 팝업에서 삭제 버튼 눌렀을 때
      // 글 삭제하는 함수 선언
      this.isDialog = false
      console.log('delete')
    }
  }
}
</script>

<style>

</style>
