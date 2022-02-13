// const categoryEntity = require("../entities/categoryEntity");
// const userDao = require("../data-access/userDao"); 
const categoryDao = require("../data-access/categoryDao"); 

class categoryService {
//   static async createCategory(userId, categoryData) {
//     try {
//       // make a new patient object with inputed data
//       const entity = new categoryEntity(categoryData); 
//       // check if the phone number already exists
//       const phoneNumberExist = await categoryDao.findByPhoneNumber(entity.getPhoneNumber());
//       if (phoneNumberExist) throw new Error("Phone number already exist");

//       const errors = await entity.validatecategoryCreation(); 
//       if (errors && errors.details) throw new Error (errors.details[0].message);
//       const user = await userDao.findById(userId);
//       const registeredBy = user.name; 

//       // if patient does not exist, create the patient
//       const categoryCreated = await categoryDao.create({ 
//         name: entity.getName(),
//         gender: entity.getGender(),  
//         address: entity.getAddress(),   
//         phoneNumber: entity.getPhoneNumber(),
//         ward: entity.getWard(),
//         registeredBy
//       });
//       // if user failed to create, throw error
//       if (!categoryCreated) throw new Error("Patient not Created"); 
//       return { categoryCreated };
//     } catch (error) {
//       return { error: error.message };
//     }
//   }
 
   
  static async getAllCategories() {
    try {
        const categoryCollection = await categoryDao.findAll({})
        return categoryCollection
        
      } catch (e) {
          console.log(e)
        //   return next(new ErrorResponse(e, 500));
      }
    // try { 
    //   const categoryFound = await categoryDao.findAll();
    //   return { message: "success", categoryFound };
    // } catch (error) {
    //   return { error: error.message };
    // }
  }

  static async getSinglecategory(patientId) {
    try {
      const categoryFound = await categoryDao.findByPk(patientId);
      if (!categoryFound) throw new Error("Sorry, category not found!");

      return categoryFound ;
    } catch (error) {
        console.log(error)

    //   return { error: error.message };
    }
  }
 
}

module.exports = categoryService;