const express = require('express')
const { AirplaneController } = require('../../controllers')
const { AirplaneMiddlewares } = require('../../middlewares')
const router = express.Router()

router.get('/',
    AirplaneController.getAirplanes)

router.post('/',
    AirplaneMiddlewares.validateCreateRequest,
    AirplaneController.createAirplane)

module.exports = router