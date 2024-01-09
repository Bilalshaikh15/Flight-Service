const { StatusCodes } = require('http-status-codes')
const { FlightRepository } = require('../repositories')
const AppError = require('../utils/errors/app-error')
const { compareDate } = require('../utils/helper')
const { Op } = require('sequelize')

const flightRepository = new FlightRepository()

async function createFlight(data) {
    try {
        const isTimeCorrect = compareDate(data.arrivalTime, data.departureTime)
        if (!isTimeCorrect) {
            throw new AppError('Cannot create a new Flight Object because date is incorrect departure time should be less than arrivalTime ', StatusCodes.BAD_REQUEST)
        }
        const flight = await flightRepository.create(data)
        return flight
    } catch (error) {
        if (error.name === 'TypeError') {
            throw new AppError('Cannot create a new Flight Object', StatusCodes.INTERNAL_SERVER_ERROR)
        } else if (error.name === 'SequelizeValidationError') {
            let explanation = []
            error.errors.forEach(err => {
                explanation.push(err.message)
            });
            throw new AppError(explanation, StatusCodes.BAD_REQUEST)
        }
        if (error) {
            throw new AppError(error, StatusCodes.BAD_REQUEST)
        }
        throw new AppError('Cannot create a new Flight Object', StatusCodes.INTERNAL_SERVER_ERROR)
    }
}

async function getAllFlights(query) {
    let customFilter = {}
    let sortFilter = [];
    if (query.trips) {
        const [departureAirportId, arrivalAirportId] = query.trips.split('-')
        if (departureAirportId === arrivalAirportId) throw Error("Departure and Arrival cannot be same")
        customFilter.departureAirportId = departureAirportId
        customFilter.arrivalAirportId = arrivalAirportId
    }
    if (query.price) {
        const [minPrice, maxPrice] = query.price.split('-')
        customFilter.price = {
            [Op.between]: [minPrice, ((maxPrice === undefined) ? 100000 : maxPrice)]
        }
    }
    if (query.travellers) {
        customFilter.totalSeats = {
            [Op.gte]: query.travellers
        }
    }
    if (query.tripDate) {
        let tripDate = query.tripDate
        let endTripDate = query.tripDate + " 23:59:59"
        customFilter.departureTime = {
            [Op.between]: [tripDate, endTripDate]
        }
    }
    if (query.sort) {
        const params = query.sort.split(',')
        let sortFilters = params.map(param => param.split('_'))
        sortFilter = sortFilters
    }
    try {
        const flights = await flightRepository.getAllFlights(customFilter, sortFilter)
        return flights
    } catch (error) {
        throw new AppError("Cannot fetch data of All the Flights", StatusCodes.INTERNAL_SERVER_ERROR)
    }
}

// async function getAirport(id) {
//     try {
//         const airport = await airportRepository.get(id);
//         return airport
//     } catch (error) {
//         if (error.statusCode === StatusCodes.NOT_FOUND) {
//             throw new AppError("The airport you requested is not present", error.statusCode)
//         }
//         throw new AppError("Cannot fetch data of the Airport", StatusCodes.INTERNAL_SERVER_ERROR)
//     }
// }

// async function destroyAirport(id) {
//     try {
//         const deletedAirport = await airportRepository.destroy(id)
//         return deletedAirport
//     } catch (error) {
//         if (error.statusCode == StatusCodes.NOT_FOUND) {
//             throw new AppError("The airport you requested to delete is not present", error.statusCode)
//         }
//         throw new AppError("There was an error deleting the airport", StatusCodes.INTERNAL_SERVER_ERROR)
//     }
// }

// async function updateAirport(id, data) {
//     try {
//         const res = await airportRepository.update(id, data);
//         return res
//     } catch (error) {
//         if (error.statusCode == StatusCodes.NOT_FOUND) {
//             throw new AppError("The airport you requested to Update is not present", error.statusCode)
//         }
//         throw new AppError("There was an error Updating the airport", StatusCodes.INTERNAL_SERVER_ERROR)
//     }
// }

module.exports = {
    createFlight,
    getAllFlights
}