const { sequelize } = require("../models");

//cart.js
module.exports = {
    up: (queryInterface, Sequelize) =>
      queryInterface.createTable("Carts", {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
    
        // productId: {
        //   type: Sequelize.INTEGER,
        //   onDelete: "CASCADE",
        //   references: {
        //     model: "products",
        //     key: "id",
        //     as: "productId",
        //   },
        // },

        userId: {
          type: Sequelize.INTEGER,
          onDelete: "CASCADE",
          references: {
            model: "users",
            key: "id",
            as: "userId",
          },
        },

        quantity:{
            allowNull:false,
            type:Sequelize.INTEGER
        },

        price:{
          allowNull: false,
          type:Sequelize.DOUBLE
        },

        totalPrice:{
          allowNull: false,
          type: Sequelize.DOUBLE
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
    down: (queryInterface /* , Sequelize */) => queryInterface.dropTable("Carts"),
}