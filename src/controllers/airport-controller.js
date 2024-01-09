const { StatusCodes } = require("http-status-codes");
const { AirportService } = require("../services");
const { ErrorResponse, SuccessResponse } = require('../utils/common');
const AppError = require("../utils/errors/app-error");

async function createAirport(req, res) {
    try {
        const airport =
            await AirportService.createAirport({
                name: req.body.name,
                code: req.body.code,
                address: req.body.address,
                cityId: req.body.cityId
            });
        SuccessResponse.data = airport
        return res.status(StatusCodes.CREATED)
            .json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error = error
        return res
            .status(error.statusCode)
            .json(ErrorResponse)
    }
}

async function getAirports(req, res) {
    try {
        const airports = await AirportService.getAirports()
        SuccessResponse.data = airports
        return res.status(StatusCodes.OK)
            .json(SuccessResponse)
    } catch (error) {
        ErrorResponse.error = error
        return res
            .status(error.statusCode)
            .json(ErrorResponse)
    }
}

async function getAirport(req, res) {
    try {
        const airport = await AirportService.getAirport(req.params.id)
        SuccessResponse.data = airport
        return res.status(StatusCodes.OK)
            .json(SuccessResponse)
    } catch (error) {
        ErrorResponse.error = error
        return res
            .status(error.statusCode)
            .json(ErrorResponse)
    }
}

async function destroyAirport(req, res) {
    try {
        const deletedAirplane = await AirportService.destroyAirport(req.params.id);
        SuccessResponse.data = deletedAirplane
        return res.status(StatusCodes.OK)
            .json(SuccessResponse)
    } catch (error) {
        ErrorResponse.error = error
        return res
            .status(error.statusCode)
            .json(ErrorResponse)
    }
}

async function updateAirport(req, res) {
    try {
        if (!req.body.name) {
            throw new AppError("Please Provide Capacity in req body", StatusCodes.BAD_REQUEST)
        }

        const deletedAirplane = await AirportService.updateAirport(req.params.id, {
            name: req.body.name,
            cityId: req.body.cityId,
            code: req.body.code
        });
        SuccessResponse.data = deletedAirplane
        return res.status(StatusCodes.OK)
            .json(SuccessResponse)
    } catch (error) {
        if (error.statusCode === StatusCodes.BAD_REQUEST) {
            ErrorResponse.error = error
            return res.status(StatusCodes.BAD_REQUEST)
                .json(ErrorResponse)
        }
        ErrorResponse.error = error
        return res
            .status(error.statusCode)
            .json(ErrorResponse)
    }
}

module.exports = {
    createAirport,
    getAirport,
    getAirports,
    destroyAirport,
    updateAirport
}
