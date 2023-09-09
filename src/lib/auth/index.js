const { badRequest } = require("../../utils/error");
const { generateHash, hashMatched } = require("../../utils/hashing");
const { hasUser, createUser, findUserByEmail } = require("../user");
const { generateToken } = require("../../utils/token");

const register = async ({ name, email, phone, password, profession=null, favoriteColors=[], isAdmin=false }) => {
    const userExits = await hasUser(email);

    if(userExits) {
        throw badRequest("User allready exits");
    };

    password = await generateHash(password, 11);

    const user = await createUser({ name, email, phone, password, profession, favoriteColors, isAdmin });
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

    return generateToken({ payload });
}


module.exports = {
    register,
    login
}