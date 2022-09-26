import request from '@/utils/request'

export function loginAPI(data) {

}

export function getUserInfo() {
  return request({
    url: '/sys/profile',
    method: 'POST'
  })
}
export const getUserDetailById = (id) => request({
  url: `/sys/user/${id}`,
  method: 'get'
})

export function logout() {
}
