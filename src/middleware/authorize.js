const { authorizationError } = require("../utils/error");

const authorize = (req, _res, next) => {
    if(req.user.isAdmin == true) {
        return next();
    }

    return authorizationError();
}

module.exports = authorize;