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
            class="btn"
            @click="updateProfile"
          >
            <span>편집</span>
          </v-btn>
        </v-toolbar>

        <div class="modal-content">
          <v-row justify="space-between">
            <v-col
              cols="auto"
            >
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
                <div
                  class="form-group"
                  style="
    width: 222px;
"
                >
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
                    readonly
                  >
                </div>

                <div class="form-group">
                  <label class="control-label">솔루션명</label>
                  <input
                    v-model="solution"
                    type="text"
                    dense
                    solo
                    class="form-control compact-form"
                    readonly
                  >
                </div>

                <div class="form-group">
                  <label class="control-label">권한</label>
                  <input
                    v-model="usertype"
                    type="text"
                    dense
                    solo
                    class="form-control compact-form"
                    readonly
                  >
                </div>

                <v-card-actions
                  xs10
                  style="
    padding-left: 0px;
"
                >
                  <!-- <input
        type="file"
        @change="onFileSelected"
      > -->
                  <!-- accept 클릭했을 때 이미지 파일만 뜨게해주는 역할 -->
                  <div
                    class="form-group"
                    style="
    margin-top: 5px;
"
                  >
                    <v-file-input
                      v-model="image"
                      style="margin-left: 0px;"
                      outlined
                      dense
                      :rules="rules"
                      accept="image/*"
                      placeholder="사진업로드"
                      prepend-icon="mdi-camera"
                      @change="onUpload"
                    />
                  </div>
                  <v-alert
                    v-model="alert"
                    dense
                    type="error"
                  >
                    이미지 파일만 업로드 하세요
                  </v-alert>
                </v-card-actions>
              </v-row>
            </v-col>
          </v-row>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { userType, userSolution } from '@/api/log/Login.js'
import { formData } from '@/api/Signup.js'
import { selectProfile } from '@/api/Profile.js'

export default {
  data: () => {
    return {
      usertype: '',
      solution: '',
      imageBytes: '',
      selectedFile: null,
      uploadData: '',
      imgSrc: '',
      image: null,
      rules: [
        value => !value || value.size < 2000000 || 'Avatar size should be less than 2 MB!' + value.type
      ],
      alert: false
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
      console.log('컴퓨티드에 있는 user_id 함수가 실행된다')
      return this.$store.state.userid
    },
    company: function () {
      return this.$store.state.company
    },
    dept: function () {
      return this.$store.state.dept
    }
  },
  mounted () {
  },
  async created () {
    this.userType()
    this.userSolution()

    const userdata = {
      user_id: this.$store.state.userid
    }
    console.log(userdata)
    const { data } = await selectProfile(userdata)
    console.log(data === '')
    this.imgSrc = data
    console.log(this.imgSrc)
  },
  methods: {
    async onUpload () {
      try {
        var fd = new FormData()
        const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'] // 이미지 파일만 업로드
        if (!allowedTypes.includes(this.image.type)) {
          this.alert = true // 이미지 파일이 아닐 경우 alert 창 띄움
        } else {
          this.alert = false
          console.log('이미지파일 맞음')
          console.log(this.image.type === 'image/*')
          fd.append('profile_image', this.image)
          fd.append('user_id', this.user_id)
          const { data } = await formData(fd)
          this.imgSrc = data
        }
      } catch (error) {
      } finally {

      }
    },
    userType () {
      const type = this.$store.state.usertype
      this.usertype = userType(type)
    },
    userSolution () {
      const code = this.$store.state.solution
      console.log('code뭐가 있지?', code)
      this.solution = userSolution(code)
      console.log('solution뭐가 있지?', this.solution)
    },

    updateProfile () {
      this.$router.push('/profileUpdate') // 프로필 수정화면으로 이동
    },
    pointPage () {
      this.$router.push('/point') // 포인트 화면으로 이동
    }

  }
}
</script>

<style>

</style>
