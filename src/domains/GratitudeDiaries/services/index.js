import { api } from '@/support/service'
import { get } from 'lodash'

class GratitudeDiaryService {
  constructor () {
    this.client = api
    this.entity = 'gratitude-diaries'
  }

  getEndpoint (id = null) {
    if (id) {
      return `${this.entity}/${id}`
    }

    return this.entity
  }

  getAll (payload) {
    const date = get(payload, 'filter.date', '')
    const page = get(payload, 'page', 1)
    const url = `${this.getEndpoint()}?filter[date]=${date}&page=${page}`

    return this
      .client
      .get(url)
      .then(response => response.data || {})
      .catch(err => Promise.reject(err))
  }

  create (payload) {
    return this
      .client
      .post(this.getEndpoint(), payload)
      .then(response => response.data || {})
      .catch(err => Promise.reject(err))
  }

  update (payload) {
    return this
      .client
      .put(this.getEndpoint(payload.id), payload)
      .then(response => response.data || {})
      .catch(err => Promise.reject(err))
  }

  delete (payload) {
    return this
      .client
      .delete(this.getEndpoint(payload.id))
      .then(response => response.data || {})
      .catch(err => Promise.reject(err))
  }
}

export default new GratitudeDiaryService()
