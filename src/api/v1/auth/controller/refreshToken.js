const tokenService = require("../../../../utils/token");


const refreshToken = async (req, res, next) => {
    const { refreshToken } = req.body;

    try {

        const decoded = tokenService.verifyToken({ token: refreshToken, secret: process.env.REFRESH_TOKEN_SECRET });

        const payload = {
            id: decoded.id,
            name: decoded.name,
            email: decoded.email,
            phone: decoded.phone,
            isAdmin: decoded.isAdmin
        };
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