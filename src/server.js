require('dotenv').config()

const PORT = process.env.PORTS || 5000;

const express = require('express');



const usersRoutes = require('./routes/users')

const photoRoutes = require('./routes/photo')

const middlewareLogRequest = require('./middleware/logs');

const app = express();

app.use(middlewareLogRequest);
app.use(express.json());

app.use('/users', usersRoutes);
app.use('/upload', photoRoutes);
app.use('/images',express.static('public/images'));

//app.post('/upload',upload.single('photo'),(req,res)=>{
//  res.json({
//    message:'Upload Berhasil',
//  })
//})
//app.use((err, req, res, next ) =>{
//  res.json({
//    message:err.message,
//  })
//})


app.listen(PORT, () => {
  console.log(`Running Port ${PORT}`);
})