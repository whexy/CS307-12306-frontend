import {
  AddNewStation,
  CommitIntervalInfo,
  DeleteNewStation, DeleteTrain,
  GetIntervalInfo,
  ModifyStation,
  NewInterval, RestoreTrain
} from '@/api/admin'

export function addNewStation(form) {
  return new Promise((resolve, reject) => {
    AddNewStation(form).then(response => {
      const { result } = response
      resolve(result)
    }).catch(error => reject(error))
  })
}

export function deleteStation(form) {
  return new Promise((resolve, reject) => {
    DeleteNewStation(form).then(response => {
      const { result } = response
      resolve(result)
    }).catch(error => reject(error))
  })
}

export function modifyStation(form) {
  return new Promise((resolve, reject) => {
    ModifyStation(form).then(response => {
      const { result } = response
      resolve(result)
    }).catch(error => reject(error))
  })
}

export function getIntervalInfo(form) {
  return new Promise((resolve, reject) => {
    GetIntervalInfo(form).then(response => {
      const { result } = response
      resolve(result)
    }).catch(error => reject(error))
  })
}

export function commitIntervalInfo(data) {
  return new Promise((resolve, reject) => {
    CommitIntervalInfo(data).then(response => {
      const { result } = response
      resolve(result)
    }).catch(error => reject(error))
  })
}

export function commitNewInterval(data) {
  return new Promise((resolve, reject) => {
    NewInterval(data).then(response => {
      const { result } = response
      resolve(result)
    }).catch(error => reject(error))
  })
}

export function deleteTrain(data) {
  return new Promise((resolve, reject) => {
    DeleteTrain(data).then(response => {
      const { result } = response
      resolve(result)
    }).catch(error => reject(error))
  })
}

export function restoreTrain(data) {
  return new Promise((resolve, reject) => {
    RestoreTrain(data).then(response => {
      const { result } = response
      resolve(result)
    }).catch(error => reject(error))
  })
}
