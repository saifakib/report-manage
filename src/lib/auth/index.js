const { badRequest } = require("../../utils/error");
const { generateHash, hashMatched } = require("../../utils/hashing");
const { hasUser, createUser, findUserByEmail } = require("../user");
const { generateToken } = require("../../utils/token");

const register = async ({ name, email, phone, password, address,profession=null, favoriteColors=[], isAdmin=false }) => {
    const userExits = await hasUser(email);

    if(userExits) {
        throw badRequest("User allready exits");
    };

    password = await generateHash(password, 11);

    const user = await createUser({ name, email, phone, password, address, profession, favoriteColors, isAdmin });
    return user;

}

const login = async ({ email, password }) => {
    const user = await findUserByEmail(email);

    if(!user) {
        throw badRequest("Invalid Credentials");
    }

    const passwordMatched = await hashMatched(password, user.password);

    if(!passwordMatched) {
        throw badRequest("Invalid Credentials");
    }

    const payload = {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        isAdmin: user.isAdmin
    };

    const accessToken = generateToken({ payload });
    const refreshToken = generateToken({ payload, secret: process.env.REFRESH_TOKEN_SECRET, expiredIn: '7d' });
    return {
        accessToken,
        refreshToken
    };
}


module.exports = {
    register,
    login
}