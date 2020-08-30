// formatando datas: dd/mm/yy às hh:mm
export const formatDate = (date) => {
    let nDate = new Date(date);

    let day = (nDate.getDate() < 10) ? `0${nDate.getDate()}` : nDate.getDate();
    let month = (nDate.getMonth() + 1 < 10) ? `0${nDate.getMonth() + 1}` : nDate.getMonth() + 1;
    let year = nDate.getFullYear();
    let hours = (nDate.getHours() < 10) ? `0${nDate.getHours()}` : nDate.getHours();
    let minutes = (nDate.getMinutes() < 10) ? `0${nDate.getMinutes()}` : nDate.getMinutes();

    return `${day}/${month}/${year} às ${hours}:${minutes}`;
}