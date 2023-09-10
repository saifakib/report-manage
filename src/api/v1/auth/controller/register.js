const authService = require("../../../../lib/auth");
const { generateToken } = require("../../../../utils/token");

const register = async (req, res, next) => {
    const { name, email, phone, password, address,profession, favoriteColors, isAdmin } = req.body;

    try {
        const user = await authService.register({ name, email, phone, password, address, profession, favoriteColors, isAdmin });

        const payload = {
            id: user.id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            isAdmin: user.isAdmin
        };

        const accessToken = await generateToken({ payload });
        const refreshToken = await generateToken({ payload, secret: process.env.REFRESH_TOKEN_SECRET, expiredIn: '7d' });

        const response = {
            code: 201,
			message: 'Signup successful',
			data: {
				access_token: accessToken,
                refreshToken: refreshToken
			},
			links: {
				self: req.url,
				login: '/auth/login',
			},
        };

        res.status(201).json(response);

    } catch (err) {
        next(err)
    }
}

module.exports = register;