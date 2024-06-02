const {
    users
} = require('../models');
const bcrypt = require("bcrypt");

module.exports = {
    getUsers : async (req, res, next) => {
        try {
            const usersData = await users.findAll({
                attributes: {
                    exclude: ['password', 'refresh_token', 'role']
                }
            });
            return res.status(200).json({
                status: true,
                message: "Users retrieved successfully",
                data: usersData
            });
        } catch (error) {
            next(error);
        }
    },

    getUserById : async (req, res, next) => {
        try {
            const {
                id
            } = req.params;
            const user = await users.findByPk(id, {
                attributes: {
                    exclude: ['password', 'refresh_token', 'role']
                }
            });
            if (!user) {
                return res.status(404).json({
                    status: false,
                    message: "User not found"
                });
            }
            return res.status(200).json({
                status: true,
                message: "User retrieved successfully",
                data: user
            });
        } catch (error) {
            next(error);
        }
    },

    createUser : async (req, res, next) => {
        try {
            const {
                name,
                email,
                password,
                role
            } = req.body;
            if (role !== "user" && role !== "admin" && role !== "superadmin") {
                return res.status(400).json({
                    status: false,
                    message: "Invalid role"
                });
            }

            if (role !== "user" && req.user.role !== "superadmin") {
                return res.status(403).json({
                    status: false,
                    message: "Admins can only create members"
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
                role
            });
            return res.status(201).json({
                status: true,
                message: "User created successfully",
                data: newUser
            });
        } catch (error) {
            next(error);
        }
    },

    updateUser : async (req, res, next) => {
        try {
            const {
                id
            } = req.params;
            const user = await users.findByPk(id);
            if (!user) {
                return res.status(404).json({
                    status: false,
                    message: "User not found"
                });
            }
            if (req.body.role && req.body.role !== "user" && req.user.role !== "superadmin") {
                if (req.body.role !== "user" && req.body.role !== "admin" && req.body.role !== "superadmin") {
                    return res.status(400).json({
                        status: false,
                        message: "Invalid role"
                    });
                }
                return res.status(403).json({
                    status: false,
                    message: "Admins can only update members"
                });

            }
            const update = await user.update(req.body, {});
            return res.status(200).json({
                status: true,
                message: "User updated successfully",
                data: update
            });
        } catch (error) {
            next(error);
        }
    },

    deleteUser : async (req, res, next) => {
        try {
            const {
                id
            } = req.params;
            const user = await users.findByPk(id);
            if (user.role !== "user" && req.user.role !== "superadmin") {
                return res.status(403).json({
                    status: false,
                    message: "Admins can only delete members"
                });
            }
            if (!user) {
                return res.status(404).json({
                    status: false,
                    message: "User not found"
                });
            }
            await user.destroy();
            return res.status(200).json({
                status: true,
                message: "User deleted successfully"
            });
        } catch (error) {
            next(error);
        }
    }
}