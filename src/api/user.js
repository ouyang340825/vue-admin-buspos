import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/sysUser/userLogin',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/sysUser/logout',
    method: 'post'
  })
}
