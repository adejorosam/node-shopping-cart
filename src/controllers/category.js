//category.js
const Category = require("../models").Category;
const {categorySchema} = require("../validators/category");
const { handleError, ErrorHandler } = require('../utils/error')
const ErrorResponse = require('../utils/error');





module.exports = {
    // @desc    Get all categories
    // @route   POST /api/v1/categories
    // @access  Public
  async getAllCategories(req, res) {
    try {
      const categoryCollection = await Category.findAll({})
      return SuccessResponse("Category retrieved successfully", categoryCollection,  200)
    //   return res.status(200).json({
    //     success:true, 
    //     msg: "Category retrieved successfully",
    //     data: categoryCollection
    // }); 
    } catch (e) {
        console.log(e)
        return next(new ErrorResponse(e, 500));
    }
  },
    // @desc    Get a category
    // @route   POST /api/v1/categories/categoryId
    // @access  Private
  async getACategory(req, res, next) {
    try {
      const categoryCollection = await Category.findByPk(req.params.categoryId)
        if(categoryCollection === null){
          return next(new ErrorResponse(`Category with the id of ${req.params.categoryId} does not exist`, 404));
        }
        else{
        return res.status(200).json({
            success:true, 
            msg: "Category retrieved successfully",
            data: categoryCollection
        });
    } 
    } catch (e) {
        console.log(e)
        return next(new ErrorResponse(e, 500));

    }
  },
    // @desc    Create a new category
    // @route   POST /api/v1/categories
    // @access  Private
  async createCategory(req, res) {
    try {
      const result = await categorySchema.validateAsync(req.body)

        const categoryExists = await Category.findOne({ where:{name: req.body.name }});
        if(categoryExists){
          return next(new ErrorResponse(`Category with the id of ${req.body.name} does not exist`, 400));
        }  
        const categoryCollection = await Category.create({
            name: req.body.name,
            description: req.body.description
        })
        return res.status(201).json({
            success:true, 
            msg: "Category created successfully",
            data: categoryCollection
        });    
    } catch (e) {
      return res.status(500).json({ error_msg: e.message });

    }
  },
    // @desc    Update a particular category in the database
    // @route   PATCH /api/v1/categories/:categoryId
    // @access  Private
  async updateCategory(req, res) {
    try {
        const result = await categorySchema.validateAsync(req.body)
        const category = await Category.findByPk(req.params.categoryId)
          if(category === null){
        
          return next(new ErrorResponse(`Category with the id of ${req.params.categoryId} does not exist`, 404));

          }
          else{
          await category.update({
            name:req.body.name ? req.body.name : category.name,
            description:req.body.description ? req.body.description : category.description,
            isActive: req.body.isActive ? req.body.isActive : category.isActive

          });
          return res.status(200).json({
            success:true, 
            msg: "Category updated successfully",
            data: category
        });
      } 
      } catch (e) {
          console.log(e)
          return next(new ErrorResponse(e, 500));

      }
},

    // @desc    Delete a particular category in the database
    // @route   DELETE /api/v1/category/:categoryId
    // @access  Private
    async deleteCategory(req, res) {
        try {
            const category = await Category.findByPk(req.params.categoryId)
              if(category === null){
             
              return next(new ErrorResponse(`Category with the id of ${req.params.categoryId} does not exist`, 404));

              }
              else{
               await category.destroy();
               return res.status(204).json();
          } 
          } catch (e) {
              console.log(e)
              return next(new ErrorResponse(e.message, 500));

          }
    },
}