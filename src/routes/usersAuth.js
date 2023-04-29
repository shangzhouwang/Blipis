const express = require('express');

const tokenController = require('../controller/usersAuth.js');

const route = express.Router();

route.post('/login', tokenController.validateUser);

route.post('/token', tokenController.requestToken);

route.delete('/logout/:tokenReq', tokenController.deleteUser);


module.exports = route