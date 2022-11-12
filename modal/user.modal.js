const Connection = require("../mysql.connection/mysql.connection");

class userModal {
    findUser() {
        return new Promise((resolve, reject) => {
            const query = `SELECT * FROM users`;
            Connection.query(query, function (err, results, fields) {
                if (err) reject(err);
                resolve(results);
            }
            );
        });
    }

    checkUserExistByEmail(email) {
        return new Promise((resolve, reject) => {
            const query = `SELECT user_id, email FROM users WHERE email = '${email}'`;
            Connection.query(query, function(err, results) {
                if (err) reject(err);
                resolve(results);
            });
        });
    }

    postUser({ email, firstName, lastName, password, age }) {
        return new Promise((resolve, reject) => {
            const qry = `INSERT INTO users
                            (email, first_name, last_name, password, age)
                            VALUES
                            ('${email}', '${firstName}', '${lastName}', '${password}', ${age})`;
            
            Connection.query(qry, function (err, results, fields) {
                if (err) reject(err);
                resolve(results);
            });
        });
    }
}
module.exports = new userModal;