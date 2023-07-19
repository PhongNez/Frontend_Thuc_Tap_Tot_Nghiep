import moment from 'moment'

const handleFormatDate = (date) => {
    const formattedDate = moment(date).format('DD/MM/YYYY HH:mm:ss');
    return formattedDate
}

export default handleFormatDate