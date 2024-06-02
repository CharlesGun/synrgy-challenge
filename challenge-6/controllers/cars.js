const {
    cars,
    users
} = require('../models')
const fs = require('fs')
const {
    BASE_URL
} = process.env;

module.exports = {
    getCars: async (req, res, next) => {
        try {
            const carsData = await cars.findAll({
                where: {
                    is_deleted: false
                },
                include: [{
                    model: users,
                    as: 'creator',
                    attributes: {
                        exclude: ['password', 'refresh_token']
                    }
                }, {
                    model: users,
                    as: 'updater',
                    attributes: {
                        exclude: ['password', 'refresh_token']
                    }
                }, {
                    model: users,
                    as: 'deleter',
                    attributes: {
                        exclude: ['password', 'refresh_token']
                    }

                }]
            });
            return res.status(200).json({
                status: true,
                message: "Cars retrieved successfully",
                data: carsData
            });
        } catch (error) {
            next(error);
        }
    },

    getCarById: async (req, res, next) => {
        try {
            const {
                id
            } = req.params;
            const car = await cars.findOne({
                where: {
                    id
                },
                include: [{
                    model: users,
                    as: 'creator',
                    attributes: {
                        exclude: ['password', 'refresh_token']
                    }
                }, {
                    model: users,
                    as: 'updater',
                    attributes: {
                        exclude: ['password', 'refresh_token']
                    }
                }, {
                    model: users,
                    as: 'deleter',
                    attributes: {
                        exclude: ['password', 'refresh_token']
                    }

                }]
            });
            if (!car) {
                return res.status(404).json({
                    status: false,
                    message: "Car not found"
                });
            }
            return res.status(200).json({
                status: true,
                message: "Car retrieved successfully",
                data: car
            });
        } catch (error) {
            next(error);
        }
    },

    createCar: async (req, res, next) => {
        try {
            const {
                name,
                category,
                price
            } = req.body;
            let photo_url = null
            if (req.file) {
                const file_url = req.file.path
                photo_url = `${BASE_URL}/${file_url}`
            }
            const car = await cars.create({
                name,
                category,
                price,
                image: photo_url,
                created_by: req.user.id,
                updated_by: req.user.id,
                deleted_by: null,
                is_deleted: false
            });
            return res.status(201).json({
                status: true,
                message: "Car created successfully",
                data: car
            });
        } catch (error) {
            next(error);
        }
    },

    updateCar: async (req, res, next) => {
        try {
            const {
                id
            } = req.params;
            const car = await cars.findByPk(id);
            if (!car || car.is_deleted === true) {
                return res.status(404).json({
                    status: false,
                    message: "Car not found"
                });
            }
            if (req.file) {
                if (car.image !== null && car.image !== '') {
                    const filePath = car.image.split("//")[1];
                    fs.unlinkSync(filePath.split("/").slice(1).join("/"));
                }
                const file_url = req.file.path
                const photo_url = `${BASE_URL}/${file_url}`
                req.body.image = photo_url
            }
            req.body.updated_by = req.user.id
            const updated = await car.update(req.body)
            return res.status(200).json({
                status: true,
                message: "Car updated successfully",
                data: updated
            });
        } catch (error) {
            next(error);
        }
    },

    deleteCar: async (req, res, next) => {
        try {
            const {
                id
            } = req.params;
            const car = await cars.findByPk(id);
            if (!car || car.is_deleted === true) {
                return res.status(404).json({
                    status: false,
                    message: "Car not found"
                });
            }
            await car.update({
                is_deleted: true,
                deleted_by: req.user.id
            });
            return res.status(200).json({
                status: true,
                message: "Car deleted successfully"
            });
        } catch (error) {
            next(error);
        }
    }
}