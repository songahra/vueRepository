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
            src="https://cdn.vuetifyjs.com/images/cards/store.jpg"
          />
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
                <div>소속회사 {{ company }}</div>
              </v-card-text>
            </v-col>

            <v-col>
              <v-card-text class="text--primary">
                <div>담당 솔루션 {{ solution }}</div>
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
    <v-card-actions>
      <input
        type="file"
        @change="onFileSelected"
      >
      <v-btn @click="onUpload">
        업로드
      </v-btn>
      <img :src="`data:image/png;base64, ${data}`">
      {{ uploadData }}
      <p>{{ decodedStr }}</p>
    </v-card-actions>
  </v-card>
</template>

<script>
import { userType, userSolution } from '@/api/login.js'
import { formData } from '@/api/Signup.js'
// import axios from 'axios'
export default {
  data: () => {
    return {
      usertype: '',
      solution: '',
      imageBytes: '',
      selectedFile: null,
      uploadData: ''
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
    this.userSolution()
  },
  methods: {
    onFileSelected (event) {
      console.log(event)
      this.selectedFile = event.target.files[0]
      console.log(this.selectedFile)
    },
    async onUpload () {
      try {
        var fd = new FormData()
        fd.append('image', this.selectedFile)
        console.log(fd)

        const { data } = await formData(fd)
        this.decodedStr = atob(data)
        console.log(data)
        const uploadData = this.data
        console.log(this.decodedStr)
        console.log(uploadData)
      } catch (error) {
      } finally {

      }
      // axios.post('http://localhost:8080/api/prm/upload', fd, {
      // }).then((res) => { console.log(res) })
    },
    userType () {
      const type = this.$store.state.usertype
      this.usertype = userType(type)
    },
    userSolution () {
      const code = this.$store.state.solution
      this.solution = userSolution(code)
    },

    handleImage (event) {
      const selectedImage = event.target.files[0]
      this.createBase64Image(this.selectedImage)
      console.log(this.createBase64Image(selectedImage))
    },

    createBase64Image (fileObject) {
      const reader = new FileReader()
      reader.onload = (e) => {
        this.image = e.target.result
        console.log(this.image)
      }
      this.imageBytes = reader.readAsBinaryString(fileObject)
    },
    updateProfile () {
      this.$router.push('/')
    }

  }
}
</script>

<style>

</style>
