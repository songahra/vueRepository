<template>
    <div id="ct">
      <section class="card">
        <v-dialog
            v-model="dialog"
            persistent
            max-width="50%"
        >
            <v-card>
                <v-card-title class="headline">답변하신 내용을 삭제하시겠습니까?</v-card-title>
                <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                    color="green darken-1"
                    text
                    @click="deleteAnswer"
                >
                    확인
                </v-btn>
                <v-btn
                    color="green darken-1"
                    text
                @click="close"
                >
                    취소
                </v-btn>

                </v-card-actions>
            </v-card>
        </v-dialog>
      </section>
    </div>
</template>

<script>
// import { delAnswer } from '@/api/knm/Answer.js'
export default {
  name: 'KAKNM0203Form',
  props: ['dialog', 'sendData'],
  data: () => {
    return {
      isDialog: ''
    }
  },
  methods: {
    close () {
      console.log('popup close called!!!')
      this.$emit('close')
    },
    deleteAnswer () {
      console.log('pop up delete answer Called!!')
      this.$emit('ansDelete')
    }
  }

}
</script>

<style>

</style>
