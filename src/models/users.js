const dBpool = require('../config/database');


const getAllUsers = () => {
  const SQLQuery = 'SELECT * FROM users ORDER BY id ASC';
  return dBpool.query(SQLQuery);
}

const createNewUser = (body,hashedPassword) => {
  const SQLQuery = `INSERT INTO users(id,nama,address,email,pwd) 
                    VALUES(DEFAULT,'${body.nama}','${body.address}','${body.email}','${hashedPassword}')`;
  return dBpool.query(SQLQuery);  
}

const updateUser = (body, idUser) => {
  const SQLQuery = `UPDATE users
                    SET nama='${body.nama}',email='${body.email}',address='${body.address}'
                    WHERE id=${idUser} `
  return dBpool.query(SQLQuery);  
}

const updateUserPassword = (hashedPassword, idUser) => {
  const SQLQuery = `UPDATE users
                    SET pwd='${hashedPassword}'
                    WHERE id=${idUser} `
  return dBpool.query(SQLQuery);  
}


const deleteUser = (idUser) => {
  const SQLQuery = `DELETE FROM users
                    WHERE id=${idUser} `
  return dBpool.query(SQLQuery);  
}

const getOneUsers = (email) => {
  const SQLQuery = `SELECT id,email,pwd FROM users WHERE email='${email}'`;
  return dBpool.query(SQLQuery);
}


module.exports = {
  getAllUsers,
  createNewUser,
  updateUser,
  deleteUser,
  updateUserPassword,
  getOneUsers,
}