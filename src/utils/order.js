import { getOrderID, getPurchaseStatus } from '@/api/order'

export function newOrder(form) {
  return new Promise((resolve, reject) => {
    getOrderID(form).then(response => {
      const { result } = response
      resolve(result)
    }).catch(error => reject(error))
  })
}

export function getPurchase(form) {
  return new Promise((resolve, reject) => {
    getPurchaseStatus(form).then(response => {
      const { result } = response
      resolve(result)
    }).catch(error => reject(error))
  }
  )
}
