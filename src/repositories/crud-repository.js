const { StatusCodes } = require("http-status-codes");
const { Logger } = require("../config");
const AppError = require("../utils/errors/app-error");

class CrudRepository {
    constructor(model) {
        this.model = model;
    }

    async create(data) {
        const response = await this.model.create(data);
        return response;
    }

    async get(id) {
        const response = await this.model.findByPk(id);
        if (!response) {
            throw new AppError("Not Able to find the resource", StatusCodes.NOT_FOUND)
        }
        return response;
    }

    async getAll() {
        const response = await this.model.findAll();
        return response;
    }

    async update(id, data) {
        const response = await this.model.update({
            capacity: data
        }, {
            where: {
                id
            }
        });
        if (!response[0]) {
            throw new AppError("Not able to find the resource", StatusCodes.NOT_FOUND)
        }
        return response[0];
    }

    async destroy(id) {
        const response = await this.model.destroy({
            where: {
                id: id
            }
        })
        if (!response) {
            throw new AppError("Not able to find the resource", StatusCodes.NOT_FOUND)
        }
        return response
    }
}

module.exports = CrudRepository;