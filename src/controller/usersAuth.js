const userModel = require('../models/usersAuth');

const bcrypt = require ('bcryptjs');

const jwt = require('jsonwebtoken')

//let refreshTokens = [];

const validateUser = async (req, res) => {
  const {body} = req;
  try {
   const data = await userModel.getOneUsers(body.email);
   if (body.email && (await bcrypt.compare(body.pwd, data.rows[0].pwd))){
    const userEmail = body.email;
//    const token = require('crypto').randomBytes(64).toString('hex');
//    const accessToken = jwt.sign({userEmail : userEmail},process.env.ACCESS_TOKEN_SECRET,{expiresIn: '15s'},function(err, token){  console.log(token);});
    const accessToken = generateAccessToken(userEmail);
    const refreshToken = generateRefershToken(userEmail);    
    const addToken = await userModel.addToken(refreshToken);
    res.status(201).json({
      accessToken: accessToken, refreshToken: refreshToken,
    });
  }else{
    res.status(201).json({
      message:'find Failed',
    })
   
  } 
    
  }catch(error){
    res.status(500).json({
      message:'Server Error',
      ServerMessage : error,
    })      
  }
}

const requestToken = async (req, res) => {
  const refreshToken = req.body.token;
  if (refreshToken==null)return res.sendStatus(401)
  const countToken = await userModel.countToken(refreshToken);
  const totalTokens = (countToken.rows).length;
  if (totalTokens===0) return res.sendStatus(403)
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET,(err,user)=>{
  if (err) return res.sendStatus(403)
  const accessToken = generateAccessToken({user: user}) 
  res.status(201).json({
      accessToken: accessToken,})
  })
}

const deleteUser = (req, res) => {
  const {tokenReq} = req.params;
  userModel.delToken(tokenReq);
  res.sendStatus(204)
}

function generateAccessToken(user){
    return jwt.sign({user:user},process.env.ACCESS_TOKEN_SECRET,{expiresIn: '1m'})
}

function generateRefershToken(user){
   return jwt.sign({user:user},process.env.REFRESH_TOKEN_SECRET) 
}

module.exports ={
  validateUser,
  requestToken,
  deleteUser,
}