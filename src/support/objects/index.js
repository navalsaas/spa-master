import { isEmpty, pick, isNumber } from 'lodash-es'

/**
 * @method isNotEmptyValue
 * @param  {Any} value
 * @return {Boolean}
 */
const isNotEmptyValue = value => {
  if (isNumber(value)) {
    return true
  }

  return !isEmpty(value)
}

/**
 * @method checkHasEmptyKey
 * @param  {Object} data
 * @param  {Array<String>} keys
 * @return {Boolean}
 */
export const checkHasEmptyKey = (data, keys = []) => {
  if (isEmpty(keys)) {
    return Object.values(data).every(isNotEmptyValue)
  }

  const obj = pick(data, keys)

  return Object.values(obj).every(isNotEmptyValue)
}

/**
 * @method buildParams
 * @param  {{page?: number, filter?: Object}} options
 * @return {Object}
 */
export const buildParams = (options) => {
  const deff = {}

  if (options.page) {
    deff.page = options.page
  }

  if (options.filter) {
    const filter = options.filter || {}

    for (const key in filter) {
      deff[`filter[${key}]`] = filter[key]
    }
  }

  return deff
}
