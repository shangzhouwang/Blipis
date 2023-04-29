const postgres = require('pg').Pool
const dBpool = new postgres({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  port: process.env.DB_PORT,

})
//   => {
//    if (error) {
//      throw error
//    }
//    res.status(200).json(results.rows)
//  })
//

module.exports=dBpool;