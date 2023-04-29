const express = require('express');
//const photoController = require('../controller/photo');

const route = express.Router();

const upload = require('../middleware/multer');


//route.post('/', photoController.photoUpload);
route.post('/upload',upload.single('photo'),(req,res)=>{
  res.json({
    message:'Upload Berhasil',
  })
})
route.use((err, req, res, next ) =>{
  res.json({
    message:err.message,
  })
})


module.exports = route