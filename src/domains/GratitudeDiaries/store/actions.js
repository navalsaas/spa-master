import GratitudeService from '../services'
import * as TYPES from './mutation-types'
import { first, get, isEmpty } from 'lodash'

const create = async ({ commit }, payload) => {
  return GratitudeService
    .create(payload)
    .then(({ data }) => {
      commit(TYPES.UPDATE_OR_CREATE, data)
      commit(TYPES.SET_GRATITUDE_DAY, data)

      return Promise.resolve(data)
    })
    .catch(err => Promise.reject(err))
}

const update = async ({ dispatch }, payload) => {
  return GratitudeService
    .update(payload)
    .then(({ data }) => dispatch('setGratitudeDay', payload))
    .catch(err => Promise.reject(err))
}

const loadGratitudes = async ({ commit, getters }, payload = {}) => {
  const filter = get(payload, 'filter', getters.filter)

  const data = { ...payload, filter }
  return GratitudeService
    .getAll(data)
    .then(({ data, today, meta }) => {
      const gratitudes = data || []
      commit(TYPES.SET_FILTER, filter)
      commit(TYPES.SET_GRATITUDES, gratitudes)
      commit(TYPES.SET_PAGINATE, meta)
      if (isEmpty(filter)) {
        commit(TYPES.SET_TODAY, today)
        commit(TYPES.SET_GRATITUDE_DAY, getters.gratitudeDayFromGratitudes)
      } else {
        commit(TYPES.SET_GRATITUDE_DAY, first(gratitudes))
      }

      return Promise.resolve({ gratitudes })
    })
    .catch(err => Promise.reject(err))
}

const setGratitudeDay = async ({ commit }, gratitude) => {
  commit(TYPES.SET_GRATITUDE_DAY, gratitude)

  return gratitude
}

const setPage = async ({ commit, dispatch, getters }, page) => {
  commit(TYPES.SET_PAGE, page)

  dispatch('loadGratitudes', { filter: getters.filter, page: page })

  return page
}

export default {
  create,
  update,
  setPage,
  setGratitudeDay,
  loadGratitudes
}
