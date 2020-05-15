import request from '@/utils/request'

export function AddNewStation(data) {
  return request({
    url: '/admin/station',
    method: 'post',
    data
  })
}

export function DeleteNewStation(data) {
  return request({
    url: '/admin/station',
    method: 'delete',
    data
  })
}

export function ModifyStation(data) {
  return request({
    url: '/admin/station',
    method: 'patch',
    data
  })
}

export function GetIntervalInfo(form) {
  return request({
    url: '/admin/train',
    method: 'get',
    params: form
  })
}

export function CommitIntervalInfo(data) {
  return request({
    url: '/admin/train',
    method: 'patch',
    data
  })
}

export function NewInterval(data) {
  return request({
    url: '/admin/train',
    method: 'post',
    data
  })
}

export function DeleteTrain(data) {
  return request({
    url: '/admin/train',
    method: 'delete',
    data
  })
}

export function RestoreTrain(data) {
  return request({
    url: '/admin/train',
    method: 'put',
    data
  })
}
