import moment from 'moment'

export const formatDatetime = (strDate) => {
    return moment(strDate).format('MMMM Do YYYY, h:mm:ss a');
}

export const sortByCreated = (a, b) =>
  (a.created_at > b.created_at) ? 1 :
  (b.created_at > a.created_at ? -1 : 0)
