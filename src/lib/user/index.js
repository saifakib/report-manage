const { User } = require("../../model")


const findUserByEmail = async (email) => {
    const user = User.findOne({ email });
    return user ? user : false;
}

const hasUser = async (email) => {
    const user = await findUserByEmail(email);
    return user ? true : false;
}

const createUser = async ({ name, email, phone, password, address, profession, favoriteColors, isAdmin }) => {
    const user = new User({ name, email, phone, password, address, profession, favoriteColors, isAdmin });
    await user.save();
    return { ...user._doc, id: user.id };
}

module.exports = {
    findUserByEmail,
    hasUser,
    createUser
}