<template>
<!-- 지식자료실 디테일 -->
<div id="ct">
    <section class="card">
      <header class="card-header" style="padding: 1.6rem 1rem;">
          <h2 class="card-title"><span class="i-rounded bg-danger"><i class="icon-file-text"></i></span>지식자료실</h2>
          <div class="btn-container">
              <a href="" @click.prevent="clickModify" class="btn btn-primary"><span class="hide">수정</span></a>
              <a href="" @click.prevent="clickDelete" class="btn btn-primary"><span class="hide">삭제</span></a>
              <a href="../manual" class="btn btn-primary"><span class="hide">목록</span></a>
          </div>
      </header>

      <div class="ct-header">
          <button type="button" class="btn-filter collapsed d-xl-none" data-toggle="collapse" data-target="#collapse-filter">검색 필터<i class="icon-down"></i></button>
          <div id="collapse-filter" class="collapse collapse-filter ">
              <div class="filter no-gutters">
                  <div class="col">
                      <label class="form-control-label">
                          <b class="control-label">제목</b>
                          <input type="text" v-model="title" class="form-control" readonly>
                      </label>
                  </div>
                  <div class="col">
                      <label class="form-control-label">
                          <b class="control-label">솔루션</b>
                          <input type="text" v-model="solution" class="form-control" readonly>
                      </label>
                  </div>
                  <div class="col">
                      <label class="form-control-label">
                          <b class="control-label">버전</b>
                          <input type="text" v-model="version" class="form-control" readonly>
                      </label>
                  </div>
              </div>
          </div>
      </div>
      <div class="ct-content" >
           <div class="form-group form-group-editor">
                <p class="textarea-basic-md"><span v-html="content"></span></p>
            </div>
      </div>
      <div class="form-group">
          <div class="sub-bar">
              <i class="icon-right text-danger"></i><p class="font-weight-bold">첨부파일</p>
              <!-- <div class="ml-auto form-inline m-full">
                <label>
                  <input ref="fileTag" type="file" class="sr-only" multiple="multiple" @change="selectFile()"/>
                  <span class="btn">파일 선택</span>
                  <button type="button" @click.prevent="upload" class="btn">업로드</button>
                </label>
              </div> -->
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
                    <td><span class="placeholder">첨부된 파일이 없습니다.</span></td>
                    <td></td>
                    <td>0kbytes</td>
                    <td class="text-nowrap">
                      <!-- <button type="button" class="btn" :disabled="!files.length">다운로드</button> -->
                    </td>
                  </tr>
                <tr :key= "index" v-for= "(file, index ) in files" >
                  <td><span>{{ file.org_file_name }}</span></td>
                  <td>{{ file.file_ext_name }}</td>
                  <td>{{ file.file_size / 1000 }} KBytes</td>
                  <td class="text-nowrap">
                    <button type="button" class="btn" @click="download(file.save_file_name, file.org_file_name)">다운로드</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <alert :dialog="isDialog" @postDelete = "postDelete" @close="isDialog=false"></alert>
          <!-- <failAlert :dialog="failDialog" :sendData="alertContent" @close="failDialog=false"></failAlert> -->
        </div>
    </section>
  </div>
</template>

<script>
import { getDetail, delManual } from '@/api/knd/Manual.js'
import { getFileList, download } from '@/api/File.js'
import alert from '@/components/common/DeletePOP.vue'
// import failAlert from '@/components/common/FailPOP.vue'

export default {
  name: 'KAKND0104Form.vue',
  components: {
    alert
    // failAlert
  },
  data: () => {
    return {
      files: [],
      manual_id: '',
      param: '',
      title: '',
      content: '',
      solution: '',
      version: '',
      hit: '',
      // alert
      isDialog: false,
      fDialog: false,
      alertContent: ''
    }
  },
  created () {

  },
  mounted () {
    this.param = this.$route.params
    const formData = {
      params: {
        type: 'D',
        manual_id: this.param.manual_id
      }
    }
    getDetail(formData)
      .then((res) => {
        const data = res.data
        this.manual_id = data.manual_id
        this.title = data.title
        this.content = data.content
        this.solution = data.solution
        this.version = data.version
        this.getList()
      })
  },
  methods: {
    async download (fileSName, fileOName) {
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
    async getList () {
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
    },
    clickModify () {
      const data = {
        manual_id: this.manual_id
      }
      this.$store.commit('SET_FULLPATH', 'knd/Detail')
      this.$router.push({ name: 'KAKND01Modify', params: data })
    },
    clickDelete () {
      this.isDialog = true
    },
    async postDelete () {
      const data = {
        manual_id: this.manual_id
      }
      await delManual(data)
      this.isDialog = false
      this.$router.push({ name: 'KAKND01List' })
    }
  }
}
</script>
