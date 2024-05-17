const jwt = require('jsonwebtoken');
const {
    SIGNATURE_KEY
} = process.env;

module.exports = {
    isLogin: (req,res,next)=>{
        try{
            const authHeader = req.headers['authorization'];
            const token = authHeader && authHeader.split(' ')[1];
            if(!token){
                return res.status(401).json({
                    status: false,
                    message: 'Access Denied'
                });
            }

            const decoded = jwt.verify(token, SIGNATURE_KEY);
            req.user_id = decoded.id;
            req.email = decoded.email;
            req.name = decoded.name;
            next();
        } catch(err){
            next(err);

        }
    }
}