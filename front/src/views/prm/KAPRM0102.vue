<template>
  <div id="ct">
    <section class="card">
      <header
        class="card-header"
        style="padding: 1.6rem 1rem;"
      >
        <h2 class="card-title">
          <span class="i-rounded bg-danger"><i class="icon-user" /></span>My page
        </h2>
      </header>
      <div class="card-body">
        <!--  flat="false" -> 그림자 없애줌 -->
        <v-toolbar
          flat
          md-elevation="0"
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
            style="
    margin-right: 5px;
"
            class="btn"
            @click="() => {this.$router.go(-1)}"
          >
            <!-- 이전 단계로 이동-->
            <span>취소</span>
          </v-btn>
          <v-btn
            class="btn"
            @click="submitForm"
          >
            <span>확인</span>
          </v-btn>
        </v-toolbar>

        <div class="modal-content">
          <v-row justify="space-between">
            <v-col cols="auto">
              <v-img
                height="300"
                width="300"
                :src="get_img_src"
              />
            </v-col>

            <v-col
              cols="auto"
              class="text-center pl-0"
              style="
    margin-left: 20px;
"
            >
              <v-row
                class="flex-column ma-0 fill-height"
                justify="center"
              >
                <div class="form-group">
                  <label class="control-label">이름</label>
                  <input
                    v-model="user_name"
                    type="text"
                    dense
                    solo
                    readonly
                    class="form-control compact-form"
                  >
                </div>

                <div class="form-group">
                  <label class="control-label">이메일</label>
                  <input
                    v-model="user_id"
                    type="text"
                    dense
                    solo
                    readonly
                    class="form-control compact-form"
                  >
                </div>

                <div class="form-group">
                  <v-row
                    style="
    margin-left: 0px;
"
                  >
                    <label class="control-label">비밀번호</label>
                    <button
                      type="button"
                      class="btn"
                      style="
    margin-left: 20px;
"
                      depressed
                      color="primary"
                      @click.prevent="addBoard"
                      @close="isAddBoard=false"
                    >
                      비밀번호 변경
                    </button>
                  </v-row>
                </div>

                <div class="form-group">
                  <label class="control-label">소속회사</label>
                  <input
                    v-model="company"
                    type="text"
                    dense
                    solo
                    readonly
                    class="form-control compact-form"
                  >
                </div>

                <div class="form-group">
                  <label class="control-label">부서</label>
                  <input
                    v-model="dept"
                    type="text"
                    dense
                    solo
                    class="form-control compact-form"
                  >
                </div>

                <div>
                  <label
                    class="control-label"
                    style="
    padding-top: 30px;
"
                  >솔루션명</label>
                  <v-combobox
                    v-model="solution"
                    class="form-control compact-form"
                    :items="items"
                    dense
                    solo
                    item-text="codeContent"
                    item-value="codeId"
                    @change="selectSolution"
                  />
                </div>

                <div>
                  <label
                    class="control-label"
                    style="
    padding-top: 30px;
"
                  >담당</label>
                  <v-combobox
                    v-model="user_type"
                    class="form-control compact-form"
                    :items="items2"
                    label="권한"
                    dense
                    solo
                    item-text="name"
                    item-value="code"
                    @change="selectType"
                  />
                </div>
              </v-row>
            </v-col>
          </v-row>
        </div>
        <v-card-actions>
          <Modal
            :dialog="isAddBoard"
            @close="isAddBoard=false"
          />
          <Alert
            :dialog="completeAlert"
            @close="completeAlert=false"
          />
        </v-card-actions>
      </div>
    </section>
  </div>
</template>

<script>
import { userType, userSolution, getSolution } from '@/api/log/Login.js'
import { updateProfile, selectProfile } from '@/api/Profile.js'
import Modal from '@/components/prm/KAPRM0103.vue' // 1. 비밀번호 변경 모달
import Alert from '@/components/common/CompletePOP.vue' // 완료 alert

export default {
  components: {
    Modal,
    Alert
  },
  data: () => {
    return {
      isAddBoard: false,
      completeAlert: false,
      imgSrc: '',
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
    get_img_src () {
      return 'data:image;base64,' + this.imgSrc
    },
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
  async mounted () {
    console.log('mounted')
    const userdata = {
      user_id: this.$store.state.userid
    }
    const { data } = await selectProfile(userdata)
    this.imgSrc = data
  },
  async created () {
    const { data } = await getSolution() // 솔루션 목록 가져오기

    console.log('data: ', data)
    this.items = data
    this.userType()
    this.code = this.$store.state.solution // 솔루션 코드 저장
    console.log('code는?' + this.code)
    this.solution = userSolution(this.code)
    console.log('솔루션명은?' + this.solution) // 솔루션 명 저장

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
      console.log('submitForm 실행')
      const userData = {
        dept: this.dept,
        solution: this.code,
        user_type: this.typeCode,
        user_id: this.user_id
      }
      console.log(userData)
      await updateProfile(userData).then((res) => {
        // alert(res.data)
        if (res.status === 200) {
          console.log('status200 맞나요?' + res.status)
          console.log('this.code모지??' + this.code)

          // 회원 정보 수정 됐을 때 vue에 있는 data도 변경되어야함..
          this.$store.commit('SET_DEPT', userData.dept)
          this.$store.commit('SET_SOLUTION', this.code)
          this.$store.commit('SET_USERTYPE', this.typeCode)
          this.completeAlert = true
          console.log('this.completeAlert', this.completeAlert)
        }
      }
      )
    }
  }
}
</script>

<style>
.form-group{position: relative}
.form-group i{position: absolute; right: 9px; top: 9px;}
.form-group img{ width: 1.2rem; position: absolute; right: 7px; top: 7px}

</style>
