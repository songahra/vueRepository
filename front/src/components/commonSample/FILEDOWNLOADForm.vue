<template>
    <div>
        <!-- <input ref="fileTag" type="file" multiple="multiple" @change="selectFile"/>
        <v-btn class="btn btn-success"  :disabled="!selectedFiles.length" @click.prevent="upload">
            Upload
        </v-btn> -->
        <ul>
            <li v-for="(list, index) in lists" :key="index">
                <a @click="fileClick(list.file_id)">{{ list.org_file_name }}</a>
            </li>
        </ul>

    </div>
</template>

<script>
import { getFileList } from '@/api/File.js'

export default {
  name: 'FILEUPLOADForm.vue',
  components: {

  },
  data: () => {
    return {
      lists: '',
      postId: 'id'
    }
  },
  created () {
    this.getList()
  },
  methods: {
    selectFile () {
      console.log('select File 함수')
      this.selectedFiles = this.$refs.fileTag.files
      console.log('selectFile << file >> : ', this.$refs.fileTag.files)
    },
    async getList () {
      const a = {
        params: {
          postId: this.postId
        }
      }
      const { data } = await getFileList(a)
      this.lists = data
    },
    fileClick (fileId) {

    }
  }
}
</script>

<style>

</style>
