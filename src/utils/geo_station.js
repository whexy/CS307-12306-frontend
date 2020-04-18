/**
 * Created by Whexy on 18/4/2020
 */

import { geo } from '@/api/station'

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
