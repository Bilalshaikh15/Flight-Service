const { StatusCodes } = require("http-status-codes");
const { AirplaneService } = require("../services");
const { ErrorResponse, SuccessResponse } = require('../utils/common');
const AppError = require("../utils/errors/app-error");

async function createAirplane(req, res) {
    try {
        const airplane =
            await AirplaneService.createAirplane({
                modelNumber: req.body.modelNumber,
                capacity: req.body.capacity
            });
        SuccessResponse.data = airplane
        return res.status(StatusCodes.CREATED)
            .json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error = error
        return res
            .status(error.statusCode)
            .json(ErrorResponse)
    }
}

async function getAirplanes(req, res) {
    try {
        const airplanes = await AirplaneService.getAirplanes()
        SuccessResponse.data = airplanes
        return res.status(StatusCodes.OK)
            .json(SuccessResponse)
    } catch (error) {
        ErrorResponse.error = error
        return res
            .status(error.statusCode)
            .json(ErrorResponse)
    }
}

async function getAirplane(req, res) {
    try {
        const airplane = await AirplaneService.getAirplane(req.params.id)
        SuccessResponse.data = airplane
        return res.status(StatusCodes.OK)
            .json(SuccessResponse)
    } catch (error) {
        ErrorResponse.error = error
        return res
            .status(error.statusCode)
            .json(ErrorResponse)
    }
}

async function destroyAirplane(req, res) {
    try {
        const deletedAirplane = await AirplaneService.destroyAirplane(req.params.id);
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

async function updateAirplane(req, res) {
    try {
        if (!req.body.capacity) {
            throw new AppError("Please Provide Capacity in req body", StatusCodes.BAD_REQUEST)
        }

        const deletedAirplane = await AirplaneService.updateAirplane(req.params.id, req.body.capacity);
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
    createAirplane,
    getAirplanes,
    getAirplane,
    destroyAirplane,
    updateAirplane
}