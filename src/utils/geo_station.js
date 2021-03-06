/**
 * Created by Whexy on 18/4/2020
 */

import { geo, train, area } from '@/api/station'

export function geo_query(geo_name) {
  return new Promise((resolve, reject) => {
    geo(geo_name).then(response => {
      const { result } = response
      resolve(result)
    }).catch(error => {
      reject(error)
    })
  })
}

export function train_query(train_name) {
  return new Promise((resolve, reject) => {
    train(train_name).then(response => {
      const { result } = response
      resolve(result)
    }).catch(error => reject(error))
  })
}

export function area_query(area_info) {
  return new Promise((resolve, reject) => {
    area(area_info).then(response => {
      const { result } = response
      resolve(result)
    }).catch(error => reject(error))
  })
}
