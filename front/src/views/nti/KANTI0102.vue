<template>
  <!-- 공지사항 글쓰기 -->
 <div id="ct">
    <section class="card">
          <header class="card-header">
          <h2 class="card-title">
            <span class="i-rounded bg-danger"><i class="icon-alarm" /></span>공지사항 글쓰기
          </h2>
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
                        v-model="solution"
                        class="form-control selectpicker"
                        title="선택하세요"
                        readonly
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
              <textarea name="content" style="display: none;" ></textarea>
              <div
                id="summernote"
                class="well"
              >
              </div>

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
                    <button
                      type="button"
                      class="btn"

                    >
                      업로드
                    </button>
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
                    <tr v-if="selectedFiles == ''">
                      <td><span class="placeholder">첨부할 파일을 선택해 주세요.</span></td>
                      <td />
                      <td>0kbytes</td>
                      <td class="text-nowrap">

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

                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          <footer class="panel-footer sub-bar">
            <div class="ml-auto">
              <a
                href=""
                class="btn btn-primary"
                @click.prevent="upload"
              >등록</a>
            </div>
          </footer>
          </div>
        <Alert
        :dialog="completeAlert"
        :send-data="alertContent"
        @close="close()"
      />
    </section>
    </div>
</template>

<script>

import { common } from '@/assets/js/common.js'
import { getSolution } from '@/api/log/Login.js'
// import { postFile } from '@/api/File.js'
import { writeNotice } from '@/api/nti/Notice.js'

import Alert from '@/components/common/CompletePOP.vue' // 완료 alert

/* jquery */
global.jQuery = require('jquery')
var $ = global.jQuery
window.$ = $

export default {
  components: {
    Alert
  },
  data: () => {
    return {
      title: '',
      solution: '',
      items: [],
      selectedFiles: [],
      temp: [],
      currentFile: '',
      content: '',
      completeAlert: false,
      alertContent: ''

    }
  },
  async created () {
    const { data } = await getSolution() // 솔루션 목록 가져오기
    this.items = data
    console.log('this.items?', this.items)
  },

  /* summernote jQuery */
  mounted () {
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
    close () {
      this.$router.push('/noticeList')
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
    fileDel (index) {
      this.selectedFiles.splice(index, 1)
    },

    async upload (file) {
      console.log('upload 함수')

      // const userData = {
      //   reg_userid: this.$store.state.userid,
      //   solution_code: this.solution,
      //   title: this.title,
      //   content: this.content

      // }
      var notice = $('textarea[name="content"]').val($('#summernote').summernote('code'))
      console.log('벵류', notice)
      console.log('벵류', notice[0].value)

      this.content = notice[0].value
      this.currentFile = this.selectedFiles

      console.log('this.currentFile', this.currentFile)
      console.log('this.selectedFiles', this.selectedFiles)

      const formData = new FormData()
      console.log('이거 확인점', this.selectedFiles.length !== 0)

      if (this.selectedFiles.length !== 0) { // 파일이 있으면 서버로 보냄, 없으면 안보냄
        for (var i = 0, afile; (afile = this.selectedFiles[i]); i++) {
          formData.append('attachFile', afile)
        }
      }

      formData.append('post_type', 'N')
      formData.append('content', this.content)
      formData.append('reg_userid', this.$store.state.userid)
      formData.append('solution_code', this.solution)
      formData.append('title', this.title)

      console.log('formData??', formData)
      const data = await writeNotice(formData)
      if (data.status === 200) {
        this.completeAlert = true
        this.alertContent = '등록이 완료되었습니다.'
      }
      // formData.append('post_id', 'id') => 글번호는 글 등록되고 알 수 있는거 아닌가 ?
      // formData.append('post_type', 'n')

      console.log('myFile', data)
      // const { data } = await postFile(formData)
      // alert(data + '개의 파일이 업로드 되었습니다.')
    }
  }
}
</script>

<style>

</style>
