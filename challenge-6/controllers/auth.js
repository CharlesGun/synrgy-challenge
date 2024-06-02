const {
    users
} = require('../models');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {
    ACCESS_TOKEN_SECRET,
    REFRESH_TOKEN_SECRET
} = process.env;

module.exports = {
    register: async (req, res, next) => {
        try {
            const {
                name,
                email,
                password,
                rePassword
            } = req.body;
            if (password !== rePassword) {
                return res.status(400).json({
                    status: false,
                    message: "Passwords do not match"
                });
            }
            const user = await users.findOne({
                where: {
                    email
                }
            });
            if (user) {
                return res.status(400).json({
                    status: false,
                    message: "Email already exists"
                });
            }
            const salt = await bcrypt.genSalt();
            const hashedPassword = await bcrypt.hash(password, salt);
            const newUser = await users.create({
                name,
                email,
                password: hashedPassword,
                role: "user"
            });
            return res.status(201).json({
                status: true,
                message: "User created successfully",
                data: newUser
            });
        } catch (error) {
            next(error)
        }
    },

    login: async (req, res, next) => {
        try {
            const {
                email,
                password
            } = req.body;
            const user = await users.findOne({
                where: {
                    email
                }
            });
            if (!user) {
                return res.status(404).json({
                    status: false,
                    message: "User not found"
                });
            }
            const validPassword = await bcrypt.compare(password, user.password);
            if (!validPassword) {
                return res.status(400).json({
                    status: false,
                    message: "Invalid password"
                });
            }
            const accessToken = jwt.sign({
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role
            }, ACCESS_TOKEN_SECRET, {
                expiresIn: '1d'
            });

            const refreshToken = jwt.sign({
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role
            }, REFRESH_TOKEN_SECRET, {
                expiresIn: '7d'
            });

            await user.update({
                refresh_token: refreshToken
            });
            res.cookie('refreshToken', refreshToken, {
                httpOnly: true,
                maxAge: 7 * 24 * 60 * 60 * 1000
            });

            return res.status(200).json({
                status: true,
                message: "User logged in successfully",
                data: {
                    accessToken
                }
            });
        } catch (error) {
            next(error)
        }
    },

    refreshToken: async (req, res, next) => {
        try {
            const refreshToken = req.cookies.refreshToken;
            if (!refreshToken) {
                return res.status(403).json({
                    status: false,
                    message: "Access denied"
                });
            }
            const user = await users.findOne({
                where: {
                    refresh_token: refreshToken
                }
            });
            if (!user) {
                return res.status(400).json({
                    status: false,
                    message: "Invalid token"
                });
            }
            jwt.verify(refreshToken, REFRESH_TOKEN_SECRET, (err, decoded) => {
                if (err) {
                    return res.status(400).json({
                        status: false,
                        message: "Invalid token"
                    });
                }
                const accessToken = jwt.sign({
                    id: decoded.id,
                    name: decoded.name,
                    email: decoded.email,
                    role: decoded.role
                }, ACCESS_TOKEN_SECRET, {
                    expiresIn: "1d"
                });
                return res.status(200).json({
                    status: true,
                    message: "Access token created successfully",
                    data: {
                        accessToken
                    }
                });
            });
        } catch (error) {
            next(error)
        }
    },

    logout: async (req, res, next) => {
        try {
            const refreshToken = req.cookies.refreshToken;
            if (!refreshToken) {
                return res.status(404).json({
                    status: false,
                    message: "Token not found"
                });
            }
            const user = await users.findOne({
                where: {
                    refresh_token: refreshToken
                }
            });
            if (!user) {
                return res.status(404).json({
                    status: false,
                    message: "User not found"
                });
            }
            await user.update({
                refresh_token: null
            });
            res.clearCookie('refreshToken');
            return res.status(200).json({
                status: true,
                message: "User logged out successfully"
            });
        } catch (error) {
            next(error)
        }
    },

    whoAmI: async (req, res, next) => {
        try {
            const {
                id
            } = req.user;
            const user = await users.findByPk(id);
            return res.status(200).json({
                status: true,
                message: "User retrieved successfully",
                data: user
            });
        } catch (error) {
            next(error)
        }
    }
}