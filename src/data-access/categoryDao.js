const categoryModel = require("../models").Category;

const categoryDao = {
  async findAll() {
    const result = await categoryModel.findAll({})
    return result;
  },

  async findByPk(categoryId) {
    const result = await categoryModel.findByPk(categoryId)
    return result;
  },

  async update(data) {
    const updatedCategory = await categoryModel.update(data);
    if (updatedCategory) return updatedCategory;
    return false;
  },
 
  // async findByPhoneNumber(phoneNumber) {
  //   const result = await categoryModel.findOne({ phoneNumber });
  //   return result;
  // }, 

  async create(data) {
    const newCategory = await categoryModel.create(data);
    if (newCategory) return newCategory;
    return false;
  }, 
};

module.exports = categoryDao;