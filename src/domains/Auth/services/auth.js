import { api } from '@/support/service'

class AuthService {
  constructor () {
    this.client = api
    this.entity = 'auth'
  }

  getEndpoint (path) {
    return `/${this.entity}/${path}`
  }

  login (credentials) {
    return this
      .client
      .post(this.getEndpoint('login'), credentials)
      .then(response => response.data || {})
      .catch(err => Promise.reject(err))
  }

  logout () {
    return this
      .client
      .post(this.getEndpoint('logout'))
      .then(response => response.data || {})
      .catch(err => Promise.reject(err))
  }

  register (data) {
    return this
      .client
      .post(this.getEndpoint('register'), data)
      .then(response => response.data || {})
      .catch(err => Promise.reject(err))
  }

  me () {
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

  changePassword (payload) {
    return this
      .client
      .put(this.getEndpoint('password'), payload)
      .then(response => response.data || {})
      .catch(err => Promise.reject(err))
  }
}

export default new AuthService()
