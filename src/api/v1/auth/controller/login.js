const authService = require("../../../../lib/auth");

// Handling user login
const login = async (req, res, next) => {
    const { email, password } = req.body;

    try {
        // Attempting to authenticate the user and retrieve access and refresh tokens
        const { accessToken, refreshToken } = await authService.login({ email, password });

        // Creating a response object with success details
        const response = {
            code: 200,
            message: 'Login successful',
            data: {
                access_token: accessToken,
                refresh_token: refreshToken
            },
            links: {
                self: req.url,
            },
        };
        res.status(200).json(response);
    } catch (err) {
        next(err);
    }
}

module.exports = login;
