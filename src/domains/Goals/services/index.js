import { api } from '@/support/service'

class AreaService {
  constructor () {
    this.client = api
    this.entity = 'goals'
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
      .get(this.getEndpoint('?paginate=false'))
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

export default new AreaService()
