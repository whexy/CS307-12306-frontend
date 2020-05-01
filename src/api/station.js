import request from '@/utils/request'

export function geo(geo_name) {
  return request({
    url: '/geo',
    method: 'get',
    params: { geo_name }
  })
}

export function train(train_name) {
  return request({
    url: '/train',
    method: 'get',
    params: { train_name }
  })
}
