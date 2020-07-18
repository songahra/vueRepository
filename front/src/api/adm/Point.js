import axios from 'axios'

const instance = axios.create({
  baseURL: process.env.VUE_APP_API_URL
})

function getSolList (Data) {
  return instance.get('KAADM04/sol', Data)
}

function getSearchSolList (Data) {
  console.log('getSearchSolList.....')
  return instance.get('KAADM04/searchPointSol', Data)
}

function getUserList (Data) {
  return instance.get('KAADM04/user', Data)
}

function getSearchUserList (Data) {
  return instance.get('KAADM04/searchPointUser', Data)
}

export { getSolList, getSearchSolList, getUserList, getSearchUserList }
