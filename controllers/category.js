//category.js
const Category = require("../models").Category;


module.exports = {
    // @desc    Get all categories
    // @route   POST /api/v1/categories
    // @access  Public
  async getAllCategories(req, res) {
    try {
      const categoryCollection = await Category.findAll({})
      res.status(200).json({
        success:true, 
        msg: "Category retrieved successfully",
        data: categoryCollection
    }); 
    } catch (e) {
        console.log(e)
        res.status(500).send(e)
        }
  },
    // @desc    Get a category
    // @route   POST /api/v1/categories/categoryId
    // @access  Private
  async getACategory(req, res) {
    try {
      const categoryCollection = await Category.findByPk(req.params.categoryId)
        if(categoryCollection === null){
            res.status(404).json({
                success:true, 
                msg: `Category with the id of ${req.params.categoryId} does not exist`,
                data: categoryCollection
        });
        }
        else{
        res.status(200).json({
            success:true, 
            msg: "Category retrieved successfully",
            data: categoryCollection
        });
    } 
    } catch (e) {
        console.log(e)
        res.status(500).send(e)
    }
  },
    // @desc    Create a new category
    // @route   POST /api/v1/categories
    // @access  Private
  async createCategory(req, res) {
    try {
        const categoryExists = await Category.findAll({ where:{name: req.body.name }});
        if(categoryExists.length != 0){
            return res.status(400).json({error_msg: "Category with the name exists"});
        }  
        const categoryCollection = await Category.create({
            name: req.body.name,
        })
        res.status(201).json({
            success:true, 
            msg: "Category created successfully",
            data: categoryCollection
        });    
    } catch (e) {
      console.log(e)
      res.status(400).send(e)
    }
  },
    // @desc    Update a particular category in the database
    // @route   PATCH /api/v1/categories/:categoryId
    // @access  Private
  async updateCategory(req, res) {
    try {
        const category = await Category.findByPk(req.params.categoryId)
          if(category === null){
              res.status(404).json({
                  success:true, 
                  msg: `Category with the id of ${req.params.categoryId} does not exist`,
                  data: category
          });
          }
          else{
          await category.update({name:req.body.name});
          res.status(200).json({
            success:true, 
            msg: "Category created successfully",
            data: category
        });
      } 
      } catch (e) {
          console.log(e)
          res.status(500).send(e)
      }
},

    // @desc    Delete a particular category in the database
    // @route   DELETE /api/v1/category/:categoryId
    // @access  Private
    async deleteCategory(req, res) {
        try {
            const category = await Category.findByPk(req.params.categoryId)
              if(category === null){
                  res.status(404).json({
                      success:true, 
                      msg: `Category with the id of ${req.params.categoryId} does not exist`,
                      data: category
              });
              }
              else{
               await category.destroy();
               res.status(204).json();
          } 
          } catch (e) {
              console.log(e)
              res.status(500).send(e)
          }
    },
}