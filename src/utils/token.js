const jwt = require("jsonwebtoken");
const { serverError } = require("./error");

const generateToken = ({
    payload, 
    alogorithm = 'HS256',
    secret = process.env.ACCESS_TOKEN_SECRET,
    expiredIn = '1h'
}) => {
    try {
        return jwt.sign(payload, secret, {
            algorithm: alogorithm,
            expiredIn: expiredIn
        })
    } catch (err) {
        throw serverError()
    }
}

module.exports = {
    generateToken
}