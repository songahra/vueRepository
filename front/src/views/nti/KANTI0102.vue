<template>
  <!-- 공지사항 글쓰기 -->
  <div id="wrap">
    <div id="ct">
      <!-- 페이지 시작 -->
      <header class="card-header">
        <h2 class="card-title">
          <span class="i-rounded bg-danger"><i class="icon-alarm" /></span>공지사항
        </h2>
        <div class="btn-container">
          <a
            href=""
            class="btn btn-m"
          ><span class="hide">글쓰기</span></a>
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
          class="collapse collapse-filter"
        >
          <div class="filter no-gutters">
            <div
              class="col"
              style="min-width: 70%;"
            >
              <label class="form-control-label">
                <b class="control-label">제목</b>
                <input
                  type="text"
                  class="form-control"
                  placeholder="제목을 입력하세요."
                >
              </label>
            </div>
            <div class="col">
              <label class="form-control-label label-select">
                <b class="control-label">정렬</b>
                <select
                  class="form-control selectpicker"
                  title="선택하세요"
                  readonly
                >
                  <option value="">최신순</option>
                  <option value="">조회수순</option>
                  <option value="">날짜순</option>
                </select>
              </label>
            </div>
            <div class="col-auto">
              <button
                type="button"
                class="btn btn-primary"
              >
                <i class="icon-srch" />조회
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="ct-content">
        <div class="table-responsive">
          <table class="table">
            <colgroup>
              <col style="width: 6%">
              <col style="width: 28%">
              <col style="width: 12%">
              <col style="width: 12%">
              <col style="width: 12%">
              <col style="width: 12%">
              <col style="width: 8%">
            </colgroup>
            <thead>
              <tr>
                <th>글번호</th>
                <th>제목</th>
                <th>솔루션</th>
                <th>작성자</th>
                <th>첨부</th>
                <th>작성일</th>
                <th>조회수</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>iGate 패치 안내</td>
                <td>iGate</td>
                <td>홍길동</td>
                <td><i class="icon-link" />(4)</td>
                <td>20. 05. 17 14:16</td>
                <td>2</td>
              </tr>
              <tr>
                <td>2</td>
                <td>iGate 패치 안내</td>
                <td>iGate</td>
                <td>홍길동</td>
                <td>-</td>
                <td>20. 05. 17 14:16</td>
                <td>3</td>
              </tr>
              <tr>
                <td>3</td>
                <td>iGate 패치 안내</td>
                <td>iGate</td>
                <td>홍길동</td>
                <td><i class="icon-link" />(2)</td>
                <td>20. 05. 17 14:16</td>
                <td>10</td>
              </tr>
              <tr>
                <td>4</td>
                <td>iGate 패치 안내</td>
                <td>iGate</td>
                <td>홍길동</td>
                <td><i class="icon-link" />(12)</td>
                <td>20. 05. 17 14:16</td>
                <td>22</td>
              </tr>
            </tbody>
          </table>
        </div>
        <ul class="pagination">
          <li class="page-item">
            <a
              class="page-link page-link-prev"
              href="#"
            ><i class="icon-left" /></a>
          </li>
          <li class="page-item">
            <a
              class="page-link active"
              href="#"
            >1</a>
          </li>
          <li class="page-item">
            <a
              class="page-link"
              href="#"
            >2</a>
          </li>
          <li class="page-item">
            <a
              class="page-link"
              href="#"
            >3</a>
          </li>
          <li class="page-item">
            <a
              class="page-link page-link-next"
              href="#"
            ><span class="icon-right" /></a>
          </li>
        </ul>
      </div>
    <!-- //페이지 끝-->
    </div>

    <div
      id="detail"
      class="panel panel-bottom expand"
      data-backdrop="false"
    >
      <div class="panel-dialog">
        <div class="panel-content">
          <header class="panel-header sub-bar">
            <h2 class="sub-bar-tit">
              공지사항 글쓰기
            </h2>
            <div class="ml-auto">
              <button
                type="button"
                class="btn-icon"
                data-toggle="toggle"
                data-target="#detail"
                data-class="expand"
              >
                <i class="icon-expand" />
              </button>
              <button
                type="button"
                class="btn-icon"
                onclick="panelClose('detail')"
              >
                <i class="icon-close" />
              </button>
            </div>
          </header>
          <div class="panel-body panel-body-note">
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
            <div class="form-group form-group-editor">
              <textarea name="content" style="display: none;"></textarea>
              <div
                id="summernote"
                class="well"
              >
                어디 내려온 풍부하게 봄바람을 말이다. 이상은 목숨이 하는 구할 끝에 대고, 가진 새 아니다. 작고 커다란 웅대한 부패를 끓는다. 있는 속에서 영원히 청춘을 충분히 운다. 예수는 인생에 뭇 청춘을 싶이 스며들어 주는 것이다. 설레는 있는 위하여서, 별과 봄바람을 쓸쓸하랴? 것이 무엇이 청춘의 얼마나 가슴이 인간에 것이다. 우리 새가 이것을 이상이 맺어, 풀밭에 피어나기 말이다. 속잎나고, 청춘의 천지는 품었기 위하여 보는 피부가 생명을 열락의 칼이다.
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
      </div>
    </div>
  </div>
</template>

<script>
import '@/assets/vendor/daterangepicker/daterangepicker.min.css'
import { common } from '@/assets/js/common.js'
import { getSolution } from '@/api/log/Login.js'
// import { postFile } from '@/api/File.js'
import { writeNotice } from '@/api/nti/Notice.js'

/* jquery */
global.jQuery = require('jquery')
var $ = global.jQuery
window.$ = $

export default {
  data: () => {
    return {
      title: '',
      solution: '',
      items: [],
      selectedFiles: [],
      temp: [],
      currentFile: '',
      content: ''
    }
  },
  async created () {
    const { data } = await getSolution() // 솔루션 목록 가져오기
    this.items = data
    console.log('this.items?', this.items)
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

      for (var i = 0, afile; (afile = this.selectedFiles[i]); i++) {
        formData.append('attachFile', afile)
      }
      formData.append('post_type', 'n')
      formData.append('content', this.content)
      formData.append('reg_userid', this.$store.state.userid)
      formData.append('solution_code', this.solution)
      formData.append('title', this.title)

      console.log('formData??', formData)
      writeNotice(formData)

      // formData.append('post_id', 'id') => 글번호는 글 등록되고 알 수 있는거 아닌가 ?
      // formData.append('post_type', 'n')

      console.log('myFile', formData)
      // const { data } = await postFile(formData)
      // alert(data + '개의 파일이 업로드 되었습니다.')
    }
  }
}
</script>

<style>

</style>
