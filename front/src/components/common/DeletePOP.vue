<template>
<div id="ct">
  <section class="card">

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
              <i class="iconb-warn"></i>
              <p class="alert-text">
                삭제하시겠습니까?
              </p>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn" data-dismiss="modal" @click.prevent="onClose">취소</button>
              <button type="button" class="btn btn-primary" @click.prevent="onDelete">확인</button>
            </div>
          </div>
        </div>
      </div>
    </v-dialog>

  </section>
</div>
</template>

<script>
export default {
  name: 'DeletePOP',
  props: ['dialog'],
  data: () => {
    return {
      isDialog: ''
    }
  },
  created () {
  },
  methods: {
    onClose () {
      this.$emit('close')
    },
    onDelete () {
      this.$emit('postDelete')
    }
  }
}
</script>

<style>

</style>
