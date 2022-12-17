// install mysql2
const mysql2 = require('mysql2/promise');

// npm i dotenv
require('dotenv').config();
// let dotenv = require('dotenv');
// dotenv.config();

(async () => {
  console.log(process.env.DB_USER);
  const connection = await mysql2.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PWD,
    database: process.env.DB_NAME,
  });

  // simple query
  let [data, fields] = await connection.query('SELECT * FROM `stocks`');
  // console.log(result);
  console.log(data);

  connection.end();
})();
