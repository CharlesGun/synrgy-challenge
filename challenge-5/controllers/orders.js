const {
    cars,
    users,
    rented_by
} = require('../models');
const moment = require('moment');

const {
    BASE_URL
} = process.env

module.exports = {
    getAllOrder: async (req, res, next) => {
        try {
            let {
                sort = "id", type = "ASC", page = "1", limit = "10"
            } = req.query;

            page = parseInt(page);
            limit = parseInt(limit);
            let start = 0 + (page - 1) * limit;
            let end = page * limit;

            let orderData = await rented_by.findAndCountAll({
                include: [{
                    model: cars
                }, {
                    model: users
                }],
                order: [
                    [sort, type]
                ],
                limit: limit,
                offset: start
            });
            orderData.rows.map((item) => {
                item.dataValues.start_date = moment(item.dataValues.start_date).format('Do MMMM YYYY')
                item.dataValues.end_date = moment(item.dataValues.end_date).format('Do MMMM YYYY')
            })
            let count = orderData.count;
            let pagination = {}
            pagination.totalRows = count;
            pagination.totalPages = Math.ceil(count / limit);
            pagination.currentPage = page;
            pagination.thisPageRows = orderData.rows.length;
            pagination.thisPageData = orderData.rows;

            if (end < count) {
                pagination.next = {
                    page: page + 1
                }
            }

            if (start > 0) {
                pagination.prev = {
                    page: page - 1
                }
            }


            return res.status(200).json({
                status: true,
                message: 'Get all orders success!',
                data: pagination
            })
        } catch (err) {
            next(err)
        }
    },
    getOrderList: async (req, res, next) => {
        try {
            let {
                sort = "id", type = "ASC", page = "1", limit = "10"
            } = req.query;

            page = parseInt(page);
            limit = parseInt(limit);
            let start = 0 + (page - 1) * limit;
            let end = page * limit;

            let orderData = await rented_by.findAndCountAll({
                include: [{
                    model: cars
                }, {
                    model: users
                }],
                order: [
                    [sort, type]
                ],
                limit: limit,
                offset: start
            });
            orderData.rows.map((item) => {
                item.dataValues.start_date = moment(item.dataValues.start_date).format('Do MMMM YYYY')
                item.dataValues.end_date = moment(item.dataValues.end_date).format('Do MMMM YYYY')
            })
            let count = orderData.count;
            let pagination = {}
            pagination.totalRows = count;
            pagination.totalPages = Math.ceil(count / limit);
            pagination.currentPage = page;
            pagination.thisPageRows = orderData.rows.length;
            pagination.thisPageData = orderData.rows;

            if (end < count) {
                pagination.next = {
                    page: page + 1
                }
            }

            if (start > 0) {
                pagination.prev = {
                    page: page - 1
                }
            }

            return res.render('dashboard-orderList', {
                orders: pagination
            })
        } catch (err) {
            next(err)
        }
    },
    getAllCar: async (req, res, next) => {
        try {
            let {
                sort = "id", type = "ASC", page = "1", limit = "10"
            } = req.query;

            page = parseInt(page);
            limit = parseInt(limit);
            let start = 0 + (page - 1) * limit;
            let end = page * limit;

            let carData = await cars.findAll({
                include: [{
                    model: rented_by,
                    as: 'rented_by'
                }],
                order: [
                    [sort, type],
                    [{
                        model: rented_by,
                        as: 'rented_by'
                    }, 'start_date', 'ASC']
                ],
                limit: limit,
                offset: start
            });
            carData.map((item) => {
                if (item.dataValues.rented_by.length != 0) {
                    item.dataValues.start_date = moment(item.dataValues.rented_by[0].start_date).format('Do MMMM YYYY')
                    item.dataValues.end_date = moment(item.dataValues.rented_by[0].end_date).format('Do MMMM YYYY')
                } else {
                    item.dataValues.start_date = "-"
                    item.dataValues.end_date = "-"
                }
                item.dataValues.createdAt = moment(item.dataValues.createdAt).format('Do MMMM YYYY')
                item.dataValues.updatedAt = moment(item.dataValues.updatedAt).format('Do MMMM YYYY')
            })
            delete carData.rented_by
            let count = carData.length;
            let pagination = {}
            pagination.totalRows = count;
            pagination.totalPages = Math.ceil(count / limit);
            pagination.currentPage = page;
            pagination.thisPageRows = carData.length;
            pagination.thisPageData = carData;

            if (end < count) {
                pagination.next = {
                    page: page + 1
                }
            }

            if (start > 0) {
                pagination.prev = {
                    page: page - 1
                }
            }

            return res.status(200).json({
                status: true,
                message: 'Get all cars success!',
                data: pagination
            })
        } catch (err) {
            next(err)
        }
    },
    getCarList: async (req, res, next) => {
        try {
            let {
                sort = "id", type = "ASC", page = "1", limit = "10"
            } = req.query;

            page = parseInt(page);
            limit = parseInt(limit);
            let start = 0 + (page - 1) * limit;
            let end = page * limit;

            let carData = await cars.findAll({
                include: [{
                    model: rented_by,
                    as: 'rented_by'
                }],
                order: [
                    [sort, type],
                    [{
                        model: rented_by,
                        as: 'rented_by'
                    }, 'start_date', 'ASC']
                ],
                limit: limit,
                offset: start
            });
            carData.map((item) => {
                if (item.dataValues.rented_by.length != 0) {
                    item.start_date = moment(item.dataValues.rented_by[0].start_date).format('Do MMMM YYYY')
                    item.end_date = moment(item.dataValues.rented_by[0].end_date).format('Do MMMM YYYY')
                } else {
                    item.start_date = "-"
                    item.end_date = "-"
                }
                item.dataValues.createdAt = moment(item.dataValues.createdAt).format('Do MMMM YYYY')
                item.dataValues.updatedAt = moment(item.dataValues.updatedAt).format('Do MMMM YYYY')
            })
            let count = carData.length;
            let pagination = {}
            pagination.totalRows = count;
            pagination.totalPages = Math.ceil(count / limit);
            pagination.currentPage = page;
            pagination.thisPageRows = carData.length;
            pagination.thisPageData = carData;

            if (end < count) {
                pagination.next = {
                    page: page + 1
                }
            }

            if (start > 0) {
                pagination.prev = {
                    page: page - 1
                }
            }
            return res.render('dashboard-carList', {
                cars: pagination
            })
        } catch (err) {
            next(err)
        }
    },
    create: async (req, res, next) => {
        let {
            user_id,
            car_id,
            start_date,
            end_date
        } = req.body;
        try {
            let car = await cars.findOne({
                where: {
                    id: car_id
                },
                include: [{
                    model: rented_by,
                    as: 'rented_by'
                }]
            })
            if (car.rented_by.length === 0) {
                car.rented_by.forEach(item => {
                    if (start_date >= item.start_date && start_date <= item.end_date) {
                        return res.status(400).json({
                            status: false,
                            message: 'Car is not available'
                        })
                    }
                    if (end_date >= item.start_date && end_date <= item.end_date) {
                        return res.status(400).json({
                            status: false,
                            message: 'Car is not available'
                        })
                    }
                });
            }
            if (car.status === 'RENTED') {
                return res.status(400).json({
                    status: false,
                    message: 'Car is not available'
                })
            }
            start_date = moment(start_date).format('YYYY-MM-DD')
            end_date = moment(end_date).format('YYYY-MM-DD')
            let diffDate = moment(end_date).diff(start_date, 'days')
            let total_price = diffDate * car.price
            let new_order = await rented_by.create({
                user_id,
                car_id,
                start_date,
                end_date,
                status: 'ACTIVE',
                total_price
            })
            return res.status(201).json({
                status: true,
                message: 'Order created successfully',
                data: new_order
            })
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