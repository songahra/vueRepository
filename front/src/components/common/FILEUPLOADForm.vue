
<template>
    <div id="ct">
      <section class="card">
        <div class="form-group">
          <div class="sub-bar">
              <i class="icon-right text-danger"></i><p class="font-weight-bold">첨부파일</p>
              <div class="ml-auto form-inline m-full">
                <label>
                  <input ref="fileTag" type="file" class="sr-only" multiple="multiple" @change="selectFile()"/>
                  <span class="btn">파일 선택</span>
                  <button type="button" @click.prevent="upload" class="btn">업로드</button>
                </label>
              </div>
          </div>
          <div class="table-responsive">
            <table class="table">
              <colgroup>
                <col style="width: 25%">
                <col style="width: 40%">
                <col>
                <col style="width: 1%">
              </colgroup>
              <thead>
                <tr>
                  <th scope="col">이름</th>
                  <th scope="col">타입</th>
                  <th scope="col">크기</th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>
                  <tr v-if="selectedFiles == ''">
                    <td><span class="placeholder">첨부할 파일을 선택해 주세요.</span></td>
                    <td></td>
                    <td>0kbytes</td>
                    <td class="text-nowrap">
                      <button type="button" class="btn" :disabled="!selectedFiles.length"><i class="icon-delete"/>삭제</button>
                    </td>
                  </tr>
                <tr :key= "index" v-for= "(file, index ) in selectedFiles" >
                  <td><span>{{ file.name }}</span></td>
                  <td>{{ file.type }}</td>
                  <td>{{ file.size / 1000 }} KBytes</td>
                  <td class="text-nowrap">
                    <button type="button" class="btn" @click="fileDel(index)"><i class="icon-delete"/>삭제</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
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
      temp: [],
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
      console.log('selectFile << file >> : ', this.$refs.fileTag.files)
      var files = this.$refs.fileTag.files
      for (var i = 0, l = files.length; i < l; i++) {
        console.dir(files[i])
        this.selectedFiles.push(files[i])
      }
    },
    fileDel (index) {
      this.selectedFiles.splice(index, 1)
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
