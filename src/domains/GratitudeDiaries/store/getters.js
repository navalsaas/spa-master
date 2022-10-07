import moment from 'moment'
import { find } from 'lodash'

export const gratitudes = ({ gratitudes }) => gratitudes
export const today = ({ today }) => today
export const parseToday = ({ today }) => moment(today).format('DD/MM/YYYY')
export const gratitudeDay = ({ gratitudeDay }) => gratitudeDay

export const gratitudeDayFromGratitudes = ({ gratitudes, today }) => {
  const gratitude = find(gratitudes, gratitude => gratitude.date === today)

  if (gratitude) {
    return gratitude
  }

  return {
    id: null,
    what: null,
    date: null
  }
}

export const paginate = ({ paginate }) => paginate

export const filter = ({ filter }) => filter
