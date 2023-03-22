const Joi = require('joi');

const id = Joi.string().uuid();
const name = Joi.string().min(3).max(15);
const price = Joi.number().integer().min(10).strict();
const image = Joi.string().uri();
const isBlock = Joi.boolean();

const createProductSchemas = Joi.object({
  name: name.required(),
  price: price.required(),
  image: image.required(),
  isBlock: isBlock.required()

});

const updateProductSchemas = Joi.object({
  name: name,
  price: price,
  image: image,
  isBlock: isBlock
});

const getProductSchemas = Joi.object({
  id: id.required(),

});


module.exports = {
  createProductSchemas,
  updateProductSchemas,
  getProductSchemas
};
