const pool = require('../Databases/SQLCon');
const { createResponse } = require('../Utilities/createResponse');

class APIKeyDAO {
    async create(userID, key) {
        return new Promise((resolve, reject) => {
            pool.run('INSERT INTO apikeys (userID, apikey) VALUES (?, ?)', [userID, key], (err) => {
                if (err) reject(err);
                else resolve(createResponse(true, key));
            });
        });
    }

    async getById(key) {
        return new Promise((resolve, reject) => {
            pool.get('SELECT isActive FROM apikeys WHERE apikey = ? AND isActive = 1', [key], (err, row) => {
                if (err) return reject(err);
                if (!row) return resolve(createResponse(false, null));
                resolve(createResponse(true, row));
            });
        });
    }
}

module.exports = APIKeyDAO;
