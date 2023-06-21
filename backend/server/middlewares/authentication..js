const jwt = require('jsonwebtoken')
const { UN_AUTHENTICATED } = require('../errors/index')

const Authentication = async (req, res, next) => {
    const token = req.cookies.auth_token;
    try {
        const payload = await jwt.verify(token, process.env.JWT_SECRET);
        req.user= {userId: payload.userId};
        next();
    } catch (error) {
        throw new UN_AUTHENTICATED('Authentication invalid')
    }
};

module.exports = Authentication;