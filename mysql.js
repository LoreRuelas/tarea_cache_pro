// db/mysql.js
import mysql from 'mysql2/promise';

const db = await mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASS,
  database: process.env.MYSQL_DB,
  waitForConnections: true,
  connectionLimit: 10,
});

export default db;
