const authService = require("../../../../lib/auth");
const { generateToken } = require("../../../../utils/token");

// Handling user registration
const register = async (req, res, next) => {
    const { name, email, password, isAdmin } = req.body;

    try {
        // Attempting to register a new user with the provided information
        const user = await authService.register({ name, email, password, isAdmin });

        // Creating a payload with user information for JWT token generation
        const payload = {
            id: user.id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin
        };

        // Generating an access token and a refresh token for the registered user
        const accessToken = await generateToken({ payload });
        const refreshToken = await generateToken({ payload, secret: process.env.REFRESH_TOKEN_SECRET, expiresIn: '7d' });

        const response = {
            code: 201,
            message: 'Signup successful',
            data: {
                access_token: accessToken,
                refresh_token: refreshToken
            },
            links: {
                self: req.url,
                login: '/auth/login', // Providing a link to the login route
            },
        };

        res.status(201).json(response);

    } catch (err) {
        next(err)
    }
}

module.exports = register;
