const APIKeyService = require('../Services/APIKeyService');

const apiKeyMiddleware = async (req, res, next) => {
    const key = req.header('X-API-Key');
    if (!key) return res.status(401).json({ error: 'Missing API Key' });

    const apikeyservice = new APIKeyService();
    try {
        const result = await apikeyservice.validatekey(key);
        if (!result.success) return res.status(403).json({ error: 'Invalid API Key' });

        req.key = result.data;
        next();
    } catch (ex) {
        res.status(500).json({ error: ex.message });
    }
};

module.exports = apiKeyMiddleware;