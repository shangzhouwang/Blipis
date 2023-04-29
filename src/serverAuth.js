require('dotenv').config()

const PORT = process.env.PORTS_AUTH || 5000;

const express = require('express');
//const upload = require('../middleware/multer');


const usersRoutes = require('./routes/usersAuth')

const middlewareLogRequest = require('./middleware/logs');

const app = express();

app.use(middlewareLogRequest);
app.use(express.json());

app.use('/users', usersRoutes);

app.listen(PORT, () => {
  console.log(`Running Port ${PORT}`);
})