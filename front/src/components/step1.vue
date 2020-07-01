<template>
  <div>
    <v-checkbox
      v-model="selected"
      :label="`아래 모든 항목에 동의합니다`"
      @click.native.stop="selectAll()"
    />
    <!-- <v-checkbox v-model="isCheckAll" :label="`아래 모든 항목에 동의합니다 ${isCheckAll.toString()}`"></v-checkbox> -->
    <slot
      class="text-center"
      name="body"
    >
      <p>이용약관 (필수)</p>
      <v-checkbox
        v-model="checkbox[0]"
        class="checkbox"
        :label="'동의합니다'"
        @click.native.stop
      />
      <p>개인정보 수집 및 이용 (필수)</p>
      <v-checkbox
        v-model="checkbox[1]"
        class="checkbox"
        :label="'동의합니다'"
        @click.native.stop
      />
      <p>이벤트 및 정보 수신 안내 (선택)</p>
      <v-checkbox
        v-model="checkbox[2]"
        class="checkbox"
        :label="'동의합니다'"
        @click.native.stop
      />
      <v-textarea
        solo
        name="input-7-1"
        filled
        disabled
        label="이용약관 (필수) "
        auto-grow
        value="약관동의"
      />
    </slot>
  </div>
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
      for (const i in this.checkbox) {
        this.checkbox[i] = this.selected
      }
    } //
  }//
}
</script>

<style>

</style>
