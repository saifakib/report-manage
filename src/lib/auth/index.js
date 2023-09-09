const { badRequest } = require("../../utils/error");
const { generateHash } = require("../../utils/hashing");
const { hasUser, createUser } = require("../user");

const register = async ({ name, email, phone, password, profession=null, favoriteColors=[], isAdmin=false }) => {
    const userExits = await hasUser(email);

    if(userExits) {
        throw badRequest("User allready exits");
    };

    password = await generateHash(password, 11);

    const user = await createUser({ name, email, phone, password, profession, favoriteColors, isAdmin });
    return user;

}


module.exports = {
    register
}