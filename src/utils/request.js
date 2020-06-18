import axios from 'axios'
import { Message } from 'element-ui'
import { removeToken } from '@/utils/auth'

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})

service.interceptors.request.use(
  config => {
    if (config.params) {
      if (config.params.limit && config.params.page) {
        config.params.startNum = config.params.page * config.params.limit - config.params.limit
        config.params.endNum = config.params.page * config.params.limit
      }
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

service.interceptors.response.use(
  response => {
    const res = response.data
    if (res.success === false) {
      Message({
        message: res.msg || 'Error',
        type: 'error',
        duration: 5 * 1000
      })
      return Promise.reject(new Error(res.msg || 'Error'))
    } else {
      return res
    }
  },
  error => {
    removeToken('admin-token')
    return Promise.reject(error)
  }
)

export default service
