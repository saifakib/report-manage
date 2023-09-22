const { faker } = require("@faker-js/faker");
const { User } = require("./src/model");
const { generateHash } = require("./src/utils/hashing");

const createAdminUser = async () => {
  let password = await generateHash('abcd', 11);
  const user = new User({
    name: faker.person.fullName(),
    email: faker.internet.email(),
    password: password,
  });
  user.save();
};

module.exports = { createAdminUser }