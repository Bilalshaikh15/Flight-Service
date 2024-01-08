const { StatusCodes } = require('http-status-codes')
const { AirportRepository } = require('../repositories')
const AppError = require('../utils/errors/app-error')

const airportRepository = new AirportRepository()

async function createAirport(data) {
    try {
        const airport = await airportRepository.create(data)
        return airport
    } catch (error) {
        if (error.name === 'TypeError') {
            throw new AppError('Cannot create a new Airport Object', StatusCodes.INTERNAL_SERVER_ERROR)
        } else if (error.name === 'SequelizeValidationError') {
            let explanation = []
            error.errors.forEach(err => {
                explanation.push(err.message)
            });
            throw new AppError(explanation, StatusCodes.BAD_REQUEST)
        }
        throw new AppError('Cannot create a new Airport Object', StatusCodes.INTERNAL_SERVER_ERROR)
    }
}

async function getAirports() {
    try {
        const airports = await airportRepository.getAll();
        return airports
    } catch (error) {
        throw new AppError("Cannot fetch data of All the Airports", StatusCodes.INTERNAL_SERVER_ERROR)
    }
}

async function getAirport(id) {
    try {
        const airport = await airportRepository.get(id);
        return airport
    } catch (error) {
        if (error.statusCode === StatusCodes.NOT_FOUND) {
            throw new AppError("The airport you requested is not present", error.statusCode)
        }
        throw new AppError("Cannot fetch data of the Airport", StatusCodes.INTERNAL_SERVER_ERROR)
    }
}

async function destroyAirport(id) {
    try {
        const deletedAirport = await airportRepository.destroy(id)
        return deletedAirport
    } catch (error) {
        if (error.statusCode == StatusCodes.NOT_FOUND) {
            throw new AppError("The airport you requested to delete is not present", error.statusCode)
        }
        throw new AppError("There was an error deleting the airport", StatusCodes.INTERNAL_SERVER_ERROR)
    }
}

async function updateAirport(id, data) {
    try {
        const res = await airportRepository.update(id, data);
        return res
    } catch (error) {
        if (error.statusCode == StatusCodes.NOT_FOUND) {
            throw new AppError("The airport you requested to Update is not present", error.statusCode)
        }
        throw new AppError("There was an error Updating the airport", StatusCodes.INTERNAL_SERVER_ERROR)
    }
}

module.exports = {
    createAirport,
    getAirports,
    getAirport,
    destroyAirport,
    updateAirport
}