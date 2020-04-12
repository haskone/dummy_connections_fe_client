import moment from 'moment'

export function formatDatetime(strDate) {
    return moment(strDate).format('MMMM Do YYYY, h:mm:ss a');
}
