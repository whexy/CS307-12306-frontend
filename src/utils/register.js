import { register } from '@/api/user'

export function Register(data) {
  return new Promise((resolve, reject) => {
    register(data).then(response => {
      resolve()
    }).catch(error => {
      reject(error)
    }
    )
  })
}
