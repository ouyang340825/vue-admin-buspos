import request from '@/utils/request'

export function getPosInfoList(params) {
  return request({
    url: '/queryStats/getPosInfoList',
    method: 'post',
    params
  })
}
