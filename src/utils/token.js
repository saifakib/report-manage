const jwt = require("jsonwebtoken");
const { serverError, authenticationError } = require("./error");

// Function to generate a JWT token
const generateToken = async ({
    payload,
    algorithm = 'HS256',
    secret = process.env.ACCESS_TOKEN_SECRET,
    expiresIn = '10m'
}) => {
    try {
        // Signing the payload to create a JWT token with the specified options
        return jwt.sign(payload, secret, {
            algorithm: algorithm,
            expiresIn: expiresIn
        });
    } catch (err) {
        throw serverError();
    }
};

// Function to verify a JWT token
const verifyToken = ({
    token,
    algorithm = 'HS256',
    secret = process.env.ACCESS_TOKEN_SECRET
}) => {
    try {
        // Verifying the token's authenticity using the provided secret and algorithm
        return jwt.verify(token, secret, {
            algorithms: algorithm
        });
    } catch (err) {
        throw authenticationError();
    }
};

module.exports = {
    generateToken,
    verifyToken
};
