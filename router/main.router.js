const router = require("express").Router();

const mainController = require("../controller/main.controller");

const { authenticateToken } = require("../middlewares/auth.middleware");

router.post('/create/random', mainController.createRandomUsers);

router.get('/user', mainController.getUser);

router.post('/register', mainController.createUser);

router.post('/login', mainController.loginUser);

router.use(authenticateToken);

router.put("/user/update", mainController.updateUser)

module.exports = { router };