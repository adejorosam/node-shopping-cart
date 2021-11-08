//PRODUCT Schema
module.exports = (sequelize, DataTypes) => {
  let Product = sequelize.define("Product", {
    // productId:DataTypes.INTEGER
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    userId:DataTypes.INTEGER,
    categoryId:DataTypes.INTEGER,
    sku:DataTypes.INTEGER,
    costPrice:DataTypes.FLOAT,
    sellingPrice:DataTypes.FLOAT,
    expirationDate:DataTypes.DATE,
    availableQuantity:DataTypes.INTEGER
    
  })
  Product.associate = function(models) {
    Product.belongsTo(models.User, {
      onDelete: "CASCADE",
      foreignKey: "userId",
    })
  }

  Product.associate = function(models) {
      Product.belongsTo(models.Category, {
        onDelete: "CASCADE",
        foreignKey: "categoryId",
      })
    }

    // Product.associate = function(models){
    //   Product.belongsTo(models.Cart,{
    //     onDelete: "CASCADE",
    //   })
    // }
  return Product
}