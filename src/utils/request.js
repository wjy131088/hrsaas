// 实现对axios的二次封装
import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
import router from '@/router'
const TimeOut = 3600
// 对比时间是否超时
function IsCheckTimeOut() {
  const currentTime = Date.now() //  时间2真正调用的时间
  const timeStamp = (currentTime - store.getters.hrsaasTime) / 1000
  return timeStamp > TimeOut
}
// 通过axios创建axios实例
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, //  基准地址
  timeout: 5000
})
// 请求拦截器
service.interceptors.request.use(config => {
  // 在这个位置需要统一的去注入token
  if (store.getters.token) {
    if (IsCheckTimeOut()) {
      store.dispatch('user/logout')
      router.push('/login')
      return Promise.reject(new Error('时间超时了'))
    }
    // 如果token存在 注入token
    config.headers.Authorization = `Bearer ${store.getters.token}`
  }
  return config // 必须返回配置
}, error => {
  return Promise.reject(error)
})
// 响应拦截器
service.interceptors.response.use(response => {
  // 考虑把那些数据跑出去
  // 接口成功，并且业务成功
  // 没有成功Promise.reject抛出错误
  const { message, data, success } = response.data
  if (success) { //  业务逻辑是成功的}
    return data
  }
  Message.error(message)
  return Promise.reject(new Error(message))
}, error => {
  if (error.response && error.response.status === 401) { // token失效，登录状态失效
    store.dispatch('user/logout')
    router.push('/login')
    Message.error('token超时了')
  } else {
    // console.log(error)
    Message.error(error.message)
  }
  return Promise.reject(error)
})
export default service
