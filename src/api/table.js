import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/system/posManage/getPosList',
    method: 'get',
    params
  })
}
