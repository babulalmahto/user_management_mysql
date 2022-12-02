const { verifyToken } = require("../services/jwt.service");

module.exports = {
    authenticateToken: async function (req, res, next) {
        try {
            let tokenFromReq = req.body.token || req.query.token || req.headers['x-access-token'];
            if (req.headers['authorization']) {
                const authHeader = req.headers['authorization'];
                if (!authHeader) return res.status(401).json({ code: 401, message: "Access Denied token required" })
                tokenFromReq = authHeader.split(" ")[1];
            }
    
            if (tokenFromReq == null) return res.status(404).json({ code: 404, message: "Access Denied" });
            
            const payload = await verifyToken(tokenFromReq);
            delete payload.iat;
            delete payload.exp;
            req.user = payload;
            next();
        } catch (error) {
            res.status(404).json({ code: 404, message: "Authentication Failed" });
        }
    }
} 