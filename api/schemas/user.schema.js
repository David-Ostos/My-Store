const Joi = require('joi');

const id = Joi.string().uuid();
const name = Joi.string().min(5).max(15);
const email = Joi.string().email();
const password = Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{5,20}$'));

const createUserSchemas = Joi.object({
  name: name.required(),
  email: email.required(),
  password: password.required(),

});

const updateUserSchemas = Joi.object({
  name: name,
  email: email ,
  password: password

});

const getUserSchemas = Joi.object({
  id: id.required(),

});


module.exports = {
  createUserSchemas,
  updateUserSchemas,
  getUserSchemas
};
