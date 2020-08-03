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
                  <tr v-if="files == ''">
                    <td><span class="placeholder">첨부할 파일을 선택해 주세요.</span></td>
                    <td></td>
                    <td>0kbytes</td>
                    <td class="text-nowrap">
                      <button type="button" class="btn" :disabled="!files.length">다운로드</button>
                    </td>
                  </tr>
                <tr :key= "index" v-for= "(file, index ) in files" >
                  <td><span>{{ file.org_file_name }}</span></td>
                  <td>{{ file.file_ext_name }}</td>
                  <td>{{ file.file_size / 1000 }} KBytes</td>
                  <td class="text-nowrap">
                    <button type="button" class="btn" @click="download(file.save_file_name, file.org_file_name)">다운로드</button>
                    <button type="button" class="btn" @click="delFile(file.file_id, file.save_file_name, index)">삭제</button>
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
                <alert :dialog="isDialog" :sendData="alertContent" @close="isDialog=false"></alert>
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
</template>

<script>
import { getFileList, download, delFile, postFile } from '@/api/File.js'
import alert from '@/components/common/CompletePOP.vue'

export default {
  name: 'FILEUPLOADForm.vue',
  components: {
    alert
  },
  data: () => {
    return {
      files: [],
      postId: 'id',
      // alert
      isDialog: false,
      alertContent: '',
      // file upload
      selectedFiles: [],
      temp: [],
      currentFile: ''
    }
  },
  created () {
    this.getList()
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
    async getList () {
      const a = {
        params: {
          postId: this.postId
        }
      }
      const { data } = await getFileList(a)
      // this.files = data
      for (var i = 0, l = data.length; i < l; i++) {
        console.dir(data[i])
        this.files.push(data[i])
      }
    },
    fileDel (index) {
      this.files.splice(index, 1)
    },
    async delFile (fileId, fileName, fileIndex) {
      console.log('file delete ', fileId)
      const da = {
        params: {
          fileId: fileId,
          fileName: fileName
        }
      }
      await delFile(da)
      console.log('this.fileDel(fileIndex) : ', fileIndex)
      this.alertContent = '파일이 삭제되었습니다.'
      this.isDialog = true
      this.fileDel(fileIndex)
    },
    async download (fileSName, fileOName) {
      console.log('file download', fileSName)
      await download(fileSName)
        .then(res => {
          const url = window.URL.createObjectURL(new Blob([res.data], { type: res.headers['content-type'] }))
          const link = document.createElement('a')
          link.href = url
          link.setAttribute('download', fileOName)
          document.body.appendChild(link)
          link.click()
        })
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
