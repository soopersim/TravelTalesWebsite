const bcrypt = require('bcrypt');

const generateHash = async (string) => {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    return await bcrypt.hash(string, salt);
};

const verify = async (formPassword, dbPassword) => {
    try {
        return await bcrypt.compare(formPassword, dbPassword);
    } catch (ex) {
        console.error('Password verification error:', ex);
        return false;
    }
};

module.exports = { generateHash, verify };