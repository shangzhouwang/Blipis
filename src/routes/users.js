const express = require('express');

const jwt = require('jsonwebtoken')


const userController = require('../controller/users.js');

const route = express.Router();

route.get('/', authenticateToken,userController.getAllUser);

route.post('/', authenticateToken,userController.createNewUser);

route.patch('/:idUser', authenticateToken,userController.updateUser);

route.patch('/pwd/:idUser', authenticateToken,userController.updateUserPassword);

route.delete('/:idUser', authenticateToken,userController.deleteUser);


function authenticateToken(req, res, nex){
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[2]
//  console.log(req.headers)
//  console.log(token)
//  console.log(process.env.ACCESS_TOKEN_SECRET)
  if (token == null) return res.sendStatus(401)
//   jwt.verify(token, process.env.ACCESS_TOKEN_SECRET,(err,data)=>{
//   if (err) return res.sendStatus(403)

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET,(err,data) =>{
      if (err) return res.sendStatus(403)
      console.log(err)
      nex() 
   }
 
  ) 
}


module.exports = route