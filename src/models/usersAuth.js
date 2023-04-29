const dBpool = require('../config/database');

const getOneUsers = (email) => {
  const SQLQuery = `SELECT id,email,pwd FROM users WHERE email='${email}'`;
  return dBpool.query(SQLQuery);
}

const addToken = (token) => {
  const SQLQuery = `INSERT INTO refreshTokens(tokens) VALUES('${token}')`;
//  console.log(SQLQuery)
  return dBpool.query(SQLQuery);  
}

const delToken = (token) =>{
  const SQLQuery = `DELETE FROM refreshTokens where tokens='${token}'`;
  console.log(SQLQuery)
  return dBpool.query(SQLQuery);  
}

const countToken = (token) =>{
  const SQLQuery = `select * from refreshTokens where tokens='${token}'`;
//  console.log(SQLQuery)
  return dBpool.query(SQLQuery);  
}

module.exports = {
  getOneUsers,
  addToken,
  delToken,
  countToken,
}