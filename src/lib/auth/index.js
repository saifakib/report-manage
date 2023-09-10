
const { badRequest } = require("../../utils/error");
const { generateHash, hashMatched } = require("../../utils/hashing"); 
const { hasUser, createUser, findUserByEmail } = require("../user"); 
const { generateToken } = require("../../utils/token");

// Function to register a new user
const register = async ({ name, email, phone, password, address, profession = null, favoriteColors = [], isAdmin = false }) => {
    // Checking if a user with the provided email already exists
    const userExists = await hasUser(email);

    if (userExists) {
        throw badRequest("User already exists");
    }

    password = await generateHash(password, 11);

    // Creating a new user with the provided information
    const user = await createUser({ name, email, phone, password, address, profession, favoriteColors, isAdmin });

    return user;
}

// Function to handle user login
const login = async ({ email, password }) => {
    // Finding a user by email in the database
    const user = await findUserByEmail(email);

    // If no user is found, raise a bad request error
    if (!user) {
        throw badRequest("Invalid Credentials");
    }

    // Comparing the provided password with the stored hash
    const passwordMatched = await hashMatched(password, user.password);

    // If the password doesn't match, raise a bad request error
    if (!passwordMatched) {
        throw badRequest("Invalid Credentials");
    }

    // Creating a payload for the JWT token with user information
    const payload = {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        isAdmin: user.isAdmin
    };

    // Generating an access token and a refresh token
    const accessToken = generateToken({ payload });
    const refreshToken = generateToken({ payload, secret: process.env.REFRESH_TOKEN_SECRET, expiresIn: '7d' });

    return {
        accessToken,
        refreshToken
    };
}

module.exports = {
    register,
    login
};
