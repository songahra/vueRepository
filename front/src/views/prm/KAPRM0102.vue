<template>
  <v-card class="d-inline-block mx-auto">
    <v-toolbar

      height="50"
      color="#FFFFF"
    >
      <v-tabs>
        <v-tab>프로필 관리</v-tab>
        <v-tab>지식 포인트</v-tab>
      </v-tabs>
      <v-btn><span>취소</span></v-btn>
      <v-btn><span>확인</span></v-btn>
    </v-toolbar>

    <v-container>
      0
      <v-row justify="space-between">
        <v-col cols="auto">
          <v-img
            height="300"
            width="300"
            src="https://cdn.vuetifyjs.com/images/cards/store.jpg"
          />
        </v-col>

        <v-col
          cols="auto"
          class="text-center pl-0"
        >
          <v-row
            class="flex-column ma-0 fill-height"
            justify="center"
          >
            <v-col class="px-0">
              <v-card-text class="text--primary">
                <div>이름 {{ user_name }}</div>
              </v-card-text>
            </v-col>

            <v-col class="px-0">
              <v-card-text class="text--primary">
                <div>이메일 {{ user_id }}</div>
              </v-card-text>
            </v-col>

            <v-col class="px-0">
              <v-card-text class="text--primary">
                <div class="my-2">
                  비밀번호
                  <v-btn
                    depressed
                    color="primary"
                    @click.prevent="addBoard"
                    @close="isAddBoard=false"
                  >
                    비밀번호 변경
                  </v-btn>
                </div>
              </v-card-text>
            </v-col>

            <v-col class="px-0">
              <v-card-text class="text--primary">
                <div>소속회사 {{ company }}</div>
              </v-card-text>
            </v-col>

            <v-col class="px-0">
              <v-card-text class="text--primary">
                <v-combobox
                  v-model="solution"
                  :items="items"
                  label="Combobox"
                  outlined
                  dense
                  item-text="name"
                  item-value="code"
                />
              </v-card-text>
            </v-col>

            <v-col class="px-0">
              <v-card-text class="text--primary">
                <div>권한 {{ usertype }}</div>
              </v-card-text>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
    <v-card-actions>
      <v-btn
        class="ma-2"
        tile
        color="indigo"
        dark
      >
        사진업로드
      </v-btn>
      <Modal
        :dialog="isAddBoard"
        @close="isAddBoard=false"
      />
    </v-card-actions>
  </v-card>
</template>

<script>
import { userType, userSolution } from '@/api/login.js'
import Modal from '@/components/prm/KAPRM0102MODAL.vue'

export default {
  components: {
    Modal
  },
  data: () => {
    return {
      isAddBoard: false,
      code: '',
      solution: 'solution',
      items: [
        {
          name: 'iGate',
          code: 'SL010000'
        },
        {
          name: 'eCross',
          code: 'SL020000'
        },
        {
          name: 'Xtorm',
          code: 'SL030000'
        },
        {
          name: 'eXperDB',
          code: 'SL040000'
        },
        {
          name: 'Libeka',
          code: 'SL050000'
        },
        {
          name: 'iWorks',
          code: 'SL060000'
        },
        {
          name: 'iXeb',
          code: 'SL070000'
        },
        {
          name: 'APIM',
          code: 'SL080000'
        },
        {
          name: 'MyGuard',
          code: 'SL090000'
        },
        {
          name: '문서중앙화',
          code: 'SL100000'
        }
      ]
    }
  },
  computed: {
    user_name: function () {
      return this.$store.state.username
    },
    user_id: function () {
      return this.$store.state.userid
    },
    company: function () {
      return this.$store.state.company
    }
  },

  created () {
    this.userType()
    const code = this.$store.state.solution
    this.solution = userSolution(code)
    console.log(this.solution)
    console.log(code)
  },
  methods: {
    userType () {
      const type = this.$store.state.usertype
      this.usertype = userType(type)
    },
    addBoard () {
      console.log('addBoard 실행')
      this.isAddBoard = true
      console.log(this.isAddBoard)
    }
  }
}
</script>

<style>

</style>
