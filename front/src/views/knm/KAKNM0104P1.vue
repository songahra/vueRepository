<template>
  <div id="ct">
    <section class="card">
      <v-dialog
        v-model="dialog"
        persistent
      >
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
                <i class="iconb-warn" />
                <p class="alert-text">
                  질문하신 내용에 대해 추가 질문이 필요하신가요?
                </p>
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn"
                  data-dismiss="modal"
                  @click.prevent="reQuestion"
                >
                  다시질문하기
                </button>
                <button
                  type="button"
                  class="btn btn-primary"
                  @click.prevent="reQuClose"
                >
                  닫기
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
import { srchQuId } from '@/api/knm/Question.js'
import { expToken } from '@/api/log/Login.js'

export default {
  name: 'KAKNM0104P1',
  props: ['dialog'],
  data: () => {
    return {
      userid: '',
      question_id: '',
      up_question_id: ''
    }
  },
  computed: {
    user_id () {
      return this.$store.state.userid
    }
  },
  async created () {
    const exp = this.$store.state.exp
    expToken(exp)
    const formData = {
      question_id: this.$route.params.question_id
    }
    const { data } = await srchQuId(formData)
    this.question_id = data.question_id
    this.userid = this.$store.state.userid
  },
  methods: {
    reQuestion () {
      const params = {
        userid: this.userid,
        question_id: this.question_id
      }
      this.$router.push({ name: 'KAKNM0102Write', params: params })
    },
    reQuClose () {
      console.log('child-close')
      this.$emit('reQuClose')
    }
  }
}
</script>

<style>

</style>
