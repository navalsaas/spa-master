import { api } from '@/support/service'

class AreaService {
  constructor () {
    this.client = api
    this.entity = 'areas'
  }

  getEndpoint (id = null) {
    if (id) {
      return `${this.entity}/${id}`
    }

    return this.entity
  }

  getAll () {
    return this
      .client
      .get(this.getEndpoint())
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
}

export default new AreaService()
