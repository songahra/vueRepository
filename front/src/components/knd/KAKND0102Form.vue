<template>
<div id="ct">
    <section class="card">
      <header class="card-header" style="padding: 1.6rem 1rem;">
          <h2 class="card-title"><span class="i-rounded bg-danger"><i class="icon-file-text"></i></span>지식자료실 작성</h2>
          <div class="btn-container">
              <a href="" class="btn btn-primary"><span class="hide">목록</span></a>
              <a href="" class="btn btn-primary"><span class="hide">저장</span></a>
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

                <!-- </div> -->
                  <div class="col">
                      <label class="form-control-label">
                          <b class="control-label">버전</b>
                          <input type="text" v-model="version" class="form-control" placeholder="버전">
                      </label>
                  </div>
              </div>
          </div>
      </div>
      <div class="ct-content">
        <div class="form-group form-group-editor">
          <textarea name="content" style="display: none;"></textarea>
          <div id="summernote" class="well">ㅎㅎㅎ</div>
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
    </section>

          </div>
        <!-- <Alert
        :dialog="completeAlert"
        :send-data="alertContent"
        @close="close()"
      /> -->

</template>

<script>
// import { common } from '@/assets/js/common.js'
import { getSolution } from '@/api/log/Login.js'
/* jquery */
global.jQuery = require('jquery')
var $ = global.jQuery
window.$ = $

export default {
  data: () => {
    return {
      items: [],
      title: '',
      solution: '',
      content: '',
      version: '',
      // 첨부 파일
      selectedFiles: [],
      temp: [],
      currentFile: ''
    }
  },
  async created () {
    const { data } = await getSolution() // 솔루션 목록 가져오기
    this.items = data
    console.log('solution list (data) : ', data)
    console.log('solution list : ', this.items)
  },
  mounted () {
    // common.panelOpen('detail')
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
    upload (file) {
      var notice = $('textarea[name="content"]').val($('#summernote').summernote('code'))
      console.log('벵류', notice[0].value)
    }
  }

}
</script>

<style>

</style>
