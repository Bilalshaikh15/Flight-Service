const { StatusCodes } = require("http-status-codes");
const { ErrorResponse } = require("../utils/common");
const AppError = require("../utils/errors/app-error");

function validateCreateRequest(req, res, next) {
    if (!req.body.flightNumber) {
        ErrorResponse.message = "Something went wrong while creating a Flight"
        ErrorResponse.error = new AppError(["No flightNumber Found in the incoming request in the correct form"], StatusCodes.BAD_REQUEST)
        return res.status(StatusCodes.BAD_REQUEST)
            .json(ErrorResponse)
    }
    if (!req.body.airplaneId) {
        ErrorResponse.message = "Something went wrong while creating an Flight"
        ErrorResponse.error = new AppError(["No airplaneId Found in the incoming request in the correct form"], StatusCodes.BAD_REQUEST)
        return res.status(StatusCodes.BAD_REQUEST)
            .json(ErrorResponse)
    }
    if (!req.body.departureAirportId) {
        ErrorResponse.message = "Something went wrong while creating a Flight"
        ErrorResponse.error = new AppError(["No departureAirportId Found in the incoming request in the correct form"], StatusCodes.BAD_REQUEST)
        return res.status(StatusCodes.BAD_REQUEST)
            .json(ErrorResponse)
    }
    if (!req.body.arrivalAirportId) {
        ErrorResponse.message = "Something went wrong while creating a Flight"
        ErrorResponse.error = new AppError(["No arrivalAirportId Found in the incoming request in the correct form"], StatusCodes.BAD_REQUEST)
        return res.status(StatusCodes.BAD_REQUEST)
            .json(ErrorResponse)
    }
    if (!req.body.arrivalTime) {
        ErrorResponse.message = "Something went wrong while creating a Flight"
        ErrorResponse.error = new AppError(["No arrivalTime Found in the incoming request in the correct form"], StatusCodes.BAD_REQUEST)
        return res.status(StatusCodes.BAD_REQUEST)
            .json(ErrorResponse)
    }
    if (!req.body.departureTime) {
        ErrorResponse.message = "Something went wrong while creating a Flight"
        ErrorResponse.error = new AppError(["No departureTime Found in the incoming request in the correct form"], StatusCodes.BAD_REQUEST)
        return res.status(StatusCodes.BAD_REQUEST)
            .json(ErrorResponse)
    }
    if (!req.body.price) {
        ErrorResponse.message = "Something went wrong while creating a Flight"
        ErrorResponse.error = new AppError(["No price Found in the incoming request in the correct form"], StatusCodes.BAD_REQUEST)
        return res.status(StatusCodes.BAD_REQUEST)
            .json(ErrorResponse)
    }
    if (!req.body.totalSeats) {
        ErrorResponse.message = "Something went wrong while creating a Flight"
        ErrorResponse.error = new AppError(["No totalSeats Found in the incoming request in the correct form"], StatusCodes.BAD_REQUEST)
        return res.status(StatusCodes.BAD_REQUEST)
            .json(ErrorResponse)
    }
    next()
}

module.exports = {
    validateCreateRequest
}