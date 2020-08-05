<template>
<!-- 지식자료실 수정 -->
<div id="ct">
    <section class="card">
      <header class="card-header" style="padding: 1.6rem 1rem;">
          <h2 class="card-title"><span class="i-rounded bg-danger"><i class="icon-file-text"></i></span>지식자료실 수정</h2>
          <div class="btn-container">
              <a href="../manual" class="btn btn-primary"><span class="hide">목록</span></a>
              <a href="" @click.prevent="upload" class="btn btn-primary"><span class="hide">저장</span></a>
          </div>
      </header>

      <div class="ct-header">
          <button type="button" class="btn-filter collapsed d-xl-none" data-toggle="collapse" data-target="#collapse-filter">검색 필터<i class="icon-down"></i></button>
          <div id="collapse-filter" class="collapse collapse-filter ">
              <div class="filter no-gutters">
                  <div class="col">
                      <label class="form-control-label">
                          <b class="control-label">제목</b>
                          <input type="text" v-model="title" class="form-control" placeholder="제목을 입력하세요.">
                      </label>
                  </div>
                <!-- <div class="filter no-gutters no-btn"> -->
            <div class="col">
                      <label class="form-control-label">
                          <b class="control-label">솔루션</b>
                          <input class="form-control" v-model="solution" title="선택하세요" readonly/>
                      </label>
                  </div>
                  <div class="col">
                      <label class="form-control-label">
                          <b class="control-label">버전</b>
                          <input type="text" v-model="version" class="form-control" placeholder="버전">
                      </label>
                  </div>
              </div>
          </div>
      </div>
      <div class="ct-content" >
        <div class="form-group form-group-editor">
          <textarea name="content" style="display:none;"></textarea>
          <div id="summernote" class="well" v-html="content"></div>
        </div>

      <div class="form-group">
          <div class="sub-bar">
              <i class="icon-right text-danger"></i><p class="font-weight-bold">첨부파일</p>
              <div class="ml-auto form-inline m-full">
                <label>
                  <input ref="fileTag" type="file" class="sr-only" multiple="multiple" @change="selectFile()"/>
                  <span class="btn">파일 선택</span>
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
                  <tr v-if="selectedFiles == '' && files == ''">
                    <td><span class="placeholder">첨부할 파일을 선택해 주세요.</span></td>
                    <td></td>
                    <td>0kbytes</td>
                    <td class="text-nowrap">
                      <!-- <button type="button" class="btn" :disabled="!selectedFiles.length"><i class="icon-delete"/>삭제</button> -->
                    </td>
                  </tr>
                  <tr :key= "index" v-for= "(file, index ) in files" >
                    <td><span>{{ file.org_file_name }}</span></td>
                    <td>{{ file.file_ext_name }}</td>
                    <td>{{ file.file_size / 1000 }} KBytes</td>
                    <td class="text-nowrap">
                        <button type="button" class="btn" @click="delFile(file.file_id, file.save_file_name, index)">삭제</button>
                    </td>
                </tr>
                <tr :key= "index" v-for= "(file, index ) in selectedFiles" >
                    <td><span>{{ file.name }}</span></td>
                    <td>{{ file.type }}</td>
                    <td>{{ file.size / 1000 }} KBytes</td>
                    <td class="text-nowrap">
                        <button type="button" class="btn" @click="fileDel(index, 'selectedFiles')"><i class="icon-delete"/>삭제</button>
                    </td>
                </tr>
              </tbody>
            </table>
          </div>
          <alert :dialog="isDialog" :sendData="alertContent" @close="close"></alert>
          <failAlert :dialog="failDialog" :sendData="alertContent" @close="failDialog=false"></failAlert>
        </div>
         </div>
    </section>
  </div>
</template>

<script>
import { common } from '@/assets/js/common.js'
import { getSolution } from '@/api/log/Login.js'
import { postManual, getDetail } from '@/api/knd/Manual.js'
import alert from '@/components/common/CompletePOP.vue'
import failAlert from '@/components/common/FailPOP.vue'
import { getFileList, delFile } from '@/api/File.js'

