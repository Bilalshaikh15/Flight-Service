const express = require('express')
const { CityControllers } = require('../../controllers')

const router = express.Router()

router.post('/',
    CityControllers.createCity)

module.exports = router