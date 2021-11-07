const express = require("express");

const cartController = require("../controllers/cart");
const {addToCartValidator}  = require("../validators/cart");


const router = express.Router();

const {
  addToCart,
  retrieveCart,
  removeFromCart,
  modifyCart
} = cartController;


// Cart routes
router.post("/cart", addToCart)
router.delete("/cart/:cartId", removeFromCart)
router.get("/cart/:cartId", retrieveCart)
router.patch("/cart/:cartId",modifyCart)

module.exports = router;