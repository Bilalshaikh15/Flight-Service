const { StatusCodes } = require("http-status-codes");
const { ErrorResponse } = require("../utils/common");
const AppError = require("../utils/errors/app-error");

function validateCreateRequest(req, res, next) {
    if (!req.body.name) {
        ErrorResponse.message = "Something went wrong while creating a City"
        ErrorResponse.error = new AppError(["city name not Found in the incoming request in the correct form"], StatusCodes.BAD_REQUEST)
        return res.status(StatusCodes.BAD_REQUEST)
            .json(ErrorResponse)
    }
    next()
}

module.exports = {
    validateCreateRequest
}