
// /** @format */
// const dateFormat = require('moment');
// require('moment/locale/vi');

// export default {
//     formatDate: (date) => dateFormat(date).format('DD/MM/YYYY'),
// }

// export const formatDate = (date) => {
//     if(!date) return '';
//     date = new Date(date);
//     let year = date.getFullYear();
//     let month = date.getMonth() + 1;
//     let day = date.getDate();
//     if (month < 10) {
//         month = '0' + month;
//     }

//     if (day < 10) {
//         day = '0' + day;
//     }
//     return {day}/{month}/{year}
// }