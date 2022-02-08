//Cart Schema
module.exports = (sequelize, DataTypes) => {
const db = require('../config/db');

let cart_products = sequelize.define('cart_products', {
    cartId: {
      type: DataTypes.INTEGER,
      references: {
        model: db.Cart, // 'Movies' would also work
        key: 'id'
      }
    },
    productId: {
      type: DataTypes.INTEGER,
      references: {
        model: db.Product, // 'Actors' would also work
        key: 'id'
      }
    }
  });
    return cart_products
  }


   
   
   
