const Joi = require('joi');

const register_user = Joi.object({
    name: Joi.string().min(3).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).max(15).required()
});

module.exports = register_user; 
