import request from '@/utils/request'

export function getMyTickets(token) {
  return request({
    url: '/ticket',
    method: 'get',
    params: { token }
  })
}
