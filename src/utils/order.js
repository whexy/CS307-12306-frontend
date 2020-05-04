import { getOrderID } from '@/api/order'

export function newOrder(form) {
  return new Promise((resolve, reject) => {
    getOrderID(form).then(response => {
      const { result } = response
      resolve(result)
    }).catch(error => reject(error))
  })
}
