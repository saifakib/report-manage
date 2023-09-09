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
            expiresIn: expiredIn
        })
    } catch (err) {
        console.log(err)
        throw serverError()
    }
}

module.exports = {
    generateToken
}