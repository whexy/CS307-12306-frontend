import request from '@/utils/request'

export function geo(geo_name) {
  return request({
    url: '/geo',
    method: 'get',
    params: { geo_name }
  })
}

export function area(area_info) {
  return request({
    url: '/area',
    method: 'get',
    params: area_info
  })
}

export function train(train_name) {
  return request({
    url: '/train/v2',
    method: 'get',
    params: { train_name }
  })
}
