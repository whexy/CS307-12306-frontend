import request from '@/utils/request'

export function getOrderID(data) {
  return request({
    url: '/order',
    method: 'post',
    data
  })
}

export function getPurchaseStatus(data) {
  return request({
    url: '/purchase',
    method: 'post',
    data
  })
}
