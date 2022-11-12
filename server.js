const express = require("express");
const app = express();
require("dotenv").config()
const PORT = process.env.PORT || 5000;

const { router } = require("./router/main.router")

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.use('/api', router);

app.listen(PORT, () => {
    console.log(`Listening port at ${PORT}`);
});

//sendgrid or nodemailer - Easy as cake e-mail sending from your Node.js applications.
// validator - validator is a library of string validators and sanitizers.
// jsonwebtoken - it is a library to sign, verify and decode JSON web Tokens.
/* bcrypt/dcrypt - it is a library to hash and verify passwords
            with sync, callbacksand promises interface.*/ 
// dotenv
// nodemon
//  init
// express