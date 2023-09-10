const jwt = require("jsonwebtoken");
const { serverError, authenticationError } = require("./error");

const generateToken = ({
    payload, 
    alogorithm = 'HS256',
    secret = process.env.ACCESS_TOKEN_SECRET,
    expiredIn = '10m'
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

const verifyToken = ({
    token,
    alogorithm = 'HS256',
    secret = process.env.ACCESS_TOKEN_SECRET
}) => {
    try {
        return jwt.verify(token, secret, {
            algorithms: alogorithm
        })

    } catch (err) {
        throw authenticationError();
    }
}

module.exports = {
    generateToken,
    verifyToken
}