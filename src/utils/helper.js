const compareDate = (arrivalTime, departureTime) => {
    const arrivalTimeInMilli = Date.parse(arrivalTime)
    const departureTimeInMilli = Date.parse(departureTime)
    if (arrivalTimeInMilli > departureTimeInMilli) {
        return true
    }
    else return false
}
module.exports = {
    compareDate
}