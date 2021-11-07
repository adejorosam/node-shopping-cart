//user.js
const User = require("../models").User;
const bcrypt = require("bcryptjs");
const securePassword = require('../utils/securePassword');
const getSignedToken = require('../utils/getSignedToken');

module.exports = {

    
    async login(req, res){
        try{
            const user = await User.findOne({email: req.body.email},{attributes:{include:['password']}});
            console.log(user)
            if(!user){
                return res.status(400).json({error_msg: "Email or password is incorrect"});
            }
            const validPass = await bcrypt.compare(req.body.password, user.password);
            if(!validPass){
                return res.status(400).json({error_msg: "E-mail or password is wrong"});
            }
            const token = await getSignedToken(user);
            return res.status(200).json({token: token});
            
          }catch(error){
            return res.status(400).json({ error_msg: error.message });
          }
    },
    
  async getAllUsers(req, res) {
    try {
      const userCollection = await User.find({})
      res.status(201).send(userCollection)
    } catch (e) {
      console.log(e)
      res.status(500).send(e)
    }
  },
  async createUser(req, res) {
    try {
 
        const userExists = await User.findAll({ where:{email: req.body.email }});
        console.log(req.body.password)
        if(userExists.length != 0){
            return res.status(400).json({error_msg: "Email already exists"});
        }
        const userCollection = await User.create({
            email: req.body.email,
            name: req.body.name,
            password: await securePassword(req.body.password),
        })
        const token = await getSignedToken(userCollection);
        res.status(201).json({
            success:true, 
            msg: "User created successfully",
            data: token
        });    
    } catch (e) {
      console.log(e)
      res.status(400).send(e)
    }
  },
  async update(req, res) {
    try {
      const userCollection = await User.find({
        id: req.params.userId,
      })
      if (userCollection) {
        const updatedUser = await User.update({
          id: req.body.email,
        })
        res.status(201).send(updatedUser)
      } else {
        res.status(404).send("User Not Found")
      }
    } catch (e) {
      console.log(e)
      res.status(500).send(e)
    }
  },
}