const {
    users,
} = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {
    SIGNATURE_KEY
} = process.env;
const { Op } = require('sequelize');

module.exports = {
    register: async (req, res, next) => {
        const {
            email,
            password,
            re_password,
            name
        } = req.body

        try {
            let user = await users.findOne({
                where: {
                    [Op.or]: [{
                            email: email
                        },
                        {
                            name: name
                        }
                    ]
                }
            });
            if (user) {
                return res.status(400).json({
                    status: false,
                    message: 'Email or name already exists!'
                })
            }

            if (password !== re_password) {
                return res.status(400).json({
                    status: false,
                    message: `Password and re_password aren't match!`
                })
            }

            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            let new_user = await users.create({
                email: email,
                password: hashedPassword,
                name: name
            })

            payload = {
                id: new_user.id,
                email: new_user.email,
                name: new_user.name
            }
            const token = jwt.sign(payload, SIGNATURE_KEY)

            return res.status(200).json({
                status: true,
                message: 'Register user success!',
                data: {
                    token: token
                }
            })
        } catch (err) {
            next(err)
        }
    },

    login: async (req, res, next) => {
        const {
            email,
            password
        } = req.body;
        try {
            const user = await users.findOne({
                where: {
                    email: email
                }
            });

            if (!user) {
                return res.status(400).json({
                    status: false,
                    message: 'Email not found!'
                })
            };
            const verify = await bcrypt.compare(password, user.password);
            if (!verify) {
                return res.status(400).json({
                    status: false,
                    message: 'Password is wrong!'
                })
            }

            payload = {
                id: user.id,
                email: user.email,
                name: user.name
            }
            const token = jwt.sign(payload, SIGNATURE_KEY)

            return res.status(200).json({
                status: true,
                message: 'Login Success!',
                data: {
                    token: token
                }
            })
        } catch (err) {
            next(err)
        }
    },
}