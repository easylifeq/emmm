import axios from 'axios'
import { message } from 'antd'

// axios.defaults.baseURL = '/api'

axios.interceptors.request.use((config) => {
  config.headers['content-type'] = 'application/json'
  config.headers['token'] = window.localStorage.getItem('token')
  return config
})

axios.interceptors.response.use(
  (response) => {
    if (response.status !== 200) {
      message.error('服务器出错了')
      return Promise.reject(new Error('服务器出错了'))
    } else if (response.data.code === 401) {
      message.error(response.data.msg)
      window.localStorage.clear()
      window.location.href = '/login'
      return Promise.reject(new Error(response.data.msg))
    } else if (response.data.code === 500) {
      message.error(response.data.msg)
      return Promise.reject(new Error(response.data.msg))
    } else if (response.config.responseType === 'arraybuffer') {
      return response.data
    }
    return response.data.data
  },
  (error) => {
    console.error(error)
  }
)
