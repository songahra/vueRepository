<template>
 <div id="modal2" class="modal fade" tabindex="-1" role="dialog">
      <v-dialog
        v-model="dialog"
        persistent
        max-width="50%"
      >
        <v-card>
          <v-container fluid>

              <div class="modal-dialog modal-dialog-centered modal-dialog-alert">
                <div class="modal-content">
                  <div class="modal-body">
                    <i class="iconb-warn"></i>
                    <p class="alert-text">질문하신 내용에 대해 추가 질문이 필요하신가요? </p>
                  </div>
                  <div class="modal-footer">
                    <button type="button" class="btn" data-dismiss="modal"  @click="reQuestion">다시질문하기</button>
                    <button type="button" class="btn btn-primary"  @click="reQuClose">닫기</button>
                  </div>
                </div>
              </div>
          </v-container>
        </v-card>
      </v-dialog>
</div>
</template>

<script>
import { srchQuId } from '@/api/knm/Question.js'

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
  async created () {
    const formData = {
      question_id: this.$route.params.question_id
    }
    const { data } = await srchQuId(formData)
    this.question_id = data.question_id
    this.userid = this.$store.state.userid
  },
  computed: {
    user_id () {
      return this.$store.state.userid
    }
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
