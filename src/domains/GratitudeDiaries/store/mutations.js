import * as TYPES from './mutation-types'
import { find, map } from 'lodash'
import { parse } from './parse-gratitude'

const updateOrCreate = (gratitudes, gratitude) => {
  const gratitudeDiary = find(gratitudes, item => item.id === gratitude.id)

  if (!gratitudeDiary) {
    gratitudes.unshift(parse(gratitude))

    return gratitudes
  }

  return map(gratitudes, item => {
    if (item.id === gratitude.id) {
      return parse(gratitude)
    }

    return item
  })
}

export default {
  [TYPES.UPDATE_OR_CREATE] (state, gratitude) {
    const gratitudes = updateOrCreate(state.gratitudes, gratitude)

    state.gratitudes = [...gratitudes]
  },
  [TYPES.SET_GRATITUDES] (state, gratitudes) {
    state.gratitudes = [...map(gratitudes, gratitude => parse(gratitude))]
  },
  [TYPES.SET_TODAY] (state, today) {
    state.today = today
  },
  [TYPES.SET_GRATITUDE_DAY] (state, gratitudeDay) {
    state.gratitudeDay = { ...gratitudeDay }

    const gratitudes = updateOrCreate(state.gratitudes, gratitudeDay)

    state.gratitudes = [...gratitudes]
  },
  [TYPES.SET_PAGINATE] (state, paginate) {
    state.paginate = { ...paginate }
  },
  [TYPES.SET_PAGE] (state, page) {
    state.paginate = { ...state.paginate, current_page: page }
  },
  [TYPES.SET_FILTER] (state, filter) {
    state.filter = { ...filter }
  }
}
