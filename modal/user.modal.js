const Connection = require("../mysql.connection/mysql.connection");

class userModal {
    createMultipleUsers(data) {
        return new Promise((resolve, reject) => {
            const query = `INSERT INTO users (email, first_name, last_name, password, age) VALUES ?`;
            Connection.query(query, [data], function (err, results) {
                if (err) reject(err);
                resolve(results);
            });
        });
    }

    findUser() {
        return new Promise((resolve, reject) => {
            const query = `SELECT * FROM users`;
            Connection.query(query, function (err, results) {
                if (err) reject(err);
                resolve(results);
            });
        });
    }

    checkUserExistByEmail(email) {
        return new Promise((resolve, reject) => {
            const query = `SELECT user_id, email, password FROM users WHERE email = '${email}'`;
            Connection.query(query, function (err, results) {
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

            Connection.query(qry, function (err, results) {
                if (err) reject(err);
                resolve(results);
            });
        });
    }

    findEmail({ email }) {
        return new Promise((resolve, reject) => {
            const qry = `SELECT email FROM users WHERE email = '${email}'`;

            Connection.query(qry, function (err, results) {
                if (err) reject(err);
                resolve(results);
            });
        });
    }

    updateUser(data) {
        const { id, email, firstName, password, lastName, age } = data;
        
        let str = '';
        if (email) !str.length ? str += `email = '${email}'` : str += `, email = '${email}'`;
        if (firstName) !str.length ? str += `first_name = '${firstName}'` : str += `, first_name = '${firstName}'`;
        if (lastName) !str.length ? str += `last_name = '${lastName}'` : str += `, last_name = '${lastName}'`;
        if (password) !str.length ? str += `password = '${password}'` : str += `, password = '${password}'`;
        if (age) !str.length ? str += `age = ${age}` : str += `, age = ${age}`;

        return new Promise((resolve, reject) => {
            const qry = `UPDATE users SET ${str} WHERE user_id = ${id}`;
            
            Connection.query(qry, function (err, results) {
                if (err) reject(err);
                resolve(results);
            });
        });
    }
}
module.exports = new userModal;