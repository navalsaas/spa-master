import { api } from '@/support/service'

class StreakService {
  constructor () {
    this.client = api
    this.entity = 'streaks'
  }

  getEndpoint (id = null) {
    if (id) {
      return `${this.entity}/${id}`
    }

    return this.entity
  }

  getAll (payload = {}) {
    return this
      .client
      .get(this.getEndpoint())
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

export default new StreakService()
