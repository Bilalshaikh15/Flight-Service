const { StatusCodes } = require('http-status-codes')
const { AirplaneRepository } = require('../repositories')
const AppError = require('../utils/errors/app-error')

const airplaneRepository = new AirplaneRepository()

async function createAirplane(data) {
    try {
        const airplane = await airplaneRepository.create(data)
        return airplane
    } catch (error) {
        if (error.name === 'TypeError') {
            throw new AppError('Cannot create a new Airplane Object', StatusCodes.INTERNAL_SERVER_ERROR)
        } else if (error.name === 'SequelizeValidationError') {
            let explanation = []
            error.errors.forEach(err => {
                explanation.push(err.message)
            });
            throw new AppError(explanation, StatusCodes.BAD_REQUEST)
        }
        throw error
    }
}

async function getAirplanes() {
    try {
        const airplanes = await airplaneRepository.getAll();
        return airplanes
    } catch (error) {
        throw new AppError("Cannot fetch data of All the Airplanes", StatusCodes.INTERNAL_SERVER_ERROR)
    }
}

async function getAirplane(id) {
    try {
        const airplane = await airplaneRepository.get(id);
        return airplane
    } catch (error) {
        if (error.statusCode === StatusCodes.NOT_FOUND) {
            throw new AppError("The airplane you requested is not present", error.statusCode)
        }
        throw new AppError("Cannot fetch data of the Airplane", StatusCodes.INTERNAL_SERVER_ERROR)
    }
}

module.exports = {
    createAirplane,
    getAirplanes,
    getAirplane
}