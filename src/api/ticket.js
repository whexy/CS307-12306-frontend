import request from '@/utils/request'

export function getTickets(token) {
  return request({
    url: '/query/v3',
    method: 'get',
    params: token
  })
}

export function getLeftTickets(token) {
  return request({
    url: '/query/ticket',
    method: 'get',
    params: token
  })
}