/* jquery */
global.jQuery = require('jquery')
var $ = global.jQuery
window.$ = $

export default {
  name: 'KAKND0102Form',
  components: {
    alert,
    failAlert
  },
  data: () => {
    return {
      items: [],
      manual_id: '',
      title: '',
      solution: '',
      content: '',
      version: '',
      // 기존 첨부 파일
      files: [],
      // 새로 업로드할 첨부 파일
      selectedFiles: [],
      temp: [],
      currentFile: '',
      // alert
      isDialog: false,
      alertContent: '',
      failDialog: false,
      alertType: ''
    }
  },
  created () {
    this.$store.commit('SET_FULLPATH', this.$route.fullPath)
    this.getSolution()
  },
  async mounted () {
    this.param = this.$route.params
    const formData = {
      params: {
        type: '',
        manual_id: this.param.manual_id
      }
    }
    const { data } = await getDetail(formData)
    this.manual_id = data.manual_id
    this.title = data.title
    this.content = data.content
    this.solution = data.solution
    this.version = data.version
    this.getFileList()
    common.panelOpen('detail')
    $(function () {
      $('#summernote').summernote({
        disableResizeEditor: true,
        callbacks: {
          onFocus: function () {
            $(this).parents('.form-group-editor').addClass('focused')
          },
          onBlur: function () {
            $(this).parents('.form-group-editor').removeClass('focused')
          }
        },
        placeholder: '내용을 입력해 주세요.'
      })
    })
  },
  methods: {
    async upload (file) {
      var manual = $('textarea[name="content"]').val($('#summernote').summernote('code'))
      this.content = manual[0].value
      this.currentFile = this.selectedFiles

      const formData = new FormData()
      if (this.selectedFiles.length !== 0) { // 파일이 있으면 서버로 보냄, 없으면 안보냄
        for (var i = 0, afile; (afile = this.selectedFiles[i]); i++) {
          formData.append('attachFile', afile)
        }
      }
      formData.append('manual_id', this.manual_id)
      formData.append('do_type', 'M')
      formData.append('content', this.content)
      formData.append('update_userid', this.$store.state.userid)
      formData.append('version', this.version)
      formData.append('solution', this.solution)
      formData.append('title', this.title)

      await postManual(formData)
      this.isDialog = true
      this.alertType = 'submit'
      this.alertContent = '매뉴얼 수정이 완료되었습니다.'
    },
    close () {
      this.isDialog = false
      if (this.alertType === 'submit') {
        this.$router.push({ name: 'KAKND01List' })
      }
    },
    async getSolution () {
      const { data } = await getSolution()
      this.items = data
    },
    selectFile () {
      var files = event.target.files
      for (var i = 0, l = files.length; i < l; i++) {
        this.selectedFiles.push(files[i])
        if (files[i].size > 1048576) {
          this.alertContent = '파일 한 개당 용량은 1MB를 초과할 수 없습니다.'
          this.failDialog = true
          this.fileDel(i)
        }
      }
    },
    fileDel (index, type) {
      if (type === 'files') {
        this.files.splice(index, 1)
      } else {
        this.selectedFiles.splice(index, 1)
      }
    },
    async delFile (fileId, fileName, fileIndex) {
      const da = {
        params: {
          fileId: fileId,
          fileName: fileName
        }
      }
      await delFile(da)
      this.fileDel(fileIndex, 'files')
      this.alertContent = '파일이 삭제되었습니다.'
      this.alertType = 'file'
      this.isDialog = true
    },
    async getFileList () {
      const a = {
        params: {
          postId: this.manual_id
        }
      }
      const { data } = await getFileList(a)
      for (var i = 0, l = data.length; i < l; i++) {
        console.dir(data[i])
        this.files.push(data[i])
      }
    }
  }

}
</script>

<style>
.note-editing-area{height: 200px}
</style>
