import mysql from 'mysql2';
import dotenv from 'dotenv';

dotenv.config();

// console.log(process.env.MYSQL_USER);
// console.log(process.env.MYSQL_HOST);

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE
}).promise();

console.log(pool);

export async function getPrescriptions() {
  const result = await pool.query("SELECT * FROM prescriptions");
  return result;
}

export async function addPrescription(order_id, date, gender, age, product, quantity, price) {
  await pool.query(`
    INSERT INTO prescriptions
    VALUE(?, ?, ?, ?, ?, ?, ?)
  `, [order_id, date, gender, age, product, quantity, price]);
}

export async function removePrescription(order_id) {
  await pool.query(`
    DELETE FROM prescriptions 
    WHERE order_id = ?;
  `,[order_id]);
}

const prescription = await getPrescriptions();
console.log(prescription);
// await addPrescription(3, '2024-04-04 21:34:11', 'Female', 32, 'Etanol', 1, 150);

// await removePrescription(1);