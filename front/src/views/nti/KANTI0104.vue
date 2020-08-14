<template>
  <!-- 공지사항 수정하기 -->
  <div id="ct">
    <section class="card">
      <header class="card-header">
        <h2 class="card-title">
          <span class="i-rounded bg-danger"><i class="icon-alarm" /></span>공지사항 수정
        </h2>
        <div class="btn-container">
          <a
            href=""
            class="btn btn-primary"
            @click.prevent="upload"
          >확인</a>
          <a
            href="/noticeList"
            class="btn btn-m"
          ><span class="hide">닫기</span></a>
        </div>
      </header>

      <div class="ct-header">
        <button
          type="button"
          class="btn-filter collapsed d-xl-none"
          data-toggle="collapse"
          data-target="#collapse-filter"
        >
          검색 필터<i class="icon-down" />
        </button>
        <div
          id="collapse-filter"
          class="collapse collapse-filter "
        >
          <div class="filter no-gutters no-btn">
            <div
              class="col"
              style="min-width: 70%;"
            >
              <label class="form-control-label">
                <b class="control-label">공지</b>
                <input
                  v-model="title"
                  type="text"
                  class="form-control"
                  placeholder="공지제목을 입력하세요."
                >
              </label>
            </div>
            <div
              class="col"
              style="min-width: 30%;"
            >
              <label class="form-control-label">
                <b class="control-label">제품명</b>
                <select
                  v-model="selected"
                  class="form-control"
                  title="선택하세요"
                >
                  <option
                    v-for="(item,index) in items"
                    :key="index"
                    :value="item.codeId"
                  >
                    {{ item.codeContent }}
                  </option>
                </select>
              </label>
            </div>
          </div>
        </div>
      </div>

      <div class="ct-content">
        <div class="form-group form-group-editor">
          <textarea
            name="content"
            style="display: none;"
          />
          <div
            id="summernote"
            class="well"
            v-html="content"
          />
        </div>
        <div class="form-group">
          <div class="sub-bar">
            <i class="icon-right text-danger" /><p class="font-weight-bold">
              첨부파일
            </p>
            <div class="ml-auto form-inline m-full">
              <label>
                <input
                  type="file"
                  class="sr-only"
                  multiple="multiple"
                  @change="selectFile()"
                >
                <span
                  class="btn"
                >파일 선택</span>

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
                  <th scope="col">
                    이름
                  </th>
                  <th scope="col">
                    타입
                  </th>
                  <th scope="col">
                    크기
                  </th>
                  <th scope="col" />
                </tr>
              </thead>
              <tbody>
                <tr v-if="files == ''">
                  <td><span class="placeholder">첨부할 파일을 선택해 주세요.</span></td>
                  <td />
                  <td>0kbytes</td>
                  <td class="text-nowrap" />
                </tr>
                <tr
                  v-for="(file, index ) in files"
                  :key="index"
                >
                  <td><span>{{ file.org_file_name }}</span></td>
                  <td>{{ file.file_ext_name }}</td>
                  <td>{{ file.file_size / 1000 }} KBytes</td>
                  <td class="text-nowrap">
                    <button
                      type="button"
                      class="btn"
                      @click="delFile(file.file_id, file.save_file_name, index)"
                    >
                      삭제
                    </button>
                  </td>
                </tr>
                <tr
                  v-for="(file, index ) in selectedFiles"
                  :key="index"
                >
                  <td><span>{{ file.name }}</span></td>
                  <td>{{ file.type }}</td>
                  <td>{{ file.size / 1000 }} KBytes</td>
                  <td class="text-nowrap">
                    <button
                      type="button"
                      class="btn"
                      @click="fileDel(index)"
                    >
                      <i class="icon-delete" />삭제
                    </button>
                  </td>
                </tr>
                <alert
                  :dialog="isDialog"
                  :send-data="alertContent"
                  @close="isDialog=false"
                />
                <alert
                  :dialog="completeAlert"
                  :send-data="alertContent"
                  @close="close()"
                />
                <deleteAlert
                  :dialog="deleteAlert"
                  :send-data="alertContent"
                  @close="deleteAlert=false"
                  @postDelete="postDelete()"
                />
              </tbody>
            </table>
          </div>
        </div>
        <footer class="panel-footer sub-bar">
          <div class="ml-auto" />
        </footer>
      </div>
    </section>
  </div>
</template>

<script>
import { common } from '@/assets/js/common.js'
import { detailNotice, updateNotice, deleteNotice } from '@/api/nti/Notice.js'
import { userSolution, getSolution, expToken } from '@/api/log/Login.js'
import { getFileList, download, delFile } from '@/api/File.js'
import alert from '@/components/common/CompletePOP.vue'
import deleteAlert from '@/components/common/DeletePOP.vue'
/* jquery */
global.jQuery = require('jquery')
var $ = global.jQuery
window.$ = $

