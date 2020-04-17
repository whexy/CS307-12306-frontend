import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/user',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/vue-admin-template/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/vue-admin-template/user/logout',
    method: 'post'
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
