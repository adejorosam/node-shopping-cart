//cart.js
const Cart = require("../models").Cart;
const Product = require("../models").Product;
const CartProduct = require("../models").cart_products;
const {cartSchema} = require("../validators/cart")
const ErrorResponse = require('../utils/error');
const SuccessResponse = require('../utils/success')
const db = require('../config/db');
module.exports = {

     // @desc  Delete a particular product from the cart
    // @route   DELETE /api/v1/cart/:cartId
    // @access  Public
    /* 
    Process Flow [addToCart]: 
     *  check product id if product exists on the database
     *  check if cart id was supplied
     *  if cart id wasn't supplied then create a new cart
     *  if cart id was supplied then check if it exists and retrieve it
     *  if cart exists further check if product has already been added to cart
     *  if product is already in cart; modify product with quantity supplied or just add 1 to quantity
     *  if product isn't in cart; add it to cart with specified quantity or set it to one.
  */
    async addToCart(req, res, next) {
        const t = await db.transaction();
        try {

            const result = await cartSchema.validateAsync(req.body)
            //check if product exists
            const productCollection = await Product.findByPk(req.body.productId)
            if(productCollection === null){
                return next(new ErrorResponse(`Product with the id of ${req.params.productId} does not exist`, 404));
            }

            if (productCollection.availableQuantity < 1) {
               
                return SuccessResponse(res, "Product is out of stock", null,  200)

            }

            //check if cartId is supplied
            else
            {
                if(req.body.cartId === undefined){
                     //if not, create a new cart
                    const createCart = await Cart.create({
                        // productId: req.body.productId,
                        userId:req.user.id,
                        quantity:req.body.quantity ? req.body.quantity : 1,
                        price: productCollection.sellingPrice,
                        totalPrice: req.body.quantity ? productCollection.sellingPrice * req.body.quantity : 1 * productCollection*sellingPrice
                    }, { transaction: t })
                    // console.log()

                    if(createCart){
                        const cartProduct = await CartProduct.create({
                            cartId: createCart.dataValues.id,
                            productId: req.body.productId,
                          }, { transaction: t })
                    }
                    // console.log(cart_product)
                    await t.commit();

                    return SuccessResponse(res, "Product added to cart successfully", createCart,  201)
   
                }
                else{
                    const cartCollection = await Cart.findByPk(req.body.cartId)
                    if(cartCollection === null){
                        return next(new ErrorResponse(`Cart with the id of ${req.params.cartId} does not exist`, 404));
                       
                    }else{
                        if(cartCollection.productId === productCollection.id){
                            await cartCollection.update({    
                                quantity:req.body.quantity ? req.body.quantity : cartCollection.quantity+1,
                                totalPrice: req.body.quantity ? productCollection.sellingPrice * req.body.quantity : (cartCollection.quantity+1) * productCollection*sellingPrice
                              });
                              return SuccessResponse(res, "Cart modified successfully",cartCollection,  200)

                        
                        }
                    }
                }
            }

        } catch (e) {
             // If the execution reaches this line, an error was thrown.
            // We rollback the transaction.
            await t.rollback();
            return res.status(500).json({ error_msg: e.message });
        }
      },

    // @desc    Get a cart
    // @route   POST /api/v1/carts/cartId
    // @access  Public
   
    async retrieveCart(req, res, next) {
        try {
          const cartCollection = await Cart.findOne({where:{id:req.params.cartId}, 
       
        })
            if(cartCollection === null){
         
            return next(new ErrorResponse(`Cart with the id of ${req.params.cartId} does not exist`, 404));
            }
            else{
           
            return SuccessResponse(res, "Cart retrieved successfully",cartCollection,  200)

        } 
        } catch (e) {
            // console.log(e)
            return next(new ErrorResponse(e.message, 500));

        }
      },
      // @desc  Modify cart
    // @route   PATCH /api/v1/cart/:cartId
    // @access  Public
    /* 
    Process Flow [modifyCart]: 
     *  retrieve cart by id
     *  find product to modify by id
     *  once found set quantity to supplied quantity and if null increment by 1
     *  if product isn't found return not found error
     *  update cart and return the updated cart
  */
    async modifyCart(req, res, next) {
        try {
         const result = await cartSchema.validateAsync(req.body)
          const cartCollection = await Cart.findByPk(parseInt(req.params.cartId))
            if(cartCollection === null){
                return next(new ErrorResponse(`Cart with the id of ${req.params.cartId} does not exist`, 404));
            
            }
            else{
     
                const productCollection = await Product.findByPk(req.body.productId)
                if(productCollection === null){
                    return next(new ErrorResponse(`Product with the id of ${req.params.productId} does not exist`, 404));
                
            }
                if (productCollection.availableQuantity < 1) {
                    return SuccessResponse(res, "Product is out of stock",null,  200)

                }
                checkCart = CartProduct.findAll({where: {productId:req.body.productId, cartId:req.params.cartId }})
                if(checkCart === null){
                    return next(new ErrorResponse(`Product with the id of ${req.params.productId} does not exist in this cart`, 404));

            }
            else{
          
                await cartCollection.update({    
                    quantity:req.body.quantity ? req.body.quantity : cartCollection.quantity,
                    totalPrice : req.body.quantity ? req.body.quantity*productCollection.sellingPrice : cartCollection.quantity*productCollection.sellingPrice
                  });
                  return SuccessResponse(res, "Cart modified successfully",cartCollection,  200)

            }
                
        } 
        } catch (e) {
            return next(new ErrorResponse(e.message, 500));
        }
      },
 

    // @desc  Delete a particular product from the cart
    // @route   DELETE /api/v1/cart/:cartId
    // @access  Public
    /* 
    Process Flow [removeFromCart]: 
     *  retrieve cart by id
     *  filter out product to remove
     *  if product id isn't found, return not found error
     *  if found, update cart and return the removed product
  */
    async removeFromCart(req, res, next) {
        try {
        
          const cartCollection = await Cart.findByPk(parseInt(req.params.cartId))
            if(cartCollection === null){
                return next(new ErrorResponse(`Cart with the id of ${req.params.cartId} does not exist`, 404));

            }else{
                const productCollection = await Product.findByPk(req.body.productId)
                if(productCollection === null){
                
                    return next(new ErrorResponse(`Product with the id of ${req.params.productId} does not exist`, 404));
                }
                checkCart = await Cart.findOne({where: {productId:req.body.productId, id:req.params.cartId }})
                if(checkCart === null){
                    return next(new ErrorResponse(`Product with the id of ${req.params.productId} does not exist`, 404));

                }else{

                    await checkCart.destroy()
                    return SuccessResponse(res, "Product removed successfully",null,  200)

                }
            }

        } catch (e) {
            console.log(e)
            return next(new ErrorResponse(e.message, 500));

        }
      },
    }