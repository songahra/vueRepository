<template>
  <!-- 공지사항 상세보기 -->
  <div id="ct">
    <section class="card">
      <header class="card-header">
        <h2 class="card-title">
          <span class="i-rounded bg-danger"><i class="icon-alarm" /></span>공지사항 상세보기
        </h2>
        <div class="btn-container">
          <a
            class="btn btn-m"
            @click="onClick()"
          ><span class="hide">수정</span></a>
          <a
            class="btn btn-m"
            @click="deleteBtn()"
          ><span class="hide">삭제</span></a>
          <a
            href="/noticeList"
            class="btn btn-m"
          ><span class="hide">목록보기</span></a>
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
                  readonly
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
                <input
                  v-model="solution_code"
                  type="text"
                  class="form-control"
                  readonly
                >
              </label>
            </div>
          </div>
        </div>
      </div>

      <div class="ct-content">
        <div class="form-group form-group-editor">
          <div>
            <p class="textarea-basic-md">
              <span v-html="content" />
            </p>
          </div>
        </div>
        <div class="form-group">
          <div class="sub-bar">
            <i class="icon-right text-danger" /><p class="font-weight-bold">
              첨부파일
            </p>
            <div class="ml-auto form-inline m-full">
              <!-- <label>
                     <input
                type="file"
                class="sr-only"
                multiple="multiple"
                @change="selectFile()"
              >
                    <span
                      class="btn"
                    >파일 선택</span>
                    <button
                      type="button"
                      class="btn"

                    >
                      업로드
                    </button>
                  </label> -->
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
                <tr v-if="selectedFiles == ''">
                  <td><span class="placeholder">첨부할 파일을 선택해 주세요.</span></td>
                  <td />
                  <td>0kbytes</td>
                  <td class="text-nowrap">
                    <button
                      type="button"
                      class="btn"
                      :disabled="!selectedFiles.length"
                    >
                      <i class="icon-delete" />삭제
                    </button>
                  </td>
                </tr>
                <tr
                  v-for="(file, index ) in selectedFiles"
                  :key="index"
                >
                  <td><span>{{ file.org_file_name }}</span></td>
                  <td>{{ file.file_ext_name }}</td>
                  <td>{{ file.file_size / 1000 }} KBytes</td>
                  <td class="text-nowrap">
                    <!-- <button
                          type="button"
                          class="btn"
                          @click="fileDel(index)"
                        >
                          <i class="icon-delete" />삭제

                        </button> -->
                    <button
                      type="button"
                      class="btn"
                      @click="download(file.save_file_name, file.org_file_name)"
                    >
                      다운로드
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <footer class="panel-footer sub-bar">
          <deleteAlert
            :dialog="deleteAlert"
            :send-data="alertContent"
            @close="deleteAlert=false"
            @postDelete="postDelete()"
          />
        </footer>
      </div>
    </section>
  </div>
</template>

<script>
import { common } from '@/assets/js/common.js'
import { detailNotice, deleteNotice } from '@/api/nti/Notice.js'
import { userSolution } from '@/api/log/Login.js'
import { getFileList, download } from '@/api/File.js'
import deleteAlert from '@/components/common/DeletePOP.vue'

/* jquery */
global.jQuery = require('jquery')
var $ = global.jQuery
window.$ = $

export default {
  components: {
    deleteAlert
  },
  data: () => {
    return {
      notice_id: '',
      solution_code: '',
      title: '',
      content: '',
      hit: '',
      reg_userid: '',
      reg_date: '',
      lists: '',

      selectedFiles: [],

      deleteAlert: false,
      alertContent: ''
    }
  },
  async mounted () {
    this.param = this.$route.params
    console.log('created=>', this.param)

    const formData = {
      notice_id: this.param.notice_id
    }

    const { data } = await detailNotice(formData)
    const Data = {
      params: {
        postId: this.param.notice_id
      }
    }
    console.log(Data, '데이터가나?')
    getFileList(Data).then(response => {
      const res = response.data
      console.log('데이터', res)
      this.selectedFiles = res
    })

    this.notice_id = data.notice_id
    this.solution_code = userSolution(data.solution_code)
    this.title = data.title
    this.content = data.content
    this.hit = data.hit
    this.reg_userid = data.reg_userid
    this.reg_date = data.reg_date

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
      this.selectedFiles.splice(index, 1)
    },
    onClick () {
      const param = {
        notice_id: this.param.notice_id
      }

      this.$router.push({ name: 'noticeModify', params: param })
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
