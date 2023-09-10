const bcrypt = require('bcryptjs');

// Generate a bcrypt hash for a given payload
const generateHash = async (payload, saltRound = 10) => {
    const salt = await bcrypt.genSalt(saltRound);
    
    const hash = await bcrypt.hash(payload, salt);
    return hash;
};

// Compare a raw input (e.g., user input) with a bcrypt hash
const hashMatched = async (raw, hash) => {
    const result = await bcrypt.compare(raw, hash);
    return result;
};

module.exports = {
    generateHash,
    hashMatched
};
