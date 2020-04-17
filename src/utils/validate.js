/**
 * Created by Whexy on 17/4/2020
 */

import { username_available } from '@/api/user'

/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

export function validUsername(username) {
  return new Promise((resolve, reject) => {
    username_available(username).then(response => {
      const { result } = response
      resolve(result)
    }).catch(error => {
      reject(error)
    })
  })
}
