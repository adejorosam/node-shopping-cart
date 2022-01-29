const Joi = require('@hapi/joi')

const cartSchema = Joi.object({
  productId: Joi.number().required(),
  quantity: Joi.number(),
  cartId: Joi.number()
})



module.exports = {
  cartSchema,
}