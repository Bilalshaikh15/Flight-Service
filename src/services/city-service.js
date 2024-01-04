const { StatusCodes } = require("http-status-codes");
const { CityRepository } = require("../repositories");
const AppError = require("../utils/errors/app-error");

const cityRepository = new CityRepository()

async function createCity(data) {
    try {
        const city = await cityRepository.create(data)
        return city
    } catch (error) {
        if (error.name === "SequelizeUniqueConstraintError") {
            let explanation = []
            error.errors.forEach(err => {
                explanation.push(err.message)
            });
            throw new AppError(explanation, StatusCodes.BAD_REQUEST)
        }
        throw new AppError("Cannot create a new city object", StatusCodes.INTERNAL_SERVER_ERROR)
    }
}

async function getCity(id) {
    try {
        const city = await cityRepository.get(id)
        return city
    } catch (error) {
        throw new AppError('Cannot get City information', StatusCodes.INTERNAL_SERVER_ERROR)
    }
}

async function getAllCity() {
    try {
        const cities = cityRepository.getAll()
        return cities
    } catch (error) {
        throw new AppError("Cannot fetch data of All the cities", StatusCodes.INTERNAL_SERVER_ERROR)
    }
}

async function updateCity(id, data) {
    try {
        const city = cityRepository.update(id, data)
        return city
    } catch (error) {

    }
}

async function destroyCity(id) {
    try {
        const city = cityRepository.destroy(id)
        return city
    } catch (error) {

    }
}

module.exports = {
    createCity,
    destroyCity,
    getAllCity,
    getCity,
    updateCity
}