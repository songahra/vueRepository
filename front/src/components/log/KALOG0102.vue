<template>
  <!-- 회원가입 -->
  <v-app id="app">
    <div class="modal-content">
      <div class="modal-header">
        <!-- <h2 class="modal-title">
          회원가입 시 약관동의
        </h2> -->
        <!-- <button
          type="button"
          class="btn-icon"
          data-dismiss="modal"
          aria-label="Close"
        >
          <i class="icon-close" />
        </button> -->
      </div>
      <div class="modal-body modal-body-ct">
        <div
          class="sub-bar"
          style="border-bottom: 1px solid #f0f1f6"
        >
          <label class="custom-control custom-checkbox">
            <input
              v-model="selected"
              type="checkbox"
              class="custom-control-input"
              @click="selectAll"
            >
            <span class="custom-control-label" />
          </label>
          <p class="font-weight-bold">
            전체약관의 동의합니다.
          </p>
        </div>
        <div
          class="sub-bar"
          style="border-bottom: 1px solid #f0f1f6"
        >
          <label class="custom-control custom-checkbox">
            <input
              v-model="checkbox[0]"
              type="checkbox"
              class="custom-control-input"
            >
            <span class="custom-control-label" />
          </label>
          <p class="font-weight-bold">
            이용약관(필수)
          </p>
        </div>
        <div
          class="form-group"
          style="margin-bottom: 20px;"
        >
          <textarea
            class="form-control"
            rows="3"
            style="height: 150px;"
            disabled
          >
                                제 1조 개인정보의 처리목적
                                ① 회사는 다음의 목적을 위하여 개인정보를 처리합니다. 처리하고 있는 개인정보는 다음의 목적 이외의 용도로 이용되지 않으며, 이용 목적이 변경되는 경우에는 개인정보보호법 제 18조에 따라 별도의 동의를 받는 등 필요한 조치를 이행할 예정입니다.

                                1. 채용:입사전형 진행, 입사 지원서 수정, 합격 여부 확인, 입사 지원자와의 원활한 의사소통, 자격증빙 확인
                                2. 고객 상담 및 기술지원
                                3. 윤리 상담 및 제보: 윤리상담 및 제보 접수 및 처리결과 회신

                                ② 회사는 홈페이지(http://.co.kr)의 사용자 입력 방법으로 일부 개인정보를 수집하며, 경우에 따라 출력한 종이문서 혹은 이메일로 일부의 정보를 수집할 수도 있습니다.
                                제 2조 개인정보의 처리 및 보유기
                            </textarea>
        </div>
        <div
          class="sub-bar"
          style="border-top: 1px solid #f0f1f6"
        >
          <label class="custom-control custom-checkbox">
            <input
              v-model="checkbox[1]"
              type="checkbox"
              class="custom-control-input"
            >
            <span class="custom-control-label" />
          </label>
          <p class="font-weight-bold">
            개인정보 수집 및 이용(필수)
          </p>
        </div>
        <div
          class="form-group"
          style="margin-bottom: 20px;"
        >
          <textarea
            class="form-control"
            rows="3"
            style="height: 150px;"
            disabled
          >
                                제 1조 개인정보의 처리목적
                                ① 회사는 다음의 목적을 위하여 개인정보를 처리합니다. 처리하고 있는 개인정보는 다음의 목적 이외의 용도로 이용되지 않으며, 이용 목적이 변경되는 경우에는 개인정보보호법 제 18조에 따라 별도의 동의를 받는 등 필요한 조치를 이행할 예정입니다.

                                1. 채용:입사전형 진행, 입사 지원서 수정, 합격 여부 확인, 입사 지원자와의 원활한 의사소통, 자격증빙 확인
                                2. 고객 상담 및 기술지원
                                3. 윤리 상담 및 제보: 윤리상담 및 제보 접수 및 처리결과 회신

                                ② 회사는 홈페이지(http://.co.kr)의 사용자 입력 방법으로 일부 개인정보를 수집하며, 경우에 따라 출력한 종이문서 혹은 이메일로 일부의 정보를 수집할 수도 있습니다.
                                제 2조 개인정보의 처리 및 보유기
                            </textarea>
        </div>
        <div
          class="sub-bar"
          style="border-top: 1px solid #f0f1f6"
        >
          <label class="custom-control custom-checkbox">
            <input
              v-model="checkbox[2]"
              type="checkbox"
              class="custom-control-input"
            >
            <span class="custom-control-label" />
          </label>
          <p class="font-weight-bold">
            이벤트 및 광고 수신 안내(선택)
          </p>
        </div>
        <div class="form-group">
          <textarea
            class="form-control"
            rows="3"
            style="height: 150px;"
            disabled
          >
                                제 1조 개인정보의 처리목적
                                ① 회사는 다음의 목적을 위하여 개인정보를 처리합니다. 처리하고 있는 개인정보는 다음의 목적 이외의 용도로 이용되지 않으며, 이용 목적이 변경되는 경우에는 개인정보보호법 제 18조에 따라 별도의 동의를 받는 등 필요한 조치를 이행할 예정입니다.

                                1. 채용:입사전형 진행, 입사 지원서 수정, 합격 여부 확인, 입사 지원자와의 원활한 의사소통, 자격증빙 확인
                                2. 고객 상담 및 기술지원
                                3. 윤리 상담 및 제보: 윤리상담 및 제보 접수 및 처리결과 회신

                                ② 회사는 홈페이지(http://.co.kr)의 사용자 입력 방법으로 일부 개인정보를 수집하며, 경우에 따라 출력한 종이문서 혹은 이메일로 일부의 정보를 수집할 수도 있습니다.
                                제 2조 개인정보의 처리 및 보유기
                            </textarea>
        </div>
      </div>
    </div>
  </v-app>
</template>

<script>
export default {

  data: () => {
    return {
      checkbox: {},
      selected: false,
      isDisabled: true
    }
  },
  mounted () {
    for (let i = 0; i < 3; i++) {
      this.$set(this.checkbox, i, false)
    }
    this.$store.commit('SET_ISDIS', this.isDisabled = true)
  },
  updated () {
    console.log('데이터가 변경된 후 호출됩니다.')
    if (this.checkbox[0] === true && this.checkbox[1] === true) {
      console.log('this.checkbox[0,1]가 트루')
      this.isDisabled = false
      console.log(this.isDisabled)
      // 스토어 저장
      this.$store.commit('SET_ISDIS', this.isDisabled)
      //
    } else {
      this.isDisabled = true
      this.$store.commit('SET_ISDIS', this.isDisabled)
    }
  },
  methods: {
    selectAll () {
      this.selected = !this.selected
      for (const i in this.checkbox) {
        this.checkbox[i] = this.selected
      }
    } //
  }//
}
</script>

<style>

</style>
