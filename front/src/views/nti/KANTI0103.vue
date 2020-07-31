<template>
<!-- 공지사항 상세보기 -->
 <div id="ct">
    <section class="card">
        <header class="card-header">
          <h2 class="card-title">
            <span class="i-rounded bg-danger"><i class="icon-alarm" /></span>공지사항 상세보기
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
                        readonly
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
    <input type="text" class="form-control" readonly v-model="solution_code">
                    </label>
                  </div>
                </div>
              </div>
            </div>

       <div class="ct-content">
            <div class="form-group form-group-editor">

              <textarea name="content" style="display: none;"> asdasd</textarea>
              <div
                id="summernote"
                class="well"
                v-html="content"
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
    </section>
</div>
</template>

<script>
import { common } from '@/assets/js/common.js'
import { detailNotice } from '@/api/nti/Notice.js'
import { userSolution } from '@/api/log/Login.js'

/* jquery */
global.jQuery = require('jquery')
var $ = global.jQuery
window.$ = $

export default {
  data: () => {
    return {
      notice_id: '',
      file_count: '',
      solution_code: '',
      title: '',
      content: '',
      hit: '',
      reg_userid: '',
      reg_date: '',
      lists: '',

      selectedFiles: []

    }
  },
  async mounted () {
    this.param = this.$route.params
    console.log('created=>', this.param)

    const formData = {
      notice_id: this.param.notice_id
    }

    const { data } = await detailNotice(formData)

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
    deleteNoticeInfo () {

    },
    modifyNoticeInfo () {

    }
  }
}
</script>

<style>

</style>
