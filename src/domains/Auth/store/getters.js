import { isEmpty, get } from 'lodash-es'

export const isAuthenticate = ({ token }) => !isEmpty(token)

export const hasUser = ({ user }) => !isEmpty(user)

export const userName = ({ user }) => {
  return user.name || ''
}

export const userFirstName = ({ user }) => {
  return get(user, 'name', '').split(' ').splice(0, 1).toString()
}
