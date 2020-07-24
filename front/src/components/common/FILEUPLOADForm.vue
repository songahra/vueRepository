
<template>
    <div id="ct">
      <section class="card">
        <input ref="fileTag" type="file" multiple="multiple" @change="selectFile"/>
        <a href="" @click.prevent="upload" :disabled="!selectedFiles.length" class="btn btn-m"><span class="hide">업로드</span></a>
      </section>
    </div>
</template>

<script>
import { postFile } from '@/api/File.js'

export default {
  name: 'FILEUPLOADForm.vue',
  components: {

  },
  data: () => {
    return {
      selectedFiles: [],
      currentFile: ''
    }
  },
  mounted () {
    // UploadService.getFiles().then(response => {
    //   this.fileInfos = response.data
    // })
  },
  methods: {
    selectFile () {
      console.log('select File 함수')
      this.selectedFiles = this.$refs.fileTag.files
      console.log('selectFile << file >> : ', this.$refs.fileTag.files)
    },
    async upload (file) {
      console.log('upload 함수')

      this.currentFile = this.selectedFiles
      console.log('this.currentFile', this.currentFile)
      const formData = new FormData()

      for (var i = 0, afile; (afile = this.selectedFiles[i]); i++) {
        formData.append('attachFile', afile)
      }
      formData.append('post_id', 'id')
      formData.append('post_type', 't')

      console.log('myFile', formData)
      const { data } = await postFile(formData)
      alert(data + '개의 파일이 업로드 되었습니다.')
    }
  }
}
</script>

<style>

</style>
