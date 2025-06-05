const pool = require('../Databases/SQLCon');
const { createResponse } = require('../Utilities/createResponse');

class UsageDAO {
    async logUsage(apikey, endpoint) {
        return new Promise((resolve, reject) => {
            pool.run(
                'INSERT INTO usage_logs (apikey, endpoint) VALUES (?, ?)',
                [apikey, endpoint],
                (err) => {
                    if (err) reject(err);
                    else resolve(createResponse(true, "Usage logged"));
                }
            );
        });
    }
}

module.exports = UsageDAO;
