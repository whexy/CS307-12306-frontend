import { getTickets, getFuzzyTickets, getLeftTickets, getTransferStationList } from '@/api/ticket'

export function ticket_query(train_name) {
  return new Promise((resolve, reject) => {
    getTickets(train_name).then(response => {
      const { result } = response
      resolve(result)
    }).catch(error => reject(error))
  })
}

export function fuzzy_ticket_query(train_name) {
  return new Promise((resolve, reject) => {
    getFuzzyTickets(train_name).then(response => {
      const { result } = response
      resolve(result)
    }).catch(error => reject(error))
  })
}

export function transfer_station_query(form) {
  return new Promise((resolve, reject) => {
    getTransferStationList(form).then(response => {
      const { result } = response
      resolve(result)
    }).catch(error => reject(error))
  })
}

export function left_ticket_query(train_name, first_interval, last_interval) {
  return new Promise((resolve, reject) => {
    getLeftTickets({
      train_name: train_name,
      first_interval: first_interval,
      last_interval: last_interval
    }).then(response => {
      const { result } = response
      resolve(result)
    }).catch(error => reject(error))
  })
}
