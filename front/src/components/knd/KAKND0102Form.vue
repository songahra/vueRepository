<template>
  <!-- 지식자료실 작성 -->
  <div id="ct">
    <section class="card">
      <header
        class="card-header"
        style="padding: 1.6rem 1rem;"
      >
        <h2 class="card-title">
          <span class="i-rounded bg-danger"><i class="icon-file-text" /></span>지식자료실 작성
        </h2>
        <div class="btn-container">
          <a
            href="manual"
            class="btn btn-primary"
          ><span class="hide">목록</span></a>
          <a
            href=""
            class="btn btn-primary"
            @click.prevent="upload"
          ><span class="hide">저장</span></a>
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
          <div class="filter no-gutters">
            <div class="col">
              <label class="form-control-label">
                <b class="control-label">제목</b>
                <input
                  v-model="title"
                  type="text"
                  class="form-control"
                  placeholder="제목을 입력하세요."
                >
              </label>
            </div>
            <!-- <div class="filter no-gutters no-btn"> -->
            <div class="col">
              <label class="form-control-label label-select">
                <b class="control-label">솔루션</b>
                <select
                  v-model="solution"
                  class="form-control "
                  title="선택하세요"
                >
                  <option
                    v-for="(item, index) in items"
                    :key="index"
                    :value="item.codeId"
                  >
                    {{ item.codeContent }}
                  </option>
                  <option value="">선택안함</option>
                </select>
              </label>
            </div>

            <!-- </div> -->
            <div class="col">
              <label class="form-control-label">
                <b class="control-label">버전</b>
                <input
                  v-model="version"
                  type="text"
                  class="form-control"
                  placeholder="버전"
                >
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
          />
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
                ref="fileTag"
                type="file"
                class="sr-only"
                multiple="multiple"
                @change="selectFile()"
              >
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
                  <!-- <button type="button" class="btn" :disabled="!selectedFiles.length"><i class="icon-delete"/>삭제</button> -->
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
        <alert
          :dialog="isDialog"
          :send-data="alertContent"
          @close="close"
        />
        <failAlert
          :dialog="failDialog"
          :send-data="alertContent"
          @close="failDialog=false"
        />
      </div>
    </section>
  </div>
</template>

<script>
import { common } from '@/assets/js/common.js'
import { getSolution } from '@/api/log/Login.js'
import { postManual } from '@/api/knd/Manual.js'
import alert from '@/components/common/CompletePOP.vue'
import failAlert from '@/components/common/FailPOP.vue'

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
      title: '',
      solution: '',
      content: '',
      version: '',
      // 첨부 파일
      selectedFiles: [],
      temp: [],
      currentFile: '',
      // alert
      isDialog: false,
      alertContent: '',
      failDialog: false
    }
  },
  created () {
    this.$store.commit('SET_FULLPATH', 'knd/write')
    this.getSolution()
  },
  mounted () {
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
      formData.append('content', this.content)
      formData.append('do_type', 'W')
      formData.append('reg_userid', this.$store.state.userid)
      formData.append('version', this.version)
      formData.append('solution', this.solution)
      formData.append('title', this.title)

      await postManual(formData)
      this.isDialog = true
      this.alertContent = '매뉴얼 등록이 완료되었습니다.'
    },
    close () {
      this.isDialog = false
      this.$router.push({ name: 'KAKND01List' })
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
    fileDel (index) {
      this.selectedFiles.splice(index, 1)
    }
  }

}
</script>

<style>
.note-editing-area{height: 200px}
</style>
