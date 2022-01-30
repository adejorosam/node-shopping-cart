//cart.js
const Cart = require("../models").Cart;
const Product = require("../models").Product;
const {cartSchema} = require("../validators/cart")
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
    async addToCart(req, res) {
        try {
            const result = await cartSchema.validateAsync(req.body)
            //check if product exists
            const productCollection = await Product.findByPk(req.body.productId)
            if(productCollection === null){
                return res.status(404).json({
                    success:true, 
                    msg: `Product with the id of ${req.body.productId} does not exist`,
                    data: null
            });      
            }

            if (productCollection.availableQuantity < 1) {
                return res.status(200).json({
                    success:true, 
                    msg: "Product is Out of Stock!",
                    data: null
                });  
            }

            //check if cartId is supplied
            else
            {
                if(req.body.cartId === undefined){
                     //if not, create a new cart
                    const createCart = await Cart.create({
                        productId: req.body.productId,
                        userId:req.user.id,
                        quantity:req.body.quantity ? req.body.quantity : 1,
                        price: productCollection.sellingPrice,
                        totalPrice: req.body.quantity ? productCollection.sellingPrice * req.body.quantity : 1 * productCollection*sellingPrice
                    })

                    return res.status(201).json({
                        success:true, 
                        msg: "Product added to cart successfully",
                        data: createCart
                    });      
                }
                else{
                    const cartCollection = await Cart.findByPk(req.body.cartId)
                    if(cartCollection === null){
                        return res.status(404).json({
                            success:true, 
                            msg: `Cart with the id of ${req.body.cartId} does not exist`,
                            data: null
                        });
                    }else{
                        if(cartCollection.productId === productCollection.id){
                            await cartCollection.update({    
                                quantity:req.body.quantity ? req.body.quantity : cartCollection.quantity+1,
                                totalPrice: req.body.quantity ? productCollection.sellingPrice * req.body.quantity : (cartCollection.quantity+1) * productCollection*sellingPrice
                              });
                            return res.status(200).json({
                              success:true, 
                              msg: "Cart modified successfully",
                              data: cartCollection
                          });
                        }
                    }
                }
            }

        } catch (e) {
            return res.status(400).json({ error_msg: e.message });
        }
      },

    // @desc    Get a cart
    // @route   POST /api/v1/carts/cartId
    // @access  Public
    async retrieveCart(req, res) {
        try {
          const cartCollection = await Cart.findAll({where:{cartId:req.params.cartId}, include: Product})
            if(cartCollection === null){
                return res.status(404).json({
                    success:true, 
                    msg: `Cart with the id of ${req.params.cartId} does not exist`,
                    data: cartCollection
            });
            }
            else{
            return res.status(200).json({
                success:true, 
                msg: "Cart retrieved successfully",
                data: cartCollection
            });
        } 
        } catch (e) {
            console.log(e)
            return res.status(500).send(e)
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
    async modifyCart(req, res) {
        try {
         const result = await cartSchema.validateAsync(req.body)
          const cartCollection = await Cart.findByPk(parseInt(req.params.cartId))
            if(cartCollection === null){
                return res.status(404).json({
                    success:true, 
                    msg: `Cart with the id of ${req.params.cartId} does not exist`,
                    data: null
            });
            }
            else{
     
                const productCollection = await Product.findByPk(req.body.productId)
                if(productCollection === null){
                    return res.status(404).json({
                        success:true, 
                        msg: `Product with the id of ${req.body.productId} does not exist`,
                        data: null
                });
            }
                if (productCollection.availableQuantity < 1) {
                    return res.status(200).json({
                        success:true, 
                        msg: "Product is Out of Stock!",
                        data: null
                    });  
                }
                checkCart = Cart.findAll({where: {productId:req.body.productId, id:req.params.cartId }})
                if(checkCart === null){
                    return res.status(404).json({
                        success:true, 
                        msg: `Product with the id of ${req.body.productId} does not belong in this cart`,
                        data: null
                });
            }
            else{
          
                await cartCollection.update({    
                    quantity:req.body.quantity ? req.body.quantity : cartCollection.quantity,
                    totalPrice : req.body.quantity ? req.body.quantity*productCollection.sellingPrice : cartCollection.quantity*productCollection.sellingPrice
                  });
                return es.status(200).json({
                  success:true, 
                  msg: "Cart modified successfully",
                  data: cartCollection
              });
            }
                
        } 
        } catch (e) {
            return res.status(400).json({ error_msg: e.message });
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
    async removeFromCart(req, res) {
        try {
        
          const cartCollection = await Cart.findByPk(parseInt(req.params.cartId))
            if(cartCollection === null){
                return res.status(404).json({
                    success:true, 
                    msg: `Cart with the id of ${req.params.cartId} does not exist`,
                    data: null
            });
            }else{
                const productCollection = await Product.findByPk(req.body.productId)
                if(productCollection === null){
                    return res.status(404).json({
                        success:true, 
                        msg: `Product with the id of ${req.body.productId} does not exist`,
                        data: null
                });
                }
                checkCart = await Cart.findOne({where: {productId:req.body.productId, id:req.params.cartId }})
                if(checkCart === null){
                    return res.status(404).json({
                        success:true, 
                        msg: `Product with the id of ${req.body.productId} does not belong in this cart`,
                        data: null
                });
                }else{

                    await checkCart.destroy()
                    return res.status(200).json({
                        success:true, 
                        msg: "Product removed successfully",
                        data: null
                    }); 
                }
            }

        } catch (e) {
            console.log(e)
            return res.status(500).send(e)
        }
      },
    }