import { api } from '@/support/service'
import { get } from 'lodash'

class TasksService {
  constructor () {
    this.client = api
    this.entity = 'tasks'
  }

  getEndpoint (id = null) {
    if (id) {
      return `${this.entity}/${id}`
    }

    return this.entity
  }

  getAll (payload = {}) {
    const endpoint = this.getEndpoint()
    const today = get(payload, 'filter.today', false)
    const url = `${endpoint}&filter[today]=${today}`

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

  toggle (payload) {
    return this
      .client
      .put(this.getEndpoint(`${payload.id}/toggle`), payload)
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

export default new TasksService()
