const express = require('express')
const { FlightController } = require('../../controllers')
const { FlightMiddlewares } = require('../../middlewares')
const router = express.Router()

router.post('/',
    FlightMiddlewares.validateCreateRequest,
    FlightController.createFlight)

router.get('/', FlightController.getAllFlights)

// router.post('/',
//     AirportMiddlewares.validateCreateRequest,
//     AirportController.createAirport)

// router.patch('/:id',
//     AirportController.updateAirport)

// router.delete('/:id',
//     AirportController.destroyAirport)



module.exports = router