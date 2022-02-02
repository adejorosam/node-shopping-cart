//Product.js
const Product = require("../models").Product;
const Category = require("../models").Category
// const ErrorHandler = require("../utils/error")
const ErrorResponse = require('../utils/error');
const {productSchema} = require("../validators/product")


module.exports = {
    // @desc    Get all products belonging to a category
    // @route   POST /api/v1/category/categoryId/products
    // @access  Public
  async getProductsByCategory(req, res){
    try {
      const products = await Product.findAll({ where:{categoryId: req.params.categoryId }});      
      return res.status(200).json({
        success:true, 
        msg: "Product retrieved successfully",
        data: products
    }); 
    } catch (e) {
        console.log(e)
        return next(new ErrorResponse(e.message, 500));

        }
  },
    // @desc    Get all products
    // @route   POST /api/v1/products
    // @access  Public
  async getAllProducts(req, res) {
    try {

      const productCollection = await Product.findAll({})
      return res.status(200).json({
        success:true, 
        msg: "Products retrieved successfully",
        data: productCollection
    }); 
    } catch (e) {
        console.log(e)
        return next(new ErrorResponse(e.message, 500));
        }
  },
    // @desc    Get a Product
    // @route   POST /api/v1/products/productId
    // @access  Private
  async getAProduct(req, res, next) {
    try {
      const productCollection = await Product.findByPk(req.params.productId)
        if(productCollection === null){
          return next(new ErrorResponse(`Product with the id of ${req.params.productId} does not exist`, 404));

        }
        else{
        return res.status(200).json({
            success:true, 
            msg: "Product retrieved successfully",
            data: productCollection
        });
    } 
    } 
    catch (e) {
        console.log(e)
        return next(new ErrorResponse(e.message, 500));

    }
  },
    // @desc    Create a new Product
    // @route   POST /api/v1/products
    // @access  Private
  async createProduct(req, res) {
    try {
        const result = await productSchema.validateAsync(req.body)
        const ProductExists = await Product.findAll({ where:{name: req.body.name }});
        const CategoryExists = await Category.findAll({where: {id:req.body.categoryId}})

        if(CategoryExists.length === 0){
          return next(new ErrorResponse(`Category with the id of ${req.body.categoryId} does not exist`, 404));

      }  
        if(ProductExists.length != 0){
            return next(new ErrorResponse(`Product with the name of ${req.body.name} exist`, 400));
        }  
       
        const productCollection = await Product.create({
            name: req.body.name,
            sellingPrice:req.body.sellingPrice,
            userId:req.user.id,
            description: req.body.description,
            availableQuantity:req.body.availableQuantity,
            costPrice: req.body.costPrice,
            categoryId:req.body.categoryId,
            sku:Math.floor(Math.random() * 100) + 1,
            expirationDate:req.body.expirationDate

        })
        return res.status(201).json({
            success:true, 
            msg: "Product created successfully",
            data: productCollection
        });    
    } catch (e) {
      return next(new ErrorResponse(e.message, 500));
    }
  },
    // @desc    Update a particular product in the database
    // @route   PATCH /api/v1/products/:productId
    // @access  Private
  async updateProduct(req, res) {
    try {
      const result = await productSchema.validateAsync(req.body)
        const product = await Product.findByPk(req.params.productId)
          if(product === null){
            return next(new ErrorResponse(`Product with the id of ${req.params.productId} does not exist`, 404));
         
          }
          else{
            await product.update({    
              name: req.body.name ? req.body.name : product.name,
              description: req.body.description ? req.body.description : product.description,
              sellingPrice:req.body.sellingPrice ? req.body.sellingPrice : product.sellingPrice,
              userId:req.user.id,
              availableQuantity:req.body.availableQuantity ? req.body.availableQuantity : product.availableQuantity,
              costPrice: req.body.costPrice ? req.body.costPrice  : product.costPrice,
              categoryId:req.body.categoryId ? req.body.categoryId : product.categoryId,
              sku:product.sku,
              expirationDate:req.body.expirationDate ? req.body.categoryId : product.expirationDate
            });
          return res.status(200).json({
            success:true, 
            msg: "Product updated successfully",
            data: product
        });
      } 
      } catch (e) {
          console.log(e)
          return next(new ErrorResponse(e.message, 500));
      }
},

    // @desc    Delete a particular product in the database
    // @route   DELETE /api/v1/Product/:productId
    // @access  Private
    async deleteProduct(req, res) {
        try {
            const product = await Product.findByPk(req.params.productId)
              if(product === null){
                return next(new ErrorResponse(`Product with the id of ${req.params.productId} does not exist`, 404));
              }
              else{
               await product.destroy();
               return res.status(204).json();
              } 
          } catch (e) {
              console.log(e)
              return next(new ErrorResponse(e.message, 500));
          }
    },
}