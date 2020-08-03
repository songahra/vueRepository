import axios from 'axios'

const instance = axios.create({
  baseURL: process.env.VUE_APP_API_URL
})

function postFile (formData) {
  console.log('postFile called...!!')
  return instance.post('/file/upload', formData)
}
function getFileList (Data) {
  return instance.get('/file/list', Data)
}
function download (data) {
  return axios.post(process.env.VUE_APP_API_URL + '/file/download', data, {
    responseType: 'blob'
  })
}
function delFile (data) {
  return instance.get('/file/del', data)
}

export { postFile, getFileList, download, delFile }
