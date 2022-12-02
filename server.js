const express = require("express");
const app = express();
require("dotenv").config()
const PORT = process.env.PORT || 5000;

const { router } = require("./router/main.router")

// require('crypto').randomBytes(48, function (err, buffer) {
//     var token = buffer.toString('hex');
//     console.log(token)
// });

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.use('/api', router);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers
app.use(function (err, req, res, next) {
    console.log({ err })
    res.status(err.status || 500);
    res.send({
        status: err.status || 500,
        message: err.message
    });
});

app.listen(PORT, () => {
    console.log(`Listening port at ${PORT}`);
});