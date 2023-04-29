const userModel = require('../models/users');

const bcrypt = require ('bcryptjs');

const jwt = require('jsonwebtoken')


const getAllUser = async (req, res) => {
  //res.json(posts.filter(post => post.email === req.user.email))
  try{
    const data = await userModel.getAllUsers();
  
    res.status(200).json({
      message:'Connection Success',
      data : data.rows
    });
    
  }catch(error){
    res.status(500).json({
      message:'Server Error',
      ServerMessage : error,
    })
  }
    
}

const createNewUser = async (req, res) => {
  const {body} = req;

 const hashedPassword = await bcrypt.hash(body.pwd, 10)

  if(!body.nama || !body.email || !body.address || !body.pwd){
    res.status(400).json({
      message:'Data yg dikirim salah',
    })
  }
  try {
    await userModel.createNewUser(body, hashedPassword);
    res.status(201).json({
      message:'Post Create New User',
      data:body
    })
  }catch(error){
    console.log(body);
    res.status(500).json({
      message:'Server Error',
      ServerMessage : error,
    })      
  }
}

const updateUser = async (req, res) => {
  const {idUser} = req.params;
  const {body} = req;
  try {
    await userModel.updateUser(body, idUser);
    res.status(200).json({
      message:'Update Success',
      data:{
        idUser,
        ...body,}
    })
  }catch(error){
    console.log(body);
    res.status(500).json({
      message:'Server Error',
      ServerMessage : error,
    })      
  }

}

const updateUserPassword = async (req, res) => {
  const {idUser} = req.params;
  const {body} = req;
  console.log(body.pwd);
  const hashedPassword = await bcrypt.hash(body.pwd, 10);

  if(!body.pwd){
    res.status(400).json({
      message:'Data yg dikirim salah',
    })
  }

  try {
    await userModel.updateUserPassword(hashedPassword, idUser);
    res.status(200).json({
      message:'Update Success',
      data:{
        idUser,
        ...body,}
   })
  }catch(error){
    console.log(body);
    res.status(500).json({
      message:'Server Error',
      ServerMessage : error,
    })      
  }
}

const deleteUser = async (req, res) => {
  const {idUser} = req.params
  try {
    await userModel.deleteUser(idUser);
    res.status(201).json({
      message:'delete Success',
      data:idUser
    })
  }catch(error){
    console.log(body);
    res.status(500).json({
      message:'Server Error',
      ServerMessage : error,
    })      
  }
}



module.exports ={
  getAllUser,
  createNewUser,
  updateUser,
  deleteUser,
  updateUserPassword,
}