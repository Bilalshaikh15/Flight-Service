const { StatusCodes } = require("http-status-codes");
const { ErrorResponse } = require("../utils/common");
const AppError = require("../utils/errors/app-error");

function validateCreateRequest(req, res, next) {
    if (!req.body.name) {
        ErrorResponse.message = "Something went wrong while creating an airplane"
        ErrorResponse.error = new AppError(["No name Found in the incoming request in the correct form"], StatusCodes.BAD_REQUEST)
        return res.status(StatusCodes.BAD_REQUEST)
            .json(ErrorResponse)
    }
    if (!req.body.code) {
        ErrorResponse.message = "Something went wrong while creating an airplane"
        ErrorResponse.error = new AppError(["No code Found in the incoming request in the correct form"], StatusCodes.BAD_REQUEST)
        return res.status(StatusCodes.BAD_REQUEST)
            .json(ErrorResponse)
    }
    if (!req.body.cityId) {
        ErrorResponse.message = "Something went wrong while creating an airplane"
        ErrorResponse.error = new AppError(["No cityId Found in the incoming request in the correct form"], StatusCodes.BAD_REQUEST)
        return res.status(StatusCodes.BAD_REQUEST)
            .json(ErrorResponse)
    }
    next()
}

module.exports = {
    validateCreateRequest
}