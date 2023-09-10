const { User } = require("../../model");

// Function to find a user by email in the database
const findUserByEmail = async (email) => {
    const user = await User.findOne({ email });
    
    // If a user is found, return the user; otherwise, return false
    return user ? user : false;
}

// Function to check if a user with the given email exists in the database
const hasUser = async (email) => {
    const user = await findUserByEmail(email);

    // If a user is found, return true; otherwise, return false
    return user ? true : false;
}

// Function to create a new user in the database
const createUser = async ({ name, email, phone, password, address, profession, favoriteColors, isAdmin }) => {
    const user = new User({ name, email, phone, password, address, profession, favoriteColors, isAdmin });
    await user.save();
    
    // Returning the created user with its ID
    return { ...user._doc, id: user.id };
}

module.exports = {
    findUserByEmail,
    hasUser,
    createUser
};
