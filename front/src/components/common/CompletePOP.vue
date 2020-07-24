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
              <i class="iconb-compt" />
              <p class="alert-text">
                {{ this.sendData }}
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

  </section>
</div>
</template>

<script>
export default {
  name: 'CompletePOP',
  props: ['dialog', 'sendData'],
  data: () => {
    return {
    }
  },
  created () {
  },
  methods: {
    onClose () {
      this.$emit('close')
    }
  }
}
</script>

<style>

</style>
