const {
    cars
} = require('../models');
const moment = require('moment');

const {
    BASE_URL
} = process.env

module.exports = {
    getAll: async (req, res, next) => {
        try {
            const car = await cars.findAll()
            return res.status(200).json({
                status: true,
                message: 'Get all cars success!',
                data: car
            })
        } catch (err) {
            next(err)
        }
    },
    showAll: async (req, res, next) => {
        try {
            const car = await cars.findAll()
            car.map((item) => {
                item.dataValues.updatedAt = moment(item.dataValues.updatedAt).format('Do MMMM YYYY, h:mm')
            })
            return res.render('list', {
                cars: car
            })
        } catch (err) {
            next(err)
        }
    },
    form: async (req, res, next) => {
        try {
            return res.render('form')
        } catch (err) {
            next(err)
        }
    },
    create: async (req, res, next) => {
        const {
            name,
            category,
            price,
            status
        } = req.body;
        try {
            let photo_url = null
            if (req.file) {
                const file_url = req.file.path
                photo_url = `${BASE_URL}/${file_url}`
            }
            let new_car = await cars.create({
                name,
                category,
                price,
                status,
                image: photo_url
            })
            return res.redirect('/cars/list')
        } catch (err) {
            next(err)
        }
    },
    editForm: async (req, res, next) => {
        const {
            id
        } = req.params;
        try {
            const car = await cars.findOne({
                where: {
                    id
                }
            })
            return res.render('editform', {
                car
            })
        } catch (err) {
            next(err)
        }
    },
    update: async (req, res, next) => {
        const {
            id
        } = req.params;
        const {
            name,
            category,
            price,
            status
        } = req.body;
        try {
            let photo_url = null
            if (req.file) {
                const file_url = req.file.path
                photo_url = `${BASE_URL}/${file_url}`
            }
            let car = await cars.update({
                name,
                category,
                price,
                status,
                image: photo_url
            }, {
                where: {
                    id
                }
            })
            return res.redirect('/cars/list')
        } catch (err) {
            next(err)
        }
    },
    getOne: async (req, res, next) => {
        const {
            id
        } = req.params;
        try {
            const car = await cars.findOne({
                where: {
                    id
                }
            })
            return res.render('detail', {
                car
            })
        } catch (err) {
            next(err)
        }
    },
    delete: async (req, res, next) => {
        const {
            id
        } = req.params;
        try {
            let car = await cars.destroy({
                where: {
                    id
                }
            })
            return res.redirect('/cars/list')
        } catch (err) {
            next(err)
        }
    }
}