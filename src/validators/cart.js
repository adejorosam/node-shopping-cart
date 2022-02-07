const Joi = require('@hapi/joi')

const cartSchema = Joi.object({
  productId: Joi.number().required(),
  quantity: Joi.number(),
  cartId: Joi.number()
}).options({ abortEarly: false })



module.exports = {
  cartSchema,
}