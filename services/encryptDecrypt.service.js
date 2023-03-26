const bcrypt = require('bcrypt');
const saltRounds = 10;

module.exports = {
    encryptPassword: function (password) {
        return new Promise((resolve, reject) => {
            bcrypt.hash(password, saltRounds)
                .then(function (hash) {
                    resolve(hash);
                })
                .catch(err => {
                    reject(err);
                });
        })
    },

    decryptPassword: function (password, hash) {
        return new Promise((resolve, reject) => {
            bcrypt.compare(password, hash).then(function(result) {
                resolve(result);
            });
        })
    }
}


