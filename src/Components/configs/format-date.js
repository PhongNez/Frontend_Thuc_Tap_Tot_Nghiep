import moment from 'moment'

const handleFormatDate = (date) => {
    const formattedDate = moment(date).format('DD/MM/YYYY');
    return formattedDate
}



export default handleFormatDate