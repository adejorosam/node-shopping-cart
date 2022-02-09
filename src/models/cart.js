//Cart Schema
module.exports = (sequelize, DataTypes) => {
  let Cart = sequelize.define("Cart", {
    // cartId : DataTypes.INTEGER,
    quantity: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    price: DataTypes.DOUBLE,
    totalPrice: DataTypes.DOUBLE
  })

 

  Cart.associate = function(models) {
    Cart.belongsTo(models.User, {
      onDelete: "CASCADE",
      foreignKey: "userId",
    })
  }

  Cart.associate = function(models) {
    Cart.belongsToMany(models.Product,{
      through: "cart_products",
      as: "products",
      // foreignKey: "productId",
    })
  };

  return Cart
}