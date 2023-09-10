const tokenService = require("../utils/token"); 
const userService = require("../lib/user"); 
const { authenticationError } = require("../utils/error");

// Middleware function for user authentication
const authenticate = async (req, _res, next) => {
    // Extracting the token from the 'Authorization' header in the HTTP request
    const token = req.headers.authorization.split(" ")[1];

    try {
        // Verifying and decoding the token using the tokenService
        const decoded = tokenService.verifyToken({ token });

        // Finding the user by email, based on the decoded email from the token
        const user = await userService.findUserByEmail(decoded.email);

        // If no user is found, raise an authentication error
        if (!user) {
            next(authenticationError());
        }

        // Adding the user information to the request object for later use
        req.user = { ...user._doc, id: user.id };
        next();

    } catch (err) {
        next(err);
    }
};

module.exports = authenticate;
