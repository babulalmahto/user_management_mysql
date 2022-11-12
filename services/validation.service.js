const Joi = require('joi');

const userSchema = Joi.object({
    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'in'] } })
        .required(),

    password: Joi.string()
        .required()
        .min(3),

    repassword: Joi.ref('password'),

    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    age: Joi.number().required()
});

const loginSchema = Joi.object({
    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'in'] } })
        .required(),

    password: Joi.string()
        .required()
        .min(3)
});

module.exports = { userSchema, loginSchema };