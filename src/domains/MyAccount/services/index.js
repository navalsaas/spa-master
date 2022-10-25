import { api } from '@/support/service'

class MyAccountService {
  constructor () {
    this.client = api
    this.entity = 'auth'
  }

  getEndpoint (id = null) {
    if (id) {
      return `${this.entity}/${id}`
    }

    return this.entity
  }

  get (payload = {}) {
    return this
      .client
      .get(this.getEndpoint('me'))
      .then(response => response.data || {})
      .catch(err => Promise.reject(err))
  }

  update (payload) {
    return this
      .client
      .put(this.getEndpoint('me'), payload)
      .then(response => response.data || {})
      .catch(err => Promise.reject(err))
  }

  delete (id) {
    return this
      .client
      .delete(this.getEndpoint('me') + '/' + id)
      .then(response => response.data || {})
      .catch(err => Promise.reject(err))
  }
}

export default new MyAccountService()
