const jwt = require('jsonwebtoken');
const secretKey = process.env.JWT_SECRET_KEY;

module.exports = {
    createToken: function (id) {
        return new Promise((resolve, reject) => {
            const token = jwt.sign({
                id
            }, secretKey, { expiresIn: '1h' });
            resolve(token);
        });
    },
    verifyToken: function (token) {
        return new Promise((resolve, reject) => {
            jwt.verify(token, secretKey, function (err, decoded) {
                if (err) reject(err);
                resolve(decoded);
            });
        });
    }
}