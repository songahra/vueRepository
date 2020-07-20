<template>
  <div class="text-center">
    <v-menu offset-y>
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          v-bind="attrs"
          icon
          v-on="on"
        >
          <v-icon>mdi-chevron-down</v-icon>
        </v-btn>
      </template>
      <div class="modal-content">
        <div class="modal-header">
          <h2 class="modal-title">
            비밀번호 변경
          </h2>
          <button
            type="button"
            class="btn-icon"
            data-dismiss="modal"
            aria-label="Close"
          >
            <i class="icon-close" />
          </button>
        </div>
        <div class="modal-body">
          <div class="form-group">
            <label class="control-label">비밀번호</label>
            <input
              type="password"
              class="form-control"
              placeholder="비밀번호를 입력해 주세요."
              required
            >
          </div>
          <div class="form-group">
            <label class="control-label">비밀번호 확인</label>
            <input
              type="password"
              class="form-control"
              placeholder="동일한 비밀번호를 입력해 주세요."
              required
            >
          </div>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn"
            data-dismiss="modal"
          >
            취소
          </button>
          <button
            type="button"
            class="btn btn-primary"
          >
            확인
          </button>
        </div>
      </div>
      <!-- <v-card
        tile
        class="modal-content"
        style="max-width: 400px;padding-left: 30px;padding-right: 30px;"
        outlined
      >
        <v-card-title>
          <v-spacer />
          <a
            class="modal-default-button"
            @click.prevent="onClose"
          >&times;</a>

          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>
                Single-line item
              </v-list-item-title>

              {{ this.$store.state.userid }}
            </v-list-item-content>
          </v-list-item>
          <div class="text-center">
            <v-btn
              block
              text
              large
              depressed
              type="submit"
            >
              로그아웃
            </v-btn>
          </div>
        </v-card-title>
      </v-card> -->
    </v-menu>
  </div>
</template>

<script>
export default {
  name: 'Modal',
  methods: {
    onClose () {
      this.$emit('close')
    }
  }
}
</script>

<style>

</style>
