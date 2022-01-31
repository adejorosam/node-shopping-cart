module.exports = {
    up: (queryInterface, Sequelize) =>
      queryInterface.createTable("cart_products", {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        productId: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
  
        cartId:{
          type: Sequelize.INTEGER,
          allowNull: false
        },
  
        
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
      }),
    down: (queryInterface /* , Sequelize */) => queryInterface.dropTable("cart_product"),
  }