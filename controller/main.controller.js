const userModal = require("../modal/user.modal");
const { userSchema, loginSchema } = require("../services/validation.service");
const { encryptPassword, decryptPassword } = require("../services/encryptDecrypt.service");
const { createToken } = require("../services/jwt.service");
const { faker } = require("@faker-js/faker");

class mainController {
    async createRandomUsers(req, res) {
        try {
            const userData = [];
            for (let i = 0; i < 50; i++) {
                const firstName = faker.name.firstName();
                const lastName = faker.name.lastName();
                const email = faker.internet.email(firstName, lastName).toLowerCase();
                const password = await encryptPassword(email.split("@")[0]);
                const age = Math.floor(Math.random() * (40 - 20 + 1) + 20);
                userData.push([email, firstName, lastName, password, age]);
            }
            const insertData = await userModal.createMultipleUsers(userData);

            if (!insertData.affectedRows) return res.status(400).json({
                status: 400,
                message: "Something went wrong, users not created."
            });

            res.status(200).json({
                status: 200,
                message: "Random users created."
            });
        } catch (error) {
            res.status(400).json({
                status: 400,
                message: "Something went wrong"
            });
        }
    }

    async getUser(req, res) {
        try {
            const data = await userModal.findUser();

            if (!data.length) return res.status(404).json({
                status: 404,
                message: "Data Not Found",
                data: null
            });

            res.status(200).json({
                status: 200,
                message: "Data found sucessfully",
                data: data
            });
        } catch (error) {
            res.status(400).json({
                status: 400,
                message: "Something went wrong"
            });
        }
    }

    async createUser(req, res) {
        try {
            const userData = await userSchema.validateAsync(req.body);

            const [ifUserExist] = await userModal.checkUserExistByEmail(userData.email);

            if (ifUserExist) return res.status(409).json({
                status: 409,
                message: "Email already registered, try with another one."
            });

            const password = await encryptPassword(userData.password);

            const data = {
                email: userData.email,
                firstName: userData.firstName,
                lastName: userData.lastName,
                password: password,
                age: userData.age
            };

            const insertData = await userModal.postUser(data);

            if (!insertData.insertId) return res.status(400).json({
                status: 400,
                message: "Something went wrong"
            });

            res.status(201).json({
                status: 201,
                message: "New user created successfully"
            });
        } catch (error) {
            if (error.isJoi) {
                return res.status(405).json({
                    status: 405,
                    message: error.details[0].message
                });
            }
            res.status(400).json({
                status: 400,
                message: "Something went wrong"
            });
        }
    }

    async loginUser(req, res) {
        try {
            const userData = await loginSchema.validateAsync(req.body);

            const [ifUserExist] = await userModal.checkUserExistByEmail(userData.email);
            if (!ifUserExist) return res.status(404).json({
                status: 404,
                message: "Email not found."
            });

            const ifPasswordMatch = await decryptPassword(userData.password, ifUserExist.password);

            if (!ifPasswordMatch) return res.status(401).json({
                status: 401,
                message: "Password is incorrect."
            });

            const token = await createToken(ifUserExist.user_id);

            if (!token) return res.status(400).json({
                status: 400,
                message: "Something went wrong."
            });

            res.status(200).json({
                status: 200,
                message: "Login Successfull",
                token: token
            });
        } catch (error) {
            if (error.isJoi) {
                return res.status(405).json({
                    status: 405,
                    message: error.details[0].message
                });
            }
            res.status(400).json({
                status: 400,
                message: "Something went wrong"
            });
        }
    }

    async updateUser(req, res) {
        try {
            const { id } = req.user;
            const { email, firstName, password, lastName, age } = req.body;
            if (!email && !firstName && !password && !lastName && !age) return res.status(404).json({
                status: 404,
                message: "Atleast one field is required."
            });

            if (email) {
                const [userData] = await userModal.findEmail({ email });
                if (userData?.email) return res.status(409).json({
                    status: 409,
                    message: "Email already present"
                });
            }
            let encPassword;
            if (password) encPassword = await encryptPassword(password);
            const updateUser = await userModal.updateUser({ id, email, firstName, password: encPassword, lastName, age });
            if (!updateUser.affectedRows) return res.status(400).json({
                status: 40,
                message: "Something went wrong."
            });

            res.status(200).json({
                status: 200,
                message: "User updated successfully"
            });
        } catch (error) {

        }
    }
}
module.exports = new mainController;