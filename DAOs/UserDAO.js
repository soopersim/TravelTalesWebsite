const pool = require('../Databases/SQLCon');
const { createResponse } = require('../Utilities/createResponse');

class UserDAO {
    async create(req) {
        const { email, password, fn, sn } = req.body;
        return new Promise((resolve, reject) => {
            pool.run(
                'INSERT INTO users (email, password, fn, sn) VALUES (?, ?, ?, ?)',
                [email, password, fn, sn],
                (err) => {
                    if (err) reject(err);
                    else resolve(createResponse(true, "User created"));
                }
            );
        });
    }

    async getByID(req) {
        return new Promise((resolve, reject) => {
            pool.get('SELECT * FROM users WHERE email = ?', [req.body.email], (err, row) => {
                if (err) return reject(err);
                if (!row) return resolve(createResponse(false, null));
                resolve(createResponse(true, row));
            });
        });
    }
}

module.exports = UserDAO;
