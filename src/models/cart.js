//Cart Schema
module.exports = (sequelize, DataTypes) => {
  let Cart = sequelize.define("Cart", {
    // cartId : DataTypes.INTEGER,
    quantity: DataTypes.INTEGER,
    productId: DataTypes.INTEGER,
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
    Cart.belongsTo(models.Product),{
      onDelete: "CASCADE",
      foreignKey: "productId"
    }
  };
 

  return Cart
}