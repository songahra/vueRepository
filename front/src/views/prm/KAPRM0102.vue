<template>
  <v-card class="d-inline-block mx-auto">
    <v-toolbar

      height="50"
      color="#FFFFF"
    >
      <v-tabs>
        <v-tab>프로필 관리</v-tab>
        <v-tab @click="() => {this.$router.push('/point')}">
          지식 포인트
        </v-tab>
      </v-tabs>
      <v-btn
        @click="() => {this.$router.go(-1)}"
      >
        <!-- 이전 단계로 이동-->
        <span>취소</span>
      </v-btn>
      <v-btn @click="submitForm">
        <span>확인</span>
      </v-btn>
    </v-toolbar>

    <v-container>
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
                <v-text-field
                  v-model="dept"
                  label="부서"
                />
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
                  label="담당 솔루션"
                  outlined
                  dense
                  item-text="codeContent"
                  item-value="codeId"
                  @change="selectSolution"
                />
              </v-card-text>
            </v-col>

            <v-col class="px-0">
              <v-card-text class="text--primary">
                <v-combobox
                  v-model="user_type"
                  :items="items2"
                  label="권한"
                  outlined
                  dense
                  item-text="name"
                  item-value="code"
                  @change="selectType"
                />
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
import { userType, userSolution, getSolution } from '@/api/Login.js'
import { updateProfile } from '@/api/Profile.js'
import Modal from '@/components/prm/KAPRM0103.vue' // 1. 비밀번호 변경 모달

export default {
  components: {
    Modal
  },
  data: () => {
    return {
      isAddBoard: false,
      code: '',
      typeCode: '',
      dept: '',
      solution: 'solution',
      user_type: 'user_type',
      items: [],
      items2: [
        {
          name: '답변자',
          code: 'A'
        },
        {
          name: '질문자',
          code: 'Q'
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
  async created () {
    const { data } = await getSolution()

    console.log('data: ', data)
    this.items = data
    this.userType()
    this.code = this.$store.state.solution
    console.log('code는?' + this.code.code)
    this.solution = userSolution(this.code)
    this.dept = this.$store.state.dept
    console.log('this.items' + this.items)
  },
  methods: {
    selectSolution () {
      this.code = this.solution.codeId // 변경됐을 때 solution code
    },
    selectType () {
      this.typeCode = this.user_type.code // 변경됐을 때 user_type code
    },
    userType () {
      this.typeCode = this.$store.state.usertype
      this.user_type = userType(this.typeCode)
    },
    addBoard () {
      console.log('addBoard 실행')
      this.isAddBoard = true
      console.log(this.isAddBoard)
    },
    async submitForm () { // 회원 정보 수정
      const userData = {
        dept: this.dept,
        solution: this.code,
        user_type: this.typeCode,
        user_id: this.user_id
      }
      console.log(userData)
      await updateProfile(userData).then((res) => {
        alert(res.data)
        if (res.status === 200) {
          console.log('status200 맞나요?' + res.status)

          // 회원 정보 수정 됐을 때 vue에 있는 data도 변경되어야함..
          this.$store.commit('SET_DEPT', userData.dept)
          this.$store.commit('SET_SOLUTION', this.solution.codeId)
          this.$store.commit('SET_USERTYPE', this.typeCode)
        }
      }
      )
    }
  }
}
</script>

<style>

</style>
