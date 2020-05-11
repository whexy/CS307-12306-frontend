import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/user',
    method: 'post',
    data
  })
}

export function getInfo() {
  return request({
    url: '/user',
    method: 'get'
  })
}

export function register(data) {
  return request({
    url: '/signup',
    method: 'post',
    data
  })
}

export function username_available(username) {
  return request({
    url: '/user/check',
    method: 'get',
    params: { username }
  })
}
