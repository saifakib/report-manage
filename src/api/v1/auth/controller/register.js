const authService = require("../../../../lib/auth");
const { generateToken } = require("../../../../utils/token");

const register = async (req, res, next) => {
    const { name, email, phone, password, profession, favoriteColors, isAdmin } = req.body;

    try {
        const user = await authService.register({ name, email, phone, password, profession, favoriteColors, isAdmin });

        const payload = {
            id: user.id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            isAdmin: user.isAdmin
        };

        const accessToken = await generateToken(payload);

        const response = {
            code: 201,
			message: 'Signup successful',
			data: {
				access_token: accessToken,
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