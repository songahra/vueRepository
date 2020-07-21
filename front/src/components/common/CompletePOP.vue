<template>
  <v-app>
    <v-dialog
      v-model="dialog"
      persistent
    >
      <!-- 알림_complete -->
      <div
        id="modal1"
        class="modal fade show"
        tabindex="-1"
        style="display: block;"
        role="dialog"
        aria-modal="true"
      >
        <div class="modal-dialog modal-dialog-centered modal-dialog-alert">
          <div class="modal-content">
            <div class="modal-body">
              <i class="iconb-compt" />
              <p class="alert-text">
                상세 정보가 수정되었습니다
              </p>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-primary"
                data-dismiss="modal"
                @click.prevent="onClose"
              >
                확인
              </button>
            </div>
          </div>
        </div>
      </div>
    </v-dialog>
  </v-app>
</template>

<script>
export default {
  props: ['dialog'],
  methods: {
    onClose () {
      this.$emit('close')
    }
  }
}
</script>

<style>

</style>
