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

module.exports = {
    createAirplane
}