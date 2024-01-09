const CrudRepository = require("./crud-repository");
const { Flight, Airport, Airplane, City } = require('../models');
const { Sequelize } = require("sequelize");

class FlightRepository extends CrudRepository {
    constructor() {
        super(Flight)
    }

    async getAllFlights(filter, sort) {
        const flights = await Flight.findAll({
            where: filter,
            order: sort,
            include: [
                {
                    model: Airplane,
                    required: true,
                    as: 'airplaneDetail'
                },
                {
                    model: Airport,
                    required: true,
                    as: 'departureAirport',
                    on: {
                        col1: Sequelize.where(Sequelize.col("Flight.departureAirportId"), "=", Sequelize.col("departureAirport.code"))
                    },
                    include: {
                        model: City,
                        required: true
                    }
                },
                {
                    model: Airport,
                    required: true,
                    as: 'arrivalAirport',
                    on: {
                        col1: Sequelize.where(Sequelize.col("Flight.arrivalAirportId"), "=", Sequelize.col("arrivalAirport.code"))
                    },
                    include: {
                        model: City,
                        required: true
                    }
                }
            ]
        })
        return flights
        // const flightsWithAirportDetails = await flights.map(async (el) => {
        //     const departureAirportDetails = await Airport.findOne({
        //         where: {
        //             code: el.dataValues.departureAirportId
        //         }
        //     })
        //     el.dataValues.departureAirportDetails = departureAirportDetails.dataValues;

        //     const arrivalAirportDetails = await Airport.findOne({
        //         where: {
        //             code: el.dataValues.arrivalAirportId
        //         }
        //     })
        //     el.dataValues.arrivalAirportDetails = arrivalAirportDetails.dataValues;
        //     return el.dataValues;
        // })
        // const response = await Promise.all(flightsWithAirportDetails)
        // return response
    }
}

module.exports = FlightRepository