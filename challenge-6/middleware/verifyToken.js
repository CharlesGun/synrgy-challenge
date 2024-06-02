const jwt = require("jsonwebtoken");

module.exports = {
    isLogin: (req, res, next) => {
        const authHeader = req.headers["authorization"];
        const token = authHeader && authHeader.split(" ")[1];
        if (!token) {
            return res.status(401).json({
                status: false,
                message: "Access denied"
            });
        }
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
            if (err) {
                return res.status(400).json({
                    status: false,
                    message: "Invalid token"
                });
            }
            req.user = decoded;
            next();
        });
    },

    isSuperAdmin: (req, res, next) => {
        const authHeader = req.headers["authorization"];
        const token = authHeader && authHeader.split(" ")[1];
        if (!token) {
            return res.status(401).json({
                status: false,
                message: "Access denied"
            });
        }
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
            if (err) {
                return res.status(400).json({
                    status: false,
                    message: "Invalid token"
                });
            }
            if (decoded.role !== 'superadmin') {
                return res.status(403).json({
                    status: false,
                    message: "You are not authorized"
                });
            }
            req.user = decoded;
            next();
        });
    },

    isAdmin: (req, res, next) => {
        const authHeader = req.headers["authorization"];
        const token = authHeader && authHeader.split(" ")[1];
        if (!token) {
            return res.status(401).json({
                status: false,
                message: "Access denied"
            });
        }
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
            if (err) {
                return res.status(400).json({
                    status: false,
                    message: "Invalid token"
                });
            }
            if (decoded.role !== 'admin' && decoded.role !== 'superadmin') {
                return res.status(403).json({
                    status: false,
                    message: "You are not authorized"
                });
            }
            req.user = decoded;
            next();
        });
    }
}