const userModal = require("../modal/user.modal");
const { userSchema, loginSchema } = require("../services/validation.service");
const { encryptPassword, decryptPassword } = require("../services/encryptDecrypt.service");

class mainController {
    async getUser(req, res) {
        try {
            const data = await userModal.findUser();
            console.log(data);
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
                console.log(ifUserExist);
            if (!ifUserExist) return res.status(404).json({
                status: 404,
                message: "Email not found."
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
}
module.exports = new mainController;