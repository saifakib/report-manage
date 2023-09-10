const { authorizationError } = require("../utils/error");

// Middleware function for authorization
const authorize = (req, _res, next) => {
    // Checking if the user has admin privileges (isAdmin flag)
    if (req.user.isAdmin) {
        return next();
    }

    next(authorizationError());
};

module.exports = authorize;
