import axios from 'axios'

const instance = axios.create({
  baseURL: process.env.VUE_APP_API_URL
})

function allUserList () {
  return instance.get('adm/allUserList')
}

function srchUserList (srchData) {
  return instance.get('adm/srchUserList', { params: srchData })
}

export { allUserList, srchUserList }
