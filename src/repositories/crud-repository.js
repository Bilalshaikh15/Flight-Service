const { Logger } = require("../config");

class CrudRepository {
    constructor(model) {
        this.model = model;
    }

    async create(data) {
        const response = await this.model.create(data);
        return response;

    }

    async get(data) {
        try {
            const response = await this.model.findByPk(data);
            return response;
        } catch (error) {
            Logger.error("Something went wrong in the crud repository: get")
            throw error;
        }
    }
    async getAll() {
        try {
            const response = await this.model.findAll();
            return response;
        } catch (error) {
            Logger.error("Something went wrong in the crud repository: getAll")
            throw error;
        }
    }

    async update(id, data) {
        try {
            const response = await this.model.update(data, {
                where: {
                    id
                }
            });
            return response;
        } catch (error) {
            Logger.error("Something went wrong in the crud repository: update")
            throw error;
        }
    }

    async destroy(data) {
        try {
            const response = await this.model.destroy({
                where: {
                    id: data
                }
            })
            return response
        } catch (error) {
            Logger.error("Something went wrong in the crud repository: destroy")
            throw error;
        }
    }
}

module.exports = CrudRepository;