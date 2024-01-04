const { StatusCodes } = require("http-status-codes");
const { CityService } = require("../services");
const { SuccessResponse, ErrorResponse } = require("../utils/common");

async function createCity(req, res) {
    try {
        const city = await CityService.createCity({
            name: req.body.name
        })
        SuccessResponse.data = city
        return res.status(StatusCodes.CREATED)
            .json(SuccessResponse)
    } catch (error) {
        ErrorResponse.error = error
        return res.status(StatusCodes.FORBIDDEN)
            .json(ErrorResponse)
    }
}

async function getCity(req, res) {
    try {
        const city = await CityService.getCity(req.params.id)
        SuccessResponse.data = city
        return res.status(StatusCodes.CREATED)
            .json(SuccessResponse)
    } catch (error) {
        ErrorResponse.error = error
        return res.status(StatusCodes.FORBIDDEN)
            .json(ErrorResponse)
    }
}

async function getCities(req, res) {
    try {
        const city = await CityService.getCities()
        SuccessResponse.data = city
        return res.status(StatusCodes.CREATED)
            .json(SuccessResponse)
    } catch (error) {
        ErrorResponse.error = error
        return res.status(StatusCodes.FORBIDDEN)
            .json(ErrorResponse)
    }
}

async function updateCity(req, res) {
    try {
        const city = await CityService.updateCity(req.params.id, {
            name: req.body.name
        })
        SuccessResponse.data = city
        return res.status(StatusCodes.CREATED)
            .json(SuccessResponse)
    } catch (error) {
        ErrorResponse.error = error
        return res.status(StatusCodes.FORBIDDEN)
            .json(ErrorResponse)
    }
}

async function destroyCity(req, res) {
    try {
        const city = await CityService.destroyCity(req.params.id)
        SuccessResponse.data = city
        return res.status(StatusCodes.CREATED)
            .json(SuccessResponse)
    } catch (error) {
        ErrorResponse.error = error
        return res.status(StatusCodes.FORBIDDEN)
            .json(ErrorResponse)
    }
}

module.exports = {
    createCity,
    getCity,
    getCities,
    updateCity,
    destroyCity
}