import axios from 'axios'

export const api = axios.create({
  baseURL: process.env.VUE_APP_API_URL
})

export const setToken = token => {
  api.defaults.headers.Authorization = `Bearer ${token}`
}

export const clearToken = () => {
  delete api.defaults.headers.Authorization
}
