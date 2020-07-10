<template>
  <v-card class="mx-auto">
    <v-toolbar

      height="50"
      color="#FFFFF"
    >
      <v-tabs>
        <v-tab>프로필 관리</v-tab>
        <v-tab>지식 포인트</v-tab>
      </v-tabs>
      <v-btn @click="updateProfile">
        <span>편집</span>
      </v-btn>
    </v-toolbar>

    <v-container fluid>
      <v-row>
        <v-col
          cols="auto"
        >
          <v-img
            height="300"
            width="300"
            :src="get_img_src"
          >
            <template v-slot:placeholder>
              <v-row
                class="fill-height ma-0"
                align="center"
                justify="center"
              >
                <v-progress-circular
                  indeterminate
                  color="grey lighten-5"
                />
              </v-row>
            </template>
          </v-img>
        </v-col>

        <v-col
          class="pl-0"
        >
          <v-row
            class="flex-column ma-0 fill-height"
          >
            <v-col>
              <v-card-text class="text--primary">
                <div>이름 {{ user_name }}</div>
              </v-card-text>
            </v-col>

            <v-col>
              <v-card-text class="text--primary">
                <div>이메일 {{ user_id }}</div>
              </v-card-text>
            </v-col>

            <v-col>
              <v-card-text class="text--primary">
                <div> {{ user_id }}</div>
              </v-card-text>
            </v-col>

            <v-col>
              <v-card-text class="text--primary">
                <div>소속회사 {{ company }}</div>
              </v-card-text>
            </v-col>

            <v-col>
              <v-card-text class="text--primary">
                <div>담당 솔루션 {{ solution }} </div>
              </v-card-text>
            </v-col>

            <v-col>
              <v-card-text class="text--primary">
                <div>권한 {{ usertype }}</div>
              </v-card-text>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
    <v-card-actions xs10>
      <!-- <input
        type="file"
        @change="onFileSelected"
      > -->
      <!-- accept 클릭했을 때 이미지 파일만 뜨게해주는 역할 -->
      <v-card-text class="d-inline pa-2">
        <v-file-input
          v-model="image"
          :rules="rules"
          accept="image/*"
          placeholder="Pick an avatar"
          prepend-icon="mdi-camera"
          label="Avatar"
          @change="onUpload"
        />
      </v-card-text>
      <v-alert
        v-model="alert"
        dense
        type="error"
      >
        이미지 파일만 업로드 하세요
      </v-alert>
    </v-card-actions>
  </v-card>
</template>

<script>
import { userType, userSolution } from '@/api/Login.js'
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
    this.imgSrc = data
    console.log(this.imgSrc)
  },
  methods: {
    // onFileSelected (event) {
    //   console.log(event)
    //   // this.selectedFile = event.target.files[0]
    //   this.selectedFile = this.event.target.files[0]
    //   console.log(this.selectedFile)
    //   console.log(this.selectedFile.size)
    //   console.log(this.selectedFile.type)
    //   console.log(this.selectedFile.type === 'image/*')
    // },
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
      this.solution = userSolution(code)
    },

    updateProfile () {
      this.$router.push('/profileUpdate') // 프로필 수정화면으로 이동
    }

  }
}
</script>

<style>

</style>
