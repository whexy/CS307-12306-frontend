import request from '@/utils/request'

export function geo(geo_name) {
  return request({
    url: '/geo',
    method: 'get',
    params: { geo_name }
  })
}
