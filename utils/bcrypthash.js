require('dotenv').config();
const bcrypt = require('bcrypt');

const saltRound = parseInt(process.env.SALT_ROUND);

async function hashedPasswordFunc(plainText) {
    const salt = await bcrypt.genSalt(saltRound);
    return await bcrypt.hash(plainText, salt);
}

async function hashCompare(reqPassword, dbPassword) {
    return await bcrypt.compare(reqPassword, dbPassword);
}

module.exports = {
    hashedPasswordFunc,
    hashCompare
}