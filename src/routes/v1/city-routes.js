const express = require('express')
const { CityControllers } = require('../../controllers')
const { CityMiddlewares } = require('../../middlewares')

const router = express.Router()

router.get('/', CityControllers.getCities)

router.get('/:id', CityControllers.getCity)

router.post('/',
    CityMiddlewares.validateCreateRequest,
    CityControllers.createCity)

router.patch('/:id',
    CityMiddlewares.validateCreateRequest,
    CityControllers.updateCity)

router.delete('/:id', CityControllers.destroyCity)

module.exports = router