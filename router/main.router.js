const router = require("express").Router();
const mainController = require("../controller/main.controller");

router.get('/user', mainController.getUser);
router.post('/register', mainController.createUser);
router.post('/login', mainController.loginUser);

module.exports = { router };