/**
 * Created by PanJiaChen on 16/11/18.
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
      resolve(response.data.result)
    }).catch(error => {
      reject(error)
    })
  })
}
