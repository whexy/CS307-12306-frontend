import request from '@/utils/request'

export function getTicketList(token) {
  return request({
    url: '/ticket',
    method: 'get',
    params: { token }
  })
}
