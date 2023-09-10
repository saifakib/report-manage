const tokenService = require("../../../../utils/token");

// Handling token refresh
const refreshToken = async (req, res, next) => {
    const { refreshToken } = req.body;

    try {
        // Verifying the refresh token and decoding its payload
        const decoded = tokenService.verifyToken({ token: refreshToken, secret: process.env.REFRESH_TOKEN_SECRET });

        // Creating a payload with user information for a new access token
        const payload = {
            id: decoded.id,
            name: decoded.name,
            email: decoded.email,
            phone: decoded.phone,
            isAdmin: decoded.isAdmin
        };

        // Generating a new access token using the decoded payload
        const accessToken = await tokenService.generateToken({ payload });

        const response = {
            code: 200,
            data: {
                access_token: accessToken,
            }
        };
        res.status(200).json(response);

    } catch (err) {
        next(err);
    }
}

module.exports = refreshToken;