export default {
  components: {
    alert,
    deleteAlert
  },
  data: () => {
    return {
      files: [],
      notice_id: '',
      solution_code: '',
      solution: '',
      items: [],
      title: '',
      content: '',
      hit: '',
      reg_userid: '',
      reg_date: '',
      lists: '',
      selected: '',
      isDialog: false,
      alertContent: '',

      selectedFiles: [],
      currentFile: '',

      completeAlert: false,

      deleteAlert: false

    }
  },
  async created () {
    const exp = this.$store.state.exp
    expToken(exp)

    const { data } = await getSolution() // 솔루션 목록 가져오기
    this.items = data

    console.log('this.items?', this.items)
  },
  async mounted () {
    this.param = this.$route.params
    console.log('created=>', this.param)

    const formData = {
      notice_id: this.param.notice_id
    }

    const { data } = await detailNotice(formData)
    console.log(data)
    const Data = {
      params: {
        postId: this.param.notice_id
      }
    }
    console.log(Data, '데이터가나?')
    getFileList(Data).then(response => {
      const data = response.data
      console.log('데이터', data)
      // this.files = data

      for (var i = 0, l = data.length; i < l; i++) {
        console.dir(data[i])
        this.files.push(data[i])
      }

      console.log(this.selectedFiles)
    })

    this.notice_id = data.notice_id
    this.solution_code = userSolution(data.solution_code)
    this.title = data.title
    this.content = data.content
    this.hit = data.hit
    this.reg_userid = data.reg_userid
    this.reg_date = data.reg_date
    console.log('송', this.solution_code)
    this.selected = data.solution_code
    console.log(this.selected)
    common.panelOpen('detail')

    $(function () {
      $('#summernote').summernote({
        height: 300, // 에디터의 높이
        disableResizeEditor: true,
        lang: 'ko-KR', // 기본 메뉴언어 US->KR로 변경
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
    async delFile (fileId, fileName, fileIndex) {
      console.log('file delete ', fileId)
      const da = {
        params: {
          fileId: fileId,
          fileName: fileName
        }
      }
      console.log('da', da)
      await delFile(da)
      console.log('this.fileDel(fileIndex) : ', fileIndex)
      this.alertContent = '파일이 삭제되었습니다.'
      this.isDialog = true
      this.fileDel(fileIndex)
    },
    selectFile () {
      console.log('select File 함수')
      console.log('selectFile << file >> : ', event.target.files)
      var files = event.target.files
      for (var i = 0, l = files.length; i < l; i++) {
        console.dir(files[i])
        this.selectedFiles.push(files[i])
      }
    },
    async download (fileSName, fileOName) {
      console.log(fileSName, fileOName)
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
    fileDel (index) {
      this.files.splice(index, 1)
    },
    close () {
      const param = {
        notice_id: this.notice_id
      }
      console.log('파람?', param)
      this.$router.push({ name: 'noticeDetail', params: param })
    },
    async upload () {
      var notice = $('textarea[name="content"]').val($('#summernote').summernote('code'))
      console.log('벵류', notice)
      console.log('벵류', notice[0].value)

      this.content = notice[0].value

      this.currentFile = this.selectedFiles
      console.log('this.currentFile????', this.currentFile)
      console.log('this.selectedFiles?????', this.selectedFiles)

      const formData = new FormData()

      if (this.selectedFiles.length !== 0) { // 파일이 있으면 서버로 보냄, 없으면 안보냄
        for (var i = 0, afile; (afile = this.selectedFiles[i]); i++) {
          formData.append('attachFile', afile)
        }
      }

      formData.append('post_type', 'N')
      formData.append('content', this.content)
      formData.append('update_userid', this.$store.state.userid)
      formData.append('solution_code', this.selected)
      formData.append('title', this.title)
      formData.append('notice_id', this.notice_id)

      console.log('폼데이터는?', formData)

      const data = await updateNotice(formData)
      if (data.status === 200) {
        this.completeAlert = true
        this.alertContent = '수정이 완료되었습니다.'
      }
      console.log(data)
    },
    deleteBtn () {
      this.deleteAlert = true
    },
    async postDelete () {
      const param = new FormData()
      param.append('notice_id', this.notice_id)

      const res = await deleteNotice(param)
      console.log('status', res.status)

      if (res.status === 200) {
        this.$router.push('/noticeList')
      }
    }
  }
}
</script>

<style>

</style>
