import moment from 'moment'

export const parse = (gratitude = {}) => {
  return {
    ...gratitude,
    _parse_date: moment(gratitude.date).format('DD/MM/YYYY')
  }
}
